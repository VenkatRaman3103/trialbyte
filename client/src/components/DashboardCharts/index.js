import React from "react";
import "./index.scss";

const DashboardCharts = () => {
    // Sample data for the bar chart
    const registrationData = [
        { month: "Jan", value: 13 },
        { month: "Feb", value: 14 },
        { month: "Mar", value: 15 },
        { month: "Apr", value: 20, highlight: true, label: "78 K" },
        { month: "May", value: 18 },
        { month: "June", value: 15 },
        { month: "July", value: 15 },
    ];

    // Calculate the maximum value for scaling
    const maxValue = Math.max(...registrationData.map((item) => item.value));

    return (
        <div className="dashboard">
            {/* New Registration Chart */}
            <div className="chart-container bar-char">
                <div className="chart-header">
                    <h3 className="chart-title">New Registration</h3>
                    <button className="menu-button">⋯</button>
                </div>
                <div className="bar-chart">
                    <div className="y-axis">
                        <div className="y-label">30</div>
                        <div className="y-label">20</div>
                        <div className="y-label">15</div>
                        <div className="y-label">10</div>
                        <div className="y-label">5</div>
                        <div className="y-label">0</div>
                    </div>
                    <div className="bars-container">
                        {registrationData.map((item, index) => (
                            <div key={index} className="bar-wrapper">
                                <div className="bar-container">
                                    {item.highlight && (
                                        <div className="value-label">
                                            {item.label}
                                        </div>
                                    )}
                                    <div
                                        className={`bar ${item.highlight ? "highlighted" : ""}`}
                                        style={{
                                            height: `${(item.value / maxValue) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                                <div className="x-label">{item.month}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Trial List Donut Chart */}
            <div className="chart-container">
                <div className="chart-header">
                    <h3 className="chart-title">Active trial list</h3>
                    <button className="menu-button">⋯</button>
                </div>
                <div className="donut-chart">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                        <defs>
                            <linearGradient
                                id="gradient1"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop offset="0%" stopColor="#4C6EF5" />
                                <stop offset="50%" stopColor="#364FC7" />
                                <stop offset="100%" stopColor="#1C7ED6" />
                            </linearGradient>
                            <linearGradient
                                id="gradient2"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop offset="0%" stopColor="#22D3EE" />
                                <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                        </defs>

                        {/* Background circle */}
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#F1F5F9"
                            strokeWidth="20"
                        />

                        {/* First segment - dark blue */}
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="url(#gradient1)"
                            strokeWidth="20"
                            strokeDasharray="314 314"
                            strokeDashoffset="78.5"
                            strokeLinecap="round"
                            transform="rotate(-90 100 100)"
                        />

                        {/* Second segment - light blue */}
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="url(#gradient2)"
                            strokeWidth="20"
                            strokeDasharray="78.5 314"
                            strokeDashoffset="0"
                            strokeLinecap="round"
                            transform="rotate(45 100 100)"
                        />

                        {/* Indicator dot */}
                        <circle cx="180" cy="100" r="4" fill="#22D3EE" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default DashboardCharts;
