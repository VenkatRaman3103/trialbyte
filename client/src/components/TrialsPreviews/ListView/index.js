import React from "react";
import "./index.scss";

export const ListView = ({ data }) => {
    console.log(data, "dataListView");

    const {
        status,
        trialIdentifier: trialId,
        therapeuticArea,
        diseaseType,
        primaryDrugs,
        sponsorCollaborators,
        trialPhase,
    } = data || {};

    const getStatusClassName = (currentStatus) => {
        switch (currentStatus?.toLowerCase()) {
            case "planned":
                return "status-planned";
            case "terminated":
                return "status-terminated";
            case "open":
                return "status-open";
            case "closed":
                return "status-closed";
            case "active":
                return "active";

            default:
                return "status-default";
        }
    };

    return (
        <div className="list-view-item">
            <div className="list-view-checkbox-wrapper">
                <input type="checkbox" className="list-view-checkbox" />
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
        </div>
    );
};
// {
//   "id": "f68e2a2c-7273-4285-a710-faaeb8f46668",
//   "therapeuticArea": "oncology",
//   "trialIdentifier": "1234",
//   "trialPhase": "phase1",
//   "status": "active",
//   "primaryDrugs": "drugA",
//   "otherDrugs": "",
//   "title": "way big",
//   "diseaseType": "diabetes",
//   "patientSegment": "",
//   "lineOfTherapy": "",
//   "referenceLinks": "",
//   "trialTags": "",
//   "sponsorCollaborators": "sponsorA",
//   "sponsorFieldOfActivity": "",
//   "associatedCRO": "",
//   "countries": "",
//   "region": "",
//   "trialRecordStatus": "",
//   "purposeOfTheTrial": "",
//   "summary": "",
//   "primaryOutcomeMeasure": "",
//   "otherOutcomeMeasure": "",
//   "studyDesignKeywords": "",
//   "studyDesign": "",
//   "treatmentRegimen": "",
//   "numberOfArms": "",
//   "inclusionCriteria": "",
//   "exclusionCriteria": "",
//   "ageFrom": "",
//   "ageTo": "",
//   "subjectType": "",
//   "targetNoOfVolunteers": "",
//   "sex": "",
//   "healthyVolunteers": "",
//   "actualEnrolledVolunteers": "",
//   "startDateActual": "",
//   "inclusionPeriodActual": "",
//   "enrollmentClosedDateActual": "",
//   "primaryOutcomeDurationActual": "",
//   "trialEndDateActual": "",
//   "resultPublishedDateActual": "",
//   "startDateBenchmark": "",
//   "inclusionPeriodBenchmark": "",
//   "enrollmentClosedDateBenchmark": "",
//   "primaryOutcomeDurationBenchmark": "",
//   "trialEndDateBenchmark": "",
//   "resultPublishedDateBenchmark": "",
//   "startDateEstimated": "",
//   "inclusionPeriodEstimated": "",
//   "enrollmentClosedDateEstimated": "",
//   "primaryOutcomeDurationEstimated": "",
//   "trialEndDateEstimated": "",
//   "resultPublishedDateEstimated": "",
//   "overallDurationToComplete": "",
//   "overallDurationToPublishResult": "",
//   "timingReference": "",
//   "resultsAvailable": "false",
//   "endpointsMet": "false",
//   "adverseEventsReported": "false",
//   "trialOutcome": "",
//   "trialOutcomeReference": "",
//   "trialOutcomeReferenceLink": "",
//   "trialOutcomeReferenceAttachments": "",
//   "trialResults": "",
//   "adverseEventReported": "",
//   "adverseEventType": "",
//   "treatmentForAdverseEvents": "",
//   "totalNoOfSites": "",
//   "sitesNotes": "",
//   "trialChangesLog": "",
//   "trialAddedDate": "",
//   "lastModifiedDate": "",
//   "lastModifiedUser": "",
//   "fullReviewUser": "",
//   "fullReview": "false",
//   "nextReviewDate": "",
//   "logsNotes": "",
//   "pipelineData": "",
//   "pressRelease": "",
//   "publications": "",
//   "trialRegistries": "",
//   "associatedStudies": ""
// }
