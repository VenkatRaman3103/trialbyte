"use client";

import React, { useState } from "react";
import {
    Search,
    Users,
    FileText,
    BarChart3,
    AlertTriangle,
    BookOpen,
    MessageSquare,
} from "lucide-react";
import "./index.scss";

const HelpCenter = () => {
    const [activeTab, setActiveTab] = useState("Getting Started");

    const tabs = [
        "Getting Started",
        "Account",
        "Billing",
        "Frequently Asked Questions",
        "Features",
    ];

    const helpSections = [
        {
            icon: <Users className="help-icon" />,
            title: "Memberships",
            description:
                "Access exclusive clinical trial tools and updates with a registered membership.",
            buttonText: "Learn more",
        },
        {
            icon: <FileText className="help-icon" />,
            title: "User Details",
            description:
                "Securely view and update your personal and health-related trial data.",
            buttonText: "Learn more",
        },
        {
            icon: <BarChart3 className="help-icon" />,
            title: "Usage Metrics",
            description:
                "Track your engagement with trial activities and platform features.",
            buttonText: "Learn more",
        },
        {
            icon: <AlertTriangle className="help-icon" />,
            title: "Raise a complaint",
            description:
                "Encountered an issue during your trial experience? We're here to help.",
            buttonText: "Learn more",
        },
        {
            icon: <BookOpen className="help-icon" />,
            title: "Product Manuals",
            description:
                "Browse detailed guides related to trial devices, procedures, or medications.",
            buttonText: "Learn more",
        },
        {
            icon: <MessageSquare className="help-icon" />,
            title: "Write a suggestion",
            description:
                "Your feedback helps us improve our trials and platform experience.",
            buttonText: "Learn more",
        },
    ];

    return (
        <div className="help-center">
            <div className="help-center__container">
                <div className="help-center__header">
                    <h1 className="help-center__title">How we can help you?</h1>
                    <div className="help-center__search">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search the Helpcenter"
                            className="search-input"
                        />
                        <button className="search-dropdown">
                            <svg
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                            >
                                <path
                                    d="M1 1.5L6 6.5L11 1.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <nav className="help-center__nav">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`nav-tab ${activeTab === tab ? "nav-tab--active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <div className="help-center__content">
                    <div className="help-grid">
                        {helpSections.map((section, index) => (
                            <div key={index} className="help-card">
                                <div className="help-card__icon">
                                    {section.icon}
                                </div>
                                <h3 className="help-card__title">
                                    {section.title}
                                </h3>
                                <p className="help-card__description">
                                    {section.description}
                                </p>
                                <button className="help-card__button">
                                    {section.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
