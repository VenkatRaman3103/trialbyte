"use client";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import "./index.scss";
import { ListView } from "@/components/TrialsPreviews/ListView";
import { getAllTrials } from "@/api/trials/getAllTrials";

import { IoSearch } from "react-icons/io5";
import { FaRegFolder, FaTimes } from "react-icons/fa";
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
    const [activeModal, setActiveModal] = useState(null);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");
    const [advancedSearchCriteria, setAdvancedSearchCriteria] = useState([]);

    /// --- QUERY ---
    const { data: allTrials } = useQuery({
        queryFn: getAllTrials,
        queryKey: ["all-trials"],
    });

    // check if a trial matches search criteria
    const matchesSearchCriteria = (trial, criteria) => {
        if (!criteria || criteria.length === 0) return true;

        const validCriteria = criteria.filter(
            (c) =>
                c.field !== "Choose Field" &&
                c.operator !== "Operator" &&
                c.value.trim() !== "" &&
                c.value !== "Enter the search term",
        );

        if (validCriteria.length === 0) return true;

        let result = true;

        for (let i = 0; i < validCriteria.length; i++) {
            const criterion = validCriteria[i];
            const fieldValue = getFieldValue(trial, criterion.field);
            const matches = evaluateCriterion(
                fieldValue,
                criterion.operator,
                criterion.value,
            );

            if (i === 0) {
                result = matches;
            } else {
                const prevCriterion = validCriteria[i - 1];
                if (prevCriterion.boolean === "AND") {
                    result = result && matches;
                } else if (prevCriterion.boolean === "OR") {
                    result = result || matches;
                }
            }
        }

        return result;
    };

    // get field value from trial object
    const getFieldValue = (trial, field) => {
        const fieldMap = {
            "Disease Type": trial.diseaseType || "",
            "Therapeutic Area": trial.therapeuticArea || "",
            "Trial ID": trial.trialIdentifier || "",
            "Primary Drug": trial.primaryDrugs || "",
            "Trial Status": trial.status || "",
            Sponsor: trial.sponsorCollaborators || "",
            Phase: trial.trialPhase || "",
            Title: trial.title || "",
            "Other Drugs": trial.otherDrugs || "",
            Countries: trial.countries || "",
            Region: trial.region || "",
            "Target Enrollment": trial.targetNoOfVolunteers || 0,
            "Actual Enrollment": trial.actualEnrolledVolunteers || 0,
            "Age From": trial.ageFrom || 0,
            "Age To": trial.ageTo || 0,
        };
        return fieldMap[field] || "";
    };

    // evaluate a single criterion
    const evaluateCriterion = (fieldValue, operator, searchValue) => {
        const fieldStr = fieldValue.toString().toLowerCase();
        const searchStr = searchValue.toString().toLowerCase();
        const fieldNum = parseFloat(fieldValue);
        const searchNum = parseFloat(searchValue);

        switch (operator) {
            case "Contains":
                return fieldStr.includes(searchStr);
            case "Equals":
                return fieldStr === searchStr;
            case "Does not contain":
                return !fieldStr.includes(searchStr);
            case "Not equals":
                return fieldStr !== searchStr;
            case "Starts with":
                return fieldStr.startsWith(searchStr);
            case ">=":
                return (
                    !isNaN(fieldNum) &&
                    !isNaN(searchNum) &&
                    fieldNum >= searchNum
                );
            case "<=":
                return (
                    !isNaN(fieldNum) &&
                    !isNaN(searchNum) &&
                    fieldNum <= searchNum
                );
            case "=":
                return (
                    !isNaN(fieldNum) &&
                    !isNaN(searchNum) &&
                    fieldNum === searchNum
                );
            case ">":
                return (
                    !isNaN(fieldNum) &&
                    !isNaN(searchNum) &&
                    fieldNum > searchNum
                );
            case "<":
                return (
                    !isNaN(fieldNum) &&
                    !isNaN(searchNum) &&
                    fieldNum < searchNum
                );
            default:
                return true;
        }
    };

    // match
    const matchesSimpleSearch = (trial, query) => {
        if (!query.trim()) return true;

        const searchFields = [
            trial.trialIdentifier,
            trial.therapeuticArea,
            trial.diseaseType,
            trial.primaryDrugs,
            trial.status,
            trial.sponsorCollaborators,
            trial.trialPhase,
            trial.title,
        ];

        const searchTerm = query.toLowerCase();
        return searchFields.some(
            (field) =>
                field && field.toString().toLowerCase().includes(searchTerm),
        );
    };

    const processedTrials = useMemo(() => {
        if (!allTrials) return [];

        let filtered = allTrials.filter((trial) => {
            const matchesSimple = matchesSimpleSearch(trial, searchQuery);
            const matchesAdvanced = matchesSearchCriteria(
                trial,
                advancedSearchCriteria,
            );
            return matchesSimple && matchesAdvanced;
        });

        if (sortBy) {
            filtered = [...filtered].sort((a, b) => {
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

                aValue = aValue.toString().toLowerCase();
                bValue = bValue.toString().toLowerCase();

                if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
                if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [allTrials, sortBy, sortOrder, searchQuery, advancedSearchCriteria]);

    // handle sort option change
    const handleSortChange = (sortField) => {
        if (sortBy === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(sortField);
            setSortOrder("asc");
        }
    };

    // handle header column click for sorting
    const handleHeaderSort = (sortField) => {
        handleSortChange(sortField);
    };

    // handle modal select
    const openRespectiveModal = (modalType) => {
        setActiveModal(modalType);
    };

    // handle advanced search
    const handleAdvancedSearch = (criteria) => {
        setAdvancedSearchCriteria(criteria);
        setActiveModal(null);
    };

    // clear all searches
    const clearAllSearches = () => {
        setSearchQuery("");
        setAdvancedSearchCriteria([]);
        setSortBy("");
        setSortOrder("asc");
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
                {/* Search Status Bar */}
                {(searchQuery || advancedSearchCriteria.length > 0) && (
                    <div className="search-status-bar">
                        <span>
                            Showing {processedTrials.length} of{" "}
                            {allTrials?.length || 0} trials
                            {searchQuery && ` matching "${searchQuery}"`}
                            {advancedSearchCriteria.length > 0 &&
                                ` with ${advancedSearchCriteria.length} advanced criteria`}
                        </span>
                        <button
                            onClick={clearAllSearches}
                            className="clear-search-btn"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                <div className="listing-cta-buttons-container">
                    <div
                        className="listing-cta-button-container search-button"
                        onClick={() => openRespectiveModal("search")}
                    >
                        <IoSearchOutline className="cta-icon" />
                        Advanced Search
                        {advancedSearchCriteria.length > 0 && (
                            <span className="search-indicator">
                                ({advancedSearchCriteria.length})
                            </span>
                        )}
                    </div>
                    <div
                        className="listing-cta-button-container filter-button"
                        onClick={() => openRespectiveModal("filter")}
                    >
                        <IoFilterOutline className="cta-icon" />
                        Filter
                    </div>
                    <div
                        className="listing-cta-button-container query-button"
                        onClick={() => openRespectiveModal("query")}
                    >
                        <TfiSave className="cta-icon" />
                        Saved Queries
                    </div>
                    <div
                        className="listing-cta-button-container export-button"
                        onClick={() => openRespectiveModal("export")}
                    >
                        <LuUpload className="cta-icon" />
                        Export
                    </div>
                </div>
            </div>

            <div className="listing-container">
                <div className="listing-sidebar-container">
                    <div className="listing-sidebar-search-section">
                        <IoSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search trials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                className="clear-search-input"
                                onClick={() => setSearchQuery("")}
                            >
                                <FaTimes />
                            </button>
                        )}
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
                        {processedTrials?.length > 0 ? (
                            processedTrials.map((trial) => (
                                <ListView data={trial} key={trial.id} />
                            ))
                        ) : (
                            <div className="no-results">
                                <p>
                                    No trials found matching your search
                                    criteria.
                                </p>
                                <button
                                    onClick={clearAllSearches}
                                    className="clear-filters-btn"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* modals */}
            {activeModal && (
                <div
                    className="modal-container"
                    onClick={() => setActiveModal(null)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2>
                                {activeModal === "search" && "Advanced Search"}
                                {activeModal === "filter" && "Filter Trials"}
                                {activeModal === "query" && "Saved Queries"}
                                {activeModal === "export" && "Export Data"}
                            </h2>
                            <button
                                className="close-button"
                                onClick={() => setActiveModal(null)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            {activeModal === "search" && (
                                <AdvancedSearchModal
                                    isOpen={activeModal === "search"}
                                    onClose={() => setActiveModal(null)}
                                    onSearch={handleAdvancedSearch}
                                    initialCriteria={advancedSearchCriteria}
                                />
                            )}
                            {activeModal === "filter" && (
                                <div>
                                    <p>Filter options will go here</p>
                                </div>
                            )}
                            {activeModal === "query" && (
                                <div>
                                    <p>Saved queries will go here</p>
                                </div>
                            )}
                            {activeModal === "export" && (
                                <div>
                                    <p>Export options will go here</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdvancedSearchModal = ({
    isOpen,
    onClose,
    onSearch,
    initialCriteria = [],
}) => {
    const [searchCriteria, setSearchCriteria] = useState(() => {
        if (initialCriteria.length > 0) {
            return initialCriteria;
        }
        return [
            {
                id: 1,
                field: "Choose Field",
                operator: "Operator",
                value: "",
                boolean: "AND",
            },
        ];
    });

    const fieldOptions = [
        "Disease Type",
        "Therapeutic Area",
        "Trial ID",
        "Primary Drug",
        "Trial Status",
        "Sponsor",
        "Phase",
        "Title",
        "Other Drugs",
        "Countries",
        "Region",
        "Target Enrollment",
        "Actual Enrollment",
        "Age From",
        "Age To",
    ];

    const operatorOptions = {
        "Disease Type": ["Contains", "Equals", "Does not contain"],
        "Therapeutic Area": ["Contains", "Equals", "Does not contain"],
        "Trial ID": ["Equals", "Contains", "Starts with"],
        "Primary Drug": ["Contains", "Equals", "Does not contain"],
        "Trial Status": ["Contains", "Equals", "Does not contain"],
        Sponsor: ["Contains", "Equals", "Does not contain"],
        Phase: ["Contains", "Equals", "Does not contain"],
        Title: ["Contains", "Equals", "Does not contain"],
        "Other Drugs": ["Contains", "Equals", "Does not contain"],
        Countries: ["Contains", "Equals", "Does not contain"],
        Region: ["Contains", "Equals", "Does not contain"],
        "Target Enrollment": [">=", "<=", "=", ">", "<"],
        "Actual Enrollment": [">=", "<=", "=", ">", "<"],
        "Age From": [">=", "<=", "=", ">", "<"],
        "Age To": [">=", "<=", "=", ">", "<"],
    };

    const booleanOptions = ["AND", "OR"];

    const updateCriteria = (id, field, value) => {
        setSearchCriteria((prev) =>
            prev.map((criteria) => {
                if (criteria.id === id) {
                    const updated = { ...criteria, [field]: value };
                    if (field === "field") {
                        updated.operator = "Operator";
                    }
                    return updated;
                }
                return criteria;
            }),
        );
    };

    const addCriteria = () => {
        const newId = Math.max(...searchCriteria.map((c) => c.id)) + 1;
        setSearchCriteria((prev) => [
            ...prev,
            {
                id: newId,
                field: "Choose Field",
                operator: "Operator",
                value: "",
                boolean: "AND",
            },
        ]);
    };

    const removeCriteria = (id) => {
        if (searchCriteria.length > 1) {
            setSearchCriteria((prev) =>
                prev.filter((criteria) => criteria.id !== id),
            );
        }
    };

    const handleSearch = () => {
        onSearch(searchCriteria);
        onClose();
    };

    const clearAllCriteria = () => {
        setSearchCriteria([
            {
                id: 1,
                field: "Choose Field",
                operator: "Operator",
                value: "",
                boolean: "AND",
            },
        ]);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-container" onClick={onClose}>
            <div
                className="modal-content advanced-search-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2>Advanced search</h2>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="search-criteria-container">
                        {searchCriteria.map((criteria, index) => (
                            <div
                                key={criteria.id}
                                className="search-criteria-row"
                            >
                                <div className="criteria-controls">
                                    <div className="field-selector">
                                        <select
                                            value={criteria.field}
                                            onChange={(e) =>
                                                updateCriteria(
                                                    criteria.id,
                                                    "field",
                                                    e.target.value,
                                                )
                                            }
                                            className="dropdown-select"
                                        >
                                            <option value="Choose Field">
                                                Choose Field
                                            </option>
                                            {fieldOptions.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <IoIosArrowDown className="dropdown-arrow" />
                                    </div>

                                    <div className="operator-selector">
                                        <select
                                            value={criteria.operator}
                                            onChange={(e) =>
                                                updateCriteria(
                                                    criteria.id,
                                                    "operator",
                                                    e.target.value,
                                                )
                                            }
                                            className="dropdown-select operator-dropdown"
                                            disabled={
                                                criteria.field ===
                                                "Choose Field"
                                            }
                                        >
                                            <option value="Operator">
                                                Operator
                                            </option>
                                            {criteria.field !==
                                                "Choose Field" &&
                                                operatorOptions[
                                                    criteria.field
                                                ]?.map((option) => (
                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>
                                                ))}
                                        </select>
                                        <IoIosArrowDown className="dropdown-arrow" />
                                    </div>

                                    <div className="value-input">
                                        <input
                                            type="text"
                                            value={criteria.value}
                                            onChange={(e) =>
                                                updateCriteria(
                                                    criteria.id,
                                                    "value",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter search term..."
                                            className="search-input"
                                            disabled={
                                                criteria.operator === "Operator"
                                            }
                                        />
                                    </div>

                                    {index < searchCriteria.length - 1 && (
                                        <div className="boolean-selector">
                                            <select
                                                value={criteria.boolean}
                                                onChange={(e) =>
                                                    updateCriteria(
                                                        criteria.id,
                                                        "boolean",
                                                        e.target.value,
                                                    )
                                                }
                                                className="dropdown-select boolean-dropdown"
                                            >
                                                <option value="Boolean">
                                                    Boolean
                                                </option>
                                                {booleanOptions.map(
                                                    (option) => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                            <IoIosArrowDown className="dropdown-arrow" />
                                        </div>
                                    )}
                                </div>

                                <div className="criteria-actions">
                                    <button
                                        className="add-criteria-btn"
                                        onClick={addCriteria}
                                        title="Add criteria"
                                    >
                                        <FaPlus />
                                    </button>
                                    {searchCriteria.length > 1 && (
                                        <button
                                            className="remove-criteria-btn"
                                            onClick={() =>
                                                removeCriteria(criteria.id)
                                            }
                                            title="Remove criteria"
                                        >
                                            <FaMinus />
                                        </button>
                                    )}
                                </div>

                                <div className="row-controls">
                                    <button
                                        className="expand-btn"
                                        title="Expand row"
                                    >
                                        <IoIosArrowDown />
                                    </button>
                                    <button
                                        className="collapse-btn"
                                        title="Collapse row"
                                    >
                                        <IoIosArrowDown
                                            style={{
                                                transform: "rotate(180deg)",
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="modal-footer">
                        <div className="footer-left">
                            <button className="secondary-btn">
                                Open saved queries
                            </button>
                            <button className="secondary-btn">
                                Save this Query
                            </button>
                        </div>
                        <div className="footer-right">
                            <button
                                className="secondary-btn"
                                onClick={clearAllCriteria}
                            >
                                Clear All
                            </button>
                            <button
                                className="primary-btn"
                                onClick={handleSearch}
                            >
                                Run Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
