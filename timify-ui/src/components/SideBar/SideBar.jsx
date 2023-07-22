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
                <div> <Link to="/my-profile/:id" style={{ textDecoration: "none", color: "inherit" }}>my profile</Link></div>
                <div><Link to="/" style={{ textDecoration: "none", color: "inherit" }}>home</Link></div>
                <div>settings</div>
                <div>my notes</div>
                <div>bookmarked</div>
			</div>
		</aside>
	)
}