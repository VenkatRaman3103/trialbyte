import { Router } from 'express';
import { db } from '../db/index.js';
import { favTitle } from '../db/fav_titles.js';
import { trials } from '../db/trials.js';
import { eq } from 'drizzle-orm';

export const favTitleRouter = Router();

favTitleRouter.get('/fav-titles', async (req, res) => {
    try {
        const response = await db.select().from(favTitle);
        const favTitlesIds = response.map(title => title.trial_id);

        const allTrials = await db.select().from(trials);

        const favTitles = allTrials.filter(trial => favTitlesIds.includes(trial.id));

        res.json(favTitles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error at favTitleRouter GET' });
    }
});

favTitleRouter.post('/fav-titles', async (req, res) => {
    const { trial_ids } = req.body;
    try {
        const inserted = [];

        for (const trialId of trial_ids) {
            const duplicates = await db
                .select()
                .from(favTitle)
                .where(eq(favTitle.trial_id, trialId));

            if (duplicates.length === 0) {
                const result = await db.insert(favTitle).values({ trial_id: trialId }).returning();

                inserted.push(...result);
            }
        }

        res.json(inserted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error at favTitleRouter POST' });
    }
});

favTitleRouter.delete('/fav-titles', async (req, res) => {
    console.log('DELETE /fav-titles route hit');
    console.log('Request body:', req.body);

    const { trial_ids } = req.body;

    if (!trial_ids || !Array.isArray(trial_ids)) {
        return res.status(400).json({ message: 'trial_ids must be an array' });
    }

    try {
        for (const trialId of trial_ids) {
            console.log(`Attempting to delete trial ID: ${trialId}`);

            // Check if the record exists first
            const existingRecord = await db.select().from(favTitle).where(eq(favTitle.id, trialId));
            console.log(`Existing record for ${trialId}:`, existingRecord);

            const result = await db.delete(favTitle).where(eq(favTitle.trial_id, trialId));
            console.log(`Delete result for ${trialId}:`, result);
        }

        console.log('All deletions completed, sending response');
        res.status(200).json({
            message: 'Favorite titles deleted successfully',
            deleted_ids: trial_ids,
        });
    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({ message: 'Internal server error at favTitleRouter DELETE' });
    }
});
