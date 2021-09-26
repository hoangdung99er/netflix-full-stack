export const getMovie = (movies) => ({
  type: "GET_MOVIE",
  payload: movies,
});

export const deleteMovie = (id) => ({
  type: "DELETE_MOVIE",
  payload: id,
});

export const createMove = (movie) => ({
  type: "CREATE_MOVIE",
  payload: movie,
});

export const updateMovie = (id, movie) => ({
  type: "UPDATE_MOVIE",
  payload: {
    id,
    movie,
  },
});
