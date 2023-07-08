import React, {useState} from 'react'
import "./Home.css"
import PodcastGrid from '../PodcastGrid/PodcastGrid'
import Search from '../Search/Search'

const Home = ({podcasts, setPodcasts}) => {
  return (
    <div className='home'>
        <Search />
        <PodcastGrid podcasts={podcasts} setPodcasts={setPodcasts} />
    </div>
  )
}

export default Home