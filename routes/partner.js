const express = require("express")
const router = express.Router()
const partnerCtrl = require('../controller/partner')

router.all('/signup/partner',partnerCtrl.signup )
router.all('/login/partner',partnerCtrl.login)
//router.post('/login/partner' , partnerCtrl.login)

module.exports = router