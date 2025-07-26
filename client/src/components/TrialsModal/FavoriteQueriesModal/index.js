import "./index.scss";

export const FavoriteQueriesModal = ({ favorites }) => {
    if (!favorites || favorites.length === 0) {
        return (
            <div className="empty-state">
                <p>No favorite queries found.</p>
                <p>Mark queries as favorites to see them here!</p>
            </div>
        );
    }

    return (
        <div className="favorite-queries-list">
            {favorites.map((title) => (
                <FavoriteTitlesItems data={title} />
            ))}
            <div className="favorite-queries-list-cta-container">
                <div className="favorite-queries-btn remove">remove</div>
                <div className="favorite-queries-btn open">open</div>
                <div className="favorite-queries-btn export">export</div>
            </div>
        </div>
    );
};

export const FavoriteTitlesItems = ({ data }) => {
    const {
        status,
        trialIdentifier: trialId,
        therapeuticArea,
        diseaseType,
        primaryDrugs,
        sponsorCollaborators,
        trialPhase,
    } = data || {};
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
        </div>,
    );
};
