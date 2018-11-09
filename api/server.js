const express = require('express')
const projectRoutes = require('../routes/projectRoutes.js');
// const actionRoutes = require('../routes/actionRoutes.js');
const routeFactory = require('../routes/routeFactory.js')

const actionDb = require('../data/helpers/actionModel.js');

const checkAction = require('../middleware/actionCheck.js');

const server = express();

server.use(express.json());

//actions
// server.use('/api/actions', actionRoutes);
server.use('/api/actions', routeFactory(actionDb, checkAction));

//projects
server.use('/api/projects', projectRoutes);

module.exports = server;