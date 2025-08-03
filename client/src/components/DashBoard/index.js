"use client";

import React from "react";
import "./index.css";
import Image from "next/image";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    RadialBarChart,
    RadialBar,
    LineChart,
    Line,
    Treemap,
    ScatterChart,
    Scatter,
    ZAxis,
} from "recharts";

export const DashBoard = () => {
    return (
        <>
            <KPIDashboard />
            <TrialDistribution />
            <DatasetTable />
        </>
    );
};

const KPIDashboard = () => {
    const kpiStats = [
        {
            title: "Total Trials",
            value: 14150,
            icon: "https://source.unsplash.com/48x48/?notebook",
        },
        {
            title: "Total Active Trials",
            value: 12110,
            icon: "https://source.unsplash.com/48x48/?flask",
        },
        {
            title: "Total Patients Enrolled",
            value: 9800,
            icon: "https://source.unsplash.com/48x48/?people",
        },
        {
            title: "Avg. Trial Duration",
            value: "90 Days",
            icon: "https://source.unsplash.com/48x48/?calendar",
        },
        {
            title: "Drug Tested",
            value: "82.08%",
            icon: "https://source.unsplash.com/48x48/?testtube",
        },
    ];

    const topSponsors = [
        { name: "Merck", count: 350 },
        { name: "Astellas", count: 343 },
        { name: "Pfizer", count: 333 },
        { name: "Sanofi", count: 310 },
        { name: "Roche", count: 301 },
    ];

    return (
        <div className="kpi-dashboard">
            <div className="kpi-header">KPI Dashboard</div>
            <div className="kpi-content">
                <div className="kpi-stats">
                    {kpiStats.map((stat, index) => (
                        <div className="kpi-box" key={index}>
                            <div className="kpi-icon">
                                <Image
                                    src={`/icon_crown.svg`}
                                    alt="Clinical Trial Illustration"
                                    width={25}
                                    height={25}
                                />
                            </div>
                            <h2>{stat.value}</h2>
                            <p>{stat.title}</p>
                        </div>
                    ))}
                </div>
                <div className="kpi-sponsors">
                    <h3>Top Sponsors</h3>
                    {topSponsors.map((sponsor, idx) => (
                        <div key={idx} className="sponsor-row">
                            <div className="sponsor-logo-placeholder">
                                {sponsor.name[0]}
                            </div>
                            <div className="sponsor-info">
                                <strong>{sponsor.name}</strong>
                                <span>Sponsor</span>
                            </div>
                            <div className="sponsor-count">
                                {sponsor.count}{" "}
                                <small>Total.no.of.trials</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Existing Data
const barData1 = [
    { day: "Mon", trials: 120 },
    { day: "Tue", trials: 200 },
    { day: "Wed", trials: 150 },
    { day: "Thu", trials: 80 },
    { day: "Fri", trials: 70 },
    { day: "Sat", trials: 130 },
    { day: "Sun", trials: 140 },
];

const barData2 = [
    { name: "Page A", pv: 6000, uv: 2400 },
    { name: "Page B", pv: 5000, uv: 1398 },
    { name: "Page C", pv: 8000, uv: 9800 },
    { name: "Page D", pv: 7000, uv: 3908 },
    { name: "Page E", pv: 6800, uv: 4800 },
    { name: "Page F", pv: 7800, uv: 3800 },
    { name: "Page G", pv: 9000, uv: 4300 },
];

const pieData = [
    { name: "Search Engine", value: 400 },
    { name: "Direct", value: 300 },
    { name: "Email", value: 300 },
    { name: "Union Ads", value: 200 },
    { name: "Video Ads", value: 278 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D77BF7"];

const radialData = [
    { name: "Group A", uv: 31.47, fill: "#8884d8" },
    { name: "Group B", uv: 26.69, fill: "#83a6ed" },
    { name: "Group C", uv: 15.69, fill: "#8dd1e1" },
    { name: "Group D", uv: 8.22, fill: "#82ca9d" },
    { name: "Group E", uv: 8.63, fill: "#a4de6c" },
    { name: "Group F", uv: 2.63, fill: "#d0ed57" },
    { name: "Group G", uv: 6.67, fill: "#ffc658" },
];

const lineData = [
    { name: "Page A", uv: 4000, pv: 2400 },
    { name: "Page B", uv: 3000, pv: 1398 },
    { name: "Page C", uv: 2000, pv: 9800 },
    { name: "Page D", uv: 2780, pv: 3908 },
    { name: "Page E", uv: 1890, pv: 4800 },
    { name: "Page F", uv: 2390, pv: 3800 },
    { name: "Page G", uv: 3490, pv: 4300 },
];

const treemapData = [
    { name: "Drug 1", size: 100 },
    { name: "Drug 2", size: 80 },
    { name: "Drug 3", size: 65 },
    { name: "Drug 4", size: 120 },
    { name: "Drug 5", size: 90 },
    { name: "Drug 6", size: 150 },
    { name: "Drug 7", size: 110 },
    { name: "Drug 8", size: 75 },
    { name: "Drug 9", size: 95 },
    { name: "Drug 10", size: 130 },
];

// New Data for extra charts
const avgDurationData = [
    { phase: "Phase 1", duration: 12 },
    { phase: "Phase 2", duration: 18 },
    { phase: "Phase 3", duration: 24 },
    { phase: "Phase 4", duration: 30 },
];

const recruitmentData = [
    { name: "Sponsor A", pv: 4000, uv: 2400 },
    { name: "Sponsor B", pv: 3000, uv: 1398 },
    { name: "Sponsor C", pv: 2000, uv: 9800 },
    { name: "Sponsor D", pv: 2780, uv: 3908 },
];

const diseaseDurationData = [
    { x: 10, y: 30, z: 200 },
    { x: 20, y: 50, z: 300 },
    { x: 30, y: 70, z: 400 },
    { x: 40, y: 100, z: 500 },
];

const TrialDistribution = () => {
    return (
        <div className="trial-dashboard">
            <div className="trial-header">Trial Distribution</div>
            <div className="chart-grid">
                {/* Bar Chart 1 */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData1}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="trials" fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="chart-title">
                        Drug Trial Status Distribution by Number of Trials
                        tested
                    </p>
                </div>

                {/* Bar Chart 2 */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData2}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="chart-title">
                        Top 10 Sponsors based on number of trials
                    </p>
                </div>

                {/* Pie Chart */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={70}
                                innerRadius={40}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                    <p className="chart-title">
                        Distribution of Trial by Completion status
                    </p>
                </div>

                {/* Radial Bar Chart */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" height={250}>
                        <RadialBarChart
                            innerRadius="20%"
                            outerRadius="100%"
                            data={radialData}
                            startAngle={180}
                            endAngle={-180}
                        >
                            <RadialBar
                                label={{
                                    fill: "#666",
                                    position: "insideStart",
                                }}
                                background
                                dataKey="uv"
                            />
                            <Legend />
                            <Tooltip />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <p className="chart-title">
                        Distribution of Trial by Termination status
                    </p>
                </div>

                {/* Line Chart: Trial Success Rate */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#8884d8"
                            />
                            <Line
                                type="monotone"
                                dataKey="uv"
                                stroke="#82ca9d"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="chart-title">Trial Success Rate</p>
                </div>

                {/* Donut Chart: Patient Segment */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={70}
                                innerRadius={40}
                                dataKey="value"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                    <p className="chart-title">
                        Distribution of Trial by Patient Segment
                    </p>
                </div>

                {/* Map Placeholder */}
                <div className="chart-box">
                    <img
                        src="/map-placeholder.png"
                        alt="Map of Trials by Location"
                        style={{ width: "100%", height: "250px" }}
                    />
                    <p className="chart-title">Number of trials by location</p>
                </div>

                {/* Top 10 Sponsors (Already Present Above) */}

                {/* Line Chart: Patient Enrollment Trend */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#8884d8"
                            />
                            <Line
                                type="monotone"
                                dataKey="uv"
                                stroke="#82ca9d"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="chart-title">Patient Enrollment Trend</p>
                </div>

                {/* Treemap: Top 10 Drugs */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" height={250}>
                        <Treemap
                            data={treemapData}
                            dataKey="size"
                            ratio={4 / 3}
                            stroke="#fff"
                            fill="#8884d8"
                        />
                    </ResponsiveContainer>
                    <p className="chart-title">
                        Top 10 Drugs based on number of trials
                    </p>
                </div>

                {/* New Chart: Average Trial Duration by Phase */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={avgDurationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="phase" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="duration" fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="chart-title">
                        Average Trial Duration by Phase
                    </p>
                </div>

                {/* New Chart: Recruitment Efficiency */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={recruitmentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="chart-title">Recruitment Efficiency</p>
                </div>

                {/* New Chart: Trial Duration by Disease Type */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" height={250}>
                        <ScatterChart>
                            <CartesianGrid />
                            <XAxis dataKey="x" name="Disease" />
                            <YAxis dataKey="y" name="Duration" />
                            <ZAxis dataKey="z" range={[100, 500]} />
                            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                            <Scatter
                                name="Disease Duration"
                                data={diseaseDurationData}
                                fill="#8884d8"
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                    <p className="chart-title">
                        Trial duration by disease type
                    </p>
                </div>
            </div>
        </div>
    );
};

const dummyData = Array(10).fill({
    therapeuticArea: "Oncology",
    diseaseType: "Neuroendocrine Cancer",
    trialIDs: "NCT02827786 ,TB10451",
    status: "Completed",
    scientificTitle:
        "Feasibility of Electromagnetic Acoustic Imaging of Liver Tumor",
});

export default function DatasetTable() {
    return (
        <div className="dataset-container">
            <div className="dataset-card">
                <h2 className="dataset-title">Dataset</h2>
                <div className="dataset-table-wrapper">
                    <table className="dataset-table">
                        <thead>
                            <tr>
                                <th>Therapeutic Area</th>
                                <th>Disease Type</th>
                                <th>Trial IDs</th>
                                <th>Status</th>
                                <th>Scientific Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.therapeuticArea}</td>
                                    <td>{row.diseaseType}</td>
                                    <td>{row.trialIDs}</td>
                                    <td>{row.status}</td>
                                    <td>{row.scientificTitle}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="dataset-actions">
                    <button className="export-btn">Export</button>
                </div>
            </div>
        </div>
    );
}
