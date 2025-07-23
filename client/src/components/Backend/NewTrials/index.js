"use client";
import React, { useState } from "react";
import "./index.scss";
import { useMutation } from "@tanstack/react-query";
import { createNewTrial } from "@/api/trials/createNewTrial";

export const NewTrial = () => {
    const tabs = [
        "Trial Overview",
        "Outcome Measured",
        "Participation Criteria",
        "Timing",
        "Results",
        "Sites",
        "Other Sources",
        "Logs",
    ];

    const [activeTab, setActiveTab] = useState("Trial Overview");

    const [formData, setFormData] = useState({
        // trial overview
        therapeuticArea: "",
        trialIdentifier: "",
        trialPhase: "",
        status: "",
        primaryDrugs: "",
        otherDrugs: "",
        title: "",
        diseaseType: "",
        patientSegment: "",
        lineOfTherapy: "",
        referenceLinks: "",
        trialTags: "",
        sponsorCollaborators: "",
        sponsorFieldOfActivity: "",
        associatedCRO: "",
        countries: "",
        region: "",
        trialRecordStatus: "",

        // outcome measured
        purposeOfTheTrial: "",
        summary: "",
        primaryOutcomeMeasure: "",
        otherOutcomeMeasure: "",
        studyDesignKeywords: "",
        studyDesign: "",
        treatmentRegimen: "",
        numberOfArms: "",

        // participation criteria
        inclusionCriteria: "",
        exclusionCriteria: "",
        ageFrom: "",
        ageTo: "",
        subjectType: "",
        targetNoOfVolunteers: "",
        sex: "",
        healthyVolunteers: "",
        actualEnrolledVolunteers: "",

        // timing
        startDateActual: "",
        inclusionPeriodActual: "",
        enrollmentClosedDateActual: "",
        primaryOutcomeDurationActual: "",
        trialEndDateActual: "",
        resultPublishedDateActual: "",

        startDateBenchmark: "",
        inclusionPeriodBenchmark: "",
        enrollmentClosedDateBenchmark: "",
        primaryOutcomeDurationBenchmark: "",
        trialEndDateBenchmark: "",
        resultPublishedDateBenchmark: "",

        startDateEstimated: "",
        inclusionPeriodEstimated: "",
        enrollmentClosedDateEstimated: "",
        primaryOutcomeDurationEstimated: "",
        trialEndDateEstimated: "",
        resultPublishedDateEstimated: "",

        overallDurationToComplete: "",
        overallDurationToPublishResult: "",
        timingReference: "",
    });

    /// --- MUTATIONS ---
    const createMutation = useMutation({
        mutationFn: () => createNewTrial(formData),
    });

    // --- HANDLERS ---
    // handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // hande "next" button click
    const handleNextClick = () => {
        const currentIndex = tabs.indexOf(activeTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        setActiveTab(tabs[nextIndex]);
        console.log("Current Form Data:", formData);
    };

    console.log(formData, "formData");

    // render tabs
    const renderTabContent = () => {
        switch (activeTab) {
            case "Trial Overview":
                return (
                    <TrialOverviewTab
                        formData={formData}
                        handleChange={handleChange}
                    />
                );
            case "Outcome Measured":
                return (
                    <OutcomeMeasuredTab
                        formData={formData}
                        handleChange={handleChange}
                    />
                );
            case "Participation Criteria":
                return (
                    <ParticipationCriteriaTab
                        formData={formData}
                        handleChange={handleChange}
                    />
                );
            case "Timing":
                return (
                    <TimingTab
                        formData={formData}
                        handleChange={handleChange}
                    />
                );
            default:
                return (
                    <div className="p-4 text-gray-600">
                        Content for "{activeTab}" tab will go here.
                    </div>
                );
        }
    };

    function handleCreateTrial() {
        createMutation.mutate();
    }

    return (
        <div className="trial-container">
            {/* top navigation tabs */}
            <div className="tabs-container">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? "active" : ""}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <button className="create-trial-button" onClick={handleCreateTrial}>
                Create Trial
            </button>

            {/* content area */}
            <div className="content-area">
                <h2 className="content-title">{activeTab}</h2>
                {renderTabContent()}
                <div className="next-button-container">
                    <button className="next-button" onClick={handleNextClick}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

const TrialOverviewTab = ({ formData, handleChange }) => {
    return (
        <div className="tab-content-grid">
            {/* Row 1 */}
            <div className="form-group">
                <label htmlFor="therapeuticArea" className="form-label">
                    Therapeutic Area
                </label>
                <select
                    id="therapeuticArea"
                    className="form-select"
                    value={formData.therapeuticArea}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="oncology">Oncology</option>
                    <option value="cardiology">Cardiology</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="trialIdentifier" className="form-label">
                    Trial Identifier
                </label>
                <div className="input-with-icon">
                    <input
                        type="text"
                        id="trialIdentifier"
                        className="form-input"
                        value={formData.trialIdentifier}
                        onChange={handleChange}
                    />
                    <span className="input-icon">+</span>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="trialPhase" className="form-label">
                    Trial Phase
                </label>
                <select
                    id="trialPhase"
                    className="form-select"
                    value={formData.trialPhase}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="phase1">Phase 1</option>
                    <option value="phase2">Phase 2</option>
                </select>
            </div>

            {/* Row 2 */}
            <div className="form-group">
                <label htmlFor="status" className="form-label">
                    Status
                </label>
                <select
                    id="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="primaryDrugs" className="form-label">
                    Primary Drugs
                </label>
                <select
                    id="primaryDrugs"
                    className="form-select"
                    value={formData.primaryDrugs}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="drugA">Drug A</option>
                    <option value="drugB">Drug B</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="otherDrugs" className="form-label">
                    Other Drugs
                </label>
                <select
                    id="otherDrugs"
                    className="form-select"
                    value={formData.otherDrugs}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="drugC">Drug C</option>
                    <option value="drugD">Drug D</option>
                </select>
            </div>

            {/* Row 3 (Full width) */}
            <div className="form-group col-span-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="form-input"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            {/* Row 4 */}
            <div className="form-group">
                <label htmlFor="diseaseType" className="form-label">
                    Disease Type
                </label>
                <select
                    id="diseaseType"
                    className="form-select"
                    value={formData.diseaseType}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="cancer">Cancer</option>
                    <option value="diabetes">Diabetes</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="patientSegment" className="form-label">
                    Patient Segment
                </label>
                <select
                    id="patientSegment"
                    className="form-select"
                    value={formData.patientSegment}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="adult">Adult</option>
                    <option value="pediatric">Pediatric</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="lineOfTherapy" className="form-label">
                    Line Of Therapy
                </label>
                <select
                    id="lineOfTherapy"
                    className="form-select"
                    value={formData.lineOfTherapy}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="firstLine">First Line</option>
                    <option value="secondLine">Second Line</option>
                </select>
            </div>

            {/* Row 5 */}
            <div className="form-group">
                <label htmlFor="referenceLinks" className="form-label">
                    Reference Links
                </label>
                <div className="input-with-icon">
                    <input
                        type="text"
                        id="referenceLinks"
                        className="form-input"
                        value={formData.referenceLinks}
                        onChange={handleChange}
                    />
                    <span className="input-icon">+</span>
                </div>
            </div>
            <div className="form-group col-span-2">
                {/* two columns */}
                <label htmlFor="trialTags" className="form-label">
                    Trial Tags
                </label>
                <select
                    id="trialTags"
                    className="form-select"
                    value={formData.trialTags}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="tag1">Tag 1</option>
                    <option value="tag2">Tag 2</option>
                </select>
            </div>

            {/* Row 6 */}
            <div className="form-group">
                <label htmlFor="sponsorCollaborators" className="form-label">
                    Sponsor & Collaborators
                </label>
                <select
                    id="sponsorCollaborators"
                    className="form-select"
                    value={formData.sponsorCollaborators}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="sponsorA">Sponsor A</option>
                    <option value="sponsorB">Sponsor B</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="sponsorFieldOfActivity" className="form-label">
                    Sponsor Field of Activity
                </label>
                <select
                    id="sponsorFieldOfActivity"
                    className="form-select"
                    value={formData.sponsorFieldOfActivity}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="pharma">Pharma</option>
                    <option value="biotech">Biotech</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="associatedCRO" className="form-label">
                    Associated CRO
                </label>
                <select
                    id="associatedCRO"
                    className="form-select"
                    value={formData.associatedCRO}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="croX">CRO X</option>
                    <option value="croY">CRO Y</option>
                </select>
            </div>

            {/* Row 7 */}
            <div className="form-group">
                <label htmlFor="countries" className="form-label">
                    Countries
                </label>
                <select
                    id="countries"
                    className="form-select"
                    value={formData.countries}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="usa">USA</option>
                    <option value="india">India</option>
                </select>
            </div>
            <div className="form-group col-span-2">
                {/* two columns */}
                <label htmlFor="region" className="form-label">
                    Region
                </label>
                <select
                    id="region"
                    className="form-select"
                    value={formData.region}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                </select>
            </div>

            {/* Row 8 */}
            <div className="form-group">
                <label htmlFor="trialRecordStatus" className="form-label">
                    Trial Record Status
                </label>
                <select
                    id="trialRecordStatus"
                    className="form-select"
                    value={formData.trialRecordStatus}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>
        </div>
    );
};

const OutcomeMeasuredTab = ({ formData, handleChange }) => {
    return (
        <div className="tab-content-grid">
            <div className="form-group col-span-3">
                <label htmlFor="purposeOfTheTrial" className="form-label">
                    Purpose Of The Trial
                </label>
                <textarea
                    id="purposeOfTheTrial"
                    className="form-input"
                    rows="3"
                    value={formData.purposeOfTheTrial}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-group col-span-3">
                <label htmlFor="summary" className="form-label">
                    Summary
                </label>
                <textarea
                    id="summary"
                    className="form-input"
                    rows="3"
                    value={formData.summary}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-group col-span-3">
                <label htmlFor="primaryOutcomeMeasure" className="form-label">
                    Primary Outcome Measure
                </label>
                <div className="input-with-icon">
                    <input
                        type="text"
                        id="primaryOutcomeMeasure"
                        className="form-input"
                        value={formData.primaryOutcomeMeasure}
                        onChange={handleChange}
                    />
                    <span className="input-icon">+</span>
                </div>
            </div>
            <div className="form-group col-span-3">
                <label htmlFor="otherOutcomeMeasure" className="form-label">
                    Other Outcome Measure
                </label>
                <div className="input-with-icon">
                    <input
                        type="text"
                        id="otherOutcomeMeasure"
                        className="form-input"
                        value={formData.otherOutcomeMeasure}
                        onChange={handleChange}
                    />
                    <span className="input-icon">+</span>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="studyDesignKeywords" className="form-label">
                    Study design keywords
                </label>
                <select
                    id="studyDesignKeywords"
                    className="form-select"
                    value={formData.studyDesignKeywords}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="keyword1">Keyword 1</option>
                    <option value="keyword2">Keyword 2</option>
                </select>
            </div>
            <div className="form-group col-span-2">
                <label htmlFor="studyDesign" className="form-label">
                    Study Design
                </label>
                <textarea
                    id="studyDesign"
                    className="form-input"
                    rows="3"
                    value={formData.studyDesign}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-group col-span-3">
                <label htmlFor="treatmentRegimen" className="form-label">
                    Treatment Regimen
                </label>
                <textarea
                    id="treatmentRegimen"
                    className="form-input"
                    rows="3"
                    value={formData.treatmentRegimen}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="numberOfArms" className="form-label">
                    Number of Arms
                </label>
                <input
                    type="number"
                    id="numberOfArms"
                    className="form-input"
                    value={formData.numberOfArms}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group col-span-2 flex justify-end items-end">
                <button className="next-button mr-2">Rephrase</button>
            </div>
        </div>
    );
};

const ParticipationCriteriaTab = ({ formData, handleChange }) => {
    return (
        <div className="tab-content-grid">
            <div className="form-group">
                <label htmlFor="inclusionCriteria" className="form-label">
                    Inclusion Criteria
                </label>
                <textarea
                    id="inclusionCriteria"
                    className="form-input"
                    rows="5"
                    value={formData.inclusionCriteria}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="exclusionCriteria" className="form-label">
                    Exclusion Criteria
                </label>
                <textarea
                    id="exclusionCriteria"
                    className="form-input"
                    rows="5"
                    value={formData.exclusionCriteria}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="ageFrom" className="form-label">
                    Age From
                </label>
                <select
                    id="ageFrom"
                    className="form-select"
                    value={formData.ageFrom}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="ageTo" className="form-label">
                    Age To
                </label>
                <select
                    id="ageTo"
                    className="form-select"
                    value={formData.ageTo}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="60">60</option>
                    <option value="70">70</option>
                </select>
            </div>
            <div className="form-group col-span-2">
                <label htmlFor="subjectType" className="form-label">
                    Subject Type
                </label>
                <select
                    id="subjectType"
                    className="form-select"
                    value={formData.subjectType}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="patient">Patient</option>
                    <option value="volunteer">Volunteer</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="sex" className="form-label">
                    Sex
                </label>
                <select
                    id="sex"
                    className="form-select"
                    value={formData.sex}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="healthyVolunteers" className="form-label">
                    Healthy Volunteers
                </label>
                <select
                    id="healthyVolunteers"
                    className="form-select"
                    value={formData.healthyVolunteers}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="targetNoOfVolunteers" className="form-label">
                    Target No Of Volunteers
                </label>
                <input
                    type="number"
                    id="targetNoOfVolunteers"
                    className="form-input"
                    value={formData.targetNoOfVolunteers}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label
                    htmlFor="actualEnrolledVolunteers"
                    className="form-label"
                >
                    Actual Enrolled Volunteers
                </label>
                <input
                    type="number"
                    id="actualEnrolledVolunteers"
                    className="form-input"
                    value={formData.actualEnrolledVolunteers}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

const TimingTab = ({ formData, handleChange }) => {
    return (
        <div className="timing-tab-content">
            <div className="timing-grid">
                <div className="timing-label-row">
                    <div></div> {/* Empty div for the row label column */}
                    <div className="timing-header">Start Date</div>
                    <div className="timing-header">Inclusion Period</div>
                    <div className="timing-header">Enrollment Closed Date</div>
                    <div className="timing-header">
                        Primary Outcome Duration
                    </div>
                    <div className="timing-header">Trial End Date</div>
                    <div className="timing-header">Result Duration</div>{" "}
                    {/* Added missing column */}
                    <div className="timing-header">Result Published Date</div>
                </div>

                {/* Actual Row */}
                <div className="timing-row">
                    <div className="row-label">Actual</div>
                    <input
                        type="date"
                        id="startDateActual"
                        className="form-input timing-input"
                        value={formData.startDateActual || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="inclusionPeriodActual"
                        className="form-input timing-input"
                        value={formData.inclusionPeriodActual || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        id="enrollmentClosedDateActual"
                        className="form-input timing-input"
                        value={formData.enrollmentClosedDateActual || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="primaryOutcomeDurationActual"
                        className="form-input timing-input"
                        value={formData.primaryOutcomeDurationActual || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        id="trialEndDateActual"
                        className="form-input timing-input"
                        value={formData.trialEndDateActual || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="resultDurationActual" /* Added missing input */
                        className="form-input timing-input"
                        value={formData.resultDurationActual || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        id="resultPublishedDateActual"
                        className="form-input timing-input"
                        value={formData.resultPublishedDateActual || ""}
                        onChange={handleChange}
                    />
                </div>

                {/* Benchmark Row */}
                <div className="timing-row">
                    <div className="row-label">Benchmark</div>
                    <input
                        type="date"
                        id="startDateBenchmark"
                        className="form-input timing-input"
                        value={formData.startDateBenchmark || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="inclusionPeriodBenchmark"
                        className="form-input timing-input"
                        value={formData.inclusionPeriodBenchmark || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        id="enrollmentClosedDateBenchmark"
                        className="form-input timing-input"
                        value={formData.enrollmentClosedDateBenchmark || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="primaryOutcomeDurationBenchmark"
                        className="form-input timing-input"
                        value={formData.primaryOutcomeDurationBenchmark || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        id="trialEndDateBenchmark"
                        className="form-input timing-input"
                        value={formData.trialEndDateBenchmark || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="resultDurationBenchmark" /* Added missing input */
                        className="form-input timing-input"
                        value={formData.resultDurationBenchmark || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        id="resultPublishedDateBenchmark"
                        className="form-input timing-input"
                        value={formData.resultPublishedDateBenchmark || ""}
                        onChange={handleChange}
                    />
                </div>

                {/* Estimated Row */}
                <div className="timing-row">
                    <div className="row-label">Estimated</div>
                    <input
                        type="date"
                        id="startDateEstimated"
                        className="form-input timing-input"
                        value={formData.startDateEstimated || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="inclusionPeriodEstimated"
                        className="form-input timing-input"
                        value={formData.inclusionPeriodEstimated || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        id="enrollmentClosedDateEstimated"
                        className="form-input timing-input"
                        value={formData.enrollmentClosedDateEstimated || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="primaryOutcomeDurationEstimated"
                        className="form-input timing-input"
                        value={formData.primaryOutcomeDurationEstimated || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        id="trialEndDateEstimated"
                        className="form-input timing-input"
                        value={formData.trialEndDateEstimated || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="resultDurationEstimated" /* Added missing input */
                        className="form-input timing-input"
                        value={formData.resultDurationEstimated || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        id="resultPublishedDateEstimated"
                        className="form-input timing-input"
                        value={formData.resultPublishedDateEstimated || ""}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="overall-duration-section">
                <div className="overall-duration-group">
                    <label
                        htmlFor="overallDurationToComplete"
                        className="form-label"
                    >
                        Overall Duration to Complete
                    </label>
                    <input
                        type="text"
                        id="overallDurationToComplete"
                        className="form-input"
                        value={formData.overallDurationToComplete || ""}
                        onChange={handleChange}
                    />
                    <div className="duration-unit">(months)</div>
                </div>

                <div className="overall-duration-group">
                    <label
                        htmlFor="overallDurationToPublishResult"
                        className="form-label"
                    >
                        Overall Duration to Publish Result
                    </label>
                    <input
                        type="text"
                        id="overallDurationToPublishResult"
                        className="form-input"
                        value={formData.overallDurationToPublishResult || ""}
                        onChange={handleChange}
                    />
                    <div className="duration-unit">(months)</div>
                </div>
            </div>

            <div className="reference-section">
                <div className="form-group">
                    <label htmlFor="timingReference" className="form-label">
                        Reference
                    </label>
                    <div className="input-with-icon">
                        <textarea
                            id="timingReference"
                            className="form-textarea" /* Changed to form-textarea */
                            value={formData.timingReference || ""}
                            onChange={handleChange}
                        ></textarea>
                        <span className="input-icon">+</span>{" "}
                    </div>
                </div>
            </div>
        </div>
    );
};
