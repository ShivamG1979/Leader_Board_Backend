import User from '../models/user.js';
import History from '../models/History.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  const { name } = req.body;
  try {
    const newUser = new User({ name });
    await newUser.save(); 
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  } 
};

export const claimPoints = async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.points += points;
    await user.save();

    const history = new History({ userId, points });
    await history.save(); 

    res.json({ user, points });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await History.find().populate('userId', 'name').sort({ date: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
