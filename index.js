// https://github.com/LambdaSchool/Sprint-Challenge-Node-Express/pull/435

const server = require('./api/server.js');

const port = 7500;

server.listen(port, console.log(`\n${port} You are not alone...`));