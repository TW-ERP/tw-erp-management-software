const { Pool } = require('pg');

const PG_URI =
  'postgres://fstcdkup:ci1eV6X7H0_FdZ0QxDTeemp2B8fJmHWT@mahmud.db.elephantsql.com/fstcdkup';

/* create a new pool using the connection URI */
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query', text);
    return pool.query(text, params, callback);
  },
};
