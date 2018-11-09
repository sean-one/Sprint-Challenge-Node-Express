const express = require('express')
const actionDb = require('../data/helpers/actionModel.js');
const projectDb = require('../data/helpers/projectModel.js');

const server = express();

server.use(express.json());

//actions
server.get('/api/actions', async (req, res) => {
    try {
        const actions = await actionDb.get()
        res.json({ actions })
    } catch (error) {
        console.log(error)
    }
})

server.get('/api/actions/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const action = actionDb.get(id);
        res.json({ action })
    } catch (error) {
        console.log(error)
    }
})

//projects
server.get('/api/projects', async (req, res) => {
    try {
        const projects = await projectDb.get()
        res.json({ projects })
    } catch (error) {
        console.log(error)
    }
})

server.get('/api/projects/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const project = await projectDb.get(id);
        res.json({ project })
    } catch (error) {
        console.log(error)
    }
})

module.exports = server;