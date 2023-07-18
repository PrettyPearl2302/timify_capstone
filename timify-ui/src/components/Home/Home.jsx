import React, { useContext } from 'react'
import "./Home.css"
import PodcastGrid from '../PodcastGrid/PodcastGrid'
import { PodcastContext } from '../../state/PodcastContext'

const Home = () => {
  const { podcastsByGenre, setPodcastsByGenre } = useContext(PodcastContext);

  return (
    <div className='home'>
        <PodcastGrid podcastsByGenre={podcastsByGenre} setPodcastsByGenre={setPodcastsByGenre} />
    </div>
  )
}

export default Home
