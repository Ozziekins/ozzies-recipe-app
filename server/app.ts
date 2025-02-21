import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRouter from './api/auth.js';
import userRouter from './api/user.js';
import recipesRouter from './api/recipes.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/recipes', recipesRouter);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
