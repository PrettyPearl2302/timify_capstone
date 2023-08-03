import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './EpisodeDisplay.css'
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Rate from '../Rating/Rating.jsx'
import { AiTwotoneStar } from 'react-icons/ai'
import SideBar from "../SideBar/SideBar";

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
            } else {
              console.error("Failed to fetch rating");
            }
          } catch (error) {
            console.error("Error while fetching rating", error);
          }
        };
        fetchRatingsByEpisodeId();
      }, [episodeIdef]);


      const ratinggg = averageRating;
      const returnedRating = Math.round(ratinggg * 10) / 10 


      return (
        <div>
          <SideBar />
          <div key={episodeInfo.uuid} className="episode-display">
            <div className="flex-container">
              <img src={episodeInfo.imageUrl} alt={episodeInfo.name} className="pd-image" />
              <div>
                <p className="existing-rating"> <AiTwotoneStar className="starrr"/>   {returnedRating}</p>
                <div>
                  <p className="rate-text">Rate this episode:</p>
                  <Rate episodeId={episodeInfo.uuid} />
                </div>
              </div>
            </div>
            <div className="episode-details">
              <div className="text-in">
                <div className="ep-name">{episodeInfo.name}</div>
                <div className="ep-description">{episodeInfo.description} Listen here: </div>
              </div>
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