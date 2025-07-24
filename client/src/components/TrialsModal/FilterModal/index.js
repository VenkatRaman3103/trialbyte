"use client";
import { useState, useMemo } from "react";
import "./index.scss";
import { FaTimes } from "react-icons/fa";

export const FilterModal = ({
    isOpen,
    onClose,
    onApplyFilters,
    initialFilters = {},
}) => {
    const [filters, setFilters] = useState({
        therapeuticArea: initialFilters.therapeuticArea || [],
        status: initialFilters.status || [],
        diseaseType: initialFilters.diseaseType || [],
        patientSegment: initialFilters.patientSegment || [],
        lineOfTherapy: initialFilters.lineOfTherapy || [],
        primaryDrug: initialFilters.primaryDrug || [],
        secondaryDrug: initialFilters.secondaryDrug || [],
        trialPhase: initialFilters.trialPhase || [],
        countries: initialFilters.countries || [],
        sponsorsCollaborators: initialFilters.sponsorsCollaborators || [],
        sponsorFieldOfActivity: initialFilters.sponsorFieldOfActivity || [],
        associatedCRO: initialFilters.associatedCRO || [],
        trialTags: initialFilters.trialTags || [],
        sex: initialFilters.sex || [],
        healthyVolunteers: initialFilters.healthyVolunteers || [],
    });

    const [selectedCategory, setSelectedCategory] = useState("trialPhase");

    // Filter categories for the left sidebar
    const filterCategories = [
        { key: "therapeuticArea", label: "Therapeutic Area" },
        { key: "status", label: "Status" },
        { key: "diseaseType", label: "Disease Type" },
        { key: "patientSegment", label: "Patient Segment" },
        { key: "lineOfTherapy", label: "Line of Therapy" },
        { key: "primaryDrug", label: "Primary Drug" },
        { key: "secondaryDrug", label: "Secondary Drug" },
        { key: "trialPhase", label: "Trial Phase" },
        { key: "countries", label: "Countries" },
        { key: "sponsorsCollaborators", label: "Sponsors & Collaborators" },
        { key: "sponsorFieldOfActivity", label: "Sponsor Field of Activity" },
        { key: "associatedCRO", label: "Associated CRO" },
        { key: "trialTags", label: "Trial Tags" },
        { key: "sex", label: "Sex" },
        { key: "healthyVolunteers", label: "Healthy Volunteers" },
    ];

    // Filter options for each category
    const filterOptions = {
        trialPhase: [
            "Phase I",
            "Phase I/II",
            "Phase II",
            "Phase II/III",
            "Phase III",
            "Phase III/IV",
            "Phase IV",
        ],
        therapeuticArea: [
            "Oncology",
            "Cardiovascular",
            "Neurology",
            "Immunology",
            "Infectious Diseases",
            "Respiratory",
            "Endocrinology",
            "Dermatology",
        ],
        status: [
            "Planned",
            "Open",
            "Active",
            "Closed",
            "Terminated",
            "Completed",
        ],
        diseaseType: [
            "Lung Cancer",
            "Breast Cancer",
            "Colorectal Cancer",
            "Diabetes",
            "Hypertension",
            "Alzheimer's Disease",
            "Multiple Sclerosis",
            "Rheumatoid Arthritis",
        ],
        patientSegment: [
            "Adult",
            "Pediatric",
            "Elderly",
            "Pregnant Women",
            "Rare Disease",
            "Genetic Disorders",
        ],
        lineOfTherapy: [
            "First Line",
            "Second Line",
            "Third Line",
            "Adjuvant",
            "Neoadjuvant",
            "Maintenance",
        ],
        primaryDrug: [
            "Pembrolizumab",
            "Nivolumab",
            "Atezolizumab",
            "Durvalumab",
            "Bevacizumab",
            "Trastuzumab",
            "Rituximab",
            "Adalimumab",
        ],
        secondaryDrug: [
            "Carboplatin",
            "Cisplatin",
            "Paclitaxel",
            "Docetaxel",
            "Gemcitabine",
            "Cyclophosphamide",
        ],
        countries: [
            "United States",
            "Germany",
            "United Kingdom",
            "France",
            "Canada",
            "Australia",
            "Japan",
            "South Korea",
            "China",
            "India",
        ],
        sponsorsCollaborators: [
            "Pfizer",
            "Novartis",
            "Roche",
            "Johnson & Johnson",
            "Merck",
            "Bristol Myers Squibb",
            "AstraZeneca",
            "GSK",
        ],
        sponsorFieldOfActivity: [
            "Pharmaceutical",
            "Biotechnology",
            "Academic Institution",
            "Government",
            "Non-profit",
        ],
        associatedCRO: [
            "IQVIA",
            "PPD",
            "Parexel",
            "Syneos Health",
            "Charles River",
            "Covance",
        ],
        trialTags: [
            "Biomarker",
            "Companion Diagnostic",
            "Precision Medicine",
            "Combination Therapy",
            "First-in-Human",
            "Breakthrough Therapy",
        ],
        sex: ["Male", "Female", "Both"],
        healthyVolunteers: ["Yes", "No"],
    };

    const handleOptionToggle = (category, option) => {
        setFilters((prev) => ({
            ...prev,
            [category]: prev[category].includes(option)
                ? prev[category].filter((item) => item !== option)
                : [...prev[category], option],
        }));
    };

    const handleSelectAll = (category) => {
        const allOptions = filterOptions[category] || [];
        const currentSelections = filters[category] || [];

        if (currentSelections.length === allOptions.length) {
            // Deselect all
            setFilters((prev) => ({
                ...prev,
                [category]: [],
            }));
        } else {
            // Select all
            setFilters((prev) => ({
                ...prev,
                [category]: [...allOptions],
            }));
        }
    };

    const handleApplyFilters = () => {
        onApplyFilters(filters);
        onClose();
    };

    const handleSaveQuery = () => {
        // This would integrate with your existing save query functionality
        console.log("Save query with filters:", filters);
    };

    const clearAllFilters = () => {
        setFilters({
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

    const getTotalFiltersCount = () => {
        return Object.values(filters).reduce((total, categoryFilters) => {
            return total + categoryFilters.length;
        }, 0);
    };

    if (!isOpen) return null;

    const currentOptions = filterOptions[selectedCategory] || [];
    const currentSelections = filters[selectedCategory] || [];
    const isAllSelected =
        currentSelections.length === currentOptions.length &&
        currentOptions.length > 0;

    return (
        <div className="filter-modal-overlay">
            <div className="filter-modal">
                <div className="filter-modal-header">
                    <h2>Filters</h2>
                    <button className="filter-close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="filter-modal-content">
                    <div className="filter-sidebar">
                        {filterCategories.map((category) => {
                            const categoryFilters = filters[category] || [];
                            const hasFilters = categoryFilters.length > 0;

                            return (
                                <div
                                    key={category.key}
                                    className={`filter-category-item ${selectedCategory === category.key ? "active" : ""} ${hasFilters ? "has-filters" : ""}`}
                                    onClick={() =>
                                        setSelectedCategory(category.key)
                                    }
                                >
                                    <span className="category-label">
                                        {category.label}
                                    </span>
                                    {hasFilters && (
                                        <span className="filter-count">
                                            {categoryFilters.length}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="filter-options-panel">
                        <div className="filter-options-header">
                            <div className="select-all-section">
                                <label className="select-all-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={() =>
                                            handleSelectAll(selectedCategory)
                                        }
                                    />
                                    <span className="checkmark"></span>
                                    Select All/Deselect All
                                </label>
                            </div>
                        </div>

                        <div className="filter-options-list">
                            {currentOptions.map((option) => (
                                <label
                                    key={option}
                                    className="filter-option-item"
                                >
                                    <input
                                        type="checkbox"
                                        checked={currentSelections.includes(
                                            option,
                                        )}
                                        onChange={() =>
                                            handleOptionToggle(
                                                selectedCategory,
                                                option,
                                            )
                                        }
                                    />
                                    <span className="checkmark"></span>
                                    <span className="option-label">
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="filter-modal-footer">
                    <button
                        className="save-query-btn"
                        onClick={handleSaveQuery}
                    >
                        Save this Query
                    </button>
                    <button className="run-btn" onClick={handleApplyFilters}>
                        Run
                    </button>
                </div>
            </div>
        </div>
    );
};
