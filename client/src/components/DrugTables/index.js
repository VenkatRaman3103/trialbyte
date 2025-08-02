"use client";
import { useState } from "react";
import "./index.scss";
import Image from "next/image";

export const DrugTabs = () => {
    return (
        <div className="drug-page-container">
            <div className="section-container">
                <div className="section-header-container">Overview</div>
                <div className="content-container">
                    <div className="content-header-container">Drug Name</div>
                    <div className="flex-cotainer">
                        <div className="tag empty">
                            <span>Lab code : </span>IMG-7289
                        </div>
                        <div className="tag fill bgGreen">Primary</div>
                    </div>
                    <div className="tag empty">
                        <span>Generic Name : </span>Bomedemstat
                    </div>
                    <div className="tag empty">
                        <span> Other Name : </span>MK-3543
                    </div>
                </div>
                <div className="content-container">
                    <div className="content-header-container">Drug Name</div>
                    <div className="flex-cotainer">
                        <div className="tag empty no-border">
                            <span>Global Status : </span>
                        </div>
                        <div className="tag fill bgGreen">
                            Clinical Phase III
                        </div>
                    </div>
                    <div className="flex-cotainer">
                        <div className="tag empty no-border">
                            <span>Development status :</span>
                        </div>
                        <div className="tag fill bgGreen">
                            Active development
                        </div>
                    </div>
                    <div className="flex-cotainer">
                        <div className="tag empty no-border">
                            <span>Drug Summary :</span>
                        </div>
                        <div className="tag empty no-border">
                            <span>
                                Bomedemstat is an investigational
                                lysine-specific demethylase-1 (LSD1) inhibitor.
                            </span>
                        </div>
                    </div>
                    <div className="flex-cotainer">
                        <div className="tag empty no-border">
                            <span>Latest Changes :</span>
                        </div>
                        <div className="tag empty no-border">
                            <span>24, July 2024</span>
                        </div>
                    </div>
                </div>

                <div className="content-container">
                    <div className="flex-cotainer">
                        <div className="empty no-border">
                            <span>Originator :</span>
                        </div>
                        <div className="empty no-border">
                            <span>Imago Biosciences</span>
                        </div>
                    </div>
                    <div className="flex-cotainer">
                        <div className="empty no-border">
                            <span>Other active companies :</span>
                        </div>
                        <div className="empty no-border">
                            <span> Merck</span>
                        </div>
                    </div>
                    <div className="flex-cotainer">
                        <div className="empty no-border">
                            <span>Therapeutic Area :</span>
                        </div>
                        <div className="empty no-border">
                            <span>Oncology, Cardiovascular</span>
                        </div>
                    </div>
                    <div className="flex-cotainer">
                        <div className="empty no-border">
                            <span>Disease Type :</span>
                        </div>
                        <div className="empty no-border">
                            <span>
                                Prostate cancer, Melanoma, Colorectal cancer
                            </span>
                        </div>
                    </div>
                    <div className="flex-cotainer">
                        <div className="empty no-border">
                            <span>Regulatory Designations :</span>
                        </div>
                        <div className="empty no-border">
                            <span>Fast Track Approval</span>
                        </div>
                    </div>
                </div>
                <div className="content-container flex-container-fill">
                    <div className="content-header-container">Drug Name</div>
                    <div className="content-wraper flex-container-fill">
                        <div className="sub-section left">
                            <div className="flex-cotainer">
                                <div className="tag empty no-border">
                                    <span>Disease Type :</span>
                                </div>
                                <div className="tag fill bgGreen">
                                    Thrombocythemia
                                </div>
                            </div>

                            <div className="flex-cotainer">
                                <div className="tag empty no-border">
                                    <span>Therapeutic Class:</span>
                                </div>
                                <div className="tag empty no-border">
                                    <span>Antithrombotic</span>
                                </div>
                            </div>
                            <div className="flex-cotainer">
                                <div className="tag empty no-border">
                                    <span>Company :</span>
                                </div>
                                <div className="tag empty no-border">
                                    <span>Imago BioSciences</span>
                                </div>
                            </div>
                            <div className="flex-cotainer">
                                <div className="tag empty no-border">
                                    <span>Company Type :</span>
                                </div>
                                <div className="tag empty no-border">
                                    <span>Originator</span>
                                </div>
                            </div>
                            <div className="flex-cotainer">
                                <div className="tag empty no-border">
                                    <span>Development Status :</span>
                                </div>
                                <div className="tag fill bgGreen">
                                    Clinical Phase II
                                </div>
                            </div>
                            <div className="flex-cotainer column">
                                <div className="tag empty no-border">
                                    <span>Reference : </span>
                                </div>
                                <div className="tag empty no-border">
                                    <span>
                                        Study of Bomedemstat in Participants
                                        With Essential Thrombocythemia
                                        (IMG-7289-CTP-201/​MK-3543-003)
                                    </span>
                                </div>
                            </div>
                            <div className="btn-section">
                                <div className="btn">View source</div>
                            </div>
                        </div>
                        <div className="sub-section right">
                            <div className="flex-cotainer">
                                <div className="tag empty no-border">
                                    <span>Disease Type :</span>
                                </div>
                                <div className="tag fill bgGreen">
                                    Myeloproliferative Neoplasm
                                </div>
                            </div>

                            <div className="flex-cotainer">
                                <div className="tag empty no-border">
                                    <span>Therapeutic Class:</span>
                                </div>
                                <div className="tag empty no-border">
                                    <span>Anticancer</span>
                                </div>
                            </div>
                            <div className="flex-cotainer">
                                <div className="tag empty no-border">
                                    <span>Company :</span>
                                </div>
                                <div className="tag empty no-border">
                                    <span>Merck</span>
                                </div>
                            </div>
                            <div className="flex-cotainer">
                                <div className="tag empty no-border">
                                    <span>Company Type :</span>
                                </div>
                                <div className="tag empty no-border">
                                    <span>Licensee</span>
                                </div>
                            </div>
                            <div className="flex-cotainer">
                                <div className="tag empty no-border">
                                    <span>Development Status :</span>
                                </div>
                                <div className="tag fill bgGreen">
                                    Clinical Phase II
                                </div>
                            </div>
                            <div className="flex-cotainer column">
                                <div className="tag empty no-border">
                                    <span>Reference : </span>
                                </div>
                                <div className="tag empty no-border">
                                    <span>
                                        Extension Study of Bomedemstat
                                        (IMG-7289/MK-3543) in Participants With
                                        Myeloproliferative Neoplasms
                                        (IMG-7289-CTP-202/MK-3543-005)
                                    </span>
                                </div>
                            </div>
                            <div className="btn-section">
                                <div className="btn">View source</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-cotainer column  misc">
                    <div className="empty no-border">
                        <span>Source Links :</span>
                    </div>
                    <div className="empty no-border">
                        <span>
                            https://www.merck.com/research/product-pipeline/
                        </span>
                    </div>
                </div>
                <div className="flex-cotainer misc">
                    <div className="empty no-border">
                        <span>Drug Record Status :</span>
                    </div>
                    <div className="empty no-border">
                        <span>Records In Production (IP)</span>
                    </div>
                </div>
            </div>
            <div className="section-container">
                <div className="section-header-container">Development </div>
                <div className="content-container">
                    <div className="flex-cotainer">
                        <div className="tag empty no-border">
                            <span>Mechanism of action :</span>
                        </div>
                        <div className="tag fill bgGreen">LSD1 Inhibitor</div>
                    </div>
                    <div className="flex-cotainer">
                        <div className="tag empty no-border">
                            <span>Biological target :</span>
                        </div>
                        <div className="tag empty no-border">
                            <span>
                                Lysine-specific demethylase 1 (LSD1) enzyme
                            </span>
                        </div>
                    </div>
                </div>
                <div className="content-container">
                    <div className="flex-cotainer column">
                        <div className="tag empty no-border">
                            <span>Drug Technology </span>
                        </div>
                        <div className="tag empty no-border">
                            <span>
                                LSD1 inhibitors target the lysine-specific
                                demethylase 1 (LSD1) enzyme, a transcriptional
                                modulator that regulates gene expression by
                                removing methyl groups from histone H3 lysine 4
                                (H3K4) and H3K9, and are being explored for
                                cancer treatment.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="card">
                        <div className="card-header">Delivery Route</div>
                        <div className="card-body">
                            <div className="option">
                                <span className="star">☆</span> Oral
                            </div>
                            <div className="option">
                                <span className="star">☆</span> Injectable
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">Delivery Medium</div>
                        <div className="card-body">
                            <div className="option">
                                <span className="star">☆</span> Tablets
                            </div>
                            <div className="option">
                                <span className="star">☆</span> Intravenous (IV)
                            </div>
                            <div className="option">
                                <span className="star">☆</span> Intramuscular
                                (IM)
                            </div>
                        </div>
                    </div>
                </div>
                <div className="preclinical-section">
                    <h3 className="preclinical-title">Preclinical</h3>

                    <div className="preclinical-card">
                        <p className="preclinical-description">
                            Characterization of structural, biochemical,
                            pharmacokinetic, and pharmacodynamic properties of
                            the LSD1 inhibitor bomedemstat in preclinical models
                        </p>
                        <div className="preclinical-actions">
                            <button className="action-button">
                                View source
                            </button>
                            <button className="action-button">
                                Attachments <i className="fas fa-book-open"></i>
                            </button>
                            <button className="icon-button">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                    </div>

                    <div className="preclinical-card">
                        <p className="preclinical-description">
                            Inhibition of LSD1 with bomedemstat sensitizes small
                            cell lung cancer to immune checkpoint blockade and T
                            cell killing
                        </p>
                        <div className="preclinical-actions">
                            <button className="action-button">
                                View source
                            </button>
                            <button className="action-button">
                                Attachments <i className="fas fa-book-open"></i>
                            </button>
                            <button className="icon-button">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                    </div>

                    <div className="preclinical-card">
                        <p className="preclinical-description">
                            LSD1 Inhibition Prolongs Survival in Mouse Models of
                            MPN by Selectively Targeting the Disease Clone
                        </p>
                        <div className="preclinical-actions">
                            <button className="action-button">
                                View source
                            </button>
                            <button className="action-button">
                                Attachments <i className="fas fa-book-open"></i>
                            </button>
                            <button className="icon-button">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="clinical-section">
                    <h3 className="clinical-title">Clinical</h3>
                    <table className="clinical-table">
                        <thead>
                            <tr>
                                <th className="table-head">Trial ID</th>
                                <th className="table-head">Title</th>
                                <th className="table-head">Primary Drugs</th>
                                <th className="table-head">Status</th>
                                <th className="table-head">Sponsor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="table-cell">NCT05558696</td>
                                <td className="table-cell">
                                    Bomedemstat vs Hydroxyurea for Essential
                                    Thrombocythemia (MK-3543–007)
                                </td>
                                <td className="table-cell">MK-3543</td>
                                <td className="table-cell">Open</td>
                                <td className="table-cell">Merck</td>
                            </tr>
                            <tr>
                                <td className="table-cell">NCT05223920</td>
                                <td className="table-cell">
                                    Study of Bomedemstat (IMG–7289/MK–3543) in
                                    Participants With Myeloproliferative
                                    Neoplasms
                                </td>
                                <td className="table-cell">MK-3543</td>
                                <td className="table-cell">Completed</td>
                                <td className="table-cell">
                                    Imago <br /> BioSciences
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="section-container">
                <div className="section-header-container">Overview</div>
                <div className="pipeline-card">
                    <h3 className="pipeline-date">April 03, 2024</h3>

                    <div className="pipeline-image-wrapper">
                        <Image
                            src={"/map_image.svg"}
                            alt="Pipeline Table"
                            className="pipeline-image"
                            width={1024}
                            height={400}
                        />
                    </div>

                    <div className="pipeline-actions">
                        <button className="action-button">View Pipeline</button>
                        <button className="action-button">
                            Attachments <i className="fas fa-book-open"></i>
                        </button>
                        <button className="icon-button">
                            <i className="fas fa-download"></i>
                        </button>
                    </div>
                </div>
                <NewsCard />
            </div>
        </div>
    );
};

const NewsCard = () => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="news-container">
            {/* First Card (Expanded) */}
            <div className="news-card">
                <div className="news-header expanded">
                    <strong>03–April–2024:</strong> New Phase 3 data evaluating
                    everolimus (RAD0001), an investigational TROP2-directed
                    antibody–drug conjugate, in previously treated locally
                    recurrent neuroendocrine cancer.
                    <button
                        className="toggle-btn"
                        onClick={() => setExpanded(false)}
                    >
                        <i className="fas fa-minus"></i>
                    </button>
                </div>
                {expanded && (
                    <>
                        <p className="news-body">
                            Merck (NYSE: MRK), known as MSD outside of the
                            United States and Canada, today announced that new
                            data for four approved oncology medicines and four
                            pipeline candidates in more than 25 types of cancer
                            will be presented at the 2024 American Society of
                            Clinical Oncology (ASCO) Annual Meeting in Chicago
                            from May 31–June 4. New data being shared at the
                            meeting showcase the company’s continued progress to
                            advance clinical research for Merck’s broad
                            portfolio and diverse pipeline of investigational
                            candidates.
                        </p>
                        <div className="news-actions">
                            <button className="action-button">
                                View source
                            </button>
                            <button className="action-button">
                                Attachments <i className="fas fa-book-open"></i>
                            </button>
                            <button className="icon-button">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Second Card (Collapsed) */}
            <div className="news-card">
                <div className="news-header">
                    <strong>21–October–2020:</strong> A Phase III Study of
                    Safety and Efficacy of Pasireotide LAR or Everolimus Alone
                    or in Combination in Patients With Well Differentiated
                    Neuroendocrine Carcinoma of the Lung and Thymus.
                    <button
                        className="toggle-btn"
                        onClick={() => setExpanded(true)}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
