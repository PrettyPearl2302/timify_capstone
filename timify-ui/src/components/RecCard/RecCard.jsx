import React, { useState } from "react";
import { Link } from "react-router-dom";

const RecCard = ({ podcast }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Link
      to={`/podcast/${podcast.uuid}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="podcast-card-container">
        <div
          key={podcast.uuid}
          className="podcast-each"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
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
        {showTooltip && <div className="tooltip"> {podcast.description} </div>}
      </div>
    </Link>
  );
};

export default RecCard;
