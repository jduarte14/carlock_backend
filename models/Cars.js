const { Schema, model } = require('mongoose');

const CarSchema = Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    matricula: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default:Date.now
    },
    anio:{
        type: Number,
        required:true
    },
    precio: {
        type: Number,
        required: true
    } ,
    kilometraje:{
        type:Number,
    },
    imagen: {
        type: String,
        required: true
    }/*
    disponbilidad:{
        type:Boolean,
        required:true
    }*/
});


module.exports = model("Car", CarSchema, "cars");