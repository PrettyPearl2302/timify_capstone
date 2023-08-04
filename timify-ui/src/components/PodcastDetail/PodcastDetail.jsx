import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../state/UserContext";
import { AiOutlineLoading } from "react-icons/ai";
import { useParams } from "react-router-dom";
import EpisodeDetail from "../EpisodeDetail/EpisodeDetail";
import SideBar from "../SideBar/SideBar";
import './PodcastDetail.css'


function PodcastDetail () {

    const [podcastInfo, setPodcastInfo] = useState([])
    const [episodes, setEpisodes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [bookmarkPosted, setBookmarkPosted] = useState(false)

    const user = useContext(UserContext)
    const userId = user.user.id


    const {id} = useParams();

    useEffect(() => {
        const fetchPodcastInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/podcast?id=${id}`);
                setPodcastInfo(response.data);
                setEpisodes(response.data.episodes)
                setIsLoading(false)
            }
            catch (err) {
                console.error(err);
                setIsLoading(false)
                
            }
        };
        fetchPodcastInfo();
    }, [id]);

    const onButtonClick = async (event) => {
        event.preventDefault();

        const bookmarkedData = {
            podcastId: podcastInfo.uuid,
            authorName: podcastInfo.authorName,
            name: podcastInfo.name,
            genre: podcastInfo.genres[0],
            description: podcastInfo.description,
            imageUrl: podcastInfo.imageUrl,
            userId: userId
        }

        try {
            const response = await fetch("http://localhost:3000/bookmarks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookmarkedData),
            })
            console.log(response)

            if (response.ok) {
                setBookmarkPosted(true)
                toast.success('Podcast saved successfully', {
                    autoClose: 1300,
                })
            } else {
                console.error("Failed to post bookmark.");
              }
        } catch (error) {
            console.error("Error while posting bookmark:", error);
        }
    }

    if (isLoading) {
        return <div className='loading-state'>
          <div><AiOutlineLoading /></div>
          Loading...</div>
      }

    return (
        <div>
            <SideBar />
            <div key={podcastInfo.uuid} className="podcast-display">
                <img src={podcastInfo.imageUrl} alt={podcastInfo.name} className='pd-image'/>
                <div className="pd-details">
                    <div className="pd-name">{podcastInfo.name}</div>
                    <div className="pd-author-name">{podcastInfo.authorName}</div>
                    <div className="pd-description">{podcastInfo.description}</div>
                </div>
                <button onClick={onButtonClick}>Bookmark</button>
            </div>
            

            <div className="episodes">
                <div className="episode-on-pd"> 
                    <div className="episode-header">Episodes</div>
                    {episodes.map((episode => (
                        <EpisodeDetail key={episode.uuid} episode={episode} />
                    )))}
                </div>      
            </div>

            
        </div>
    );
 }
   


export default PodcastDetail