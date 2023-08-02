import React from 'react'
import RecCard from '../RecCard/RecCard'

const RecGrid = ({recPodcasts}) => {

  return (
    <div>
    <div className='RecGrid'>
        {recPodcasts && recPodcasts.map((newPodcasts, index) => (
            <div key={index} className='podcast-grid'>
                {newPodcasts.map((podcast) => (
                      <RecCard key={podcast.uuid} podcast={podcast}/>
                ))}
            </div>
        ))}
    </div>
    </div>

)
}


export default RecGrid