import { Router } from 'express';
import { db } from '../db/index.js';
import { selectedTrials } from '../db/selected_trials.js';

export const selectedTrialsRouter = Router();

selectedTrialsRouter.post('/selected-trials', async (req, res) => {
    const { trial_ids } = req.body;
    try {
        const allTrialsRes = await db.select().from(selectedTrials);

        const allTrialsIds = allTrialsRes.map(item => item.trial_id);

        for (let id of trial_ids) {
            if (!allTrialsIds.includes(id)) {
                await db.insert(selectedTrials).values([
                    {
                        trial_id: id,
                    },
                ]);
            }
        }

        const newTrialIds = await db.select().from(selectedTrials);

        res.status(200).json(newTrialIds);
    } catch (error) {
        const errorMessage = {
            origin: 'POST /selected-trials',
            error: error,
        };
        console.log(errorMessage);
        res.status(500).json({
            errorMessage,
        });
    }
});

// get all selected trials
selectedTrialsRouter.get('/selected-trials', async (req, res) => {
    try {
        const response = await db.select().from(selectedTrials);
        res.status(200).json(response);
    } catch (error) {
        const errorMessage = {
            origin: 'GET /selected-trials',
            error: error,
        };
        console.log(errorMessage);
        res.status(500).json({
            errorMessage,
        });
    }
});
