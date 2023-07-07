import React from 'react'
import { AiOutlineLoading } from "react-icons/ai"
import "./PodcastGrid.css"
import PodcastCard from '../PodcastCard/PodcastCard'

const PodcastGrid = ({ podcasts, setPodcasts }) => {

  return (
    <>
        <h3 className='podcast-header'>Podcasts</h3>
        <div className="podcast-grid">
            {!setPodcasts ? (
                podcasts.podcasts.map((podcast, i) => (
                    <PodcastCard podcast={podcast} key={i} />
                ))
            ) : (
                <div className="loading-spinner">
                    <AiOutlineLoading className="spinner" />
                </div>
            )}
        </div>
    </>
  )
}

export default PodcastGrid