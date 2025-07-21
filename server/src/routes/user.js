import { Router } from 'express';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';

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

// NOTE: update users

// NOTE: delete users
