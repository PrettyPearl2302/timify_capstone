import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles.jsx";

const Rate = () => {
	const [rate, setRate] = useState(0);
	return (
		<Container>
			{[...Array(5)].map((item, index) => {
				const givenRating = index + 1;
				console.log("givenRating:", givenRating, "rate:", rate);
				return (
					<label key={index}>
						<Radio
							type="radio"
							value={givenRating}
							onClick={() => {
								setRate(givenRating);
								alert(
									`Are you sure you want to give
									${givenRating} stars ?`
								);
							}}
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
