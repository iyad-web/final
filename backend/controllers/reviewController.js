import Review from "../models/Review.js";

// @desc    Get reviews for a movie
// @route   GET /api/reviews/movie/:movieId
// @access  Public
export const getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { movie, rating, comment } = req.body;

    // Vérifier si l'utilisateur a déjà laissé un avis
    const existingReview = await Review.findOne({
      movie,
      user: req.user._id,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "Vous avez déjà laissé un avis pour ce film" });
    }

    const review = await Review.create({
      movie,
      user: req.user._id,
      rating,
      comment,
    });

    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name avatar"
    );

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Avis non trouvé" });
    }

    // Vérifier que c'est bien l'utilisateur qui a créé l'avis
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    const updatedReview = await review.save();
    const populatedReview = await Review.findById(updatedReview._id).populate(
      "user",
      "name avatar"
    );

    res.json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Avis non trouvé" });
    }

    // Vérifier que c'est bien l'utilisateur qui a créé l'avis ou un admin
    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    await review.deleteOne();

    res.json({ message: "Avis supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
