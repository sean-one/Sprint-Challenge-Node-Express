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
        if (updated === null) {
            res.status(304).json({ error: `We could not find any content with the id ${id}.` })
        } else {
            res.status(202).json({ updated })
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

server.delete('/api/actions/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const count = await actionDb.remove(id);
        if (count === 0) {
            res.status(404).json({ message: `There is no content with an id of ${id}.` })
        } else {
            res.status(200).json({ message: `The element with the id of ${id} has been removed.` })
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

//projects
server.get('/api/projects', async (req, res) => {
    try {
        const projects = await projectDb.get()
        res.status(200).json({ projects })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

server.get('/api/projects/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const project = await projectDb.get(id);
        res.status(200).json({ project })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
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
            res.status(201).json({ newProject })
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

server.post('/api/projects/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    try {
        const updated = await projectDb.update(id, changes);
        if (updated === null) {
            res.status(304).json({ error: `We could not find any content with the id ${id}.` })
        } else {
            res.status(202).json({ updated })
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

server.delete('/api/projects/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const count = await projectDb.remove(id);
        if (count === 0) {
            res.status(404).json({ message: `There is no content with an id of ${id}.` })
        } else {
            res.status(200).json({ message: `The element with the id of ${id} has been removed.`})
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

module.exports = server;