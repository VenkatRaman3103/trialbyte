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
import { FilterModal } from "@/components/TrialsModal/FilterModal";
import { AdvancedSearchModal } from "@/components/TrialsModal/AdvancedSearchModal";
import { FavoriteQueriesModal } from "@/components/TrialsModal/FavoriteQueriesModal";
import { SavedQueriesModal } from "@/components/TrialsModal/SavedQueriesModal";
import { QueryHistoryModal } from "@/components/TrialsModal/QueryHistroyModal";
import { SaveCurrentQueryModal } from "@/components/TrialsModal/SaveCurrentQueryModal";

export const TrialsListing = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");
    const [advancedSearchCriteria, setAdvancedSearchCriteria] = useState([]);
    const [saveQueryName, setSaveQueryName] = useState("");
    const [saveQueryDescription, setSaveQueryDescription] = useState("");

    // Add filter criteria state
    const [filterCriteria, setFilterCriteria] = useState({
        therapeuticArea: [],
        status: [],
        diseaseType: [],
        patientSegment: [],
        lineOfTherapy: [],
        primaryDrug: [],
        secondaryDrug: [],
        trialPhase: [],
        countries: [],
        sponsorsCollaborators: [],
        sponsorFieldOfActivity: [],
        associatedCRO: [],
        trialTags: [],
        sex: [],
        healthyVolunteers: [],
    });

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

    // Search and filtering logic
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

    // Add filter criteria matching function
    const matchesFilterCriteria = (trial, filters) => {
        // Helper function to check if trial matches filter category
        const matchesCategory = (trialValue, filterValues) => {
            if (!filterValues || filterValues.length === 0) return true;
            if (!trialValue) return false;

            const trialValueLower = trialValue.toLowerCase();
            return filterValues.some((filterValue) =>
                trialValueLower.includes(filterValue.toLowerCase()),
            );
        };

        // Check each filter category
        return (
            matchesCategory(trial.therapeuticArea, filters.therapeuticArea) &&
            matchesCategory(trial.status, filters.status) &&
            matchesCategory(trial.diseaseType, filters.diseaseType) &&
            matchesCategory(trial.trialPhase, filters.trialPhase) &&
            matchesCategory(trial.primaryDrugs, filters.primaryDrug) &&
            matchesCategory(
                trial.sponsorCollaborators,
                filters.sponsorsCollaborators,
            ) &&
            matchesCategory(trial.countries, filters.countries) &&
            matchesCategory(trial.otherDrugs, filters.secondaryDrug)
            // Add more filter checks as needed for other fields
        );
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

    // Updated processedTrials to include filter criteria
    const processedTrials = useMemo(() => {
        if (!allTrials) return [];

        let filtered = allTrials.filter((trial) => {
            const matchesSimple = matchesSimpleSearch(trial, searchQuery);
            const matchesAdvanced = matchesSearchCriteria(
                trial,
                advancedSearchCriteria,
            );
            const matchesFilters = matchesFilterCriteria(trial, filterCriteria);
            return matchesSimple && matchesAdvanced && matchesFilters;
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
    }, [
        allTrials,
        sortBy,
        sortOrder,
        searchQuery,
        advancedSearchCriteria,
        filterCriteria,
    ]);

    // Get total active filters count
    const getActiveFiltersCount = () => {
        return Object.values(filterCriteria).reduce(
            (total, categoryFilters) => {
                return total + categoryFilters.length;
            },
            0,
        );
    };

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

    // Handle filter application
    const handleApplyFilters = (newFilters) => {
        setFilterCriteria(newFilters);
        setActiveModal(null);
    };

    // Clear all filters function
    const clearAllFilters = () => {
        setFilterCriteria({
            therapeuticArea: [],
            status: [],
            diseaseType: [],
            patientSegment: [],
            lineOfTherapy: [],
            primaryDrug: [],
            secondaryDrug: [],
            trialPhase: [],
            countries: [],
            sponsorsCollaborators: [],
            sponsorFieldOfActivity: [],
            associatedCRO: [],
            trialTags: [],
            sex: [],
            healthyVolunteers: [],
        });
    };

    // Updated clearAllSearches to include filters
    const clearAllSearches = () => {
        setSearchQuery("");
        setAdvancedSearchCriteria([]);
        setSortBy("");
        setSortOrder("asc");
        clearAllFilters();
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
            filterCriteria: filterCriteria, // Include filter criteria
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
            filterCriteria: filterCriteria, // Include filter criteria
        };

        createQueryMutation.mutate(queryData);
    };

    // Load saved query
    const handleLoadQuery = (query) => {
        setSearchQuery(query.simpleSearch || "");
        setAdvancedSearchCriteria(query.searchCriteria || []);
        setSortBy(query.sortBy || "");
        setSortOrder(query.sortOrder || "asc");

        // Load filter criteria if available
        if (query.filterCriteria) {
            setFilterCriteria(query.filterCriteria);
        } else {
            clearAllFilters();
        }

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
        return (
            searchQuery ||
            advancedSearchCriteria.length > 0 ||
            sortBy ||
            getActiveFiltersCount() > 0
        );
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

                {/* Updated Search Status Bar to include filter information */}
                {(searchQuery ||
                    advancedSearchCriteria.length > 0 ||
                    getActiveFiltersCount() > 0) && (
                    <div className="search-status-bar">
                        <span>
                            Showing {processedTrials.length} of{" "}
                            {allTrials?.length || 0} trials
                            {searchQuery && ` matching "${searchQuery}"`}
                            {advancedSearchCriteria.length > 0 &&
                                ` with ${advancedSearchCriteria.length} advanced criteria`}
                            {getActiveFiltersCount() > 0 &&
                                ` and ${getActiveFiltersCount()} active filters`}
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
                    {/* Updated Filter Button to show active filters count */}
                    <div
                        className="listing-cta-button-container filter-button"
                        onClick={() => openRespectiveModal("filter")}
                    >
                        <IoFilterOutline className="cta-icon" />
                        Filter
                        {getActiveFiltersCount() > 0 && (
                            <span className="search-indicator">
                                ({getActiveFiltersCount()})
                            </span>
                        )}
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

            {activeModal === "filter" && (
                <FilterModal
                    isOpen={activeModal === "filter"}
                    onClose={() => setActiveModal(null)}
                    onApplyFilters={handleApplyFilters}
                    initialFilters={filterCriteria}
                />
            )}

            {/* Modals */}
            {activeModal && activeModal !== "filter" && (
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
                                        filterCriteria,
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
