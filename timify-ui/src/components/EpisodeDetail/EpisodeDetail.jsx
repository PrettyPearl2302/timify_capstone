import React from 'react'
import { Link } from 'react-router-dom'
import "./EpisodeDetail.css"

const EpisodeDetail = ({episode}) => {

  const episodeId = episode.uuid;

  const handleClick = async (event) => {
    event.preventDefault();

    const episodeData = {
      uuid: episodeId,
    }

    console.log(episodeData)

    try {
      const response = await fetch("http://localhost:3000/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(episodeData),
      });

      if (response.ok) {
        console.log("Episode data posted");
      } else {
        console.error("Failed to post episode");
      }
    } catch (error) {
      console.error("Error while posting episode data", error);
    }
  };

  return (
    <div onClick={handleClick} className='episode-each'>
      <Link
        to={`/podcast/episode/${episode.uuid}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <p className="episode-info">{episode.name}</p>
      </Link>
      <p className="episode-info">{episode.episodeNumber}</p>
      <p className="episode-info">{episode.duration}</p>
    </div>
  );
}

export default EpisodeDetail