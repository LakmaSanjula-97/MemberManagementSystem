const router = require('express').Router()
const memberCtrl = require('../controllers/memberCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

//member routes
router.route('/members')
    .get(memberCtrl.getMembers)
    .post(auth, authAdmin, memberCtrl.createMember)


router.route('/members/:id')
    .delete(auth, authAdmin, memberCtrl.deleteMember)
    .put(auth, authAdmin, memberCtrl.updateMember)

module.exports = router