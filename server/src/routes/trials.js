import { Router } from 'express';
import { db } from '../db/index.js';
import { trials, users } from '../db/schema.js';
import { eq, inArray } from 'drizzle-orm';

export const trialsRouter = Router();

// NOTE: create trials
trialsRouter.post('/trials', async (req, res) => {
    const {
        therapeuticArea,
        trialIdentifier,
        trialPhase,
        status,
        primaryDrugs,
        otherDrugs,
        title,
        diseaseType,
        patientsegment,
        lineofTheraphy,
        referenceLinks,
        trialtags,
        sponsorCollaborators,
        associatedCRO,
        countries,
        region,
        trialRecordStatus,
        purposeofthetrial,
        summary,
        primaryOutcomeMeasure,
        otherOutcomeMeasure,
        studyDesignKeywords,
        studyDesign,
        treatmentRegimen,
        numberOfArms,
        inclusionCriteria,
        exclusionCriteria,
        ageFrom,
        ageTo,
        subjectType,
        targetNoOfVolunteers,
        sex,
        healthyVolunteers,
        actualEnrolledVolunteers,
    } = req.body;

    try {
        const response = await db
            .insert(trials)
            .values({
                therapeuticArea,
                trialIdentifier,
                trialPhase,
                status,
                primaryDrugs,
                otherDrugs,
                title,
                diseaseType,
                patientsegment,
                lineofTheraphy,
                referenceLinks,
                trialtags,
                sponsorCollaborators,
                associatedCRO,
                countries,
                region,
                trialRecordStatus,
                purposeofthetrial,
                summary,
                primaryOutcomeMeasure,
                otherOutcomeMeasure,
                studyDesignKeywords,
                studyDesign,
                treatmentRegimen,
                numberOfArms,
                inclusionCriteria,
                exclusionCriteria,
                ageFrom,
                ageTo,
                subjectType,
                targetNoOfVolunteers,
                sex,
                healthyVolunteers,
                actualEnrolledVolunteers,
            })
            .returning();
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error at trialsRouter POST' });
    }
});

// NOTE: read trials
// reall all trials
trialsRouter.get('/trials', async (req, res) => {
    try {
        const response = await db.select().from(trials);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error at trialsRouter GET' });
    }
});

// NOTE: update trials
// NOTE: delete trials
