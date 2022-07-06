const express = require('express');
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controller/goalsController');
const protect = require('../middleware/authMiddlerware');

const router = express.Router();

router.route('/').get(protect, getGoals).post(protect, setGoals);
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;