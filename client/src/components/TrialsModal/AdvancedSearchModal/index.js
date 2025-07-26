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
import { SaveCurrentQueryModal } from "../SaveCurrentQueryModal";

export const AdvancedSearchModal = ({
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

    // ... existing field options, operator options, and utility functions ...

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

    // Create current query object for the save modal
    const getCurrentQuery = () => ({
        searchQuery,
        advancedSearchCriteria: searchCriteria.filter(
            (c) =>
                c.field !== "Choose Field" &&
                c.operator !== "Operator" &&
                c.value.trim() !== "",
        ),
        sortBy,
        sortOrder,
    });

    if (!isOpen) return null;

    return (
        <div className="advanced-search-container">
            {showSaveForm ? (
                // Use the SaveCurrentQueryModal component
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
                    <SaveCurrentQueryModal
                        queryName={queryName}
                        setQueryName={setQueryName}
                        queryDescription={queryDescription}
                        setQueryDescription={setQueryDescription}
                        onSave={handleSaveQuery}
                        isLoading={isSaving}
                        currentQuery={getCurrentQuery()}
                        onClose={() => setShowSaveForm(false)}
                    />
                </div>
            ) : showSavedQueries ? (
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
