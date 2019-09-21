/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();

router.get('/profile/:id', async (req, res) => {
  try {
    return res.status(200).json({ message: 'julio' });
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    return res.status(200).json({ message: 'the user route' });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
