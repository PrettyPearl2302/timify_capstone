import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from './database.js';
import { User, Comment, Episode } from './models/index.js';
import userRoutes from './route/users.js';
import commentRoutes from './route/comments.js';
import episodeRoutes from './route/episodes.js'
import SequelizeStoreInit from 'connect-session-sequelize';

const app = express();

const sessionTime = 365 * 24 * 60 * 60 *1000; // 1 year in milliseconds
const sessionKey = 'your-secret-key';

app.use(cors({
  origin:'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan())

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize
});

// Session middleware
app.use(
  session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: false,
      secure: false,
      expires: new Date(Date.now() + (sessionTime)) 
    }
  })
);
sessionStore.sync();

app.use(userRoutes);
app.use(commentRoutes);
app.use(episodeRoutes);

//route to get users
app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//route to get users by id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//route to get comments
app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//route to get episodes
app.get('/episodes', async (req, res) => {
  try {
    const episodes = await Episode.findAll();
    res.json(episodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



sequelize.sync({ alter: true })
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });