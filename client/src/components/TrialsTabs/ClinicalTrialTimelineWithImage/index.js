import { Download, FileText, X, Plus } from "lucide-react";
import "./index.scss";
import { useState } from "react";
import Image from "next/image";

export const ClinicalTrialTimelineWithImage = ({ data }) => {
    const [openCards, setOpenCards] = useState({
        card1: true,
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
                <div className="trial-table-image-section">
                    <Image
                        src={`/map_image.svg`}
                        alt="Clinical Trial Illustration"
                        layout="fill"
                        objectFit="contain"
                    />
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

const TrialPublish = () => {
    return (
        <div className="trialPublish-container">
            <div className="trialPublish-card">
                <div className="trialPublish-header">
                    <div>
                        <span className="trialPublish-header-label">
                            Date :
                        </span>{" "}
                        October 23, 2021
                    </div>
                    <div>
                        <span className="trialPublish-header-label">
                            Result Type :
                        </span>{" "}
                        Full Results
                    </div>
                    <div>
                        <span className="trialPublish-header-label">
                            Source :
                        </span>{" "}
                        PubMed
                        <span className="trialPublish-infoIcon">
                            &#9432;
                        </span>{" "}
                    </div>
                </div>

                <h2 className="trialPublish-title">
                    Efficacy and safety of long-acting pasireotide or everolimus
                    alone or in combination in patients with advanced carcinoids
                    of the lung and thymus (LUNA):
                </h2>
                <div className="trialPublish-content">
                    <p className="trialPublish-authors">
                        Piero Ferolla, Maria Pia Brizzi, Tim Meyer, Wasat
                        Mansoor, Julien Mazieres, Christine Do Cao, Hervé Léna,
                        Alfredo Berruti
                    </p>

                    <div className="trialPublish-section">
                        <h3 className="trialPublish-sectionTitle">Results :</h3>
                        <p className="trialPublish-sectionText">
                            11 patients died during the core 12-month treatment
                            phase or up to 56 days after the last study
                            treatment exposure date: two (5%) of 41 in the
                            long-acting pasireotide group, six (14%) of 42 in
                            the everolimus group, and three (7%) of 41 in the
                            combination group. No deaths were suspected to be
                            related to long-acting pasireotide treatment. One
                            death in the everolimus group (acute kidney injury
                            associated with diarrhoea), and two deaths in the
                            combination group (diarrhoea and urinary sepsis in
                            one patient, and acute renal failure and respiratory
                            failure in one patient) were suspected to be related
                            to everolimus treatment. In the latter patient,
                            acute renal failure was not suspected to be related
                            to everolimus treatment, but respiratory failure was
                            suspected to be related.
                        </p>
                    </div>

                    <div className="trialPublish-conclusionSection">
                        <h3 className="trialPublish-sectionTitle">
                            Conclusion :
                        </h3>
                        <p className="trialPublish-sectionText">
                            The study met the primary endpoint in all three
                            treatment groups. Safety profiles were consistent
                            with the known safety profiles of these agents.
                            Further studies are needed to confirm the antitumour
                            efficacy of the combination of a somatostatin
                            analogue with everolimus in lung and thymic
                            carcinoids
                        </p>
                    </div>

                    <div className="trialPublish-footer">
                        <button className="trialPublish-button trialPublish-button-primary">
                            View source
                        </button>
                        <button className="trialPublish-button trialPublish-button-secondary">
                            Full Text
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StudyPublication = () => {
    return (
        <div className="studyPublication-card">
            <div className="studyPublication-header">
                <div>
                    <span className="studyPublication-header-label">
                        Date :
                    </span>{" "}
                    January 25, 2020
                </div>
                <div>
                    <span className="studyPublication-header-label">
                        Result Type :
                    </span>{" "}
                    Interim Results
                </div>
                <div>
                    <span className="studyPublication-header-label">
                        Source :
                    </span>{" "}
                    PubMed
                </div>
            </div>

            <div className="studyPublication-title">
                A Multicenter Randomized Phase III Study of Single Agent
                Efficacy and Optimal Combination Sequence of Everolimus and
                Pasireotide LAR in Advanced Thyroid Cancer.
            </div>
        </div>
    );
};
