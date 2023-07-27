import React, { useState , useContext, useEffect } from "react";
import { UserContext } from "../../state/UserContext.jsx";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles.jsx";

const Rate = ({episodeId}) => {
	const [rate, setRate] = useState(0);
	const [userRated, setUserRated] = useState(false);
	const [disableRating, setDisableRating] = useState(false);

	const user = useContext(UserContext);
    const userId = user.user.id; 

	useEffect(() => {
		const fetchRating = async () => {
		  try {
			const response = await fetch(`http://localhost:3000/ratings`);
	
			if (response.ok) {
			  const data = await response.json();
			  if (data.ratingValue) {
				setUserRated(true);
				setRate(data.ratingValue);
				setDisableRating(true); // Disable rating if user has already rated
			  }
			} else {
			  console.error("Failed to fetch rating data");
			}
		  } catch (error) {
			console.error("Failed to fetch rating data");
		  }
		};
	
		fetchRating();
	  }, [episodeId]);

	
	const handleRatingChange = async (value) => {

		if (userRated) {
			alert(`You cannot rate this episode because you have rated it before`);
			return;
		}
		// setRate(value);
		// alert(`Are you sure you want to give ${value} stars?`);
		// sendRatingData(value);

		alert(`Are you sure you want to give ${value} stars?`);
        setRate(value);

		try {
			const response = await fetch("http://localhost:3000/ratings", {
			  method: "POST",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify({ ratingValue: value, episodeId, userId }),
			});
	  
			if (response.ok) {
				setUserRated(true);
			  console.log("Rating data posted");
			} else {
			  console.error("Failed to post rating data");
			}
		  } catch (error) {
			console.error("Error while posting rating data", error);
		  }

	};

	// const sendRatingData = async (value) => {

		
	// }

	return (
		<Container>
			{[...Array(5)].map((item, index) => {
				const givenRating = index + 1;
				return (
					<label key={index}>
						<Radio
							type="radio"
							value={givenRating}
							onClick={() => handleRatingChange(givenRating)}
							disabled={disableRating}
						/>
						<Rating>
							<FaStar
								color={
									givenRating < rate || givenRating === rate
										? "ffae42"
										: "rgb(192,192,192)"
								}
							/>
						</Rating>
					</label>
				);
			})}
		</Container>
	);
};

export default Rate;