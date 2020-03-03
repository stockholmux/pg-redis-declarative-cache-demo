const 
    program = require('commander');

program
    .option('-p, --port <value>','Redis Port',6379)
    .option('-a, --auth <value> [optional]','Redis Auth')
    .option('-h, --host <value>','Redis Host','localhost')
    .option('-m, --murmur', 'use murmur hash')
    .option('-g, --postgres <value>', 'PostgreSQL host and port', 'localhost:5432')
    .parse(process.argv);

module.exports = {
    port        : program.port,
    password    : program.auth,
    host        : program.host,
    murmur      : program.murmur,
    postgres    : program.postgres
};