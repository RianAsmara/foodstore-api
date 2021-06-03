const router = require('express').Router()
const multer = require('multer');

const addressController = require('./controller')

router.get('/delivery-addresses', addressController.index);
router.post('/delivery-address', multer().none(), addressController.store)
router.put('/delivery-address/:id', multer().none(), addressController.update)
router.delete('/delivery-address/:id', addressController.destroy)

module.exports = router