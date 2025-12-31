const API_KEY = "66f2788c";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "True") {
      return { success: true, data: data.Search };
    } else {
      return { success: false, error: data.Error };
    }
  } catch (error) {
    return { success: false, error: "Erreur de connexion à l'API" };
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "True") {
      return { success: true, data };
    } else {
      return { success: false, error: data.Error };
    }
  } catch (error) {
    return { success: false, error: "Erreur lors du chargement des détails" };
  }
};

export default { searchMovies, getMovieDetails };
