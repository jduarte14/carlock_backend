const validator = require('validator');
const Car = require('../models/Cars');
const cloudinary = require('./../clouditonary/clouditonaryConfig');

const createCars = async (req, res) => {
    const params = req.body;
    const { marca, modelo, anio, color, precio, matricula, fecha, kilometraje } = params;
  
    try {
      let validate_marca = !validator.isEmpty(marca);
      let validate_modelo = !validator.isEmpty(modelo);
      let validate_anio = !validator.isEmpty(anio);
      let validate_color = !validator.isEmpty(color);
      let validate_precio = !validator.isEmpty(precio);
  
      if (!validate_anio || !validate_color || !validate_marca || !validate_modelo || !validate_precio) {
        return res.status(400).json({
          status: "error",
          message: "Missing data",
        });
      }
  
      if (!req.file) {
        return res.status(400).json({
          status: 'error',
          message: 'Missing image file',
        });
      }
  
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'cars' });
      const imageUrl = result.secure_url;
  
      const car = new Car({
        marca: marca,
        modelo: modelo,
        color: color,
        matricula: matricula,
        fecha: fecha,
        anio: anio,
        precio: precio,
        kilometraje: kilometraje,
        imagen: imageUrl
      });
  
      await car.save();
  
      return res.status(200).send({
        status: "success",
        message: "Car created successfully",
        car_storaged: car,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };


const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        if (!cars) {
            return res.status(404).json({
                status: "error",
                message: 'There are no cars in the database',
            });
        }
        return res.status(200).json({
            status: "success",
            carsData: cars,
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

const getSingleCar = async (req, res) => {
    try {
        let id = req.params.id;
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({
                status: "error",
                message: 'Car not found',
            });
        }
        return res.status(200).json({
            status: "success",
            carData: car,
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "Error",
            error: error.message
        });

    }
}

const editCar = async (req, res) => {
    try {
        let id = req.params.id;
        const { marca, modelo, color, matricula, fecha, anio, precio, kilometraje } = req.body;
        let imagen = '';

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'cars' });
            imagen = result.secure_url;
        } else {
            imagen = req.body.imagen;
        }

        const car = await Car.findByIdAndUpdate(id, { marca, modelo, color, matricula, fecha, anio, precio, kilometraje, imagen }, { new: true });
        if (!car) {
            return res.status(404).json({
                status: "error",
                message: "Car not found"
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Car updated successfully",
            car_updated: car
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

const deleteCar = async (req, res) => {
    try {
        let id = req.params.id;
        const car = await Car.findByIdAndDelete(id);
        if (!car) {
            return res.status(404).json({
                status: "error",
                message: "Car not found"
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Car deleted successfully",
            car_deleted: car
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}


module.exports = {
    getCars,
    createCars,
    getSingleCar,
    editCar,
    deleteCar
}