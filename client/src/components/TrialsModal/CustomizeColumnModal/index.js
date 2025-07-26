import React, { useState, useEffect } from "react";
import "./index.scss";

export const CustomizeColumnModal = ({
    isOpen,
    onClose,
    onApplyColumns,
    initialColumns = [],
}) => {
    // Default available columns
    const availableColumns = [
        { key: "trialId", label: "Trial ID", required: true },
        { key: "therapeuticArea", label: "Therapeutic Area", required: false },
        { key: "diseaseType", label: "Disease Type", required: false },
        { key: "primaryDrug", label: "Primary Drug", required: false },
        { key: "trialStatus", label: "Trial status", required: false },
        { key: "sponsor", label: "Sponsor", required: false },
        { key: "phase", label: "Phase", required: false },
        { key: "phaseIV1", label: "Phase IV", required: false },
        { key: "phaseIV2", label: "Phase IV", required: false },
        { key: "phaseIV3", label: "Phase IV", required: false },
        { key: "phaseIV4", label: "Phase IV", required: false },
        { key: "phaseIV5", label: "Phase IV", required: false },
        { key: "phaseIV6", label: "Phase IV", required: false },
        { key: "phaseIV7", label: "Phase IV", required: false },
        { key: "phaseIV8", label: "Phase IV", required: false },
    ];

    const [selectedColumns, setSelectedColumns] = useState(() => {
        if (initialColumns.length > 0) {
            return initialColumns;
        }
        // Default selected columns
        return [
            "trialId",
            "therapeuticArea",
            "diseaseType",
            "primaryDrug",
            "trialStatus",
            "sponsor",
            "phase",
        ];
    });

    useEffect(() => {
        if (initialColumns.length > 0) {
            setSelectedColumns(initialColumns);
        }
    }, [initialColumns]);

    const handleColumnToggle = (columnKey) => {
        // Don't allow unchecking required columns
        const column = availableColumns.find((col) => col.key === columnKey);
        if (column?.required && selectedColumns.includes(columnKey)) {
            return;
        }

        setSelectedColumns((prev) => {
            if (prev.includes(columnKey)) {
                return prev.filter((key) => key !== columnKey);
            } else {
                return [...prev, columnKey];
            }
        });
    };

    const handleApply = () => {
        onApplyColumns(selectedColumns);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="customize-column-modal-overlay" onClick={onClose}>
            <div
                className="customize-column-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="customize-column-modal-header">
                    <h3>Customize column view</h3>
                    <button
                        className="customize-column-modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="customize-column-modal-content">
                    <div className="select-columns-section">
                        <div className="select-columns-header">
                            Select columns
                        </div>

                        <div className="columns-list">
                            {availableColumns.map((column) => {
                                const isSelected = selectedColumns.includes(
                                    column.key,
                                );
                                const isRequired = column.required;

                                return (
                                    <label
                                        key={column.key}
                                        className={`column-option ${isSelected ? "selected" : ""} ${isRequired ? "required" : ""}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() =>
                                                handleColumnToggle(column.key)
                                            }
                                            disabled={isRequired && isSelected}
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span className="column-label">
                                            {column.label}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="customize-column-modal-footer">
                    <button
                        className="modify-columns-btn"
                        onClick={handleApply}
                    >
                        <span className="btn-icon">✎</span>
                        Modify columns
                    </button>
                </div>
            </div>
        </div>
    );
};
