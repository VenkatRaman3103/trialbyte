import React from "react";
import "./index.scss";

export const ListView = ({ data, handleSelectItems }) => {
    console.log(data, "dataListView");

    const {
        status,
        trialIdentifier: trialId,
        therapeuticArea,
        diseaseType,
        primaryDrugs,
        sponsorCollaborators,
        trialPhase,
    } = data || {};

    const getStatusClassName = (currentStatus) => {
        switch (currentStatus?.toLowerCase()) {
            case "planned":
                return "status-planned";
            case "terminated":
                return "status-terminated";
            case "open":
                return "status-open";
            case "closed":
                return "status-closed";
            case "active":
                return "active";

            default:
                return "status-default";
        }
    };

    return (
        <div className="list-view-item">
            <div className="list-view-checkbox-wrapper">
                <input
                    type="checkbox"
                    className="list-view-checkbox"
                    onChange={() => handleSelectItems(data)}
                />
            </div>
            <div className="list-view-id">#{trialId}</div>
            <div className="list-view-icon-text">
                <span className="list-view-icon oncology-icon">
                    {therapeuticArea}
                </span>
            </div>
            <div className="list-view-text">{diseaseType}</div>
            <div className="list-view-text">{primaryDrugs}</div>
            <div className={`list-view-status status ${status}`}>{status}</div>
            <div className="list-view-text">{sponsorCollaborators}</div>
            <div className="list-view-text">{trialPhase}</div>
        </div>
    );
};
