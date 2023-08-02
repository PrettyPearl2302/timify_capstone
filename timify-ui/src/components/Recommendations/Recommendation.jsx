import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../state/UserContext.jsx';
import './Recommendation.css';
import RecGrid from '../RecGrid/RecGrid.jsx';

const Recommendation = () => {
  const user = useContext(UserContext);
  const userId = user.user.id;
  const [podcastGenre, setPodcastGenre] = useState([]);
  const [recommendedPodcasts, setRecommendedPodcasts] = useState([]);

  useEffect(() => {
    const fetchRatingsbyValue = async () => {
      try {
        const response = await fetch(`http://localhost:3000/rec-ratings/${userId}`);
        const data = await response.json();
        const genres = data.map((index) => index.episode.podcast.genre);
        const uniqueGenres = Array.from(new Set(genres))
        console.log(uniqueGenres)
        console.log(genres)
        setPodcastGenre(uniqueGenres);
      } catch (error) {
        console.error('Error while fetching ratings', error);
      }
    };

    fetchRatingsbyValue();
  }, [userId]); 

  useEffect(() => {
    const fetchPodcastsByRec = async () => {
      try {

        const allRecommendedPodcasts = []

        for (const genre of podcastGenre) {
          const response = await fetch(`http://localhost:5000/api/recommendations?Genre=${genre}`);
          const data = await response.json()
          allRecommendedPodcasts.push(data.podcastSeries)
          console.log(data.podcastSeries)
        }
        setRecommendedPodcasts(allRecommendedPodcasts)
        console.log(allRecommendedPodcasts)
      } catch (err) {
        console.error(err);
      }
    };
  
    if (podcastGenre.length > 0) {
      fetchPodcastsByRec();
    }
  }, [podcastGenre]); 




  return ( 
  <div>
  <RecGrid recPodcasts={recommendedPodcasts} />
  </div>
  
  )
};

export default Recommendation;
