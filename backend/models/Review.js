import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: [true, "La note est requise"],
    min: 1,
    max: 10,
  },
  comment: {
    type: String,
    required: [true, "Le commentaire est requis"],
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Un utilisateur ne peut laisser qu'un seul avis par film
reviewSchema.index({ movie: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
