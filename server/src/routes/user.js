import { Router } from 'express';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq, inArray } from 'drizzle-orm';

export const userRouter = Router();

// NOTE: create users
// create new user
userRouter.post('/users', async (req, res) => {
    const { name, company, designation, contact, country, region, sex, age, plan } = req.body;
    try {
        const response = await db
            .insert(users)
            .values({ name, company, designation, contact, country, region, sex, age, plan })
            .returning();
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// NOTE: read users
// read all the users
userRouter.get('/users', async (req, res) => {
    try {
        const response = await db.select().from(users);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// read single user
userRouter.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.select().from(users).where(eq(users.id, id));
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// NOTE: update users
userRouter.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, company, designation, contact, country, region, sex, age, plan } = req.body;
    try {
        const response = await db
            .update(users)
            .set({ name, company, designation, contact, country, region, sex, age, plan })
            .where(eq(users.id, id))
            .returning();
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// NOTE: delete users
// delete user
userRouter.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.delete(users).where(eq(users.id, id));
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// delete multiple users
userRouter.delete('/users', async (req, res) => {
    const { ids } = req.body;
    try {
        await db.delete(users).where(inArray(users.id, ids));
        res.json({ message: 'Users deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
