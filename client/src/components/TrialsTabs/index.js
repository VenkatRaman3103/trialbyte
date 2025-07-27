"use client";
import { getSelectTrials } from "@/api/trials/selectedTrials/getSelectTrials";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "./index.scss";

export const TrialsTabs = () => {
    const { data: data } = useQuery({
        queryFn: () => getSelectTrials(),
        queryKey: ["selected-trials"],
    });

    const [activeTrialId, setActiveTrialId] = useState();
    const [activeTrial, setActiveTrial] = useState();

    useEffect(() => {
        if (data) {
            setActiveTrialId(data[0].id);
        }
    }, [data]);

    useEffect(() => {
        setActiveTrial(
            () => data?.filter((item) => item.id == activeTrialId)[0],
        );
    }, [activeTrialId]);

    console.log(activeTrial, "activeTrial");

    if (!activeTrial) {
        return <div>Loading...</div>;
    }

    return (
        <div className="trial-page-container">
            <div className="trial-page-tabs-container">
                {data?.map((item) => (
                    <div
                        className={`trial-page-tab ${activeTrialId === item.id ? "active" : ""}`}
                        key={item.id}
                        onClick={() => setActiveTrialId(item.id)}
                    >
                        {item.trialIdentifier}
                    </div>
                ))}
            </div>
            <div className="trial-content-container">
                <div className="trial-content-header-container">
                    <div className="trial-content-header-icon"></div>
                    <div className="trial-content-heading">
                        3-arm Trial to Evaluate Pasireotide LAR/​Everolimus
                        Alone/​in Combination in Patients With Lung/Thymus NET -
                        LUNA Trial (LUNA)
                    </div>
                </div>
                <div className="trial-content-body-container">
                    {/* over view section*/}
                    <div className="trial-content-overview-section">
                        <div className="trial-content-overview-section-header">
                            <div className="overview-section-left">
                                <div className="overview-section-heading">
                                    Overview
                                </div>
                                <div className="overview-section-divider"></div>
                                <div className="overview-section-status-container">
                                    <div className="overview-section-status-laber">
                                        status:
                                    </div>
                                    <div className="overview-section-status-button">
                                        {activeTrial.status}
                                    </div>
                                </div>
                            </div>
                            <div className="overview-section-right">
                                <div className="overview-section-endpoint-container">
                                    <div className="overview-section-endpoint-laber">
                                        endpoint met
                                    </div>
                                    <div
                                        className={`overview-section-endpoint-toggle  ${activeTrial.endpointsMet == "true" ? "active" : ""}`}
                                    >
                                        <div
                                            className={`overview-section-endpoint-toggle-mark`}
                                        ></div>
                                    </div>
                                </div>
                                <div className="overview-section-result-container">
                                    <div className="overview-section-result-laber">
                                        results posted
                                    </div>
                                    {/*resultsAvailable*/}
                                    <div className="overview-section-result-toggle-btn-container">
                                        <div
                                            className={`overview-section-result-toggle-btn ${activeTrial.resultsAvailable == "true" ? "active" : ""}`}
                                        >
                                            yes
                                        </div>
                                        <div
                                            className={`overview-section-result-toggle-btn ${activeTrial.resultsAvailable == "false" ? "active" : ""}`}
                                        >
                                            no
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* banner section */}
                    <div className="trial-content-banner-section">
                        <div class="trial-content-banner-top">
                            <div class="trial-content-banner-heading">
                                Therapeutic Area :
                            </div>
                            <div className="trial-content-banner-tags">
                                <div class="trial-content-banner-tag">some</div>
                            </div>
                        </div>
                        <div class="trial-content-banner-bottom">
                            <div class="trial-content-banner-heading">
                                Trial Identifier :
                            </div>
                            <div className="trial-content-banner-tags">
                                <div class="trial-content-banner-tag">some</div>
                                <div class="trial-content-banner-tag">some</div>
                                <div class="trial-content-banner-tag">some</div>
                                <div class="trial-content-banner-tag">some</div>
                                <div class="trial-content-banner-tag">some</div>
                                <div class="trial-content-banner-tag">some</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
