"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import "./index.scss";
import { ListView } from "@/components/TrialsPreviews/ListView";
import { getAllTrials } from "@/api/trials/getAllTrials";
import {
    getAllSavedQueries,
    createSavedQuery,
    deleteSavedQuery,
    executeSavedQuery,
    toggleFavorite,
    getQueryHistory,
    getFavoriteQueries,
} from "@/api/trials/searchQuery";

import { IoSearch } from "react-icons/io5";
import { FaRegFolder, FaTimes, FaStar, FaRegStar } from "react-icons/fa";
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
import { MdDelete, MdEdit } from "react-icons/md";

export const TrialsListing = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");
    const [advancedSearchCriteria, setAdvancedSearchCriteria] = useState([]);
    const [saveQueryName, setSaveQueryName] = useState("");
    const [saveQueryDescription, setSaveQueryDescription] = useState("");

    const queryClient = useQueryClient();

    /// --- QUERIES ---
    const { data: allTrials, isLoading: trialsLoading } = useQuery({
        queryFn: getAllTrials,
        queryKey: ["all-trials"],
    });

    const { data: savedQueriesData, isLoading: savedQueriesLoading } = useQuery(
        {
            queryFn: () => getAllSavedQueries(),
            queryKey: ["saved-queries"],
        },
    );

    const { data: queryHistoryData } = useQuery({
        queryFn: () => getQueryHistory({ limit: 20 }),
        queryKey: ["query-history"],
    });

    const { data: favoriteQueriesData } = useQuery({
        queryFn: () => getFavoriteQueries(),
        queryKey: ["favorite-queries"],
    });

    /// --- MUTATIONS ---
    const createQueryMutation = useMutation({
        mutationFn: createSavedQuery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saved-queries"] });
            setSaveQueryName("");
            setSaveQueryDescription("");
            setActiveModal(null);
        },
        onError: (error) => {
            console.error("Failed to save query:", error);
            alert("Failed to save query. Please try again.");
        },
    });

    const deleteQueryMutation = useMutation({
        mutationFn: deleteSavedQuery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saved-queries"] });
            queryClient.invalidateQueries({ queryKey: ["favorite-queries"] });
        },
        onError: (error) => {
            console.error("Failed to delete query:", error);
            alert("Failed to delete query. Please try again.");
        },
    });

    const executeQueryMutation = useMutation({
        mutationFn: ({ id, executionData }) =>
            executeSavedQuery(id, executionData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saved-queries"] });
            queryClient.invalidateQueries({ queryKey: ["query-history"] });
        },
    });

    const toggleFavoriteMutation = useMutation({
        mutationFn: toggleFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saved-queries"] });
            queryClient.invalidateQueries({ queryKey: ["favorite-queries"] });
        },
    });

    // Search and filtering logic (same as before)
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

    // Event handlers
    const handleSortChange = (sortField) => {
        if (sortBy === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(sortField);
            setSortOrder("asc");
        }
    };

    const handleHeaderSort = (sortField) => {
        handleSortChange(sortField);
    };

    const openRespectiveModal = (modalType) => {
        setActiveModal(modalType);
    };

    const handleAdvancedSearch = (criteria) => {
        setAdvancedSearchCriteria(criteria);
        setActiveModal(null);

        // Log search execution
        if (criteria.length > 0) {
            const executionTime = Date.now();
            // You might want to track this differently
        }
    };

    const clearAllSearches = () => {
        setSearchQuery("");
        setAdvancedSearchCriteria([]);
        setSortBy("");
        setSortOrder("asc");
    };

    // Save current query
    const handleSaveQuery = () => {
        if (!saveQueryName.trim()) {
            alert("Please enter a query name");
            return;
        }

        const queryData = {
            name: saveQueryName,
            description: saveQueryDescription,
            searchCriteria: advancedSearchCriteria,
            simpleSearch: searchQuery,
            sortBy: sortBy,
            sortOrder: sortOrder,
        };

        createQueryMutation.mutate(queryData);
    };

    // Save query from advanced search criteria
    const handleSaveFromAdvancedSearch = (
        criteria,
        queryName,
        queryDescription,
    ) => {
        if (!queryName.trim()) {
            alert("Please enter a query name");
            return;
        }

        const queryData = {
            name: queryName,
            description: queryDescription,
            searchCriteria: criteria,
            simpleSearch: searchQuery,
            sortBy: sortBy,
            sortOrder: sortOrder,
        };

        createQueryMutation.mutate(queryData);
    };

    // Load saved query
    const handleLoadQuery = (query) => {
        setSearchQuery(query.simpleSearch || "");
        setAdvancedSearchCriteria(query.searchCriteria || []);
        setSortBy(query.sortBy || "");
        setSortOrder(query.sortOrder || "asc");
        setActiveModal(null);

        // Execute query tracking
        if (query.id) {
            executeQueryMutation.mutate({
                id: query.id,
                executionData: {
                    resultsCount: processedTrials.length,
                    executionTime: 100, // You might want to measure this properly
                },
            });
        }
    };

    // Delete query
    const handleDeleteQuery = (queryId) => {
        if (window.confirm("Are you sure you want to delete this query?")) {
            deleteQueryMutation.mutate(queryId);
        }
    };

    // Toggle favorite
    const handleToggleFavorite = (queryId) => {
        toggleFavoriteMutation.mutate(queryId);
    };

    const getCurrentQueryHasChanges = () => {
        return searchQuery || advancedSearchCriteria.length > 0 || sortBy;
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
                        {savedQueriesData?.data?.length > 0 && (
                            <span className="search-indicator">
                                ({savedQueriesData.data.length})
                            </span>
                        )}
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

                    <div
                        className="listing-sidebar-option-section"
                        onClick={() => {
                            if (getCurrentQueryHasChanges()) {
                                setActiveModal("save-current");
                            }
                        }}
                        style={{
                            cursor: getCurrentQueryHasChanges()
                                ? "pointer"
                                : "not-allowed",
                            opacity: getCurrentQueryHasChanges() ? 1 : 0.5,
                        }}
                    >
                        <CiSaveDown2 className="option-icon" />
                        Save This Query
                    </div>
                    <div
                        className="listing-sidebar-option-section"
                        onClick={() => setActiveModal("history")}
                        style={{ cursor: "pointer" }}
                    >
                        <GoHistory className="option-icon" />
                        Query History
                    </div>
                    <div
                        className="listing-sidebar-option-section"
                        onClick={() => setActiveModal("favorites")}
                        style={{ cursor: "pointer" }}
                    >
                        <CiBookmark className="option-icon" />
                        Favorite Queries
                        {favoriteQueriesData?.data?.length > 0 && (
                            <span className="search-indicator">
                                ({favoriteQueriesData.data.length})
                            </span>
                        )}
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
                        {trialsLoading ? (
                            <div className="loading-state">
                                Loading trials...
                            </div>
                        ) : processedTrials?.length > 0 ? (
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

            {/* Modals */}
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
                                {activeModal === "save-current" &&
                                    "Save Current Query"}
                                {activeModal === "history" && "Query History"}
                                {activeModal === "favorites" &&
                                    "Favorite Queries"}
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
                                    onSaveQuery={handleSaveFromAdvancedSearch}
                                    onOpenSavedQueries={() =>
                                        setActiveModal("query")
                                    }
                                    savedQueries={savedQueriesData?.data || []}
                                    isLoading={savedQueriesLoading}
                                    onLoadQuery={handleLoadQuery}
                                    searchQuery={searchQuery}
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    isSaving={createQueryMutation.isPending}
                                />
                            )}
                            {activeModal === "filter" && (
                                <div>
                                    <p>Filter options will go here</p>
                                </div>
                            )}
                            {activeModal === "query" && (
                                <SavedQueriesModal
                                    queries={savedQueriesData?.data || []}
                                    isLoading={savedQueriesLoading}
                                    onLoadQuery={handleLoadQuery}
                                    onDeleteQuery={handleDeleteQuery}
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            )}
                            {activeModal === "save-current" && (
                                <SaveCurrentQueryModal
                                    queryName={saveQueryName}
                                    setQueryName={setSaveQueryName}
                                    queryDescription={saveQueryDescription}
                                    setQueryDescription={
                                        setSaveQueryDescription
                                    }
                                    onSave={handleSaveQuery}
                                    isLoading={createQueryMutation.isPending}
                                    currentQuery={{
                                        searchQuery,
                                        advancedSearchCriteria,
                                        sortBy,
                                        sortOrder,
                                    }}
                                />
                            )}
                            {activeModal === "history" && (
                                <QueryHistoryModal
                                    history={queryHistoryData?.data || []}
                                    onLoadQuery={handleLoadQuery}
                                />
                            )}
                            {activeModal === "favorites" && (
                                <FavoriteQueriesModal
                                    favorites={favoriteQueriesData?.data || []}
                                    onLoadQuery={handleLoadQuery}
                                    onDeleteQuery={handleDeleteQuery}
                                    onToggleFavorite={handleToggleFavorite}
                                />
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

// Advanced Search Modal Component
const AdvancedSearchModal = ({
    isOpen,
    onClose,
    onSearch,
    initialCriteria = [],
    onSaveQuery,
    onOpenSavedQueries,
    savedQueries,
    isLoading,
    onLoadQuery,
    searchQuery,
    sortBy,
    sortOrder,
    isSaving,
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

    const [showSaveForm, setShowSaveForm] = useState(false);
    const [queryName, setQueryName] = useState("");
    const [queryDescription, setQueryDescription] = useState("");
    const [showSavedQueries, setShowSavedQueries] = useState(false);

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

    const handleSaveQuery = () => {
        if (!queryName.trim()) {
            alert("Please enter a query name");
            return;
        }

        onSaveQuery(searchCriteria, queryName, queryDescription);
        setQueryName("");
        setQueryDescription("");
        setShowSaveForm(false);
    };

    const handleLoadSavedQuery = (query) => {
        onLoadQuery(query);
        setShowSavedQueries(false);
    };

    if (!isOpen) return null;

    return (
        <div className="advanced-search-container">
            {showSavedQueries ? (
                <div className="saved-queries-section">
                    <div className="section-header">
                        <h3>Saved Queries</h3>
                        <button
                            onClick={() => setShowSavedQueries(false)}
                            className="back-btn"
                        >
                            ← Back to Search
                        </button>
                    </div>
                    {isLoading ? (
                        <div className="loading-state">
                            Loading saved queries...
                        </div>
                    ) : savedQueries.length === 0 ? (
                        <div className="empty-state">
                            <p>No saved queries found.</p>
                        </div>
                    ) : (
                        <div className="queries-list">
                            {savedQueries.map((query) => (
                                <div key={query.id} className="query-item">
                                    <div className="query-info">
                                        <h4>{query.name}</h4>
                                        {query.description && (
                                            <p className="query-description">
                                                {query.description}
                                            </p>
                                        )}
                                        <div className="query-details">
                                            {query.simpleSearch && (
                                                <span className="detail-tag">
                                                    Search: "
                                                    {query.simpleSearch}"
                                                </span>
                                            )}
                                            {query.searchCriteria &&
                                                query.searchCriteria.length >
                                                    0 && (
                                                    <span className="detail-tag">
                                                        {
                                                            query.searchCriteria
                                                                .length
                                                        }{" "}
                                                        advanced criteria
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleLoadSavedQuery(query)
                                        }
                                        className="load-btn"
                                    >
                                        Load
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : showSaveForm ? (
                <div className="save-form-section">
                    <div className="section-header">
                        <h3>Save Current Search</h3>
                        <button
                            onClick={() => setShowSaveForm(false)}
                            className="back-btn"
                        >
                            ← Back to Search
                        </button>
                    </div>
                    <div className="save-form">
                        <div className="current-query-summary">
                            <h4>Query Summary:</h4>
                            <div className="summary-details">
                                {searchQuery && (
                                    <p>Simple Search: "{searchQuery}"</p>
                                )}
                                {searchCriteria.filter(
                                    (c) =>
                                        c.field !== "Choose Field" &&
                                        c.operator !== "Operator" &&
                                        c.value.trim() !== "",
                                ).length > 0 && (
                                    <p>
                                        Advanced Criteria:{" "}
                                        {
                                            searchCriteria.filter(
                                                (c) =>
                                                    c.field !==
                                                        "Choose Field" &&
                                                    c.operator !== "Operator" &&
                                                    c.value.trim() !== "",
                                            ).length
                                        }{" "}
                                        conditions
                                    </p>
                                )}
                                {sortBy && (
                                    <p>
                                        Sort: {sortBy} ({sortOrder})
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="queryName">Query Name *</label>
                            <input
                                id="queryName"
                                type="text"
                                value={queryName}
                                onChange={(e) => setQueryName(e.target.value)}
                                placeholder="Enter a name for this query..."
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="queryDescription">
                                Description (Optional)
                            </label>
                            <textarea
                                id="queryDescription"
                                value={queryDescription}
                                onChange={(e) =>
                                    setQueryDescription(e.target.value)
                                }
                                placeholder="Describe what this query is for..."
                                className="form-textarea"
                                rows={3}
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                onClick={handleSaveQuery}
                                disabled={!queryName.trim() || isSaving}
                                className="primary-btn"
                            >
                                {isSaving ? "Saving..." : "Save Query"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="search-criteria-section">
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
                            </div>
                        ))}
                    </div>

                    <div className="modal-footer">
                        <div className="footer-left">
                            <button
                                className="secondary-btn"
                                onClick={() => setShowSavedQueries(true)}
                            >
                                Open saved queries
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => setShowSaveForm(true)}
                            >
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
            )}
        </div>
    );
};

// Saved Queries Modal Component
const SavedQueriesModal = ({
    queries,
    isLoading,
    onLoadQuery,
    onDeleteQuery,
    onToggleFavorite,
}) => {
    if (isLoading) {
        return <div className="loading-state">Loading saved queries...</div>;
    }

    if (!queries || queries.length === 0) {
        return (
            <div className="empty-state">
                <p>No saved queries found.</p>
                <p>Save your current search to get started!</p>
            </div>
        );
    }

    return (
        <div className="saved-queries-list">
            {queries.map((query) => (
                <div key={query.id} className="saved-query-item">
                    <div className="query-info">
                        <div className="query-header">
                            <h4>{query.name}</h4>
                            <div className="query-actions">
                                <button
                                    onClick={() => onToggleFavorite(query.id)}
                                    className="favorite-btn"
                                    title={
                                        query.isFavorite
                                            ? "Remove from favorites"
                                            : "Add to favorites"
                                    }
                                >
                                    {query.isFavorite ? (
                                        <FaStar />
                                    ) : (
                                        <FaRegStar />
                                    )}
                                </button>
                                <button
                                    onClick={() => onDeleteQuery(query.id)}
                                    className="delete-btn"
                                    title="Delete query"
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                        {query.description && (
                            <p className="query-description">
                                {query.description}
                            </p>
                        )}
                        <div className="query-details">
                            {query.simpleSearch && (
                                <span className="detail-tag">
                                    Search: "{query.simpleSearch}"
                                </span>
                            )}
                            {query.searchCriteria &&
                                query.searchCriteria.length > 0 && (
                                    <span className="detail-tag">
                                        {query.searchCriteria.length} advanced
                                        criteria
                                    </span>
                                )}
                            {query.sortBy && (
                                <span className="detail-tag">
                                    Sort: {query.sortBy} ({query.sortOrder})
                                </span>
                            )}
                        </div>
                        <div className="query-meta">
                            <span>Used {query.usageCount || 0} times</span>
                            {query.lastUsedAt && (
                                <span>
                                    Last used:{" "}
                                    {new Date(
                                        query.lastUsedAt,
                                    ).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => onLoadQuery(query)}
                        className="load-query-btn"
                    >
                        Load Query
                    </button>
                </div>
            ))}
        </div>
    );
};

// Save Current Query Modal Component
const SaveCurrentQueryModal = ({
    queryName,
    setQueryName,
    queryDescription,
    setQueryDescription,
    onSave,
    isLoading,
    currentQuery,
}) => {
    return (
        <div className="save-query-form">
            <div className="current-query-summary">
                <h4>Current Query Summary:</h4>
                <div className="query-summary-details">
                    {currentQuery.searchQuery && (
                        <p>Simple Search: "{currentQuery.searchQuery}"</p>
                    )}
                    {currentQuery.advancedSearchCriteria.length > 0 && (
                        <p>
                            Advanced Criteria:{" "}
                            {currentQuery.advancedSearchCriteria.length}{" "}
                            conditions
                        </p>
                    )}
                    {currentQuery.sortBy && (
                        <p>
                            Sort: {currentQuery.sortBy} (
                            {currentQuery.sortOrder})
                        </p>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="queryName">Query Name *</label>
                <input
                    id="queryName"
                    type="text"
                    value={queryName}
                    onChange={(e) => setQueryName(e.target.value)}
                    placeholder="Enter a name for this query..."
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="queryDescription">Description (Optional)</label>
                <textarea
                    id="queryDescription"
                    value={queryDescription}
                    onChange={(e) => setQueryDescription(e.target.value)}
                    placeholder="Describe what this query is for..."
                    className="form-textarea"
                    rows={3}
                />
            </div>

            <div className="form-actions">
                <button
                    onClick={onSave}
                    disabled={!queryName.trim() || isLoading}
                    className="primary-btn"
                >
                    {isLoading ? "Saving..." : "Save Query"}
                </button>
            </div>
        </div>
    );
};

// Query History Modal Component
const QueryHistoryModal = ({ history, onLoadQuery }) => {
    if (!history || history.length === 0) {
        return (
            <div className="empty-state">
                <p>No query history found.</p>
            </div>
        );
    }

    return (
        <div className="query-history-list">
            {history.map((item) => (
                <div key={item.id} className="history-item">
                    <div className="history-info">
                        <div className="history-header">
                            <h4>{item.queryName || "Ad-hoc Query"}</h4>
                            <span className="history-date">
                                {new Date(item.executedAt).toLocaleString()}
                            </span>
                        </div>
                        <div className="history-details">
                            {item.simpleSearch && (
                                <span className="detail-tag">
                                    Search: "{item.simpleSearch}"
                                </span>
                            )}
                            {item.searchCriteria &&
                                item.searchCriteria.length > 0 && (
                                    <span className="detail-tag">
                                        {item.searchCriteria.length} advanced
                                        criteria
                                    </span>
                                )}
                            <span className="detail-tag">
                                {item.resultsCount} results
                            </span>
                            <span className="detail-tag">
                                {item.executionTime}ms
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() =>
                            onLoadQuery({
                                simpleSearch: item.simpleSearch,
                                searchCriteria: item.searchCriteria,
                                sortBy: item.sortBy,
                                sortOrder: item.sortOrder,
                            })
                        }
                        className="load-query-btn"
                    >
                        Load Query
                    </button>
                </div>
            ))}
        </div>
    );
};

// Favorite Queries Modal Component
const FavoriteQueriesModal = ({
    favorites,
    onLoadQuery,
    onDeleteQuery,
    onToggleFavorite,
}) => {
    if (!favorites || favorites.length === 0) {
        return (
            <div className="empty-state">
                <p>No favorite queries found.</p>
                <p>Mark queries as favorites to see them here!</p>
            </div>
        );
    }

    return (
        <div className="favorite-queries-list">
            {favorites.map((query) => (
                <div key={query.id} className="favorite-query-item">
                    <div className="query-info">
                        <div className="query-header">
                            <h4>{query.name}</h4>
                            <div className="query-actions">
                                <button
                                    onClick={() => onToggleFavorite(query.id)}
                                    className="favorite-btn active"
                                    title="Remove from favorites"
                                >
                                    <FaStar />
                                </button>
                                <button
                                    onClick={() => onDeleteQuery(query.id)}
                                    className="delete-btn"
                                    title="Delete query"
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                        {query.description && (
                            <p className="query-description">
                                {query.description}
                            </p>
                        )}
                        <div className="query-meta">
                            <span>Used {query.usageCount || 0} times</span>
                            {query.lastUsedAt && (
                                <span>
                                    Last used:{" "}
                                    {new Date(
                                        query.lastUsedAt,
                                    ).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => onLoadQuery(query)}
                        className="load-query-btn"
                    >
                        Load Query
                    </button>
                </div>
            ))}
        </div>
    );
};
