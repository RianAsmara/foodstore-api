/*jshint esversion: 6 */

const Product = require('./model');

const config = require('../config');

const fs = require('fs');

const path = require('path');

async function index(res, req, next) {
    try {
        let {
            limit = 10,
                skip = 0
        } = req.query;

        let products = await Product
            .find()
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        return res.json(products);
    } catch (err) {
        next(err);
    }
}

async function store(res, req, next) {

    try {
        let payload = req.body;
        if (req.file) {
            let tmp_path = req.file.path;

            let originalText = req.file.originalName.split('.')[req.file.originalName.split('.').length - 1];

            let fileName = req.file.file + '.' + originalText;

            let target_path = path.resolve(config.rootPath, `public/upload/${fileName}`);

            const src = fs.createReadStream(tmp_path);

            const dest = fs.createWriteStream(target_path);

            src.on('end', async () => {
                let product = new Product({
                    ...payload,
                    image_url: filename
                });

                await product.save();

                return res.json(product);
            });

            src.on('error', async () => {
                next(err);
            });

        } else {

            let product = new Product(payload);

            await product.save();

            return res.json(product);
        }

    } catch (err) {
        if (err && err.name === 'VaidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

async function update(req, res, next) {
    try {
        let payload = req.body;
        if (req.file) {
            let tmp_path = req.file.path;

            let originalText = req.file.originalName.split('.')[req.file.originalName.split('.').length - 1];

            let fileName = req.file.file + '.' + originalText;

            let target_path = path.resolve(config.rootPath, `public/upload/${fileName}`);

            const src = fs.createReadStream(tmp_path);

            const dest = fs.createWriteStream(target_path);

            src.on('end', async () => {

                // cari produk yang akan di perbarui
                let product = await Product.find({
                    _id: req.params.id
                });

                // ambil gambar dari produk yang akan di update
                let currentImage = `${config.rootPath}/public/upload/${product.image_url}`;

                // cek apakah gambar tersedia di sistem
                if (fs.existsSync(currentImage)) {
                    // hapus jika ada
                    fs.unlinkSync(currentImage);
                }


                // update produk ke MongoDB
                product = await Product.findOneAndUpdate({
                    __id: req.params.id
                }, payload, {
                    new: true,
                    runValidators: true
                });
                return res.json(product);
            });

            src.on('error', async () => {
                next(err);
            });

        } else {
            // update produk jika tidak ada file upload
            let product =
                await Product
                .findOneAndUpdate({
                    _id: req.params.id
                }, payload, {
                    new: true,
                    runValidators: true
                });
            return res.json(product);
        }
    } catch (err) {
        if (err && err.name === 'VaidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

async function destroy(req, res, next) {
    try {
        let product = await Product.findOneAndDelete({
            _id: req.params.id
        });

        // hapus juga gambar dari produk terkait
        let currentImage =
            `${config.rootPath}/public/upload/${product.image_url}`;
        if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage)
        }

        return res.json(product);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
};