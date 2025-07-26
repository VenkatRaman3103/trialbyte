import React, { useState } from "react";
import "./index.scss";
import { IoClose } from "react-icons/io5";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";

export const ExportModal = ({
    isOpen,
    onClose,
    trials = [],
    selectedTrials = [],
    onExport,
}) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set(selectedTrials));
    const [exportFormat, setExportFormat] = useState("csv");

    if (!isOpen) return null;

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(trials.map((trial) => trial.id)));
        }
        setSelectAll(!selectAll);
    };

    const handleSelectItem = (trialId) => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(trialId)) {
            newSelected.delete(trialId);
        } else {
            newSelected.add(trialId);
        }
        setSelectedItems(newSelected);
        setSelectAll(newSelected.size === trials.length);
    };

    const handleExport = () => {
        const selectedTrialData = trials.filter((trial) =>
            selectedItems.has(trial.id),
        );
        onExport?.(selectedTrialData, exportFormat);
        onClose();
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "closed":
                return "status-closed";
            case "completed":
                return "status-completed";
            case "open":
                return "status-open";
            case "terminated":
                return "status-terminated";
            case "planned":
                return "status-planned";
            default:
                return "status-default";
        }
    };

    return (
        <div className="export-modal-overlay" onClick={onClose}>
            <div
                className="export-modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="export-modal-header">
                    <h2>Export Trials</h2>
                    <button className="close-button" onClick={onClose}>
                        <IoClose />
                    </button>
                </div>

                <div className="export-modal-content">
                    <div className="export-options">
                        <div className="format-selection">
                            <label>Export Format:</label>
                            <select
                                value={exportFormat}
                                onChange={(e) =>
                                    setExportFormat(e.target.value)
                                }
                                className="format-select"
                            >
                                <option value="csv">CSV</option>
                                <option value="excel">Excel</option>
                                <option value="pdf">PDF</option>
                            </select>
                        </div>
                        <div className="selection-info">
                            <span>
                                {selectedItems.size} of {trials.length} trials
                                selected
                            </span>
                        </div>
                    </div>

                    <div className="trials-table">
                        <div className="table-header">
                            <div className="header-column select-column">
                                <button
                                    className="select-all-btn"
                                    onClick={handleSelectAll}
                                >
                                    {selectAll ||
                                    selectedItems.size === trials.length ? (
                                        <FaCheckSquare className="checkbox-icon selected" />
                                    ) : (
                                        <FaRegSquare className="checkbox-icon" />
                                    )}
                                </button>
                            </div>
                            <div className="header-column trial-id">
                                Trial ID
                            </div>
                            <div className="header-column therapeutic-area">
                                Therapeutic Area
                            </div>
                            <div className="header-column disease-type">
                                Disease Type
                            </div>
                            <div className="header-column primary-drug">
                                Primary Drug
                            </div>
                            <div className="header-column status">Status</div>
                            <div className="header-column sponsor">Sponsor</div>
                            <div className="header-column phase">Phase</div>
                        </div>

                        <div className="table-body">
                            {trials.map((trial) => (
                                <div key={trial.id} className="table-row">
                                    <div className="row-column select-column">
                                        <button
                                            className="select-item-btn"
                                            onClick={() =>
                                                handleSelectItem(trial.id)
                                            }
                                        >
                                            {selectedItems.has(trial.id) ? (
                                                <FaCheckSquare className="checkbox-icon selected" />
                                            ) : (
                                                <FaRegSquare className="checkbox-icon" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="row-column trial-id">
                                        <span className="trial-id-text">
                                            #{trial.trialIdentifier || trial.id}
                                        </span>
                                    </div>
                                    <div className="row-column therapeutic-area">
                                        <span className="therapeutic-icon">
                                            🎗️
                                        </span>
                                        <span>
                                            {trial.therapeuticArea ||
                                                "Oncology"}
                                        </span>
                                    </div>
                                    <div className="row-column disease-type">
                                        {trial.diseaseType || "Lung Cancer"}
                                    </div>
                                    <div className="row-column primary-drug">
                                        {trial.primaryDrugs || "Paclitaxel"}
                                    </div>
                                    <div className="row-column status">
                                        <span
                                            className={`status-badge ${getStatusColor(trial.status)}`}
                                        >
                                            {trial.status || "Open"}
                                        </span>
                                    </div>
                                    <div className="row-column sponsor">
                                        {trial.sponsorCollaborators ||
                                            "Astellas"}
                                    </div>
                                    <div className="row-column phase">
                                        {trial.trialPhase || trial.phase || "2"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="export-modal-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="export-btn"
                        onClick={handleExport}
                        disabled={selectedItems.size === 0}
                    >
                        <LuUpload className="export-icon" />
                        Export ({selectedItems.size})
                    </button>
                </div>
            </div>
        </div>
    );
};
