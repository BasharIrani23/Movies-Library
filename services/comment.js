const { addMovie, getMovieByTitle } = require('./movie');
const { client } = require('../server');

exports.addCommentToMovie = async (comment, movie) => {
	try {
		// Using movie title to avoid conflicts with the id from the API
		const movieDb = await getMovieByTitle(movie.title);
		let currentMovie = {};

		if (!movieDb) {
			throw new Error('Movie not found');
			// console.log('here');
			// const addNewMovie = await addMovie({
			// 	title: movie.title,
			// 	idThemoviesdb: movie.id,
			// });

			// currentMovie = addNewMovie.rows[0];
			// console.log('New movie added', addNewMovie);
		} else {
			currentMovie = movieDb;
		}

		const sql = `
			UPDATE movies
			SET comments =$1
			WHERE id = $2
			returning *;
		`;
		const values = [currentMovie.comments.concat(comment), currentMovie.id];
		const action = await client.query(sql, values);
		return action;
	} catch (err) {
		console.log(err);
	}
};
