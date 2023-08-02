import React, { useState, useEffect, useContext} from 'react'
import { UserContext } from '../../state/UserContext.jsx';
import "./Home.css"
import Search from '../Search/Search';
import PodcastGrid from '../PodcastGrid/PodcastGrid'
import { Link } from 'react-router-dom';
import Hero from '../Hero/Hero.jsx';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const Home = () => {
  const {user, updateUser} = useContext(UserContext)
  const [podcastsByGenre, setPodcastsByGenre] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/home');
        const data = await response.json();
        
        const filteredData = {};

        for (const Genre in data) {
          const genrePodcasts = data[Genre];

          const filteredGenrePodcasts = genrePodcasts.filter(podcast => {
            const hasCoverImage = podcast.imageUrl !== undefined && podcast.imageUrl !== null;

            return hasCoverImage;
          });

          filteredData[Genre] = filteredGenrePodcasts;
        }
        setPodcastsByGenre(filteredData)
        setIsLoading(false)

      } catch(error) {
        console.error('Error displaying podcasts', error)
        setIsLoading(false);
      }
    }
    fetchPodcasts();
  }, []);

  const handleLogout = () => {
    updateUser(null)
  }

  if (isLoading) {
    return <div className='loading-state'>
      <div><AiOutlineLoading3Quarters /></div>
      Loading...</div>
  }

  return (
    <div className='home'>
       <Hero />
        <Search />
          <div className="user-info">
              {user ? (
                <>
                <Link to="/my-profile/:id" style={{ textDecoration: "none", color: "inherit" }}>
                  <span className='user-home'>Hi, {user.username}! | </span>
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
      <PodcastGrid podcastsByGenre={podcastsByGenre} setPodcastsByGenre={setPodcastsByGenre} />
    </div>
  )
}

export default Home