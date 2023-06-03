const { conexion } = require('./db/conexion');
const express = require("express");
const cors = require("cors");



conexion();


const app = express();
const puerto = 4200; 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.listen(puerto, () => {
    console.log(`servidor funcionando en el puerto ${puerto}`);
});



const car_routes = require("./routes/car_routes");
const user_routes = require('./routes/user_routes');

app.use("/api", car_routes);
app.use("/auth",user_routes);


