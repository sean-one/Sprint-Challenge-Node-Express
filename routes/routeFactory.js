const express = require('express')

function routeFactory(db, middleware) {
    const router = express.Router();
    
    router.use(express.json());
    
    //entry '/api/actions'
    router.get('/', async (req, res) => {
        try {
            const content = await db.get()
            res.status(200).json({ content })
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong' })
        }
    })
    
    router.get('/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const content = db.get(id);
            res.status(200).json({ content })
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong' })
        }
    })
    
    router.post('/', middleware, async (req, res) => {
        const post = req.body;
        try {
            const newPost = await db.insert(post);
            res.status(201).json({ newPost })
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong' })
        }
    })
    
    router.post('/:id', async (req, res) => {
        const id = req.params.id;
        const changes = req.body;
        try {
            const updated = await db.update(id, changes);
            if (updated === null) {
                res.status(304).json({ error: `We could not find any content with the id ${id}.` })
            } else {
                res.status(202).json({ updated })
            }
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong' })
        }
    })
    
    router.delete('/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const count = await db.remove(id);
            if (count === 0) {
                res.status(404).json({ message: `There is no content with an id of ${id}.` })
            } else {
                res.status(200).json({ message: `The element with the id of ${id} has been removed.` })
            }
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong' })
        }
    })

    return router;

}


module.exports = routeFactory;