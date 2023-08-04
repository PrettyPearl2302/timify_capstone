import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../state/UserContext.jsx';
import './Recommendation.css';
import RecGrid from '../RecGrid/RecGrid.jsx';

const Recommendation = () => {
  const user = useContext(UserContext);
  const userId = user.user.id;
  const [podcastGenre, setPodcastGenre] = useState([]);
  const [recommendedPodcasts, setRecommendedPodcasts] = useState([]);
  const [refPodcastName, setrefPodcastName] = useState([]);

  useEffect(() => {
    const fetchRatingsbyValue = async () => {
      try {
        const response = await fetch(`http://localhost:3000/rec-ratings/${userId}`);
        const data = await response.json();
        const genres = data.map((index) => index.episode.podcast.genre);
        const refName = data.map((index) => index.episode.podcast.name);
        const uniqueRefNames = Array.from(new Set(refName))
        setrefPodcastName(uniqueRefNames)
        const uniqueGenres = Array.from(new Set(genres))
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
        }
        setRecommendedPodcasts(allRecommendedPodcasts)
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
   <h2 className='recommendation-heading'> Recommended for You</h2>
    <RecGrid recPodcasts={recommendedPodcasts} refPodcastName={refPodcastName}
    />
  </div>
  
  
  )
};

export default Recommendation;
