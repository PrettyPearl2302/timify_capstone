import React from 'react'
import { AiOutlineLoading } from "react-icons/ai"
import "./PodcastGrid.css"
import PodcastCard from '../PodcastCard/PodcastCard'

const PodcastGrid = ({ podcasts }) => {

  return (
    <>
        <h3 className='podcast-header'>Podcasts</h3>
        <div className="podcast-grid">
            { podcasts.map((podcast, i) => (
                    <PodcastCard podcast={podcast} key={i} />
                )
            )}
        </div>
    </>
  )
}

export default PodcastGrid