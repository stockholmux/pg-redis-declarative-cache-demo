# Declarative Caching Demo

This demo shows how to do caching declaratively instead of imperatively. It is built on [slonik-redis-cache](https://github.com/stockholmux/slonik-redis-cache) using PostgreSQL and Redis. 

## Install
```
$ npm install
```

`demo.sql` should get you started on the correct table structure.

## Run
In one terminal window start loading the table with `populate.js`. This will add random users and emails to a table continuously.

In the second terminal window, run `index.js` which will do a hard-ish query on the same table continuously. The code has no caching, but can be added in by including a special SQL comment to the Query associated with the variable `emailCount` (see the end of line).

Both `populate.js` and `index.js` have options to change Redis and PostgreSQL connection info, see `commandlineargs.js` for more information. Additionally, there is an option `--murmur` to show how to do alternate cache key structure.

