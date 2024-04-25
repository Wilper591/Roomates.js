const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const getGastos = async () => {
  try {
    const archivo = fs.readFileSync("./data/gastos.json", "utf8");
    const data = JSON.parse(archivo);
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Obtención de gastos fallida.",
    };
  }
};

const postGastos = async (roommate, descripcion, monto) => {
  try {
    const gasto = {
      id: uuidv4().slice(0, 6),
      roommate,
      descripcion,
      monto,
    };
    const archivo = fs.readFileSync("./data/gastos.json", "utf8");
    const data = await JSON.parse(archivo);
    const gastoData = data.gastos;
    gastoData.unshift(gasto);
    fs.writeFileSync("./data/gastos.json", JSON.stringify(data));
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Creación de gastos fallida.",
    };
  }
};

const putGastos = async (id, roommate, descripcion, monto) => {
  try {
    const archivo = fs.readFileSync("./data/gastos.json", "utf-8");
    const data = JSON.parse(archivo);
    let { gastos } = data;

    gastos = gastos.map((gasto) => {
      if (gasto.id === id) {
        (gasto.roommate = roommate),
          (gasto.descripcion = descripcion),
          (gasto.monto = monto);
        return gasto;
      }
      return gasto;
    });
    fs.writeFileSync("./data/gastos.json", JSON.stringify({ gastos }));
    return gastos;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Edición de gasto fallida.",
    };
  }
};

const deleteGastos = async (id) => {
  try {
    const archivo = fs.readFileSync("./data/gastos.json", "utf-8");
    const data = JSON.parse(archivo);
    let { gastos } = data;
    const gastosFindIndex = gastos.findIndex((gasto) => gasto.id === id);
    if (gastosFindIndex !== -1) {
      gastos.splice(gastosFindIndex, 1);
      fs.writeFileSync("./data/gastos.json", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Eliminación de gasto fallida.",
    };
  }
};
module.exports = { getGastos, postGastos, putGastos, deleteGastos };
