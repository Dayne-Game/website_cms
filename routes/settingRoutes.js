const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const settingController = require('../controllers/settingController')

router.route('/').get(settingController.getSettings)
router.route('/').post(verifyJWT, settingController.createNewSetting)
router.route('/:id').put(verifyJWT, settingController.updateSetting)

module.exports = router