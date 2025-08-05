import { Router } from 'express';
import { eq } from 'drizzle-orm';
import { drugs } from '../db/drugs.js';
import { db } from '../db/index.js';

export const drugsRouter = Router();

// CREATE a drug
drugsRouter.post('/drugs', async (req, res) => {
    const drugData = req.body;
    try {
        const response = await db.insert(drugs).values(drugData).returning();
        res.json(response);
    } catch (error) {
        console.error('POST /drugs error:', error);
        res.status(500).json({ message: 'Internal server error while creating drug' });
    }
});

// READ all drugs
drugsRouter.get('/drugs', async (_req, res) => {
    try {
        const response = await db.select().from(drugs);
        res.json(response);
    } catch (error) {
        console.error('GET /drugs error:', error);
        res.status(500).json({ message: 'Internal server error while fetching drugs' });
    }
});

// READ single drug by ID
drugsRouter.get('/drugs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.select().from(drugs).where(eq(drugs.id, id));
        if (response.length === 0) {
            return res.status(404).json({ message: 'Drug not found' });
        }
        res.json(response[0]);
    } catch (error) {
        console.error('GET /drugs/:id error:', error);
        res.status(500).json({ message: 'Internal server error while fetching drug' });
    }
});

// UPDATE a drug by ID
drugsRouter.patch('/drugs/:id', async (req, res) => {
    const { id } = req.params;
    const drugData = req.body;
    try {
        const response = await db.update(drugs).set(drugData).where(eq(drugs.id, id)).returning();

        if (response.length === 0) {
            return res.status(404).json({ message: 'Drug not found for update' });
        }

        res.json(response[0]);
    } catch (error) {
        console.error('PATCH /drugs/:id error:', error);
        res.status(500).json({ message: 'Internal server error while updating drug' });
    }
});

// DELETE a drug by ID
drugsRouter.delete('/drugs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.delete(drugs).where(eq(drugs.id, id)).returning();
        if (response.length === 0) {
            return res.status(404).json({ message: 'Drug not found for deletion' });
        }
        res.json(response[0]);
    } catch (error) {
        console.error('DELETE /drugs/:id error:', error);
        res.status(500).json({ message: 'Internal server error while deleting drug' });
    }
});
