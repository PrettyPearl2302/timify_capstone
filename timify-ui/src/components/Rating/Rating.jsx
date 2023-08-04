import { useState , useContext, useEffect } from "react";
import { UserContext } from "../../state/UserContext.jsx";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";

const Rate = ({episodeId}) => {
	const [rate, setRate] = useState(0);

	const user = useContext(UserContext);
    const userId = user.user.id; 

	useEffect(() => {
		const fetchRating = async () => {
		  try {
			const response = await fetch(`http://localhost:3000/ratings`);
	
			if (response.ok) {
			  const data = await response.json();
			  if (data.ratingValue) {
				setRate(data.ratingValue);
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
		const hasRatedPreviously = rate > 0;

		if (hasRatedPreviously) {
			alert(`You have previously rated this episode. Are you sure you want to update it to ${value} stars?`);
		} 

		try {
			const response = await fetch("http://localhost:3000/ratings", {
			  method: "POST",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify({ ratingValue: value, episodeId, userId }),
			});
	  
			if (response.ok) {
				setRate(value);
			} else {
			  console.error("Failed to post rating data");
			}
		  } catch (error) {
			console.error("Error while posting rating data", error);
		  }

	};


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