import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './EpisodeDisplay.css'

function EpisodeDisplay () {

    const [episodeInfo, setEpisodeInfo] = useState([])

    const {id} = useParams();

    useEffect(() => {
        const fetchEpisodeInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/podcast/episode?id=${id}`);
                setEpisodeInfo(response.data);
                console.log(response)
                console.log(setEpisodeInfo)
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchEpisodeInfo();
    }, [id]);


    return (
        <div>
            <div key={episodeInfo.uuid} className="podcast-display">
            <img src={episodeInfo.imageUrl} alt={episodeInfo.name} className='pd-image'/>
                <audio controls>
                  <source src={episodeInfo.audioUrl} type={episodeInfo.fileType} />
                </audio>
                <div className="pd-name">{episodeInfo.name}</div> 
                <div className="pd-author-name">{episodeInfo.authorName}</div> 
                <div className="pd-description">{episodeInfo.description}</div> 
                <div className="pd-genre">{episodeInfo.genre}</div>
                <div className="pd-series-type">{episodeInfo.seriesType}</div>
            </div>

            
        </div>
    );
 }
   


export default EpisodeDisplay