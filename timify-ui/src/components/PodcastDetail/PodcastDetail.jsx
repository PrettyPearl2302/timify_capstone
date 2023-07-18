import { useContext, useEffect } from "react";
import { PodcastContext } from "../../state/PodcastContext";
import { useParams } from "react-router-dom";

function PodcastDetail () {
    const {selectedPodcast, selectPodcast, podcastsByGenre} = useContext(PodcastContext); 
    const {id} = useParams();

    
    useEffect(() => {
        const podcast = podcastsByGenre.find((podcast) => podcast.uuid === id);
        selectPodcast(podcast);
    }, [id, selectPodcast, podcastsByGenre]);
    if(!selectedPodcast) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <img src={selectedPodcast.imageUrl} alt={selectedPodcast.name} className='cover-image'/>
            <h2>{selectedPodcast.name}</h2>
            <p>{selectedPodcast.description}</p>
            <p>{selectedPodcast.authorName}</p>
            <p>{selectedPodcast.datePublished}</p>
            <p>{selectedPodcast.genre}</p>
        </div>
    )
}


export default PodcastDetail