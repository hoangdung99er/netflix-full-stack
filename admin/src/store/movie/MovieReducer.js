const MovieReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIE":
      return {
        movies: action.payload,
      };
    case "CREATE_MOVIE":
      return {
        movies: [...state.movies, action.payload],
      };
    case "UPDATE_MOVIE":
      const mid = action.payload.id;
      const cloneMovies = state.movies.slice();
      let moviesUpdated;
      const findIndexMovieIndex = cloneMovies.findIndex(
        (movie) => movie._id === mid
      );
      if(findIndexMovieIndex <= 0){;
        return;
      } else {
        moviesUpdated[findIndexMovieIndex] = action.payload.movie;
      }
      return {
        movies: moviesUpdated,
      };
    case "DELETE_MOVIE":
      const movieId = action.payload;
      console.log(movieId);
      const movies = [...state.movies];
      const updatedMovies = movies.filter((movie) => movie._id !== movieId);
      return {
        movies: updatedMovies,
      };
    default:
      return { ...state };
  }
};

export default MovieReducer;
