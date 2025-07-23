import { Router } from 'express';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq, inArray } from 'drizzle-orm';

export const trialsRouter = Router();

trialsRouter.get('/trials', async (req, res) => {
    res.json('Hello from trials');
});

// NOTE: create trials

// NOTE: read trials
// NOTE: update trials
// NOTE: delete trials
