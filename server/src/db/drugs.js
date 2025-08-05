// drizzle/schema/drug.ts
import { pgTable, text, jsonb, boolean, uuid } from 'drizzle-orm/pg-core';

export const drugs = pgTable('drugs', {
    id: uuid('id').primaryKey().defaultRandom(),

    // Overview tab fields
    drugName: text('drug_name'),
    genericName: text('generic_name'),
    otherName: text('other_name'),
    primaryName: text('primary_name'),
    globalStatus: text('global_status'),
    developmentStatus: text('development_status'),
    drugSummary: text('drug_summary'),
    originator: text('originator'),
    otherActiveCompanies: text('other_active_companies'),
    therapeuticArea: text('therapeutic_area'),
    diseaseType: text('disease_type'),
    regulatoryDesignations: text('regulatory_designations'),
    sourceLinks: text('source_links'),
    drugRecordStatus: text('drug_record_status'),
    developmentEntries: jsonb('development_entries'),

    // Drug Activity tab fields
    mechanismOfAction: text('mechanism_of_action'),
    biologicalTarget: text('biological_target'),
    drugTechnology: text('drug_technology'),
    deliveryRoute: text('delivery_route'),
    deliveryMedium: text('delivery_medium'),

    // Development tab fields
    preclinical: text('preclinical'),
    clinicalTrials: jsonb('clinical_trials'),

    // Licensing & Marketing tab fields
    agreement: text('agreement'),
    licensingAvailability: text('licensing_availability'),
    marketingApprovals: text('marketing_approvals'),

    // Logs tab fields
    drugChangesLog: text('drug_changes_log'),
    createdDate: text('created_date'),
    lastModifiedDate: text('last_modified_date'),
    lastModifiedUser: text('last_modified_user'),
    fullReviewUser: text('full_review_user'),
    fullReview: boolean('full_review'),
    nextReviewDate: text('next_review_date'),
    notes: text('notes'),
});
