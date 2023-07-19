import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
                <img src={podcastInfo.imageUrl} alt={podcastInfo.name} className='podcast-image'/>
                <div className="podcast-display-name">{podcastInfo.name}</div> 
                <div className="podcast-display-author-name">{podcastInfo.authorName}</div> 
                <div className="podcast display description">{podcastInfo.description}</div> 
                <div className="podcast-display genre">{podcastInfo.genre}</div>
                <div className="podcast-display-series-type">{podcastInfo.seriesType}</div>


            </div>

            
        </div>
    );
 }
   


export default PodcastDetail