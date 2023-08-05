import React from "react";
import { Link } from "react-router-dom";

const BookmarkCard = ({ podcast }) => {
  return (
    <Link
      to={`/podcast/${podcast.podcastId}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="podcast-card-container">
        <div key={podcast.podcastId} className="podcast-each">
          <img
            src={podcast.imageUrl}
            alt={podcast.name}
            className="cover-image"
          />
          <div className="podcast-text">
            <p>{podcast.name}</p>
            <p>{podcast.authorName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookmarkCard;
