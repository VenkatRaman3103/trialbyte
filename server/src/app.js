import express from 'express';
import { userRouter } from './routes/user.js';

const app = express();
app.use(express.json());

app.use('/api', userRouter);

export default app;
