import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { userRouter } from './routes/user.js';
import { trialsRouter } from './routes/trials.js';
import searchQueryRouter from './routes/searchQuery.js';
import { favTitleRouter } from './routes/favTitles.js';
import { selectedTrialsRouter } from './routes/selecteTrials.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', userRouter);

app.use('/api', trialsRouter);

app.use('/api', searchQueryRouter);

app.use('/api', favTitleRouter);

app.use('/api', selectedTrialsRouter);

export default app;
