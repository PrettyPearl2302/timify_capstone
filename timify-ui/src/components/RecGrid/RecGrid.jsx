import React from 'react'
import RecCard from '../RecCard/RecCard'

const RecGrid = ({recPodcasts}) => {

  return (
    <div>
    <div className='podcast-grid'>
        {recPodcasts && recPodcasts.map((podcast) => (
        <RecCard key={podcast.uuid} podcast={podcast}/>
    ))}
    </div>
    </div>

)
}


export default RecGrid