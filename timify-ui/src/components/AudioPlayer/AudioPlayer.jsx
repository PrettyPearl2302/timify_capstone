import React, { useState , useContext } from "react";
import { UserContext } from '../../state/UserContext.jsx';
import "./AudioPlayer.css";

const AudioPlayer = ({ audioUrl, fileType, episodeId}) => {
    const [commentContent, setCommentContent] = useState("")
    const user = useContext(UserContext);
    const userId = user.id; 
    const episodeId = {episodeId}

    const handleChange = (event) => {
        setCommentContent(event.target.value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const commentData = {
            content: commentContent,
            userId: userId,
            episodeId: episodeId,
        }

        try {
            const response = await fetch("http://localhost:3000/comments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(commentData),
            });
      
            if (response.ok) {
              // Comment successfully posted
              console.log("Comment posted successfully!");
            } else {
              // Error handling in case of a failed POST request.
              console.error("Failed to post comment.");
            }
          } catch (error) {
            console.error("Error while posting comment:", error);
          }
        };
    


        return (
            <div>
            <div className="audio-wrapper">
              <audio controls>
                <source src={audioUrl} type={fileType} />
              </audio>
            </div>
        
            <div className="comment block">
                <form className="new-comment-form" onSubmit={handleSubmit}>
                    <label>
                        Leave a comment:
                        <textarea 
                            name="userComment"
                            placeholder="Your comment goes here..."
                            rows={4} cols={40} 
                            value={commentContent}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Post Comment</button>
                </form>
            </div>
            </div>
          );
    };

export default AudioPlayer;