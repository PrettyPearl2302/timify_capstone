import React from "react";
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState , useContext, useRef, useEffect} from "react";
import { UserContext } from '../../state/UserContext.jsx';
import Comments from "../Comments/Comments.jsx";
import "./AudioPlayer.css";

const AudioPlayer = ({ audioUrl, fileType, episodeD}) => {
    const [commentContent, setCommentContent] = useState("")
    const [timestamp, setTimestamp] = useState(null)
    const [commentPosted, setCommentPosted] = useState(false)
    const [audioPlaying, setAudioPlaying] = useState(false)
    const [comments, setComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState([]);
    const audioRef = useRef(null)

    const user = useContext(UserContext);
    const userId = user.user.id; 
    const userName = user.user.username;
    const episodeId = episodeD;

    const handleChange = (event) => {
        setCommentContent(event.target.value)
    };

    const handleTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime;

        const formattedTime = Math.round(currentTime);

        const visibleComments = comments.filter(comment => comment.timestamp <= formattedTime);
          setVisibleComments(visibleComments);

          if (visibleComments.length > 0) {
            setTimestamp(formattedTime);
          }
    }

    const handleAudioPlay = () => {
        setAudioPlaying(true);
      };
    
    const handleAudioPause = () => {
        setAudioPlaying(false);
      };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!audioPlaying)
         {
            return;
         }

        const commentData = {
            content: commentContent,
            userId: userId,
            userName: userName,
            episodeId: episodeId,
            timestamp: timestamp,
        }

        try {
            const response = await fetch("http://localhost:3000/comments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(commentData),
            });

      
            if (response.ok) {
                setCommentPosted(true);
                setCommentContent(""); 
                toast.success('Your comment was shared.', {
                  autoClose: 1300,
                });
            } else {
              console.error("Failed to post comment.");
            }
          } catch (error) {
            console.error("Error while posting comment:", error);
          }
    };

      
      useEffect(() => {

        const fetchCommentsByEpisodeId = async () => {
          try {
            const response = await fetch(`http://localhost:3000/comments/${episodeId}`);
              const data = await response.json();
              setComments(data)
          } catch (error) {
            console.error("Error while fetching comments", error);
          }
        };
  

        fetchCommentsByEpisodeId();
      }, []);

        return (
            <div className="ad-page-holder">    
            <div className="audio-wrapper">    
            <audio className="audio"
             ref={audioRef} 
             controls
             onTimeUpdate={handleTimeUpdate} 
             onPlay={handleAudioPlay}
             onPause={handleAudioPause}
             >
                <source src={audioUrl} type={fileType} />   
            </audio>
            </div>
           
            <div>
                <form className="new-comment-form" onSubmit={handleSubmit}>
                  <div className="comment-box">
                    <p className="comment-text">Leave a comment:</p>
                    <label>
                        <textarea className="actual-box"
                            name="userComment"
                            placeholder={
                                audioPlaying
                                  ? "Your comment goes here..."
                                  : "Please start the audio to leave a comment."
                              }
                            rows={4} cols={40} 
                            value={commentContent}
                            onChange={handleChange}
                            disabled={!audioPlaying}
                        />
                    </label>
                    <button className="buttona" type="submit" disabled={!audioPlaying}>Share</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
            
            <Comments 
              visibleComments={visibleComments}
            />
            </div>
          );
    };

export default AudioPlayer;