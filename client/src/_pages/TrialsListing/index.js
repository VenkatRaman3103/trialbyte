"use client";
import { useQuery } from "@tanstack/react-query";
import "./index.scss";
import { ListView } from "@/components/TrialsPreviews/ListView";
import { getAllTrials } from "@/api/trials/getAllTrials";

export const TrialsListing = () => {
    /// --- QUERY ---
    const { data: allTrials } = useQuery({
        queryFn: getAllTrials,
        queryKey: ["all-trials"],
    });

    return (
        <div className="trial-listing-container">
            <div className="listing-container">
                <div className="listing-header-container">header</div>
                {allTrials?.map((trial) => (
                    <ListView data={trial} key={trial.id} />
                ))}
            </div>
        </div>
    );
};
