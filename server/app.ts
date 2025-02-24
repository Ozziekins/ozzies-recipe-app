import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRouter from './api/auth';
import userRouter from './api/user';
import recipesRouter from './api/recipes';

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/recipes', recipesRouter);

if (import.meta.url === new URL(process.argv[1], 'file://').href) {
  console.log('EDAMAM_APP_ID:', process.env.EDAMAM_APP_ID);
  console.log('EDAMAM_APP_KEY:', process.env.EDAMAM_APP_KEY);

  const PORT = process.env.PORT || 3003;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
