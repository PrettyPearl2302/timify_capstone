import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../state/UserContext";
import BookmarkGrid from "../BookmarkGrid/BookmarkGrid";
import "./Bookmarks.css";
import SideBar from "../SideBar/SideBar";

const Bookmarks = () => {
  const user = useContext(UserContext);
  const userId = user.user.id;
  const [bookmarkedPodcasts, setBookmarkedPodcasts] = useState([]);

  useEffect(() => {
    const fetchBookmarksByUserId = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/bookmarks/${userId}`
        );
        const data = await response.json();
        setBookmarkedPodcasts(data);
      } catch (error) {
        console.error("Error while fetching ratings", error);
      }
    };
    fetchBookmarksByUserId();
  });

  return (
    <div>
      <SideBar />
      <div className="bookmark-display">
        <h1 className="bookmark-header">My Bookmarks</h1>
        <BookmarkGrid bookmarked={bookmarkedPodcasts} />
      </div>
    </div>
  );
};

export default Bookmarks;
