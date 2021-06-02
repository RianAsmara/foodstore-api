    const router = require('express').Router();
const multer = require('multer');
const os = require('os');

const productController = require('./controller');

// get all products
router.get('/products', productController.index);

// post new product
router.post('/product/store', multer({
    dest: os.tmpdir()
}).single('image'), productController.store);

// update spesific product
router.put('/product/update/:id', multer({
    dest: os.tmpdir()
}).single('image'), productController.update);

// delete spesific products
router.delete('/product/delete/:id', productController.destroy);

module.exports = router;