const Category = require('./model')
const config = require('../config');

async function index(req, res, next) {
    try {
        let {
            limit = 10,
                skip = 0
        } = req.query;

        let category = await Category
            .find()
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        return res.json(category);
    } catch (err) {
        next(err);
    }
}

async function store(req, res, next) {
    try {

        let policy = policyFor(req.user)

        if (!policy.can('create', 'Category')) {
            return res.json({
                error: 1,
                message: `Anda tidak memiliki akses untuk membuat kategori`
            });
        }

        let payload = req.body

        let category = new Category(payload)

        await category.save()

        return res.json(category)
    } catch (err) {
        cd
        if (err && err.name == 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message
            })
        }
    }
    next(err)
}

async function update(req, res, next) {
    try {

        let policy = policyFor(req.user)

        if (!policy.can('update', 'Category')) {
            return res.json({
                error: 1,
                message: `Anda tidak memiliki akses untuk mengupdate kategori`
            });
        }

        let payload = req.body

        let category = await Category.findOneAndUpdate({
            _id: req.params.id
        }, payload, {
            new: true,
            runValidators: true
        })

        return res.json(category)
    } catch (err) {
        if (err && err.name == 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message
            })
        }
        next(err)
    }
}

async function destroy(req, res, next) {
    try {
        let policy = policyFor(req.user)

        if (!policy.can('delete', 'Category')) {
            return res.json({
                error: 1,
                message: `Anda tidak memiliki akses untuk menghapus kategori`
            });
        }

        let deleted = await Category.findOneAndDelete({
            _id: req.params.id
        })

        return res.json(deleted)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
}