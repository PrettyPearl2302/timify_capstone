import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './EpisodeDisplay.css'
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Rate from '../Rating/Rating.jsx'
import { Container } from "../Rating/RatingStyles.jsx";

function EpisodeDisplay () {

    const [episodeInfo, setEpisodeInfo] = useState([])
    const [averageRating, setAverageRating] = useState(0);

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

    const episodeIdef = episodeInfo.uuid;


    useEffect(() => {

        const fetchRatingsByEpisodeId = async () => {
          try {
            const response = await fetch(`http://localhost:3000/ratings/${episodeIdef}`);
            if (response.ok) {
              const averageData = await response.json();
              setAverageRating(averageData)
              console.log(averageRating)
            } else {
              console.error("Failed to fetch rating");
            }
          } catch (error) {
            console.error("Error while fetching rating", error);
          }
        };
  

        fetchRatingsByEpisodeId();
      }, [episodeIdef]);


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
                <Container>
                    <p>Average Rating:{averageRating}</p>
                    </Container>
                <div>
                <p>Rate this episode:</p>
                <Rate episodeId={episodeInfo.uuid}/>
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