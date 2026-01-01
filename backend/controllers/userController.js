import User from "../models/User.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.isActive =
      req.body.isActive !== undefined ? req.body.isActive : user.isActive;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.deleteOne();

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add movie to favorites
// @route   POST /api/users/favorites/:movieId
// @access  Private
export const addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.favorites.includes(req.params.movieId)) {
      return res.status(400).json({ message: "Film déjà dans les favoris" });
    }

    user.favorites.push(req.params.movieId);
    await user.save();

    res.json({ message: "Film ajouté aux favoris", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove movie from favorites
// @route   DELETE /api/users/favorites/:movieId
// @access  Private
export const removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
      (movie) => movie.toString() !== req.params.movieId
    );

    await user.save();

    res.json({ message: "Film retiré des favoris", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private/Admin
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: "admin" });

    // Nouveaux utilisateurs ce mois
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const newUsers = await User.countDocuments({
      createdAt: { $gte: firstDay },
    });

    res.json({
      totalUsers,
      activeUsers,
      adminUsers,
      newUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
