const express = require('express');
const router = express.Router();
const {
  createArena,
  getArenas,
  getArenaById,
  updateArena,
  deleteArena
} = require('../controllers/arenaController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getArenas);
router.get('/:id', getArenaById);

// Owner only routes
router.post('/', protect, authorize('owner'), createArena);
router.put('/:id', protect, authorize('owner'), updateArena);
router.delete('/:id', protect, authorize('owner'), deleteArena);

module.exports = router;