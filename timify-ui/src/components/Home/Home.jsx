import React, {useState} from 'react'
import "./Home.css"
import PodcastGrid from '../PodcastGrid/PodcastGrid'

const Home = ({podcasts, setPodcasts}) => {
  return (
    <div className='home'>
        <PodcastGrid podcasts={podcasts} setPodcasts={setPodcasts} />
    </div>
  )
}

export default Home