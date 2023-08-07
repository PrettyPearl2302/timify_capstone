/* eslint-disable semi */
/* eslint-disable comma-dangle */
import express from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { Op } from "sequelize";
import { sequelize } from "./database.js";
import {
  User,
  Comment,
  Episode,
  Rating,
  Podcast,
  Bookmarked,
} from "./models/index.js";
import userRoutes from "./route/users.js";
import commentRoutes from "./route/comments.js";
import episodeRoutes from "./route/episodes.js";
import ratingRoutes from "./route/ratings.js";
import bookmarkedRoutes from "./route/bookmarks.js";
import SequelizeStoreInit from "connect-session-sequelize";

const app = express();

const sessionTime = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
const sessionKey = "your-secret-key";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan());

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: false,
      secure: false,
      expires: new Date(Date.now() + sessionTime),
    },
  })
);
sessionStore.sync();

app.use(userRoutes);
app.use(commentRoutes);
app.use(episodeRoutes);
app.use(ratingRoutes);
app.use(bookmarkedRoutes);

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/comments/:episodeId", async (req, res) => {
  const { episodeId } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { episodeId },
      order: [["timestamp", "DESC"]],
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/episodes", async (req, res) => {
  try {
    const episodes = await Episode.findAll();
    res.json(episodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/ratings", async (req, res) => {
  try {
    const episodeRatings = await Rating.findAll({});
    res.status(200).json(episodeRatings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/ratings/:episodeId", async (req, res) => {
  const { episodeId } = req.params;

  try {
    const episodeRatings = await Rating.findAll({
      where: { episodeId },
    });
    const totalRatings = episodeRatings.length;
    const totalRatingSum = episodeRatings.reduce(
      (sum, rating) => sum + rating.ratingValue,
      0
    );
    const averageRating = totalRatings > 0 ? totalRatingSum / totalRatings : 0;

    res.status(200).json(averageRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/rec-ratings/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const recRatings = await Rating.findAll({
      where: {
        ratingValue: { [Op.gte]: 4 },
        userId,
      },
      include: [
        {
          model: Episode,
          as: "episode",
          attributes: ["uuid"],
          include: [
            {
              model: Podcast,
              as: "podcast",
              attributes: ["genre", "name"],
            },
          ],
        },
      ],
    });
    res.status(200).json(recRatings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/bookmarks/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userBookmarks = await Bookmarked.findAll({
      where: { userId },
    });
    res.status(200).json(userBookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// route to get info on whether a bookmark record exists for this podcast id with this user id
app.get("/bookmarks/user/:podcastId", async (req, res) => {
  const { podcastId } = req.params;
  const userId = req.headers.authorization;

  try {
    const bookmark = await Bookmarked.findOne({
      where: {
        podcastId,
        userId,
      },
    });

    if (bookmark) {
      return res.status(200).json({ bookmarked: true });
    } else {
      return res.status(200).json({ bookmarked: false });
    }
  } catch (error) {
    console.error("Error checking bookmark:", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking the bookmark" });
  }
});

app.get("/rating/user/:episodeId", async (req, res) => {
  const { episodeId } = req.params;
  const userId = req.headers.authorization;

  try {
    const rated = await Rating.findOne({
      where: {
        episodeId,
        userId,
      },
    });

    if (rated) {
      return res.status(200).json({ ratingValue: rated.ratingValue });
    } else {
      return res.status(200).json({ ratingValue: false });
    }
  } catch (error) {
    console.error("Error checking rating", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking the rating" });
  }
});

sequelize
  .sync({ alter: true })
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
