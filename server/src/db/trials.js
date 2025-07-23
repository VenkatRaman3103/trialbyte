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
    patientsegment: text('patientsegment'),
    lineofTheraphy: text('lineof'),
    referenceLinks: text('referenceLinks'),
    trialtags: text('trialtags'),
    sponsorCollaborators: text('sponsorCollaborators'),
    associatedCRO: text('associatedCRO'),
    countries: text('countries'),
    region: text('region'),
    trialRecordStatus: text('trialRecordStatus'),

    // outcome measured
    purposeofthetrial: text('purposeofthetrial'),
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
});
