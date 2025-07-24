import "./index.scss";
import { ListView } from "@/components/TrialsPreviews/ListView";

export const TrialsListing = () => {
    return (
        <div className="trial-listing-container">
            <div className="listing-container">
                <div className="listing-header-container">header</div>
                <ListView />
            </div>
        </div>
    );
};
