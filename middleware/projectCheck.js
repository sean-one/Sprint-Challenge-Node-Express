module.exports = projectCheck = (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ error: 'Please be sure to include all required information' })
    } else {
        next();
    }
}