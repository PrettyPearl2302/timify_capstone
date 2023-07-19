import React, { useState, useEffect } from 'react'
import "./Home.css"
import Search from '../Search/Search';
import PodcastGrid from '../PodcastGrid/PodcastGrid'

const Home = () => {

  const [podcastsByGenre, setPodcastsByGenre] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/home');
        const data = await response.json();
        setPodcastsByGenre(data);
    
      } catch(error) {
        console.error('Error displaying podcasts', error)
      }
    }
    fetchPodcasts();
  }, []);

  return (
    <div className='home'>
      <Search />
        <PodcastGrid podcastsByGenre={podcastsByGenre} setPodcastsByGenre={setPodcastsByGenre} />
    </div>
  )
}

export default Home
