"use client";
import React from "react";
import "./index.scss";

const UserDetails = () => {
    const userInfo = {
        name: "Eureka Seken",
        email: "eureka88@email.com",
        company: "Sebo INC.",
        designation: "Clinical Investigator",
        phone: "+62 087867654670",
        country: "Indonesia",
        timeZone: "Jakarta (GMT+7)",
        plan: "Trial + Analytics",
    };

    return (
        <div className="user-details">
            <h1 className="user-details__title">User Details</h1>

            <div className="user-details__card">
                <div className="user-details__header">
                    <div className="user-details__name">{userInfo.name}</div>
                    <div className="user-details__email">{userInfo.email}</div>
                </div>

                <div className="user-details__body">
                    <div className="user-details__field">
                        <span className="user-details__label">Company</span>
                        <span className="user-details__value">
                            {userInfo.company}
                        </span>
                    </div>

                    <div className="user-details__field">
                        <span className="user-details__label">Designation</span>
                        <span className="user-details__value">
                            {userInfo.designation}
                        </span>
                    </div>

                    <div className="user-details__field">
                        <span className="user-details__label">
                            Contact phone
                        </span>
                        <span className="user-details__value">
                            {userInfo.phone}
                        </span>
                    </div>

                    <div className="user-details__field">
                        <span className="user-details__label">Country</span>
                        <span className="user-details__value">
                            {userInfo.country}
                        </span>
                    </div>

                    <div className="user-details__field">
                        <span className="user-details__label">Time Zone</span>
                        <span className="user-details__value">
                            {userInfo.timeZone}
                        </span>
                    </div>

                    <div className="user-details__field">
                        <span className="user-details__label">Plan</span>
                        <span className="user-details__value">
                            {userInfo.plan}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
