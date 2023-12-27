const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const uploadController = require('../controllers/uploadController')

router.route('/image').post(verifyJWT, uploadController.uploadImage);
router.route('/image/:id').delete(verifyJWT, uploadController.deleteImage);
router.route('/images').get(verifyJWT, uploadController.getImages);


module.exports = router