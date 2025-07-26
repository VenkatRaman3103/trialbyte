import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./index.scss";
import { useState } from "react";
import { deleteFavTitles } from "@/api/trials/favTitle/deleteFavTitles";

export const FavoriteQueriesModal = ({ favorites }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const queryClient = useQueryClient();

    const deleteFavTitleMutation = useMutation({
        mutationFn: () => deleteFavTitles(selectedItems),
        onSuccess: queryClient.invalidateQueries(["fav-titles"]),
    });

    if (!favorites || favorites.length === 0) {
        return (
            <div className="empty-state">
                <p>No favorite queries found.</p>
                <p>Mark queries as favorites to see them here!</p>
            </div>
        );
    }

    function handleDeleteItems() {
        deleteFavTitleMutation.mutate();
    }

    console.log(selectedItems, "selectedItems fav titles");

    return (
        <div className="favorite-queries-list">
            {favorites.map((title) => (
                <FavoriteTitlesItems
                    data={title}
                    setSelectedItems={setSelectedItems}
                    selectedItems={selectedItems}
                />
            ))}
            <div className="favorite-queries-list-cta-container">
                <div
                    className="favorite-queries-btn remove"
                    onClick={handleDeleteItems}
                >
                    remove
                </div>
                <div className="favorite-queries-btn open">open</div>
                <div className="favorite-queries-btn export">export</div>
            </div>
        </div>
    );
};

export const FavoriteTitlesItems = ({
    data,
    setSelectedItems,
    selectedItems,
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

    function handleSelectItems(id) {
        setSelectedItems((prev) => {
            if (!selectedItems.includes(id)) {
                return [...prev, id];
            } else {
                const fitered = prev.filter((item) => item != id);
                return [...fitered];
            }
        });
    }

    return (
        <div className="list-view-item">
            <div className="list-view-checkbox-wrapper">
                <input
                    type="checkbox"
                    className="list-view-checkbox"
                    onChange={() => handleSelectItems(data.id)}
                    checked={selectedItems.includes(data.id)}
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
