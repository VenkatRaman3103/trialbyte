import "./index.scss";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

export const SavedQueriesModal = ({
    queries,
    isLoading,
    onLoadQuery,
    onDeleteQuery,
    onClose,
}) => {
    const [selectedQueries, setSelectedQueries] = useState([]);

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedQueries(queries.map((query) => query.id));
        } else {
            setSelectedQueries([]);
        }
    };

    const handleSelectQuery = (queryId, checked) => {
        if (checked) {
            setSelectedQueries((prev) => [...prev, queryId]);
        } else {
            setSelectedQueries((prev) => prev.filter((id) => id !== queryId));
        }
    };

    const handleRemoveSelected = () => {
        selectedQueries.forEach((queryId) => {
            onDeleteQuery(queryId);
        });
        setSelectedQueries([]);
    };

    if (isLoading) {
        return (
            <div className="saved-queries-modal">
                <div className="modal-header">
                    <h2>Saved Queries</h2>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="loading-state">Loading saved queries...</div>
            </div>
        );
    }

    if (!queries || queries.length === 0) {
        return (
            <div className="saved-queries-modal">
                <div className="modal-header">
                    <h2>Saved Queries</h2>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="empty-state">
                    <p>No saved queries found.</p>
                    <p>Save your current search to get started!</p>
                </div>
            </div>
        );
    }

    const isAllSelected = selectedQueries.length === queries.length;
    const isIndeterminate =
        selectedQueries.length > 0 && selectedQueries.length < queries.length;

    return (
        <div className="saved-queries-modal">
            <div className="saved-queries-container">
                <table className="saved-queries-table">
                    <thead>
                        <tr>
                            <th className="checkbox-col">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    ref={(input) => {
                                        if (input)
                                            input.indeterminate =
                                                isIndeterminate;
                                    }}
                                    onChange={(e) =>
                                        handleSelectAll(e.target.checked)
                                    }
                                />
                            </th>
                            <th className="sno-col">S.no</th>
                            <th className="title-col">Query Title</th>
                            <th className="description-col">Description</th>
                            <th className="render-col">Render</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.map((query, index) => (
                            <tr key={query.id} className="saved-query-row">
                                <td className="checkbox-col">
                                    <input
                                        type="checkbox"
                                        checked={selectedQueries.includes(
                                            query.id,
                                        )}
                                        onChange={(e) =>
                                            handleSelectQuery(
                                                query.id,
                                                e.target.checked,
                                            )
                                        }
                                    />
                                </td>
                                <td className="sno-col">{index + 1}</td>
                                <td className="title-col">
                                    <span className="query-title">
                                        {query.name}
                                    </span>
                                </td>
                                <td className="description-col">
                                    <span className="query-description">
                                        {query.description ||
                                            "No description available"}
                                    </span>
                                </td>
                                <td className="render-col">
                                    <div className="action-buttons">
                                        <button
                                            onClick={() => onLoadQuery(query)}
                                            className="run-btn"
                                        >
                                            Run
                                        </button>
                                        <button
                                            className="edit-btn"
                                            title="Edit query"
                                        >
                                            <MdEdit />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedQueries.length > 0 && (
                    <div className="bulk-actions">
                        <button
                            onClick={handleRemoveSelected}
                            className="remove-selected-btn"
                        >
                            Remove Selected Queries
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
