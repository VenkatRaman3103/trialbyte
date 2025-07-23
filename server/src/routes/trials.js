import { Router } from 'express';
import { db } from '../db/index.js';
import { trials, users } from '../db/schema.js';
import { eq, inArray } from 'drizzle-orm';

export const trialsRouter = Router();

// NOTE: create trials
trialsRouter.post('/trials', async (req, res) => {
    const trialData = req.body;

    try {
        const response = await db.insert(trials).values(trialData).returning();
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

// read specific trial based on id
trialsRouter.get('/trials/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.select().from(trials).where(eq(trials.id, id));
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error at trialsRouter GET' });
    }
});

// NOTE: update trials
trialsRouter.patch('/trials/:id', async (req, res) => {
    const { id } = req.params;
    const trialData = req.body;
    try {
        const response = await db
            .update(trials)
            .set(trialData)
            .where(eq(trials.id, id))
            .returning();
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// NOTE: delete trials
trialsRouter.delete('/trials/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.delete(trials).where(eq(trials.id, id)).returning();
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
