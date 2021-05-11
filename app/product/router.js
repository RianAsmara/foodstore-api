/*jshint esversion: 6 */

const router = require('express').Router();
const multer = require('multer');
const os = require('os');

const productController = require('./controller');

router.get('/products', productController.index);
router.post('/product/store', multer({
    dest: os.tmpdir()
}).single('image'), productController.store);
router.put('/product/update/:id', multer({
    dest: os.tmpdir()
}).single('image'), productController.update);
router.delete('/product/delete/:id', productController.destroy);

module.exports = router;