import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  imdbID: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: [true, "Le titre est requis"],
  },
  year: {
    type: String,
  },
  genre: {
    type: String,
  },
  director: {
    type: String,
  },
  actors: {
    type: String,
  },
  plot: {
    type: String,
  },
  poster: {
    type: String,
  },
  imdbRating: {
    type: String,
  },
  runtime: {
    type: String,
  },
  language: {
    type: String,
  },
  country: {
    type: String,
  },
  awards: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Publié", "Brouillon"],
    default: "Publié",
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Incrémenter les vues
movieSchema.methods.incrementViews = async function () {
  this.views += 1;
  await this.save();
};

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
