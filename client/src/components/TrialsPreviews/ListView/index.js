import React from "react";
import "./index.scss";

export const ListView = ({
    data,
    handleSelectItems,
    visibleColumns = [
        "trialId",
        "therapeuticArea",
        "diseaseType",
        "primaryDrug",
        "trialStatus",
        "sponsor",
        "phase",
    ],
}) => {
    const {
        status,
        trialIdentifier: trialId,
        therapeuticArea,
        diseaseType,
        primaryDrugs,
        sponsorCollaborators,
        trialPhase,
    } = data || {};

    // Column configuration mapping
    const columnConfig = {
        trialId: {
            value: `#${trialId}`,
            className: "trial-id",
        },
        therapeuticArea: {
            value: therapeuticArea,
            className: "therapeutic-area",
            hasIcon: true,
        },
        diseaseType: {
            value: diseaseType,
            className: "disease-type",
        },
        primaryDrug: {
            value: primaryDrugs,
            className: "primary-drug",
        },
        trialStatus: {
            value: status,
            className: "trial-status",
            isStatus: true,
        },
        sponsor: {
            value: sponsorCollaborators,
            className: "sponsor",
        },
        phase: {
            value: trialPhase,
            className: "phase",
        },
    };

    const renderCellContent = (columnKey, column) => {
        if (column.hasIcon && column.value) {
            return (
                <>
                    <span className="area-icon">
                        {column.value.charAt(0).toUpperCase()}
                    </span>
                    {column.value}
                </>
            );
        }

        if (column.isStatus) {
            const statusClass = `status-${column.value?.toLowerCase() || "default"}`;
            return (
                <span className={`status-badge ${statusClass}`}>
                    {column.value || "Unknown"}
                </span>
            );
        }

        return column.value || "-";
    };

    return (
        <tr className="list-view-row">
            <td>
                <input
                    type="checkbox"
                    className="trial-checkbox"
                    onChange={() => handleSelectItems(data)}
                />
            </td>
            {visibleColumns.map((columnKey) => {
                const column = columnConfig[columnKey];
                if (!column) return null;

                return (
                    <td key={columnKey} className={column.className}>
                        {renderCellContent(columnKey, column)}
                    </td>
                );
            })}
        </tr>
    );
};
