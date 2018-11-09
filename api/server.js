const express = require('express')
const routeFactory = require('../routes/routeFactory.js')

//databases
const actionDb = require('../data/helpers/actionModel.js');
const projectDb = require('../data/helpers/projectModel.js');

//middleware
const checkAction = require('../middleware/actionCheck.js');
const checkProject = require('../middleware/projectCheck.js');

const server = express();
server.use(express.json());

//actions
server.use('/api/actions', routeFactory(actionDb, checkAction));

//projects
server.use('/api/projects', routeFactory(projectDb, checkProject));
server.get('/api/projects/:id/actions', async (req, res) => {
    const id = req.params.id;
    try {
        const actions = projectDb.getProjectActions(id);
        res.json({ actions })
    } catch (error) {
        console.log(error)
    }
})


module.exports = server;