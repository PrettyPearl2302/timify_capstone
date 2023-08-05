import React, { useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import "./SideBar.css"
import { Link } from "react-router-dom"

export default function SideBar() {
	const [isOpen, setIsOpen] = useState(false)

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<aside className={`sidebar ${isOpen ? "open" : ""}`}>
			<div className="toggle-btn" onClick={handleToggle}>
				{isOpen ? <RxHamburgerMenu className="arrow" /> : <RxHamburgerMenu className="arrow" />}
			</div>
			<div className="sidebar-content">
				<div className="header-sidebar">timify +</div>
                <div className="my-profile"> <Link to="/my-profile" style={{ textDecoration: "none", color: "inherit" }}>my profile</Link></div>
                <div className="homeee"><Link to="/" style={{ textDecoration: "none", color: "inherit" }}>home</Link></div>
                <div className="settings">settings</div>
                <div className="my-notes">my notes</div>
                <div className="bookmarked"><Link to="/my-bookmarks" style={{ textDecoration: "none", color: "inherit" }}>bookmarked</Link></div>
			</div>
		</aside>
	)
}