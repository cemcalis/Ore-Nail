const jwt = require('jsonwebtoken');
const { readData, writeData } = require('../utils/db');

exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  let users = readData('users');
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'User already exists' });

  const newUser = { id: Date.now().toString(), name, email, phone, password, isAdmin: false };
  users.push(newUser);
  writeData('users', users);

  const token = jwt.sign({ userId: newUser.id, isAdmin: false }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: newUser.id, name, email, isAdmin: false } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const users = readData('users');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });

  const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
};

exports.adminLogin = async (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

  if (password !== ADMIN_PASSWORD) return res.status(401).json({ message: 'Geçersiz admin şifresi' });

  const token = jwt.sign({ userId: 'admin', isAdmin: true }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
  res.json({ token, isAdmin: true });
};

exports.getProfile = async (req, res) => {
  if (req.userId === 'admin') return res.json({ id: 'admin', name: 'Admin', isAdmin: true });
  const users = readData('users');
  const user = users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin });
};
