"use client";
import { getSelectTrials } from "@/api/trials/selectedTrials/getSelectTrials";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Download, FileText, X, Plus } from "lucide-react";
import "./index.scss";
import { ClinicalTrialTimelineWithImage } from "./ClinicalTrialTimelineWithImage";
import { some } from "./dummydata";
import Image from "next/image";

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
                            <h1>Scientific Title</h1>
                            <p>{activeTrial.title}</p>
                        </Content>

                        <Content>
                            <h1>Summary</h1>
                            <p>{activeTrial.summary}</p>
                        </Content>

                        <Content>
                            <h1>Key Information</h1>
                            <table className="fixed-width-heading">
                                <tr>
                                    <td className="heading">Disease Type :</td>
                                    <td>{activeTrial.diseaseType}</td>
                                </tr>

                                <tr>
                                    <td className="heading">
                                        Patient Segment :
                                    </td>
                                    <td>{activeTrial.patientSegment}</td>
                                </tr>

                                <tr>
                                    <td className="heading">Primary Drug :</td>
                                    <td>{activeTrial.primaryDrugs}</td>
                                </tr>

                                <tr>
                                    <td className="heading">
                                        Secondary Drug :
                                    </td>
                                    <td>{activeTrial.otherDrugs}</td>
                                </tr>
                                <tr>
                                    <td className="heading">Trial Phase :</td>
                                    <td>{activeTrial.otherDrugs}</td>
                                </tr>
                            </table>
                        </Content>
                        <Content>
                            <h1>Countries</h1>
                            <div className="tags-container">
                                <div className="tag">some</div>
                                <div className="tag">some</div>
                                <div className="tag">some</div>
                                <div className="tag active">
                                    {activeTrial.countries}
                                </div>
                                <div className="tag">some</div>
                                <div className="tag">some</div>
                            </div>
                        </Content>
                        <Content>
                            <div>
                                <p>
                                    <span>Region :</span>
                                    {activeTrial.region}
                                </p>

                                <p>
                                    <span>Sponsors & Collaborators :</span>
                                    {activeTrial.sponsorCollaborators}
                                </p>

                                <p>
                                    <span>Sponsor Field of Activity :</span>
                                    {activeTrial.sponsorFieldOfActivity}
                                </p>
                                <p>
                                    <span>Associated CRO :</span>
                                    {activeTrial.associatedCRO}
                                </p>

                                <p>
                                    <span>Trial Tags :</span>
                                    {activeTrial.trialTags}
                                </p>

                                <p>
                                    <span>Source Links :</span>
                                    <ul>
                                        {activeTrial.referenceLinks &&
                                            activeTrial?.referenceLinks?.map(
                                                (item) => <li>{item}</li>,
                                            )}
                                    </ul>
                                </p>
                                <p>
                                    <span>Trial Record Status : </span>
                                    {activeTrial.trialRecordStatus}
                                </p>
                            </div>
                        </Content>
                        <Section heading={"Objectives"}>
                            <Content>
                                <h1>Purpose of the trial</h1>
                                <p>{activeTrial.purposeOfTheTrial}</p>
                            </Content>
                            <Content>
                                <h1>Primary Outcome</h1>
                                <div>
                                    <h1>Outcome Measure :</h1>
                                    <p>{activeTrial.purposeOfTheTrial}</p>
                                </div>
                                <div>
                                    <h1>Measure Description : </h1>
                                    <p>{activeTrial.primaryOutcomeMeasure}</p>
                                </div>
                                <div>
                                    <h1>Time Frame :</h1>
                                    <p>{activeTrial.timingReference}</p>
                                </div>
                            </Content>

                            <Content>
                                <h1>Other Outcome : 1</h1>
                                <div>
                                    <h1>Outcome Measure :</h1>
                                    <p>{activeTrial.otherOutcomeMeasure}</p>
                                </div>
                                <div>
                                    <h1>Measure Description : </h1>
                                    <p>{activeTrial.otherOutcomeMeasure}</p>
                                </div>
                                <div>
                                    <h1>Time Frame :</h1>
                                    <p>{activeTrial.otherOutcomeMeasure}</p>
                                </div>
                            </Content>
                        </Section>
                        <Section heading={"Treatment Plan"}>
                            <Content>
                                <h1>Study Design Keywords </h1>
                                <div className="tags-container">
                                    <div className="tag">some</div>
                                    <div className="tag">some</div>
                                    <div className="tag">some</div>
                                    <div className="tag active">
                                        {activeTrial.studyDesignKeywords}
                                    </div>
                                    <div className="tag">some</div>
                                    <div className="tag">some</div>
                                </div>
                            </Content>
                            <Content>
                                <h1>Study Design</h1>
                                <div>
                                    <p>
                                        <span>Primary Purpose :</span>
                                        Treatment
                                    </p>

                                    <p>
                                        <span>Allocation :</span>
                                        Randomized
                                    </p>

                                    <p>
                                        <span>Interventional Model :</span>
                                        Single Group Assignment
                                    </p>
                                    <p>
                                        <span>Masking :</span>
                                        None (Open Label)
                                    </p>

                                    <p>
                                        This was a prospective, multicenter,
                                        randomized, open-label, 3-arm, phase II
                                        study with a single-stage design in each
                                        arm.
                                    </p>
                                </div>
                            </Content>

                            <Content>
                                <h1>Treatment Regimen</h1>
                                <p>Subjects were randomized as follows :</p>
                                <div>
                                    <p>
                                        <span>Pasireotide LAR :</span>
                                        <div>
                                            Pasireotide long acting release
                                            (LAR) 60 mg will be administered as
                                            an intra muscular (i.m.) depot
                                            injection once every 28 days
                                            starting on Day 1
                                        </div>
                                    </p>
                                    <p>
                                        <span>Everolimus :</span>
                                        <div>
                                            Everolimus 10 mg taken orally (p.o)
                                            once daily starting on Day 1
                                        </div>
                                    </p>
                                    <p>
                                        <span>
                                            Pasireotide LAR and Everolimus
                                            Combination :{" "}
                                        </span>
                                        <div>
                                            Pasireotide LAR 60 mg i.m. injected
                                            once every 28 days + Everolimus 10
                                            mg p.o. daily starting on Day 1
                                        </div>
                                    </p>
                                </div>
                            </Content>
                            <p className="extra">Number of arms: 3</p>
                        </Section>

                        <Section heading={"Heading"} column="double">
                            <div className="left">
                                <Content>
                                    <h1>Inclusion Criteria</h1>
                                    <ul>
                                        {activeTrial.inclusionCriteria &&
                                            activeTrial.inclusionCriteria.map(
                                                (item) => <li>{item}</li>,
                                            )}
                                    </ul>
                                </Content>
                                <Content>
                                    <h1>Exclusion Criteria</h1>
                                    <ul>
                                        {activeTrial.exclusionCriteria &&
                                            activeTrial.exclusionCriteria.map(
                                                (item) => <li>{item}</li>,
                                            )}
                                    </ul>
                                </Content>
                            </div>
                            <div className="right">
                                <Boxes
                                    heading={"Ages Eligible for Study "}
                                    description={activeTrial.ageFrom}
                                />
                                <Boxes
                                    heading={"Sexes Eligible for Study "}
                                    description={activeTrial.sex}
                                />
                                <Boxes
                                    heading={"Healthy Volunteers"}
                                    description={activeTrial.healthyVolunteers}
                                />
                                <Boxes
                                    heading={"Target No of Volunteers"}
                                    description={
                                        activeTrial.targetNoOfVolunteers
                                    }
                                />
                                <Boxes
                                    heading={"Actual enrolled Volunteers"}
                                    description={
                                        activeTrial.actualEnrolledVolunteers
                                    }
                                />
                            </div>
                        </Section>

                        <Section heading={"TimeLine"}>
                            <ClinicalTrialTimeline data={some} />
                        </Section>

                        <Section heading={"Outcome"}>
                            <div className="trial-outcome-container">
                                <div className="trial-outcome-left-container">
                                    <div className="overview-section-endpoint-container">
                                        <div className="overview-section-endpoint-laber">
                                            Results available
                                        </div>
                                        <div
                                            className={`overview-section-endpoint-toggle  ${activeTrial.resultsAvailable == "true" ? "active" : ""}`}
                                        >
                                            <div
                                                className={`overview-section-endpoint-toggle-mark`}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="trial-outcome-below-endpoint">
                                        <div className="trial-outcome-right-heading">
                                            Trial Outcome :
                                        </div>
                                        <div className="trial-outcome-right-tag">
                                            {activeTrial.trialOutcome}
                                        </div>
                                    </div>
                                </div>
                                <div className="trial-outcome-right-container">
                                    <div className="trial-outcome-right-header">
                                        <div className="trial-outcome-right-heading">
                                            Trial Outcome Reference
                                        </div>
                                        <div className="trial-outcome-right-tag">
                                            {activeTrial.trialOutcome}
                                        </div>
                                    </div>
                                    <div className="trial-outcome-right-content">
                                        {activeTrial.trialOutcomeReference}
                                    </div>
                                    <div></div>
                                    <div className="trial-outcome-right-cta-container">
                                        <div className="trial-outcome-right-cta-btn">
                                            View source
                                        </div>
                                        <div className="trial-outcome-right-cta-btn">
                                            Attachments
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                        <Section heading={"Published Results"}>
                            <TrialPublish data={some} />
                        </Section>
                        <Section
                            heading={"Sites"}
                            secondHeading={`Total No of Sites : ${some.totalNoOfSites}`}
                        >
                            <ClinicalTrialTimelineWithImage data={some} />
                        </Section>
                        <Section heading={"Other sources"}>
                            <Content>
                                <h1>Other Sources</h1>

                                <div className="trial-table-image-section-strip">
                                    <Image
                                        src={`/map_image.svg`}
                                        alt="Clinical Trial Illustration"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>

                                <div className="trial-outcome-right-cta-container">
                                    <div className="trial-outcome-right-cta-btn">
                                        View Pipeline
                                    </div>
                                    <div className="trial-outcome-right-cta-btn">
                                        Attachments
                                    </div>
                                </div>
                            </Content>
                            <Content>
                                <TrialPublishMini data={some} />
                            </Content>
                            <Content>
                                <div>
                                    <span>21-October-2020: </span>A Phase III
                                    Study of Safety and Efficacy of Pasireotide
                                    LAR or Everolimus Alone or in Combination in
                                    Patients With Well Differentiated
                                    Neuroendocrine Carcinoma of the Lung and
                                    Thymus.
                                </div>
                                <p></p>
                            </Content>
                        </Section>

                        <Section heading={"Published Results"}>
                            <TrialPublishImages data={some} />
                            <TrialPublishNoHeader />
                        </Section>

                        <Section heading={"Associated studies"}>
                            <div className="trialPublish-container">
                                <div className="trialPublish-card">
                                    <div className="trialPublish-header">
                                        <div>
                                            <span className="trialPublish-header-label">
                                                Date :
                                            </span>{" "}
                                            April 2, 2024
                                        </div>
                                        <div>
                                            <span className="trialPublish-header-label">
                                                Study Type :
                                            </span>{" "}
                                            Follow up study
                                        </div>
                                    </div>

                                    <h2 className="trialPublish-title">
                                        A follow up study on patients who were
                                        treated on LUNA study to evaluate the
                                        long term safety of patients with
                                        Lung/​Thymus NET.
                                    </h2>
                                    <div className="trialPublish-content">
                                        <p className="trialPublish-authors">
                                            Piero Ferolla, Maria Pia Brizzi, Tim
                                            Meyer, Wasat Mansoor, Julien
                                            Mazieres, Christine Do Cao, Hervé
                                            Léna, Alfredo Berruti
                                        </p>

                                        <div className="trialPublish-section">
                                            <h3 className="trialPublish-sectionTitle">
                                                Study Overview
                                            </h3>
                                            <h3 className="trialPublish-sectionTitle">
                                                Brief Summary
                                            </h3>
                                            <p className="trialPublish-sectionText">
                                                This was a multicenter,
                                                randomized, phase III study
                                                evaluating Everolimus or
                                                Pasireotide LAR alone or in
                                                combination in adult patients
                                                with advanced (unresectable or
                                                metastatic) neuroendocrine
                                                carcinoma of the lung and thymus
                                            </p>
                                            <h3 className="trialPublish-sectionTitle">
                                                Official Title
                                            </h3>
                                            <p className="trialPublish-sectionText">
                                                A long term follow up study on
                                                patients who were treated on
                                                LUNA study to evaluate the
                                                safety and tolerability of
                                                patients with Lung/Thymus NET.
                                            </p>
                                            <h3 className="trialPublish-sectionTitle">
                                                Description
                                            </h3>

                                            <p>
                                                <span>
                                                    Ages Eligible for Study :
                                                </span>
                                                18 Years and Older
                                            </p>

                                            <p>
                                                <span>
                                                    Sexes Eligible for Study :
                                                </span>
                                                All
                                            </p>

                                            <p>
                                                <span>
                                                    Accepts Healthy Volunteers :
                                                </span>
                                                No
                                            </p>
                                        </div>
                                        <h3 className="trialPublish-sectionTitle">
                                            Inclusion Criteria
                                        </h3>
                                        <div>
                                            <ul>
                                                <li>
                                                    Histological confirmed
                                                    advanced well differentiated
                                                    typical and atypical
                                                    carcinoid tumors of the lung
                                                    or thymus
                                                </li>
                                                <li>
                                                    Patients of all treatment
                                                    lines including naive
                                                    patients could have been
                                                    enrolled
                                                </li>
                                                <li>
                                                    At least one measurable
                                                    lesion of disease on CT scan
                                                    or MRI
                                                </li>
                                                <li>
                                                    Radiological documentation
                                                    of disease progression
                                                    within 12 months prior to
                                                    randomization
                                                </li>
                                                <li>
                                                    Adequate liver, renal and
                                                    bone marrow function
                                                </li>
                                                <li>
                                                    WHO Performance Status 0-2
                                                </li>
                                            </ul>
                                        </div>

                                        <h3 className="trialPublish-sectionTitle">
                                            Exclusion Criteria
                                        </h3>
                                        <div>
                                            <ul>
                                                <li>
                                                    Poorly differentiated
                                                    neuroendocrine carcinoma
                                                </li>
                                                <li>
                                                    Non-neuroendocrine thymoma
                                                </li>
                                                <li>
                                                    Patients with severe
                                                    functional disease who
                                                    required symptomatic
                                                    treatment with somatostatin
                                                    analogs
                                                </li>
                                                <li>
                                                    Prior therapy with mTOR
                                                    inhibitors
                                                </li>
                                                <li>
                                                    History of liver disease
                                                </li>
                                                <li>Baseline QTcF 470 msec</li>
                                                <li>
                                                    Uncontrolled diabetes
                                                    mellitus despite adequate
                                                    therapy
                                                </li>
                                            </ul>
                                        </div>

                                        <p>
                                            <span>Primary Purpose :</span>
                                            Treatment
                                        </p>

                                        <p>
                                            <span>Allocation :</span>
                                            Randomized
                                        </p>

                                        <p>
                                            <span>Interventional Model :</span>
                                            Single Group Assignment
                                        </p>
                                        <p>
                                            <span>Masking :</span>
                                            None (Open Label)
                                        </p>

                                        <h3 className="trialPublish-sectionTitle">
                                            Primary Outcome Measure
                                        </h3>

                                        <h3 className="trialPublish-sectionTitle">
                                            Outcome Measure :
                                        </h3>
                                        <p>
                                            Long term safety of Pasireotide and
                                            Everolimus
                                        </p>
                                        <h3 className="trialPublish-sectionTitle">
                                            Measure Description :
                                        </h3>
                                        <p>
                                            Patients with Complete Response
                                            (CR), Partial Response (PR), or
                                            Stable Disease (SD) at Month 9 were
                                            to be considered as
                                            "progression-free" based on RECIST
                                            v1.1.
                                        </p>
                                        <h3 className="trialPublish-sectionTitle">
                                            Time Frame :
                                        </h3>
                                        <p>
                                            <span>Sponsor : </span>
                                            Novartis Pharmaceuticals
                                        </p>
                                        <p>
                                            <span>Investigators :</span>
                                            Study Director:Novartis
                                            Pharmaceuticals,Novartis
                                            Pharmaceuticals
                                        </p>
                                        <p>5 Years</p>
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
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Content = ({ children }) => {
    return <div className="main-content-wrapper">{children}</div>;
};

export const Section = ({
    children,
    heading,
    column = "single",
    secondHeading,
}) => {
    return (
        <div className={`main-section-wrapper ${column}`}>
            <div className="main-section-wrapper-heading-container">
                <h1 className="main-section-wrapper-heading">{heading}</h1>
                {secondHeading && (
                    <h1 className="main-section-wrapper-heading">
                        {secondHeading}
                    </h1>
                )}
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

const ClinicalTrialTimeline = ({ data }) => {
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
                            <td>{data.startDateActual}</td>
                            <td>{data.inclusionPeriodActual}</td>
                            <td>{data.enrollmentClosedDateActual}</td>
                            <td>02/10/2020</td>
                            <td>{data.overallDurationToComplete}</td>
                            <td>{data.overallDurationToPublishResult}</td>
                            <td>{data.resultPublishedDateActual}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Duration Summary */}
                <div className="duration-summary">
                    <div className="duration-item">
                        <span className="duration-label">
                            Overall duration to Complete:
                        </span>
                        <span className="duration-value complete">
                            {data.overallDurationToComplete}
                        </span>
                        <span className="duration-unit">(months)</span>
                    </div>
                    <div className="duration-item">
                        <span className="duration-label">
                            Overall duration to publish result:
                        </span>
                        <span className="duration-value publish">
                            {data.overallDurationToPublishResult}
                        </span>
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

const TrialPublish = ({ data }) => {
    return (
        <div className="trialPublish-container">
            <div className="trialPublish-card">
                <div className="trialPublish-header">
                    <div>
                        <span className="trialPublish-header-label">
                            Date :
                        </span>{" "}
                        {data.resultPublishedDateActual}
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
                        </span>
                        {data.publications}
                        <span className="trialPublish-infoIcon">
                            &#9432;
                        </span>{" "}
                    </div>
                </div>

                <h2 className="trialPublish-title">{data.publications}</h2>
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

const TrialPublishMini = ({ data }) => {
    return (
        <div className="trialPublish-container">
            <div className="trialPublish-card">
                <h2 className="trialPublish-title">
                    Piero Ferolla, Maria Pia Brizzi, Tim Meyer, Wasat Mansoor,
                    Julien Mazieres, Christine Do Cao, Hervé Léna, Alfredo
                    Berruti
                </h2>
                <div className="trialPublish-content">
                    <div className="trialPublish-section">
                        <p className="trialPublish-sectionText">
                            Merck (NYSE: MRK), known as MSD outside of the
                            United States and Canada, today announced that new
                            data for four approved oncology medicines and four
                            pipeline candidates in more than 25 types of cancer
                            will be presented at the 2024 American Society of
                            Clinical Oncology (ASCO) Annual Meeting in Chicago
                            from May 31-June 4. New data being shared at the
                            meeting showcase the company’s continued progress to
                            advance clinical research for Merck’s broad
                            portfolio and diverse pipeline of investigational
                            candidates.
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

const TrialPublishImages = ({ data }) => {
    return (
        <div className="trialPublish-container">
            <div className="trialPublish-card">
                <div className="trialPublish-header">
                    <div>
                        <span className="trialPublish-header-label">
                            Date :
                        </span>{" "}
                        15, Apr, 2023
                    </div>
                    <div>
                        <span className="trialPublish-header-label">
                            Company Presentation
                        </span>{" "}
                    </div>
                </div>

                <h2 className="trialPublish-title">
                    Development report from CEO on our R&D strategies and
                    Pipeline updates
                </h2>

                <div className="trial-table-image-section">
                    <Image
                        src={`/map_image.svg`}
                        alt="Clinical Trial Illustration"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="trial-table-image-section">
                    <Image
                        src={`/map_image.svg`}
                        alt="Clinical Trial Illustration"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="trialPublish-content">
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

const TrialPublishNoHeader = ({ data }) => {
    return (
        <div className="trialPublish-container">
            <div className="trialPublish-card">
                <div className="trialPublish-header">
                    <div>
                        <span className="trialPublish-header-label">
                            Date :
                        </span>{" "}
                        15, Apr, 2023
                    </div>
                    <div>
                        <span className="trialPublish-header-label">
                            Company Presentation
                        </span>{" "}
                    </div>
                </div>

                <div className="trialPublish-content">
                    <div className="trialPublish-section">
                        <div>
                            <div>
                                <span>EudraCT Number:</span> 2011-002872-17
                                Sponsor's
                            </div>
                            <div>
                                <span>Protocol Code Number:</span> CSOM230DIC03
                                National
                            </div>
                            <div>
                                <span>Competent Authority:</span> France - ANSM
                                Clinical
                            </div>
                            <div>
                                <span>Trial Type:</span> EEA CTA Trial Status:
                                Prematurely
                            </div>
                            <div>
                                <span>
                                    Ended Date on which this record was first
                                    entered in the EudraCT database:
                                </span>{" "}
                                2013-04-22
                            </div>
                        </div>
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
