module.exports = actionCheck = (req, res, next) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ error: 'Please be sure to include all required information' })
    } else {
        next();
    }
}