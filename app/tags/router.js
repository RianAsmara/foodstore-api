const router = require('express').Router()

const multer = require('multer')

const tagController = require('./controller')

router.get('/tags', tagController.index);
router.post('/tag/store', multer().none(), tagController.store)
router.put('/tag/update/:id', multer().none(), tagController.update)
router.delete('tag/delete/:id', tagController.destroy)

module.exports = router