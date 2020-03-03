/* jshint esversion: 8 */
/* globals require */
const  
  commandLineArgs     = require('./commandlineargs.js'),
  { sql, createPool } = require('slonik'),
  redis               = require('redis'),
  redisCache          = require('slonik-redis-cache'),
  client              = redis.createClient({
    port      : commandLineArgs.port,
    host      : commandLineArgs.host,
    password  : commandLineArgs.password
  }),
  cacheOpts = {};

if (commandLineArgs.murmur) {
  const murmur = require('murmurhash-js');
  cacheOpts.queryHashFn = (s) => (murmur.murmur2('fo2o',0x6379));
}

const pool = createPool(
  `postgres://${commandLineArgs.postgres}/testdb`, {
    interceptors: [
      redisCache(client, cacheOpts)
    ]
}),
queryTimes = [];

setInterval(() => {
  pool.connect(async (connection) => {
    let start = new Date().getTime();
    let emailCount = await connection.query(sql`SELECT COUNT(*) from testuser WHERE email ~ '(yahoo\.com)|(gmail\.com)$' `); // add caching with -- @cache-ttl 10  
    let end = new Date().getTime();
    let queryTime = end-start;
    queryTimes.push(queryTime);
    if ((queryTimes.length) % 10 === 0) {
      console.log(`Email Count: ${emailCount.rows[0].count} / i: ${queryTimes.length} / Avg Time: ${queryTimes.reduce((previous, current) => current += previous) / queryTimes.length}`);
    }
  });
},50);
