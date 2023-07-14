import React, {useState} from 'react'
import "./Home.css"
import PodcastGrid from '../PodcastGrid/PodcastGrid'
import Search from '../Search/Search'

const Home = ({podcastsByGenre, setPodcastsByGenre}) => {
  return (
    <div className='home'>
        <Search />
        <PodcastGrid podcastsByGenre={podcastsByGenre} setPodcastsByGenre={setPodcastsByGenre} />
    </div>
  )
}

export default Home