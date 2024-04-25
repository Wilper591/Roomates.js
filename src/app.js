const express = require("express");
const rutas = require("./routes/index.routes.js");

const app = express();
const PORT = 3000;

//Middlewares
app.use(express.static("public"));
app.use(express.json());

//Rutas
app.use("/apiV1", rutas);

module.exports = { app, PORT };
