import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.js';
import { trialsRouter } from './routes/trials.js';
import searchQueryRouter from './routes/searchQuery.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRouter);

app.use('/api', trialsRouter);

app.use('/api', searchQueryRouter);

export default app;
