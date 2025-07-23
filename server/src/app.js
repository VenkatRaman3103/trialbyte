import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.js';
import { trialsRouter } from './routes/trials.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRouter);

app.use('/api', trialsRouter);

export default app;
