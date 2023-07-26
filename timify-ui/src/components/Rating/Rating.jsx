import React, { useState , useContext } from "react";
import { UserContext } from "../../state/UserContext.jsx";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles.jsx";

const Rate = ({episodeId}) => {
	const [rate, setRate] = useState(0);

	const user = useContext(UserContext);
    const userId = user.user.id; 

	const handleRatingChange = (value) => {
		setRate(value);
		alert(`Are you sure you want to give ${value} stars?`);
		sendRatingData(value);
	};

	const sendRatingData = async (value) => {

		try {
			const response = await fetch("http://localhost:3000/ratings", {
			  method: "POST",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify({ ratingValue: value, episodeId, userId }),
			});
	  
			if (response.ok) {
			  console.log("Rating data posted");
			} else {
			  console.error("Failed to post rating data");
			}
		  } catch (error) {
			console.error("Error while posting rating data", error);
		  }
	}

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