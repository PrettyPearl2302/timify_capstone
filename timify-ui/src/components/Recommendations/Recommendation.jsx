import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../state/UserContext.jsx';
import './Recommendation.css';

const Recommendation = () => {
  const user = useContext(UserContext);
  const userId = user.user.id;
  const [podcastGenre, setPodcastGenre] = useState([]);

  useEffect(() => {
    const fetchRatingsbyValue = async () => {
      try {
        const response = await fetch(`http://localhost:3000/rec-ratings/${userId}`);
        const data = await response.json();
        const genres = data.map((index) => index.episode.podcast.genre); 
        console.log(genres);
        setPodcastGenre(genres);
      } catch (error) {
        console.error('Error while fetching ratings', error);
      }
    };

    fetchRatingsbyValue();
  }, [userId]); 

  useEffect(() => {
    const fetchPodcastsByRec = async () => {
      try {
        for (const genre of podcastGenre) {
          const response = await fetch(`http://localhost:5000/api/recommendations?Genre=${genre}`);
          const data = await response.json();
          console.log(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    if (podcastGenre.length > 0) {
      fetchPodcastsByRec();
    }
  }, [podcastGenre]); 
  return <div>Recommendation</div>;
};

export default Recommendation;
