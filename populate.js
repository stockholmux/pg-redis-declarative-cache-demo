/* jshint esversion: 8 */
/* globals require */

const
  commandLineArgs       = require('./commandlineargs.js'),  
  { sql, createPool }   = require('slonik'),
  { setIntervalAsync }  = require('set-interval-async/dynamic'),
  { internet }          = require('faker'),
  pool                  = createPool(`postgres://${commandLineArgs.postgres}/testdb`);


setIntervalAsync(
  async () => {
    const
      username  = internet.userName(),
      email     = internet.email();

    console.log(`Adding ${username} ${email}`);
    try {
      let timingKey = Math.random();
      await pool.connect(async (connection) => {
        console.time(timingKey);
        await connection.query(sql`
          INSERT INTO testuser (username, email) VALUES (${username},${email})
        `);
        console.timeEnd(timingKey);
      });
    } catch(e) {
      console.log(e);
    }
  },
  50
);