

const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

router.post('/create', (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = userModel.getUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const newUser = userModel.addUser(username, email, password);
  res.status(201).json(newUser);
});

router.get('/:username', (req, res) => {
  const { username } = req.params;
  const user = userModel.getUserByUsername(username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

router.put('/:username', (req, res) => {
  const { username } = req.params;
  const { isAdmin } = req.body;

  const updated = userModel.updateUserIsAdmin(username, isAdmin);

  if (!updated) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ message: 'User updated successfully' });
});

module.exports = router;
