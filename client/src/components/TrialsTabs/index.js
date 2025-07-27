"use client";
import { getSelectTrials } from "@/api/trials/selectedTrials/getSelectTrials";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Download, FileText, X, Plus } from "lucide-react";
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
                        <div className="trial-content-banner-top">
                            <div className="trial-content-banner-heading">
                                Therapeutic Area :
                            </div>
                            <div className="trial-content-banner-tags">
                                <div className="trial-content-banner-tag">
                                    some
                                </div>
                            </div>
                        </div>
                        <div className="trial-content-banner-bottom">
                            <div className="trial-content-banner-heading">
                                Trial Identifier :
                            </div>
                            <div className="trial-content-banner-tags">
                                <div className="trial-content-banner-tag">
                                    some
                                </div>
                                <div className="trial-content-banner-tag">
                                    some
                                </div>
                                <div className="trial-content-banner-tag">
                                    some
                                </div>
                                <div className="trial-content-banner-tag">
                                    some
                                </div>
                                <div className="trial-content-banner-tag">
                                    some
                                </div>
                                <div className="trial-content-banner-tag">
                                    some
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* content section */}
                    <div className="trial-contents-section">
                        <Content>
                            <h1>Scientific Title </h1>
                            <p>
                                Multicenter 3-arm Trial to Evaluate the Efficacy
                                and Safety of Pasireotide LAR or Everolimus
                                Alone or in Combination in Patients With Well
                                Differentiated Neuroendocrine Carcinoma of the
                                Lung and Thymus - LUNA Trial.
                            </p>
                        </Content>

                        <Content>
                            <h1>Line of Therapy</h1>
                            <ul>
                                <li>Differentiated Neuroendocrine Carcinoma</li>
                                <li>Differentiated Neuroendocrine Carcinoma</li>
                                <li>Differentiated Neuroendocrine Carcinoma</li>
                                <li>Differentiated Neuroendocrine Carcinoma</li>
                            </ul>
                        </Content>

                        <Content>
                            <h1>Key Information</h1>
                            <table className="fixed-width-heading">
                                <tr>
                                    <td className="heading">some:</td>
                                    <td>some</td>
                                </tr>

                                <tr>
                                    <td className="heading">some:</td>
                                    <td>some</td>
                                </tr>

                                <tr>
                                    <td className="heading">some:</td>
                                    <td>some</td>
                                </tr>

                                <tr>
                                    <td className="heading">some:</td>
                                    <td>some</td>
                                </tr>
                            </table>
                        </Content>
                        <Content>
                            <h1>Countries</h1>
                            <div className="tags-container">
                                <div className="tag">some</div>
                                <div className="tag">some</div>
                                <div className="tag">some</div>
                                <div className="tag active">some</div>
                                <div className="tag">some</div>
                                <div className="tag">some</div>
                            </div>
                        </Content>

                        <Content>
                            <h1>Line of Therapy</h1>
                            <div>
                                <p>
                                    <span>Differentiated </span>Neuroendocrine
                                    Carcinoma
                                </p>

                                <p>
                                    <span>Differentiated </span>Neuroendocrine
                                    Carcinoma
                                </p>

                                <p>
                                    <span>Differentiated </span>Neuroendocrine
                                    Carcinoma
                                </p>

                                <p>
                                    <span>Differentiated </span>Neuroendocrine
                                    <ul>
                                        <li>some</li>
                                        <li>some</li>
                                        <li>some</li>
                                        <li>some</li>
                                    </ul>
                                </p>
                            </div>
                        </Content>
                        <Section heading={"Heading"}>
                            <Content>
                                <h1>Scientific Title </h1>
                                <p>
                                    Multicenter 3-arm Trial to Evaluate the
                                    Efficacy and Safety of Pasireotide LAR or
                                    Everolimus Alone or in Combination in
                                    Patients With Well Differentiated
                                    Neuroendocrine Carcinoma of the Lung and
                                    Thymus - LUNA Trial.
                                </p>
                            </Content>

                            <Content>
                                <h1>Line of Therapy</h1>
                                <ul>
                                    <li>
                                        Differentiated Neuroendocrine Carcinoma
                                    </li>
                                    <li>
                                        Differentiated Neuroendocrine Carcinoma
                                    </li>
                                    <li>
                                        Differentiated Neuroendocrine Carcinoma
                                    </li>
                                    <li>
                                        Differentiated Neuroendocrine Carcinoma
                                    </li>
                                </ul>
                            </Content>

                            <Content>
                                <h1>Key Information</h1>
                                <table className="fixed-width-heading">
                                    <tr>
                                        <td className="heading">some:</td>
                                        <td>some</td>
                                    </tr>

                                    <tr>
                                        <td className="heading">some:</td>
                                        <td>some</td>
                                    </tr>

                                    <tr>
                                        <td className="heading">some:</td>
                                        <td>some</td>
                                    </tr>

                                    <tr>
                                        <td className="heading">some:</td>
                                        <td>some</td>
                                    </tr>
                                </table>
                            </Content>
                        </Section>

                        <Section heading={"Treatment Plan"}>
                            <Content>
                                <h1>Scientific Title </h1>
                                <p>
                                    Multicenter 3-arm Trial to Evaluate the
                                    Efficacy and Safety of Pasireotide LAR or
                                    Everolimus Alone or in Combination in
                                    Patients With Well Differentiated
                                    Neuroendocrine Carcinoma of the Lung and
                                    Thymus - LUNA Trial.
                                </p>
                            </Content>

                            <Content>
                                <h1>Line of Therapy</h1>
                                <ul>
                                    <li>
                                        Differentiated Neuroendocrine Carcinoma
                                    </li>
                                    <li>
                                        Differentiated Neuroendocrine Carcinoma
                                    </li>
                                    <li>
                                        Differentiated Neuroendocrine Carcinoma
                                    </li>
                                    <li>
                                        Differentiated Neuroendocrine Carcinoma
                                    </li>
                                </ul>
                            </Content>

                            <Content>
                                <h1>Key Information</h1>
                                <table className="fixed-width-heading">
                                    <tr>
                                        <td className="heading">some:</td>
                                        <td>some</td>
                                    </tr>

                                    <tr>
                                        <td className="heading">some:</td>
                                        <td>some</td>
                                    </tr>

                                    <tr>
                                        <td className="heading">some:</td>
                                        <td>some</td>
                                    </tr>

                                    <tr>
                                        <td className="heading">some:</td>
                                        <td>some</td>
                                    </tr>
                                </table>
                            </Content>
                        </Section>
                        <Section heading={"Heading"} column="double">
                            <div className="left">
                                <Content>
                                    <h1>Key Information</h1>
                                    <table className="fixed-width-heading">
                                        <tr>
                                            <td className="heading">some:</td>
                                            <td>some</td>
                                        </tr>

                                        <tr>
                                            <td className="heading">some:</td>
                                            <td>some</td>
                                        </tr>

                                        <tr>
                                            <td className="heading">some:</td>
                                            <td>some</td>
                                        </tr>

                                        <tr>
                                            <td className="heading">some:</td>
                                            <td>some</td>
                                        </tr>
                                    </table>
                                </Content>
                            </div>
                            <div className="right">
                                <Boxes
                                    heading={"Ages Eligible for Study"}
                                    description={
                                        "Adult patients with advanced (unresectable or metastatic) neuroendocrine carcinoma of the lung and thymus"
                                    }
                                />
                                <Boxes
                                    heading={"Ages Eligible for Study"}
                                    description={
                                        "Adult patients with advanced (unresectable or metastatic) neuroendocrine carcinoma of the lung and thymus"
                                    }
                                />
                                <Boxes
                                    heading={"Ages Eligible for Study"}
                                    description={
                                        "Adult patients with advanced (unresectable or metastatic) neuroendocrine carcinoma of the lung and thymus"
                                    }
                                />
                            </div>
                        </Section>
                        <ClinicalTrialTimeline />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Content = ({ children }) => {
    return <div className="main-content-wrapper">{children}</div>;
};

export const Section = ({ children, heading, column = "single" }) => {
    return (
        <div className={`main-section-wrapper ${column}`}>
            <div className="main-section-wrapper-heading-container">
                <h1 className="main-section-wrapper-heading">{heading}</h1>
            </div>

            <div
                className={`main-section-wrapper-content-container  ${column}`}
            >
                {children}
            </div>
        </div>
    );
};

export const Boxes = ({ description, heading }) => {
    return (
        <div className="box-container">
            <div className="box-heading">{heading}</div>
            <div className="box-descrption">{description}</div>
        </div>
    );
};

const ClinicalTrialTimeline = () => {
    const [openCards, setOpenCards] = useState({
        card1: true, // CT.gov card is open by default
        card2: false,
        card3: false,
    });

    const toggleCard = (cardId) => {
        setOpenCards((prev) => ({
            ...prev,
            [cardId]: !prev[cardId],
        }));
    };

    return (
        <div className="clinical-trial-container">
            {/* Main Table */}
            <div className="trial-table">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Start Date</th>
                            <th>Inclusion Period(months)</th>
                            <th>Enrolment closed date</th>
                            <th>
                                Treatment & Primary Outcome Measurement Duration
                                (months)
                            </th>
                            <th>Trial Completion date</th>
                            <th>Duration to Publish Result (months)</th>
                            <th>Result Published date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="category-cell">Actual</td>
                            <td>08/16/2013</td>
                            <td>68.4</td>
                            <td>05/10/2019</td>
                            <td>9.3</td>
                            <td>02/10/2020</td>
                            <td>20.1</td>
                            <td>10/13/2021</td>
                        </tr>
                    </tbody>
                </table>

                {/* Duration Summary */}
                <div className="duration-summary">
                    <div className="duration-item">
                        <span className="duration-label">
                            Overall duration to Complete:
                        </span>
                        <span className="duration-value complete">94</span>
                        <span className="duration-unit">(months)</span>
                    </div>
                    <div className="duration-item">
                        <span className="duration-label">
                            Overall duration to publish result:
                        </span>
                        <span className="duration-value publish">115</span>
                        <span className="duration-unit">(months)</span>
                    </div>
                </div>
            </div>

            {/* Reference Section */}
            <div className="reference-section">
                <h3 className="reference-title">Reference</h3>

                <div className="reference-cards">
                    {/* First Card - CT.gov */}
                    <div className="reference-card">
                        <div
                            className={`card-header ${openCards.card1 ? "open" : ""}`}
                        >
                            <span className="card-date">April 2, 2021</span>
                            <span className="card-source">CT.gov</span>
                            <button
                                className={`toggle-btn ${openCards.card1 ? "close" : ""}`}
                                onClick={() => toggleCard("card1")}
                            >
                                {openCards.card1 ? (
                                    <X size={16} />
                                ) : (
                                    <Plus size={16} />
                                )}
                            </button>
                        </div>
                        {openCards.card1 && (
                            <div className="card-content">
                                <div className="study-info">
                                    <p>
                                        <strong>Study Start (Actual):</strong>{" "}
                                        2013-08-16
                                    </p>
                                    <p>
                                        <strong>
                                            Primary Completion (Actual):
                                        </strong>{" "}
                                        2020-02-10
                                    </p>
                                    <p>
                                        <strong>
                                            Study Completion (Actual):
                                        </strong>{" "}
                                        2020-02-10
                                    </p>
                                </div>
                                <div className="card-actions">
                                    <button className="action-btn primary">
                                        View source
                                    </button>
                                    <button className="action-btn secondary">
                                        <FileText size={16} />
                                        Attachments
                                    </button>
                                    <button className="action-btn icon-btn">
                                        <Download size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Second Card - EUCTR */}
                    <div className="reference-card">
                        <div
                            className={`card-header ${openCards.card2 ? "open" : ""}`}
                        >
                            <span className="card-date">Jan 10, 2021</span>
                            <span className="card-source">EUCTR</span>
                            <button
                                className="toggle-btn"
                                onClick={() => toggleCard("card2")}
                            >
                                {openCards.card2 ? (
                                    <X size={16} />
                                ) : (
                                    <Plus size={16} />
                                )}
                            </button>
                        </div>
                        {openCards.card2 && (
                            <div className="card-content">
                                <div className="study-info">
                                    <p>
                                        <strong>Protocol Number:</strong>{" "}
                                        2013-002345-12
                                    </p>
                                    <p>
                                        <strong>Sponsor:</strong> European
                                        Medicines Agency
                                    </p>
                                    <p>
                                        <strong>Study Status:</strong> Completed
                                    </p>
                                    <p>
                                        <strong>Start Date:</strong> 2013-08-15
                                    </p>
                                    <p>
                                        <strong>End Date:</strong> 2020-02-15
                                    </p>
                                </div>
                                <div className="card-actions">
                                    <button className="action-btn primary">
                                        View source
                                    </button>
                                    <button className="action-btn secondary">
                                        <FileText size={16} />
                                        Attachments
                                    </button>
                                    <button className="action-btn icon-btn">
                                        <Download size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Third Card - PubMed */}
                    <div className="reference-card">
                        <div
                            className={`card-header ${openCards.card3 ? "open" : ""}`}
                        >
                            <span className="card-date">April 2, 2021</span>
                            <span className="card-source">PubMed</span>
                            <button
                                className="toggle-btn"
                                onClick={() => toggleCard("card3")}
                            >
                                {openCards.card3 ? (
                                    <X size={16} />
                                ) : (
                                    <Plus size={16} />
                                )}
                            </button>
                        </div>
                        {openCards.card3 && (
                            <div className="card-content">
                                <div className="study-info">
                                    <p>
                                        <strong>PMID:</strong> 33456789
                                    </p>
                                    <p>
                                        <strong>Title:</strong> Long-term
                                        efficacy and safety results from phase
                                        III clinical trial
                                    </p>
                                    <p>
                                        <strong>Authors:</strong> Smith J,
                                        Johnson A, Brown K, et al.
                                    </p>
                                    <p>
                                        <strong>Journal:</strong> New England
                                        Journal of Medicine
                                    </p>
                                    <p>
                                        <strong>Publication Date:</strong>{" "}
                                        2021-04-02
                                    </p>
                                </div>
                                <div className="card-actions">
                                    <button className="action-btn primary">
                                        View source
                                    </button>
                                    <button className="action-btn secondary">
                                        <FileText size={16} />
                                        Attachments
                                    </button>
                                    <button className="action-btn icon-btn">
                                        <Download size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
