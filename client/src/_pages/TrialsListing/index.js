"use client";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import "./index.scss";
import { ListView } from "@/components/TrialsPreviews/ListView";
import { getAllTrials } from "@/api/trials/getAllTrials";

import { IoSearch } from "react-icons/io5";
import { FaRegFolder } from "react-icons/fa";
import { RiListCheck } from "react-icons/ri";
import { BsCardText } from "react-icons/bs";
import { TbArrowsSort } from "react-icons/tb";
import { CiSaveDown2 } from "react-icons/ci";
import { GoHistory } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { SlList } from "react-icons/sl";

import { LuArrowLeft } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { TfiSave } from "react-icons/tfi";
import { LuUpload } from "react-icons/lu";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import { IoIosArrowDown } from "react-icons/io";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa6";

export const TrialsListing = () => {
    // State for sorting
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

    /// --- QUERY ---
    const { data: allTrials } = useQuery({
        queryFn: getAllTrials,
        queryKey: ["all-trials"],
    });

    // Memoized sorted trials
    const sortedTrials = useMemo(() => {
        if (!allTrials || !sortBy) return allTrials;

        const sorted = [...allTrials].sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case "trialId":
                    aValue = a.trialIdentifier || "";
                    bValue = b.trialIdentifier || "";
                    break;
                case "therapeuticArea":
                    aValue = a.therapeuticArea || "";
                    bValue = b.therapeuticArea || "";
                    break;
                case "diseaseType":
                    aValue = a.diseaseType || "";
                    bValue = b.diseaseType || "";
                    break;
                case "primaryDrug":
                    aValue = a.primaryDrugs || "";
                    bValue = b.primaryDrugs || "";
                    break;
                case "trialStatus":
                    aValue = a.status || "";
                    bValue = b.status || "";
                    break;
                case "sponsor":
                    aValue = a.sponsorCollaborators || "";
                    bValue = b.sponsorCollaborators || "";
                    break;
                case "phase":
                    aValue = a.trialPhase || "";
                    bValue = b.trialPhase || "";
                    break;
                default:
                    return 0;
            }

            // Convert to strings for comparison
            aValue = aValue.toString().toLowerCase();
            bValue = bValue.toString().toLowerCase();

            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [allTrials, sortBy, sortOrder]);

    // Handle sort option change
    const handleSortChange = (sortField) => {
        if (sortBy === sortField) {
            // Toggle sort order if same field is clicked
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Set new sort field and default to ascending
            setSortBy(sortField);
            setSortOrder("asc");
        }
    };

    // Handle header column click for sorting
    const handleHeaderSort = (sortField) => {
        handleSortChange(sortField);
    };

    return (
        <div className="trial-listing-container">
            <div className="listing-actions-buttons-container">
                <div className="listing-navigation-buttons-container">
                    <div className="listing-back-button">
                        <LuArrowLeft className="back-icon" />
                        back
                    </div>
                </div>
                <div className="listing-cta-buttons-container">
                    <div className="listing-cta-button-container search-button">
                        <IoSearchOutline className="cta-icon" />
                        Advanced Search
                    </div>
                    <div className="listing-cta-button-container filter-button">
                        <IoFilterOutline className="cta-icon" />
                        Filter
                    </div>
                    <div className="listing-cta-button-container query-button">
                        <TfiSave className="cta-icon" />
                        Saved Queries
                    </div>
                    <div className="listing-cta-button-container export-button">
                        <LuUpload className="cta-icon" />
                        Export
                    </div>
                </div>
            </div>
            <div className="listing-container">
                <div className="listing-sidebar-container">
                    <div className="listing-sidebar-search-section">
                        <IoSearch className="search-icon" />
                        <input type="text" placeholder="Search" />
                    </div>
                    <div className="listing-sidebar-view-type-section">
                        <div className="view-type-section-header">
                            <FaRegFolder className="header-icon" />
                            View Type
                        </div>
                        <div className="view-type-section-content">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    className="custom-checkbox"
                                />
                                List view
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    className="custom-checkbox"
                                />
                                Card view
                            </label>
                        </div>
                    </div>
                    <div className="listing-sidebar-sort-by-section">
                        <div className="sort-by-section-header">
                            <TbArrowsSort className="header-icon" />
                            Sort By
                        </div>
                        <div className="sort-by-section-content">
                            <label className="checkbox-label">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    className="custom-checkbox"
                                    checked={sortBy === "trialId"}
                                    onChange={() => handleSortChange("trialId")}
                                />
                                Trial ID
                                {sortBy === "trialId" && (
                                    <span className="sort-indicator">
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    className="custom-checkbox"
                                    checked={sortBy === "therapeuticArea"}
                                    onChange={() =>
                                        handleSortChange("therapeuticArea")
                                    }
                                />
                                Therapeutic Area
                                {sortBy === "therapeuticArea" && (
                                    <span className="sort-indicator">
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    className="custom-checkbox"
                                    checked={sortBy === "diseaseType"}
                                    onChange={() =>
                                        handleSortChange("diseaseType")
                                    }
                                />
                                Disease Type
                                {sortBy === "diseaseType" && (
                                    <span className="sort-indicator">
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    className="custom-checkbox"
                                    checked={sortBy === "primaryDrug"}
                                    onChange={() =>
                                        handleSortChange("primaryDrug")
                                    }
                                />
                                Primary Drug
                                {sortBy === "primaryDrug" && (
                                    <span className="sort-indicator">
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    className="custom-checkbox"
                                    checked={sortBy === "trialStatus"}
                                    onChange={() =>
                                        handleSortChange("trialStatus")
                                    }
                                />
                                Trial Status
                                {sortBy === "trialStatus" && (
                                    <span className="sort-indicator">
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    className="custom-checkbox"
                                    checked={sortBy === "sponsor"}
                                    onChange={() => handleSortChange("sponsor")}
                                />
                                Sponsor
                                {sortBy === "sponsor" && (
                                    <span className="sort-indicator">
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    className="custom-checkbox"
                                    checked={sortBy === "phase"}
                                    onChange={() => handleSortChange("phase")}
                                />
                                Phase
                                {sortBy === "phase" && (
                                    <span className="sort-indicator">
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </label>
                            {sortBy && (
                                <button
                                    className="clear-sort-button"
                                    onClick={() => {
                                        setSortBy("");
                                        setSortOrder("asc");
                                    }}
                                >
                                    Clear Sort
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="listing-sidebar-option-section">
                        <CiSaveDown2 className="option-icon" />
                        Save This Query
                    </div>
                    <div className="listing-sidebar-option-section">
                        <GoHistory className="option-icon" />
                        Query History
                    </div>
                    <div className="listing-sidebar-option-section">
                        <CiBookmark className="option-icon" />
                        Favorite Trials
                    </div>
                    <div className="listing-sidebar-option-section">
                        <SlList className="option-icon" />
                        Customize Column View
                    </div>
                </div>
                <div className="listing-items-container">
                    <div className="listing-items-header-container">
                        <div className="header-column select-all">
                            <FaRegSquare className="checkbox-icon" />
                        </div>
                        <div
                            className={`header-column sortable ${sortBy === "trialId" ? "active-sort" : ""}`}
                            onClick={() => handleHeaderSort("trialId")}
                        >
                            Trial ID
                            {sortBy === "trialId" &&
                                (sortOrder === "asc" ? "↑" : "↓")}
                            <div className="filter-text">
                                Filter
                                <IoIosArrowDown className="filter-arrow" />
                            </div>
                        </div>
                        <div
                            className={`header-column sortable ${sortBy === "therapeuticArea" ? "active-sort" : ""}`}
                            onClick={() => handleHeaderSort("therapeuticArea")}
                        >
                            Therapeutic Area
                            {sortBy === "therapeuticArea" &&
                                (sortOrder === "asc" ? "↑" : "↓")}
                            <div className="filter-text">
                                Filter
                                <IoIosArrowDown className="filter-arrow" />
                            </div>
                        </div>
                        <div
                            className={`header-column sortable ${sortBy === "diseaseType" ? "active-sort" : ""}`}
                            onClick={() => handleHeaderSort("diseaseType")}
                        >
                            Disease Type
                            {sortBy === "diseaseType" &&
                                (sortOrder === "asc" ? "↑" : "↓")}
                            <div className="filter-text">
                                Filter
                                <IoIosArrowDown className="filter-arrow" />
                            </div>
                        </div>
                        <div
                            className={`header-column sortable ${sortBy === "primaryDrug" ? "active-sort" : ""}`}
                            onClick={() => handleHeaderSort("primaryDrug")}
                        >
                            Primary Drug
                            {sortBy === "primaryDrug" &&
                                (sortOrder === "asc" ? "↑" : "↓")}
                            <div className="filter-text">
                                Filter
                                <IoIosArrowDown className="filter-arrow" />
                            </div>
                        </div>
                        <div
                            className={`header-column sortable ${sortBy === "trialStatus" ? "active-sort" : ""}`}
                            onClick={() => handleHeaderSort("trialStatus")}
                        >
                            Trial Status
                            {sortBy === "trialStatus" &&
                                (sortOrder === "asc" ? "↑" : "↓")}
                            <div className="filter-text">
                                Filter
                                <IoIosArrowDown className="filter-arrow" />
                            </div>
                        </div>
                        <div
                            className={`header-column sortable ${sortBy === "sponsor" ? "active-sort" : ""}`}
                            onClick={() => handleHeaderSort("sponsor")}
                        >
                            Sponsor
                            {sortBy === "sponsor" &&
                                (sortOrder === "asc" ? "↑" : "↓")}
                            <div className="filter-text">
                                Filter
                                <IoIosArrowDown className="filter-arrow" />
                            </div>
                        </div>
                        <div
                            className={`header-column sortable ${sortBy === "phase" ? "active-sort" : ""}`}
                            onClick={() => handleHeaderSort("phase")}
                        >
                            Phase
                            {sortBy === "phase" &&
                                (sortOrder === "asc" ? "↑" : "↓")}
                            <div className="filter-text">
                                Filter
                                <IoIosArrowDown className="filter-arrow" />
                            </div>
                        </div>
                    </div>
                    <div className="listing-items-content-container">
                        {sortedTrials?.map((trial) => (
                            <ListView data={trial} key={trial.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
