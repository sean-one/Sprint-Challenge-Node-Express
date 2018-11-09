const express = require('express')
const actionDb = require('../data/helpers/actionModel.js');
const projectDb = require('../data/helpers/projectModel.js');

const server = express();

server.use(express.json());

//actions
server.get('/api/actions', async (req, res) => {
    try {
        const actions = await actionDb.get()
        res.status(200).json({ actions })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong'})
    }
})

server.get('/api/actions/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const action = actionDb.get(id);
        res.status(200).json({ action })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

server.post('/api/actions', async (req, res) => {
    const actionPost = req.body;
    try {
        if(!actionPost.project_id || !actionPost.description || !actionPost.notes) {
            res.status(400).json({ error: 'Please be sure to include all required information' })
        } else {
            const newPost = await actionDb.insert(actionPost);
            res.status(201).json({ newPost })
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

server.post('/api/actions/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    try {
        const updated = await actionDb.update(id, changes);
        res.json({ updated })
    } catch (error) {
        console.log(error)
    }
})

server.delete('/api/actions/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const count = await actionDb.remove(id);
        if (count === 0) {
            res.json({ message: `An id of ${id} could not be found.`})
        } else {
            res.status(200).json({ message: `The element with the id of ${id} has been removed`})
        }
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

server.get('/api/projects/:id/actions', async (req, res) => {
    const id = req.params.id;
    try {
        const actions = projectDb.getProjectActions(id);
        res.json({ actions })
    } catch (error) {
        console.log(error)
    }
})

server.post('/api/projects', async (req, res) => {
    const projectPost = req.body;
    try {
        if (!projectPost.name || !projectPost.description) {
            res.status(400).json({ error: 'Please be sure to include all required information' })
        } else {
            const newProject = await projectDb.insert(projectPost);
            res.json({ newProject })
        }
    } catch (error) {
        console.log(error)
    }
})

server.post('/api/projects/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    try {
        const updated = await projectDb.update(id, changes);
        res.json({ updated })
    } catch (error) {
        console.log(error)
    }
})

server.delete('/api/projects/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const count = await projectDb.remove(id);
        if (count === 0) {
            res.json({ message: `An id of ${id} could not be found.` })
        } else {
            res.status(200).json({ message: `The element with the id of ${id} has been removed.`})
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = server;