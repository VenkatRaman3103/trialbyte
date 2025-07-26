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
