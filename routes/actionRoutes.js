const express = require('express')
const actionDb = require('../data/helpers/actionModel.js');
const actionCheck = require('../middleware/actionCheck.js');

const router = express.Router();

router.use(express.json());

//entry '/api/actions'
router.get('/', async (req, res) => {
    try {
        const actions = await actionDb.get()
        res.status(200).json({ actions })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const action = actionDb.get(id);
        res.status(200).json({ action })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

router.post('/', actionCheck, async (req, res) => {
    const actionPost = req.body;
    try {
        const newPost = await actionDb.insert(actionPost);
        res.status(201).json({ newPost })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

router.post('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;