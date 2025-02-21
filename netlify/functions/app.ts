import serverless from 'serverless-http';
import express from 'express';
import dotenv from 'dotenv';
import recipesRouter from '../../server/api/recipes';
import authRouter from '../../server/api/auth'; 
import userRouter from '../../server/api/user'; 

dotenv.config();

const app = express();
app.use(express.json());

// Mount your API routes
app.use('/api/recipes', recipesRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Export the handler for Netlify Functions
export const handler = serverless(app);
