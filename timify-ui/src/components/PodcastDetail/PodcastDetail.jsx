import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './PodcastDetail.css'

function PodcastDetail () {

    const [podcastInfo, setPodcastInfo] = useState([])

    const {id} = useParams();

    useEffect(() => {
        const fetchPodcastInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/podcast?id=${id}`);
                setPodcastInfo(response.data);
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

            
        </div>
    );
 }
   


export default PodcastDetail