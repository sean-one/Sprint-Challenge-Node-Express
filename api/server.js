const express = require('express')
const projectRoutes = require('../routes/projectRoutes.js');
const actionRoutes = require('../routes/actionRoutes.js');

const server = express();

server.use(express.json());

//actions
server.use('/api/actions', actionRoutes);

//projects
server.use('/api/projects', projectRoutes);

module.exports = server;