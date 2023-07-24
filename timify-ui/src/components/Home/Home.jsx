import React, { useState, useEffect, useContext} from 'react'
import { UserContext } from '../../state/UserContext.jsx';
import "./Home.css"
import Search from '../Search/Search';
import PodcastGrid from '../PodcastGrid/PodcastGrid'
import { Link } from 'react-router-dom';
import Hero from '../Hero/Hero.jsx';

const Home = () => {
  const {user, updateUser} = useContext(UserContext)
  const [podcastsByGenre, setPodcastsByGenre] = useState([]);

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

      } catch(error) {
        console.error('Error displaying podcasts', error)
      }
    }
    fetchPodcasts();
  }, []);

  const handleLogout = () => {
    updateUser(null)
  }

  return (
    <div className='home'>
       <Hero />
        <Search />
          <div className="user-info">
              {user ? (
                <>
                <Link to="/my-profile/:id">
                  <span>Hi, {user.username}! |</span>
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