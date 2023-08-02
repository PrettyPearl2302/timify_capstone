import React, {useEffect, useContext} from 'react'
import { UserContext } from '../../state/UserContext.jsx';
import "./Recommendation.css"

const Recommendation = () => {

    const user = useContext(UserContext);
    const userId = user.user.id; 

    useEffect(() => {
        const fetchRatingsbyValue = async () => {
            try {
                const response = await fetch(`http://localhost:3000/rec-ratings/${userId}`);
                const data = await response.json();
                console.log(data)
            } catch (error) {
                console.error("Error while fetching ratings", error)
            }
        }

        fetchRatingsbyValue();
    }, [])

  return (
    <div>Recommendation</div>
  )
}

export default Recommendation