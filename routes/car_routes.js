const express = require('express');
const router = express.Router();
const CarController = require('../controllers/car_controller');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/cars', CarController.getCars);
router.get('/cars/:id', CarController.getSingleCar);

router.post('/cars', upload.single('imagen'), CarController.createCars);

router.put('/cars/:id', upload.single('imagen'),CarController.editCar);
router.delete('/cars/:id', CarController.deleteCar);

module.exports = router;
