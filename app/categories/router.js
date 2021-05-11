const router = require('express').Router()

const multer = require('multer')

const categoryController = require('./controller')

router.post('/category/store', multer().none(), categoryController.store)
router.put('/category/update/:id', multer().none(), categoryController.update)
router.delete('category/delete/:id', categoryController.destroy)

module.exports = router