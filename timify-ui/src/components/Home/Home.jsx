import React, { useContext } from 'react'
import "./Home.css"
import PodcastGrid from '../PodcastGrid/PodcastGrid'
import Search from '../Search/Search'
import { PodcastContext } from '../../state/PodcastContext'

const Home = ({podcastsByGenre, setPodcastsByGenre}) => {
  // const { podcastsByGenre, setPodcastsByGenre } = useContext(PodcastContext);

  return (
    <div className='home'>
        <Search />
        <PodcastGrid podcastsByGenre={podcastsByGenre} setPodcastsByGenre={setPodcastsByGenre} />
    </div>
  )
}

export default Home
