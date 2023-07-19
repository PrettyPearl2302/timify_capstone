import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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
            
        <div key={podcastInfo.uuid}>{podcastInfo.name}</div>
            
        </div>
    );
 }
   


export default PodcastDetail