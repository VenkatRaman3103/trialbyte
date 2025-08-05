"use client";
import { useEffect, useState } from "react";
import "./index.scss";
import Image from "next/image";

export const DrugTabs = ({ tabIds, data }) => {
    const [tabs, setTabs] = useState(data);
    const [activeTab, setActiveTab] = useState();
    const [activeTabId, setActiveTabId] = useState(tabIds[0]);

    useEffect(() => {
        setTabs(data);
    }, [data]);

    useEffect(() => {
        setActiveTabId(tabIds[0]);
    }, [tabIds]);

    // filtering the data based on the selected tab id
    useEffect(() => {
        if (!activeTabId) return;
        const filteredData = data?.filter((item) => item.id === activeTabId);
        setActiveTab(filteredData[0]);
    }, [activeTabId]);

    const handleTabClick = (tabId) => {
        console.log(tabId, "tabId");
        setActiveTabId(tabId);
    };

    const handleCloseTab = (e, tab) => {
        e.stopPropagation();
        const filteredTabs = tabs.filter((t) => t !== tab);
        setTabs(filteredTabs);
        if (tab === activeTabId && filteredTabs.length > 0) {
            setActiveTabId(filteredTabs[0]);
        }
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // Helper function to get status color class
    const getStatusClass = (status) => {
        if (!status) return "bgGray";
        const lowerStatus = status.toLowerCase();
        if (
            lowerStatus.includes("active") ||
            lowerStatus.includes("ongoing") ||
            lowerStatus.includes("recruiting")
        ) {
            return "bgGreen";
        }
        if (lowerStatus.includes("completed")) {
            return "bgBlue";
        }
        if (lowerStatus.includes("preclinical")) {
            return "bgOrange";
        }
        return "bgGray";
    };

    console.log(activeTabId, "activeTabId");

    if (!activeTab) {
        return <div>Loading...</div>;
    }

    if (tabs?.length === 0) {
        return <div>No tabs available</div>;
    }

    return (
        <div className="drug-page-main-container">
            <div className="tabs-container">
                {tabs?.map((tab) => (
                    <div
                        key={tab}
                        className={`tab ${activeTabId === tab.id ? "active" : ""}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        <span className="tab-label">{tab.id}</span>
                        <span
                            className="close-btn"
                            onClick={(e) => handleCloseTab(e, tab)}
                        >
                            ✕
                        </span>
                    </div>
                ))}
            </div>

            <div className="drug-page-container">
                <div className="drug-page-heading">
                    {activeTab?.primaryName}
                </div>
                <div className="section-container">
                    <div className="section-header-container">Overview</div>
                    <div className="content-container">
                        <div className="content-header-container">
                            Drug Name
                        </div>
                        <div className="flex-cotainer">
                            <div className="tag empty">
                                <span>Lab code : </span>
                                {activeTab?.otherName || "N/A"}
                            </div>
                            <div className="tag fill bgGreen">
                                {activeTab?.primaryName || activeTabId}
                            </div>
                        </div>
                        <div className="tag empty">
                            <span>Generic Name : </span>
                            {activeTab?.genericName || "N/A"}
                        </div>
                        <div className="tag empty">
                            <span> Other Name : </span>
                            {activeTab?.otherName || "N/A"}
                        </div>
                    </div>

                    <div className="content-container">
                        <div className="content-header-container">
                            Drug Status
                        </div>
                        <div className="flex-cotainer">
                            <div className="tag empty no-border">
                                <span>Global Status : </span>
                            </div>
                            <div
                                className={`tag fill ${getStatusClass(data?.globalStatus)}`}
                            >
                                {activeTab?.globalStatus || "N/A"}
                            </div>
                        </div>
                        <div className="flex-cotainer">
                            <div className="tag empty no-border">
                                <span>Development status :</span>
                            </div>
                            <div
                                className={`tag fill ${getStatusClass(data?.developmentStatus)}`}
                            >
                                {activeTab?.developmentStatus || "N/A"}
                            </div>
                        </div>
                        <div className="flex-cotainer">
                            <div className="tag empty no-border">
                                <span>Drug Summary :</span>
                            </div>
                            <div className="tag empty no-border">
                                <span>{activeTab?.drugSummary || "N/A"}</span>
                            </div>
                        </div>
                        <div className="flex-cotainer">
                            <div className="tag empty no-border">
                                <span>Latest Changes :</span>
                            </div>
                            <div className="tag empty no-border">
                                <span>
                                    {formatDate(data?.lastModifiedDate)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="content-container">
                        <div className="flex-cotainer">
                            <div className="empty no-border">
                                <span>Originator :</span>
                            </div>
                            <div className="empty no-border">
                                <span>{activeTab?.originator || "N/A"}</span>
                            </div>
                        </div>
                        <div className="flex-cotainer">
                            <div className="empty no-border">
                                <span>Other active companies :</span>
                            </div>
                            <div className="empty no-border">
                                <span>
                                    {activeTab?.otherActiveCompanies || "N/A"}
                                </span>
                            </div>
                        </div>
                        <div className="flex-cotainer">
                            <div className="empty no-border">
                                <span>Therapeutic Area :</span>
                            </div>
                            <div className="empty no-border">
                                <span>
                                    {activeTab?.therapeuticArea || "N/A"}
                                </span>
                            </div>
                        </div>
                        <div className="flex-cotainer">
                            <div className="empty no-border">
                                <span>Disease Type :</span>
                            </div>
                            <div className="empty no-border">
                                <span>{activeTab?.diseaseType || "N/A"}</span>
                            </div>
                        </div>
                        <div className="flex-cotainer">
                            <div className="empty no-border">
                                <span>Regulatory Designations :</span>
                            </div>
                            <div className="empty no-border">
                                <span>
                                    {activeTab?.regulatoryDesignations || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="content-container flex-container-fill">
                        <div className="content-header-container">
                            Development Entries
                        </div>
                        <div className="content-wraper flex-container-fill">
                            {activeTab?.developmentEntries &&
                                activeTab?.developmentEntries?.map(
                                    (entry, index) => (
                                        <div
                                            key={index}
                                            className={`sub-section ${index === 0 ? "left" : "right"}`}
                                        >
                                            <div className="flex-cotainer">
                                                <div className="tag empty no-border">
                                                    <span>Disease Type :</span>
                                                </div>
                                                <div className="tag fill bgGreen">
                                                    {entry.diseaseType || "N/A"}
                                                </div>
                                            </div>

                                            <div className="flex-cotainer">
                                                <div className="tag empty no-border">
                                                    <span>
                                                        Therapeutic Class:
                                                    </span>
                                                </div>
                                                <div className="tag empty no-border">
                                                    <span>
                                                        {entry.therapeuticClass ||
                                                            "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-cotainer">
                                                <div className="tag empty no-border">
                                                    <span>Company :</span>
                                                </div>
                                                <div className="tag empty no-border">
                                                    <span>
                                                        {entry.company || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-cotainer">
                                                <div className="tag empty no-border">
                                                    <span>Company Type :</span>
                                                </div>
                                                <div className="tag empty no-border">
                                                    <span>
                                                        {entry.companyType ||
                                                            "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-cotainer">
                                                <div className="tag empty no-border">
                                                    <span>
                                                        Development Status :
                                                    </span>
                                                </div>
                                                <div
                                                    className={`tag fill ${getStatusClass(entry.status)}`}
                                                >
                                                    {entry.status || "N/A"}
                                                </div>
                                            </div>
                                            <div className="flex-cotainer column">
                                                <div className="tag empty no-border">
                                                    <span>Reference : </span>
                                                </div>
                                                <div className="tag empty no-border">
                                                    <span>
                                                        {entry.reference ||
                                                            "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="btn-section">
                                                <div className="btn">
                                                    <a
                                                        href={entry.reference}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        View source
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                )}
                        </div>
                    </div>

                    <div className="flex-cotainer column misc">
                        <div className="empty no-border">
                            <span>Source Links :</span>
                        </div>
                        <div className="empty no-border">
                            <span>{activeTab?.sourceLinks || "N/A"}</span>
                        </div>
                    </div>
                    <div className="flex-cotainer misc">
                        <div className="empty no-border">
                            <span>Drug Record Status :</span>
                        </div>
                        <div className="empty no-border">
                            <span>{activeTab?.drugRecordStatus || "N/A"}</span>
                        </div>
                    </div>
                </div>

                <div className="section-container">
                    <div className="section-header-container">Development</div>
                    <div className="content-container">
                        <div className="flex-cotainer">
                            <div className="tag empty no-border">
                                <span>Mechanism of action :</span>
                            </div>
                            <div className="tag fill bgGreen">
                                {activeTab?.mechanismOfAction || "N/A"}
                            </div>
                        </div>
                        <div className="flex-cotainer">
                            <div className="tag empty no-border">
                                <span>Biological target :</span>
                            </div>
                            <div className="tag empty no-border">
                                <span>
                                    {activeTab?.biologicalTarget || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="flex-cotainer column">
                            <div className="tag empty no-border">
                                <span>Drug Technology </span>
                            </div>
                            <div className="tag empty no-border">
                                <span>
                                    {activeTab?.drugTechnology || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="card">
                            <div className="card-header">Delivery Route</div>
                            <div className="card-body">
                                <div className="option">
                                    <span className="star">☆</span>{" "}
                                    {activeTab?.deliveryRoute || "N/A"}
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">Delivery Medium</div>
                            <div className="card-body">
                                <div className="option">
                                    <span className="star">☆</span>{" "}
                                    {activeTab?.deliveryMedium || "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="preclinical-section">
                        <h3 className="preclinical-title">Preclinical</h3>
                        <div className="preclinical-card">
                            <p className="preclinical-description">
                                {activeTab?.preclinical ||
                                    "No preclinical data available"}
                            </p>
                            <div className="preclinical-actions">
                                <button className="action-button">
                                    View source
                                </button>
                                <button className="action-button">
                                    Attachments{" "}
                                    <i className="fas fa-book-open"></i>
                                </button>
                                <button className="icon-button">
                                    <i className="fas fa-download"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="clinical-section">
                        <h3 className="clinical-title">Clinical</h3>
                        {activeTab?.clinicalTrials &&
                        activeTab?.clinicalTrials.length > 0 ? (
                            <table className="clinical-table">
                                <thead>
                                    <tr>
                                        <th className="table-head">Trial ID</th>
                                        <th className="table-head">Title</th>
                                        <th className="table-head">
                                            Primary Drugs
                                        </th>
                                        <th className="table-head">Status</th>
                                        <th className="table-head">Sponsor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeTab.clinicalTrials.map(
                                        (trial, index) => (
                                            <tr key={index}>
                                                <td className="table-cell">
                                                    {trial.trialId || "N/A"}
                                                </td>
                                                <td className="table-cell">
                                                    {trial.title || "N/A"}
                                                </td>
                                                <td className="table-cell">
                                                    {trial.primaryDrugs ||
                                                        "N/A"}
                                                </td>
                                                <td className="table-cell">
                                                    {trial.status || "N/A"}
                                                </td>
                                                <td className="table-cell">
                                                    {trial.sponsor || "N/A"}
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <p>No clinical trials data available</p>
                        )}
                    </div>
                </div>

                <div className="section-container">
                    <div className="section-header-container">Pipeline</div>
                    <div className="pipeline-card">
                        <h3 className="pipeline-date">
                            {formatDate(data?.lastModifiedDate)}
                        </h3>

                        <div className="pipeline-image-wrapper">
                            <Image
                                src={"/map_image.svg"}
                                alt="Pipeline Table"
                                className="pipeline-image"
                                width={1024}
                                height={400}
                            />
                        </div>

                        <div className="pipeline-actions">
                            <button className="action-button">
                                View Pipeline
                            </button>
                            <button className="action-button">
                                Attachments <i className="fas fa-book-open"></i>
                            </button>
                            <button className="icon-button">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="news-container">
                            <div className="news-card">
                                <div className="news-header expanded">
                                    <strong>
                                        {formatDate(data?.lastModifiedDate)}:
                                    </strong>{" "}
                                    {activeTab?.drugChangesLog ||
                                        "No recent changes"}
                                    <button className="toggle-btn">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReportCard data={activeTab} />
                </div>

                <div className="section-container">
                    <div className="section-header-container">
                        Licensing & Marketing
                    </div>
                    <LegalSectionCard data={activeTab} />
                </div>

                <LogsSection data={activeTab} />
            </div>
        </div>
    );
};

const ReportCard = ({ data }) => {
    const [isOpen, setIsOpen] = useState(true);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="report-container">
            <div className="report-card">
                <div className={`report-header ${isOpen ? "active" : ""}`}>
                    <div className="report-tags">
                        <span className="tag">
                            Date : {formatDate(data?.createdDate)}
                        </span>
                        <span className="tag">Drug Report</span>
                    </div>
                    <button
                        className="toggle-btn"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i
                            className={`fas fa-${isOpen ? "minus" : "plus"}`}
                        ></i>
                    </button>
                </div>

                <div className="report-subtitle">
                    {data?.drugSummary ||
                        "Development report on drug strategies and updates"}
                </div>

                {isOpen && (
                    <>
                        <div className="report-image-wrapper">
                            <Image
                                src="/map_image.svg"
                                alt="Pipeline Table"
                                className="pipeline-image"
                                width={1024}
                                height={400}
                            />
                        </div>

                        <div className="report-actions">
                            <button className="action-button">
                                View source
                            </button>
                            <button className="action-button">
                                Attachments <i className="fas fa-book-open"></i>
                            </button>
                            <button className="icon-button">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const LegalSectionCard = ({ data }) => {
    const sections = [
        {
            title: "Agreement",
            content: data?.agreement || "No agreement information available",
        },
        {
            title: "Licensing availability",
            content:
                data?.licensingAvailability ||
                "No licensing information available",
            withButtons: true,
        },
        {
            title: "Marketing Approvals",
            content:
                data?.marketingApprovals ||
                "No marketing approvals information available",
            withButtons: true,
        },
    ];

    return (
        <div className="legal-card-container">
            {sections.map((section, index) => (
                <div key={index} className="legal-card">
                    <h4 className="legal-card-title">{section.title} :</h4>
                    <p className="legal-card-content">{section.content}</p>
                    {section.withButtons && (
                        <div className="legal-card-actions">
                            <button className="action-button">
                                View source
                            </button>
                            <button className="action-button">
                                Attachments <i className="fas fa-book-open"></i>
                            </button>
                            <button className="icon-button">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const LogsSection = ({ data }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="logs-container">
            <div className="logs-header">
                <h4 className="logs-title">Logs</h4>
                <div className="logs-alert">
                    <span>Alert</span>
                    <i className="fas fa-bell logs-bell-icon"></i>
                </div>
            </div>

            <div className="logs-content">
                <div className="logs-date">
                    <span className="logs-label">Trial added Date :</span>{" "}
                    {formatDate(data?.createdDate)}
                </div>
                <div className="logs-date">
                    <span className="logs-label">Last Modified Date :</span>{" "}
                    {formatDate(data?.lastModifiedDate)}
                </div>
                <div className="logs-date">
                    <span className="logs-label">Last Modified User :</span>{" "}
                    {data?.lastModifiedUser || "N/A"}
                </div>
                <div className="logs-date">
                    <span className="logs-label">Next Review Date :</span>{" "}
                    {formatDate(data?.nextReviewDate)}
                </div>
                {data?.notes && (
                    <div className="logs-date">
                        <span className="logs-label">Notes :</span> {data.notes}
                    </div>
                )}
            </div>
        </div>
    );
};
