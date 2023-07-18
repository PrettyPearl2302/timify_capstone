import React, { useContext } from 'react'
import "./Home.css"
import PodcastGrid from '../PodcastGrid/PodcastGrid'

const Home = ({podcastsByGenre, setPodcastsByGenre}) => {

  console.log (podcastsByGenre)

  return (
    <div className='home'>
        <PodcastGrid podcastsByGenre={podcastsByGenre} setPodcastsByGenre={setPodcastsByGenre} />
    </div>
  )
}

export default Home
