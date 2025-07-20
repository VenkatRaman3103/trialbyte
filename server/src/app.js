import express from 'express';
import { userRouter } from './routes/user.js';

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);

export default app;
