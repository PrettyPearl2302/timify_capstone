import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EpisodeDetail from "../EpisodeDetail/EpisodeDetail";
import './PodcastDetail.css'

function PodcastDetail () {

    const [podcastInfo, setPodcastInfo] = useState([])
    const [episodes, setEpisodes] = useState([])

    const {id} = useParams();

    useEffect(() => {
        const fetchPodcastInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/podcast?id=${id}`);
                setPodcastInfo(response.data);
                console.log(response.data)
                setEpisodes(response.data.episodes)
                console.log(response.data.genres)
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchPodcastInfo();
    }, [id]);


    return (
        <div>
            <div key={podcastInfo.uuid} className="podcast-display">
                <img src={podcastInfo.imageUrl} alt={podcastInfo.name} className='pd-image'/>
                <div className="pd-name">{podcastInfo.name}</div> 
                <div className="pd-author-name">{podcastInfo.authorName}</div> 
                <div className="pd-description">{podcastInfo.description}</div> 
                <div className="pd-genre">{podcastInfo.genre}</div>
                <div className="pd-series-type">{podcastInfo.seriesType}</div>
            </div>

            <div className="episodes">
                <div>
                    {episodes.map((episode => (
                        <EpisodeDetail key={episode.uuid} episode={episode} />
                        // <div key={episode.uuid}>
                        //     <div>{episode.name}</div>
                        // </div>
                    )))}
                </div>      
            </div>

            
        </div>
    );
 }
   


export default PodcastDetail