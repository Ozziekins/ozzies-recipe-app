import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Dummy user store 
interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
}
const users: User[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      passwordHash,
    };
    users.push(newUser);

    res.json({ user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (error: any) {
    console.error('Signup error:', error.message);
    res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Sign a JWT that includes the user's id, name, and email
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ user: { id: user.id, name: user.name, email: user.email, token } });
  } catch (error: any) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
