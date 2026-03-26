const Arena = require('../models/Arena');

// @route   POST /api/arenas
// @access  Private (owner only)
const createArena = async (req, res) => {
  try {
    const { name, sport, location, description, pricePerSlot } = req.body;

    const arena = await Arena.create({
      name,
      sport,
      location,
      description,
      pricePerSlot,
      owner: req.user._id
    });

    res.status(201).json(arena);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/arenas
// @access  Public
const getArenas = async (req, res) => {
  try {
    const filter = {};

    // Filter by sport if query param provided
    // Example: /api/arenas?sport=football
    if (req.query.sport) {
      filter.sport = req.query.sport;
    }

    const arenas = await Arena.find(filter).populate('owner', 'name email');
    res.json(arenas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/arenas/:id
// @access  Public
const getArenaById = async (req, res) => {
  try {
    const arena = await Arena.findById(req.params.id).populate('owner', 'name email');

    if (!arena) {
      return res.status(404).json({ message: 'Arena not found' });
    }

    res.json(arena);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/arenas/:id
// @access  Private (owner only)
const updateArena = async (req, res) => {
  try {
    const arena = await Arena.findById(req.params.id);

    if (!arena) {
      return res.status(404).json({ message: 'Arena not found' });
    }

    // Make sure logged in user is the owner of this arena
    if (arena.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this arena' });
    }

    const updatedArena = await Arena.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedArena);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/arenas/:id
// @access  Private (owner only)
const deleteArena = async (req, res) => {
  try {
    const arena = await Arena.findById(req.params.id);

    if (!arena) {
      return res.status(404).json({ message: 'Arena not found' });
    }

    // Make sure logged in user is the owner of this arena
    if (arena.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this arena' });
    }

    await arena.deleteOne();
    res.json({ message: 'Arena removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createArena, getArenas, getArenaById, updateArena, deleteArena };