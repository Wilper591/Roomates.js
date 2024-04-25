const { Router } = require("express");
const router = Router();
const rutasRoommates = require("./roommates.routes.js");
const rutasPagos = require("./gastos.routes.js");

//Ruta principal
router.get("/", (req, res) => {
  try {
    res.status(200).sendFile("index.html");
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

//Rutas Roommates y Pagos
router.use("/roommates", rutasRoommates);
router.use("/gastos", rutasPagos);

//Ruta genérica
router.get("*", (req, res) => {
  try {
    res.status(404).send(`<h1>Sitio Web No Encontrado</h1>`);
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
