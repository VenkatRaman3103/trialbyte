"use client";
import React, { useState } from "react";
import "./index.css";

const DrugForm = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [activeOtherSourcesTab, setActiveOtherSourcesTab] =
        useState("pipeline-data");
    const [formData, setFormData] = useState({
        // Overview tab fields
        drugName: "",
        genericName: "",
        otherName: "",
        primaryName: "",
        globalStatus: "",
        developmentStatus: "",
        drugSummary: "",
        originator: "",
        otherActiveCompanies: "",
        therapeuticArea: "",
        diseaseType: "",
        regulatoryDesignations: "",
        sourceLinks: "",
        drugRecordStatus: "",
        developmentEntries: [
            {
                diseaseType: "",
                therapeuticClass: "",
                company: "",
                companyType: "",
                status: "",
                reference: "",
                attachments: [],
                links: [],
            },
        ],
        // Drug Activity tab fields
        mechanismOfAction: "",
        biologicalTarget: "",
        drugTechnology: "",
        deliveryRoute: "",
        deliveryMedium: "",
        // Development tab fields
        preclinical: "",
        clinicalTrials: [
            {
                trialId: "",
                title: "",
                primaryDrugs: "",
                status: "",
                sponsor: "",
            },
        ],
        // Licensing & Marketing tab fields
        agreement: "",
        licensingAvailability: "",
        marketingApprovals: "",
        // Logs tab fields
        drugChangesLog: "",
        createdDate: "",
        lastModifiedDate: "",
        lastModifiedUser: "",
        fullReviewUser: "",
        fullReview: false,
        nextReviewDate: "",
        notes: "",
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDevelopmentEntryChange = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            developmentEntries: prev.developmentEntries.map((entry, i) =>
                i === index ? { ...entry, [field]: value } : entry,
            ),
        }));
    };

    const handleClinicalTrialChange = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            clinicalTrials: prev.clinicalTrials.map((trial, i) =>
                i === index ? { ...trial, [field]: value } : trial,
            ),
        }));
    };

    const addDevelopmentRow = () => {
        setFormData((prev) => ({
            ...prev,
            developmentEntries: [
                ...prev.developmentEntries,
                {
                    diseaseType: "",
                    therapeuticClass: "",
                    company: "",
                    companyType: "",
                    status: "",
                    reference: "",
                    attachments: [],
                    links: [],
                },
            ],
        }));
    };

    const addClinicalTrial = () => {
        setFormData((prev) => ({
            ...prev,
            clinicalTrials: [
                ...prev.clinicalTrials,
                {
                    trialId: "",
                    title: "",
                    primaryDrugs: "",
                    status: "",
                    sponsor: "",
                },
            ],
        }));
    };

    const addAttachment = (entryIndex) => {
        // Placeholder for attachment functionality
        console.log("Add attachment for entry:", entryIndex);
    };

    const addLink = (entryIndex) => {
        // Placeholder for link functionality
        console.log("Add link for entry:", entryIndex);
    };

    const handleCreateRecord = () => {
        console.log("Creating new record...");
        // Add create record functionality here
    };

    const handleSaveChanges = () => {
        console.log("Saving changes...", formData);
        // Add save functionality here
    };

    const renderTabContent = () => {
        console.log("Active tab:", activeTab);
        switch (activeTab) {
            case "overview":
                return renderOverviewTab();
            case "drug-activity":
                return renderDrugActivityTab();
            case "development":
                return renderDevelopmentTab();
            case "licensing-marketing":
                return renderLicensingMarketingTab();
            case "other-sources":
                return renderOtherSourcesTab();
            case "logs":
                return renderLogsTab();
            default:
                return renderOverviewTab();
        }
    };

    const renderOtherSourcesTab = () => (
        <div className="other-sources-section">
            <div className="other-sources-navigation">
                <button
                    className={`other-sources-tab ${activeOtherSourcesTab === "pipeline-data" ? "active" : ""}`}
                    onClick={() => setActiveOtherSourcesTab("pipeline-data")}
                >
                    Pipeline Data
                </button>
                <button
                    className={`other-sources-tab ${activeOtherSourcesTab === "press-releases" ? "active" : ""}`}
                    onClick={() => setActiveOtherSourcesTab("press-releases")}
                >
                    Press Releases
                </button>
                <button
                    className={`other-sources-tab ${activeOtherSourcesTab === "publications" ? "active" : ""}`}
                    onClick={() => setActiveOtherSourcesTab("publications")}
                >
                    Publications
                </button>
            </div>

            <div className="other-sources-content">
                {activeOtherSourcesTab === "pipeline-data" && (
                    <div className="form-section">
                        <div className="form-group full-width">
                            <label>Pipeline Data</label>
                            <div className="textarea-container">
                                <textarea
                                    value={formData.pipelineData}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "pipelineData",
                                            e.target.value,
                                        )
                                    }
                                    rows="8"
                                    placeholder="Enter pipeline data information..."
                                />
                                <button
                                    type="button"
                                    className="add-circle-btn"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeOtherSourcesTab === "press-releases" && (
                    <div className="form-section">
                        <div className="form-group full-width">
                            <label>Press Releases</label>
                            <div className="textarea-container">
                                <textarea
                                    value={formData.pressReleases}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "pressReleases",
                                            e.target.value,
                                        )
                                    }
                                    rows="8"
                                    placeholder="Enter press release information..."
                                />
                                <button
                                    type="button"
                                    className="add-circle-btn"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeOtherSourcesTab === "publications" && (
                    <div className="form-section">
                        <div className="form-group full-width">
                            <label>Publications</label>
                            <div className="textarea-container">
                                <textarea
                                    value={formData.publications}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "publications",
                                            e.target.value,
                                        )
                                    }
                                    rows="8"
                                    placeholder="Enter publication information..."
                                />
                                <button
                                    type="button"
                                    className="add-circle-btn"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderOverviewTab = () => (
        <>
            <div className="form-section">
                <div className="form-row">
                    <div className="form-group">
                        <label>Drug Name - Lab code</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                value={formData.drugName}
                                onChange={(e) =>
                                    handleInputChange(
                                        "drugName",
                                        e.target.value,
                                    )
                                }
                            />
                            <span className="info-icon">?</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Generic Name</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                value={formData.genericName}
                                onChange={(e) =>
                                    handleInputChange(
                                        "genericName",
                                        e.target.value,
                                    )
                                }
                            />
                            <span className="info-icon">?</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Other Name</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                value={formData.otherName}
                                onChange={(e) =>
                                    handleInputChange(
                                        "otherName",
                                        e.target.value,
                                    )
                                }
                            />
                            <span className="info-icon">?</span>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Primary Name</label>
                        <select
                            value={formData.primaryName}
                            onChange={(e) =>
                                handleInputChange("primaryName", e.target.value)
                            }
                        >
                            <option value="">Select...</option>
                            <option value="drug-name">Drug Name</option>
                            <option value="generic-name">Generic Name</option>
                            <option value="other-name">Other Name</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Global Status</label>
                        <select
                            value={formData.globalStatus}
                            onChange={(e) =>
                                handleInputChange(
                                    "globalStatus",
                                    e.target.value,
                                )
                            }
                        >
                            <option value="">Select...</option>
                            <option value="approved">Approved</option>
                            <option value="investigational">
                                Investigational
                            </option>
                            <option value="discontinued">Discontinued</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Development status</label>
                        <select
                            value={formData.developmentStatus}
                            onChange={(e) =>
                                handleInputChange(
                                    "developmentStatus",
                                    e.target.value,
                                )
                            }
                        >
                            <option value="">Select...</option>
                            <option value="preclinical">Preclinical</option>
                            <option value="phase-1">Phase I</option>
                            <option value="phase-2">Phase II</option>
                            <option value="phase-3">Phase III</option>
                            <option value="approved">Approved</option>
                        </select>
                    </div>
                </div>

                <div className="form-group full-width">
                    <label>Drug Summary</label>
                    <textarea
                        value={formData.drugSummary}
                        onChange={(e) =>
                            handleInputChange("drugSummary", e.target.value)
                        }
                        rows="4"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Originator</label>
                        <select
                            value={formData.originator}
                            onChange={(e) =>
                                handleInputChange("originator", e.target.value)
                            }
                        >
                            <option value="">Select...</option>
                            <option value="company-1">Company 1</option>
                            <option value="company-2">Company 2</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Other Active Companies</label>
                        <select
                            value={formData.otherActiveCompanies}
                            onChange={(e) =>
                                handleInputChange(
                                    "otherActiveCompanies",
                                    e.target.value,
                                )
                            }
                        >
                            <option value="">Select...</option>
                            <option value="company-1">Company 1</option>
                            <option value="company-2">Company 2</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Therapeutic Area</label>
                        <select
                            value={formData.therapeuticArea}
                            onChange={(e) =>
                                handleInputChange(
                                    "therapeuticArea",
                                    e.target.value,
                                )
                            }
                        >
                            <option value="">Select...</option>
                            <option value="oncology">Oncology</option>
                            <option value="cardiology">Cardiology</option>
                            <option value="neurology">Neurology</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Disease Type</label>
                        <select
                            value={formData.diseaseType}
                            onChange={(e) =>
                                handleInputChange("diseaseType", e.target.value)
                            }
                        >
                            <option value="">Select...</option>
                            <option value="cancer">Cancer</option>
                            <option value="diabetes">Diabetes</option>
                            <option value="alzheimer">Alzheimer's</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Regulatory Designations</label>
                        <select
                            value={formData.regulatoryDesignations}
                            onChange={(e) =>
                                handleInputChange(
                                    "regulatoryDesignations",
                                    e.target.value,
                                )
                            }
                        >
                            <option value="">Select...</option>
                            <option value="breakthrough">
                                Breakthrough Therapy
                            </option>
                            <option value="fast-track">Fast Track</option>
                            <option value="orphan">Orphan Drug</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="development-section">
                <h3>Drug Development Status</h3>

                {formData.developmentEntries.map((entry, index) => (
                    <div key={index} className="development-entry">
                        <div className="development-row">
                            <div className="form-group">
                                <label>Disease Type</label>
                                <select
                                    value={entry.diseaseType}
                                    onChange={(e) =>
                                        handleDevelopmentEntryChange(
                                            index,
                                            "diseaseType",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Select...</option>
                                    <option value="cancer">Cancer</option>
                                    <option value="diabetes">Diabetes</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Therapeutic Class</label>
                                <select
                                    value={entry.therapeuticClass}
                                    onChange={(e) =>
                                        handleDevelopmentEntryChange(
                                            index,
                                            "therapeuticClass",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Select...</option>
                                    <option value="antibody">Antibody</option>
                                    <option value="small-molecule">
                                        Small Molecule
                                    </option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Company</label>
                                <select
                                    value={entry.company}
                                    onChange={(e) =>
                                        handleDevelopmentEntryChange(
                                            index,
                                            "company",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Select...</option>
                                    <option value="company-a">Company A</option>
                                    <option value="company-b">Company B</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Company Type</label>
                                <select
                                    value={entry.companyType}
                                    onChange={(e) =>
                                        handleDevelopmentEntryChange(
                                            index,
                                            "companyType",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Select...</option>
                                    <option value="pharmaceutical">
                                        Pharmaceutical
                                    </option>
                                    <option value="biotech">Biotech</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    value={entry.status}
                                    onChange={(e) =>
                                        handleDevelopmentEntryChange(
                                            index,
                                            "status",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Select...</option>
                                    <option value="active">Active</option>
                                    <option value="discontinued">
                                        Discontinued
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Reference</label>
                            <textarea
                                value={entry.reference}
                                onChange={(e) =>
                                    handleDevelopmentEntryChange(
                                        index,
                                        "reference",
                                        e.target.value,
                                    )
                                }
                                rows="3"
                            />
                        </div>

                        <div className="attachment-section">
                            <div className="attachment-group">
                                <label>Add Attachments</label>
                                <button
                                    type="button"
                                    className="add-btn"
                                    onClick={() => addAttachment(index)}
                                >
                                    +
                                </button>
                            </div>
                            <div className="attachment-group">
                                <label>Add Links</label>
                                <button
                                    type="button"
                                    className="add-btn"
                                    onClick={() => addLink(index)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    className="add-row-btn"
                    onClick={addDevelopmentRow}
                >
                    Add Row
                </button>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Source Links</label>
                    <div className="input-with-icon">
                        <input
                            type="text"
                            value={formData.sourceLinks}
                            onChange={(e) =>
                                handleInputChange("sourceLinks", e.target.value)
                            }
                        />
                        <span className="info-icon">?</span>
                    </div>
                </div>
                <div className="form-group">
                    <label>Drug Record Status</label>
                    <select
                        value={formData.drugRecordStatus}
                        onChange={(e) =>
                            handleInputChange(
                                "drugRecordStatus",
                                e.target.value,
                            )
                        }
                    >
                        <option value="">Select...</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>
        </>
    );

    const renderDrugActivityTab = () => (
        <div className="form-section">
            <div className="form-row">
                <div className="form-group">
                    <label>Mechanism of action</label>
                    <select
                        value={formData.mechanismOfAction}
                        onChange={(e) =>
                            handleInputChange(
                                "mechanismOfAction",
                                e.target.value,
                            )
                        }
                    >
                        <option value="">Select...</option>
                        <option value="enzyme-inhibitor">
                            Enzyme Inhibitor
                        </option>
                        <option value="receptor-agonist">
                            Receptor Agonist
                        </option>
                        <option value="receptor-antagonist">
                            Receptor Antagonist
                        </option>
                        <option value="channel-blocker">Channel Blocker</option>
                        <option value="dna-synthesis-inhibitor">
                            DNA Synthesis Inhibitor
                        </option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Biological target</label>
                    <select
                        value={formData.biologicalTarget}
                        onChange={(e) =>
                            handleInputChange(
                                "biologicalTarget",
                                e.target.value,
                            )
                        }
                    >
                        <option value="">Select...</option>
                        <option value="protein-kinase">Protein Kinase</option>
                        <option value="gpcr">GPCR</option>
                        <option value="ion-channel">Ion Channel</option>
                        <option value="enzyme">Enzyme</option>
                        <option value="transcription-factor">
                            Transcription Factor
                        </option>
                    </select>
                </div>
            </div>

            <div className="form-group full-width">
                <label>Drug Technology</label>
                <textarea
                    value={formData.drugTechnology}
                    onChange={(e) =>
                        handleInputChange("drugTechnology", e.target.value)
                    }
                    rows="4"
                    placeholder="Describe the drug technology, formulation, or delivery mechanism..."
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Delivery Route</label>
                    <select
                        value={formData.deliveryRoute}
                        onChange={(e) =>
                            handleInputChange("deliveryRoute", e.target.value)
                        }
                    >
                        <option value="">Select...</option>
                        <option value="oral">Oral</option>
                        <option value="intravenous">Intravenous</option>
                        <option value="intramuscular">Intramuscular</option>
                        <option value="subcutaneous">Subcutaneous</option>
                        <option value="topical">Topical</option>
                        <option value="inhalation">Inhalation</option>
                        <option value="transdermal">Transdermal</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Delivery Medium</label>
                    <select
                        value={formData.deliveryMedium}
                        onChange={(e) =>
                            handleInputChange("deliveryMedium", e.target.value)
                        }
                    >
                        <option value="">Select...</option>
                        <option value="tablet">Tablet</option>
                        <option value="capsule">Capsule</option>
                        <option value="injection">Injection</option>
                        <option value="solution">Solution</option>
                        <option value="suspension">Suspension</option>
                        <option value="cream">Cream</option>
                        <option value="gel">Gel</option>
                        <option value="patch">Patch</option>
                        <option value="inhaler">Inhaler</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderDevelopmentTab = () => (
        <div className="form-section">
            <div className="form-group full-width">
                <label>Preclinical</label>
                <div className="input-with-icon">
                    <input
                        type="text"
                        value={formData.preclinical}
                        onChange={(e) =>
                            handleInputChange("preclinical", e.target.value)
                        }
                    />
                    <span className="info-icon">?</span>
                </div>
            </div>

            <div className="clinical-section">
                <h3>Clinical</h3>

                {formData.clinicalTrials.map((trial, index) => (
                    <div key={index} className="clinical-trial-entry">
                        <div className="clinical-trial-header">
                            <div className="form-group">
                                <label>Trial ID</label>
                                <input
                                    type="text"
                                    value={trial.trialId}
                                    onChange={(e) =>
                                        handleClinicalTrialChange(
                                            index,
                                            "trialId",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={trial.title}
                                    onChange={(e) =>
                                        handleClinicalTrialChange(
                                            index,
                                            "title",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Primary Drugs</label>
                                <input
                                    type="text"
                                    value={trial.primaryDrugs}
                                    onChange={(e) =>
                                        handleClinicalTrialChange(
                                            index,
                                            "primaryDrugs",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <input
                                    type="text"
                                    value={trial.status}
                                    onChange={(e) =>
                                        handleClinicalTrialChange(
                                            index,
                                            "status",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Sponsor</label>
                                <input
                                    type="text"
                                    value={trial.sponsor}
                                    onChange={(e) =>
                                        handleClinicalTrialChange(
                                            index,
                                            "sponsor",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderLicensingMarketingTab = () => (
        <div className="form-section">
            <div className="form-group full-width">
                <label>Agreement</label>
                <div className="input-with-icon">
                    <textarea
                        value={formData.agreement}
                        onChange={(e) =>
                            handleInputChange("agreement", e.target.value)
                        }
                        rows="4"
                    />
                    <span className="info-icon">?</span>
                </div>
            </div>

            <div className="form-group full-width">
                <label>Licensing Availability</label>
                <div className="input-with-icon">
                    <textarea
                        value={formData.licensingAvailability}
                        onChange={(e) =>
                            handleInputChange(
                                "licensingAvailability",
                                e.target.value,
                            )
                        }
                        rows="4"
                    />
                    <span className="info-icon">?</span>
                </div>
            </div>

            <div className="form-group full-width">
                <label>Marketing Approvals</label>
                <div className="input-with-icon">
                    <textarea
                        value={formData.marketingApprovals}
                        onChange={(e) =>
                            handleInputChange(
                                "marketingApprovals",
                                e.target.value,
                            )
                        }
                        rows="4"
                    />
                    <span className="info-icon">?</span>
                </div>
            </div>
        </div>
    );

    const renderLogsTab = () => (
        <div className="form-section">
            <div className="form-group full-width">
                <label>Drug Changes Log</label>
                <textarea
                    value={formData.drugChangesLog}
                    onChange={(e) =>
                        handleInputChange("drugChangesLog", e.target.value)
                    }
                    rows="3"
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Created Date</label>
                    <input
                        type="date"
                        value={formData.createdDate}
                        onChange={(e) =>
                            handleInputChange("createdDate", e.target.value)
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Last Modified Date</label>
                    <input
                        type="date"
                        value={formData.lastModifiedDate}
                        onChange={(e) =>
                            handleInputChange(
                                "lastModifiedDate",
                                e.target.value,
                            )
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Last Modified User</label>
                    <input
                        type="text"
                        value={formData.lastModifiedUser}
                        onChange={(e) =>
                            handleInputChange(
                                "lastModifiedUser",
                                e.target.value,
                            )
                        }
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Full Review User</label>
                    <input
                        type="text"
                        value={formData.fullReviewUser}
                        onChange={(e) =>
                            handleInputChange("fullReviewUser", e.target.value)
                        }
                    />
                </div>
                <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={formData.fullReview}
                            onChange={(e) =>
                                handleInputChange(
                                    "fullReview",
                                    e.target.checked,
                                )
                            }
                        />
                        Full Review
                    </label>
                </div>
                <div className="form-group">
                    <label>Next Review Date</label>
                    <input
                        type="date"
                        value={formData.nextReviewDate}
                        onChange={(e) =>
                            handleInputChange("nextReviewDate", e.target.value)
                        }
                    />
                </div>
            </div>

            <div className="form-group full-width">
                <label>Notes</label>
                <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows="6"
                />
            </div>
        </div>
    );

    return (
        <div className="drug-form-container">
            <div className="tab-navigation">
                <button
                    className={`tab ${activeTab === "overview" ? "active" : ""}`}
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>
                <button
                    className={`tab ${activeTab === "drug-activity" ? "active" : ""}`}
                    onClick={() => setActiveTab("drug-activity")}
                >
                    Drug Activity
                </button>
                <button
                    className={`tab ${activeTab === "development" ? "active" : ""}`}
                    onClick={() => setActiveTab("development")}
                >
                    Development
                </button>
                <button
                    className={`tab ${activeTab === "other-sources" ? "active" : ""}`}
                    onClick={() => setActiveTab("other-sources")}
                >
                    Other Sources
                </button>
                <button
                    className={`tab ${activeTab === "licensing-marketing" ? "active" : ""}`}
                    onClick={() => setActiveTab("licensing-marketing")}
                >
                    Licensing & Marketing
                </button>
                <button
                    className={`tab ${activeTab === "logs" ? "active" : ""}`}
                    onClick={() => setActiveTab("logs")}
                >
                    Logs
                </button>
            </div>

            <div className="form-content">
                <div className="section-header">
                    <h2>
                        {activeTab === "overview" && "Overview"}
                        {activeTab === "drug-activity" && "Drug Activity"}
                        {activeTab === "development" && "Development"}
                        {activeTab === "other-sources" && "Other Sources"}
                        {activeTab === "licensing-marketing" &&
                            "Licensing & Marketing"}
                        {activeTab === "logs" && "Logs"}
                    </h2>
                    {activeTab === "logs" && (
                        <div className="logs-header-buttons">
                            <button
                                className="header-btn create-record-btn"
                                onClick={handleCreateRecord}
                            >
                                Create Record
                            </button>
                            <button
                                className="header-btn save-changes-btn"
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>

                {renderTabContent()}

                {activeTab !== "logs" && (
                    <div className="form-actions">
                        <button type="button" className="next-btn">
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DrugForm;
