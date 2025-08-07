import React from "react";
import "./index.css";
import { FaSearch, FaEnvelope, FaUser } from "react-icons/fa";

const NavBarDrugTab = () => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <div className="logo">🌿</div>

                <div className="nav-item">
                    <span className="icon">📊</span>
                    <span className="label">Dashboard</span>
                </div>

                <div className="nav-item">
                    <FaSearch className="icon" />
                    <span className="label">Drug Search</span>
                </div>

                <div className="nav-item active">
                    <span className="icon">📅</span>
                    <span className="label">Drugs</span>
                </div>
            </div>

            <div className="navbar-middle">
                <input
                    type="text"
                    placeholder="Search.."
                    className="search-input"
                />
                <button className="search-btn">Search</button>
            </div>

            <div className="navbar-right">
                <button className="icon-btn">
                    <FaEnvelope />
                </button>
                <button className="icon-btn">
                    <FaUser />
                </button>
                <div className="username">James cameron</div>
            </div>
        </div>
    );
};

export default NavBarDrugTab;
