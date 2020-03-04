const Pool = require('pg').Pool

const dbConfig = require('../../../config')['development']['database'];

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

async function dbQuery(queryString) {
	return new Promise((resolve) => {
		pool.query(queryString, (error, results) => {
			if (error) {
				console.log("ERROR IN QUERY: ", queryString)
				console.log(error)
			} else {
				if (results && results.rows) {
					resolve(results.rows);
				}
			}
		})
	});
}

exports.dbQuery = dbQuery;