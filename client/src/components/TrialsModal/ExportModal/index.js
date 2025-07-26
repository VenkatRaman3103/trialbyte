import React, { useState } from "react";
import "./index.scss";
import { IoClose } from "react-icons/io5";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { unparse } from "papaparse";

export const ExportModal = ({
    isOpen,
    onClose,
    trials = [],
    selectedTrials = [],
}) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set(selectedTrials));

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
        const updated = new Set(selectedItems);
        if (updated.has(trialId)) {
            updated.delete(trialId);
        } else {
            updated.add(trialId);
        }
        setSelectedItems(updated);
        setSelectAll(updated.size === trials.length);
    };

    const getStatusColor = (status) => {
        switch ((status || "").toLowerCase()) {
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

    const handleExport = () => {
        const selectedTrialData = trials.filter((trial) =>
            selectedItems.has(trial.id),
        );

        if (!selectedTrialData.length) return;

        const rows = selectedTrialData.map((trial) => ({
            TrialID: trial.trialIdentifier || trial.id,
            TherapeuticArea: trial.therapeuticArea || "Oncology",
            DiseaseType: trial.diseaseType || "Lung Cancer",
            PrimaryDrug: trial.primaryDrugs || "Paclitaxel",
            Status: trial.status || "Open",
            Sponsor: trial.sponsorCollaborators || "Astellas",
            Phase: trial.trialPhase || trial.phase || "2",
        }));

        const csv = unparse(rows);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "trials_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        onClose();
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
                        <span>
                            {selectedItems.size} of {trials.length} trials
                            selected
                        </span>
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
                                        #{trial.trialIdentifier || trial.id}
                                    </div>
                                    <div className="row-column therapeutic-area">
                                        🎗️ {trial.therapeuticArea || "Oncology"}
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
