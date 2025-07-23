import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const trials = pgTable('trials', {
    id: uuid('id').defaultRandom().primaryKey(),
    // trial overview
    therapeuticArea: text('therapeuticArea'),
    trialIdentifier: text('trialIdentifier'),
    trialPhase: text('trialPhase'),
    status: text('status'),
    primaryDrugs: text('primaryDrugs'),
    otherDrugs: text('otherDrugs'),
    title: text('title'),
    diseaseType: text('diseaseType'),
    patientSegment: text('patientSegment'), // Corrected typo: patientsegment -> patientSegment
    lineOfTherapy: text('lineOfTherapy'), // Corrected typo: lineofTheraphy -> lineOfTherapy
    referenceLinks: text('referenceLinks'),
    trialTags: text('trialTags'), // Corrected typo: trialtags -> trialTags
    sponsorCollaborators: text('sponsorCollaborators'),
    sponsorFieldOfActivity: text('sponsorFieldOfActivity'), // Added missing field
    associatedCRO: text('associatedCRO'),
    countries: text('countries'),
    region: text('region'),
    trialRecordStatus: text('trialRecordStatus'),

    // outcome measured
    purposeOfTheTrial: text('purposeOfTheTrial'), // Corrected typo: purposeofthetrial -> purposeOfTheTrial
    summary: text('summary'),
    primaryOutcomeMeasure: text('primaryOutcomeMeasure'),
    otherOutcomeMeasure: text('otherOutcomeMeasure'),
    studyDesignKeywords: text('studyDesignKeywords'),
    studyDesign: text('studyDesign'),
    treatmentRegimen: text('treatmentRegimen'),
    numberOfArms: text('numberOfArms'),

    // participation criteria
    inclusionCriteria: text('inclusionCriteria'),
    exclusionCriteria: text('exclusionCriteria'),
    ageFrom: text('ageFrom'),
    ageTo: text('ageTo'),
    subjectType: text('subjectType'),
    targetNoOfVolunteers: text('targetNoOfVolunteers'),
    sex: text('sex'),
    healthyVolunteers: text('healthyVolunteers'),
    actualEnrolledVolunteers: text('actualEnrolledVolunteers'),

    // timing
    startDateActual: text('startDateActual'),
    inclusionPeriodActual: text('inclusionPeriodActual'),
    enrollmentClosedDateActual: text('enrollmentClosedDateActual'),
    primaryOutcomeDurationActual: text('primaryOutcomeDurationActual'),
    trialEndDateActual: text('trialEndDateActual'),
    resultPublishedDateActual: text('resultPublishedDateActual'),

    startDateBenchmark: text('startDateBenchmark'),
    inclusionPeriodBenchmark: text('inclusionPeriodBenchmark'),
    enrollmentClosedDateBenchmark: text('enrollmentClosedDateBenchmark'),
    primaryOutcomeDurationBenchmark: text('primaryOutcomeDurationBenchmark'),
    trialEndDateBenchmark: text('trialEndDateBenchmark'),
    resultPublishedDateBenchmark: text('resultPublishedDateBenchmark'),

    startDateEstimated: text('startDateEstimated'),
    inclusionPeriodEstimated: text('inclusionPeriodEstimated'),
    enrollmentClosedDateEstimated: text('enrollmentClosedDateEstimated'),
    primaryOutcomeDurationEstimated: text('primaryOutcomeDurationEstimated'),
    trialEndDateEstimated: text('trialEndDateEstimated'),
    resultPublishedDateEstimated: text('resultPublishedDateEstimated'),

    overallDurationToComplete: text('overallDurationToComplete'),
    overallDurationToPublishResult: text('overallDurationToPublishResult'),
    timingReference: text('timingReference'),
});
