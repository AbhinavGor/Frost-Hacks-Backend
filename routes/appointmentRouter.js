const router = require('express').Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/appointments', appointmentController.getApts);
router.post('/newApt/', appointmentController.createApt);
router.patch('/updateStatus/:aptId/:aptStatus', appointmentController.updateAptStatus);
router.get('/:id/getApts/:type', appointmentController.getApptsAccTypes);


module.exports = router;

