const { client } = require('../server');
const { isNumeric } = require('../helpers/index');

exports.getMovieById = async (id) => {
	try {
		const query = `SELECT * FROM movies WHERE id=$1`;
		const values = [id];
		const action = await client.query(query, values);
		console.log(action.rows[0]);

		return action.rows[0];
	} catch (err) {
		console.log(err);
	}
};

exports.getMovieByTitle = async (title) => {
	try {
		const query = `SELECT * FROM movies WHERE title=$1;`;
		const values = [title];
		const action = await client.query(query, values);

		return action.rows[0];
	} catch (err) {
		console.log(err);
	}
};

exports.findMovieByTheMoviesdbId = async (id) => {
	try {
		const query = `SELECT * FROM movies WHERE id_themoviesdb=$1;`;
		const values = [id];
		const action = await client.query(query, values);

		return action.rows[0];
	} catch (err) {
		console.log(err);
	}
};

exports.addMovie = async (userInput) => {
	try {
		const sql = `insert into movies(title, comments, id_themoviesdb, poster_path) values($1, $2, $3, $4) returning *`;
		const handleValueFromUser = [
			userInput.title ?? 'Movie has no title',
			[],
			userInput.idThemoviesdb,
			userInput.posterPath,
		];
		const action = await client.query(sql, handleValueFromUser);
		return action.rows[0];
	} catch (err) {
		console.log(err);
	}
};
