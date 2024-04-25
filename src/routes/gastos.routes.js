const { Router } = require("express");
const router = Router();
const calcularDeuda = require("../controllers/calculo.controller.js");
const {
  getGastos,
  postGastos,
  putGastos,
  deleteGastos,
} = require("../controllers/gastos.controller.js");

router.get("/", async (req, res) => {
  try {
    const response = await getGastos();
    res.status(200).send(response);
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { roommate, descripcion, monto } = req.body;
    const response = await postGastos(roommate, descripcion, monto);
    calcularDeuda();
    res.status(200).send(response);
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const { id } = req.query;
    const { roommate, descripcion, monto } = req.body;
    const response = await putGastos(id, roommate, descripcion, monto);
    calcularDeuda();
    res.status(200).send(response);
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { id } = req.query;
    const response = await deleteGastos(id);
    calcularDeuda();
    res.status(200).send(response);
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});
module.exports = router;
