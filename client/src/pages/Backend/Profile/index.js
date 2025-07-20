"use client";
import React, { useState } from "react";
import "./index.scss";

const Profile = () => {
    const [userData, setUserData] = useState({
        name: "James cameron",
        email: "Jamescame22@email.com",
        designation: "Super Admin",
        phone: "+62 087867654670",
        access: "All",
    });

    const [passwordData, setPasswordData] = useState({
        email: "eureka88@email.com",
    });

    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to sign out?")) {
            console.log("User signed out");
            alert("Signed out successfully!");
        }
    };

    const handleEmailChange = () => {
        const newEmail = window.prompt(
            "Enter new email address:",
            passwordData.email,
        );
        if (newEmail && newEmail !== passwordData.email) {
            setPasswordData((prev) => ({ ...prev, email: newEmail }));
            console.log("Email changed to:", newEmail);
            alert("Email address updated successfully!");
        }
    };

    const handlePasswordChange = () => {
        const currentPassword = window.prompt("Enter current password:");
        if (currentPassword) {
            const newPassword = window.prompt("Enter new password:");
            if (newPassword) {
                const confirmPassword = window.prompt("Confirm new password:");
                if (newPassword === confirmPassword) {
                    console.log("Password changed successfully");
                    alert("Password updated successfully!");
                } else {
                    alert("Passwords do not match!");
                }
            }
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-info-section">
                <div className="profile-header">
                    <h1 className="profile-title">Profile</h1>
                    <button className="sign-out-btn" onClick={handleSignOut}>
                        Sign out
                    </button>
                </div>

                <div className="user-info">
                    <h2 className="profile-name">{userData.name}</h2>
                    <p className="profile-email">{userData.email}</p>
                </div>

                <div className="profile-details">
                    <div className="detail-row">
                        <span className="detail-label">Designation</span>
                        <span className="detail-value designation-value">
                            {userData.designation}
                        </span>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">Contact phone</span>
                        <span className="detail-value phone-value">
                            {userData.phone}
                        </span>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">Access</span>
                        <span className="detail-value access-value">
                            {userData.access}
                        </span>
                    </div>
                </div>
            </div>

            <div className="password-change-section">
                <div className="password-section">
                    <h2 className="section-title">Password Change</h2>

                    <div className="password-details">
                        <div className="password-row">
                            <div className="password-info">
                                <span className="password-label">
                                    Email Address
                                </span>
                                <span className="password-email">
                                    {passwordData.email}
                                </span>
                            </div>
                            <button
                                className="change-btn email-change-btn"
                                onClick={handleEmailChange}
                            >
                                Change
                            </button>
                        </div>

                        <div className="password-row">
                            <div className="password-info">
                                <span className="password-label">Password</span>
                                <span className="password-dots">
                                    ••••••••••••••••••
                                </span>
                            </div>
                            <button
                                className="change-btn password-change-btn"
                                onClick={handlePasswordChange}
                            >
                                Change
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
