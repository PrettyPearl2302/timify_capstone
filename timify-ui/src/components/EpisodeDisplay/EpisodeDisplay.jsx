import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './EpisodeDisplay.css'
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Rate from '../Rating/Rating.jsx'

function EpisodeDisplay () {

    const [episodeInfo, setEpisodeInfo] = useState([])

    const {id} = useParams();

    useEffect(() => {
        const fetchEpisodeInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/podcast/episode?id=${id}`);
                setEpisodeInfo(response.data);
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchEpisodeInfo();
    }, [id]);


    return (
        <div>
            <div key={episodeInfo.uuid} className="episode-display">  
                  <img src={episodeInfo.imageUrl} alt={episodeInfo.name} className="pd-image" />
                <div className="episode-details">  
                    <div className="text-in">
                    <div className="ep-name">{episodeInfo.name}</div>
                    <div className="ep-author-name">{episodeInfo.authorName}</div>
                    <div className="ep-description">{episodeInfo.description}</div>
                    <div className="ep-genre">{episodeInfo.genre}</div>
                    <div className="ep-series-type">{episodeInfo.seriesType}</div>
                    </div>
                </div>
                <div>
                <p>Rate this episode:</p>
                <Rate />
                </div>
                <AudioPlayer
                    audioUrl={episodeInfo.audioUrl}
                    fileType={episodeInfo.fileType}
                    episodeD={episodeInfo.uuid}
                    />
            </div>            
        </div>
    );
 }
   


export default EpisodeDisplay