const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const postRoommates = async () => {
  try {
    const response = await axios.get("https://randomuser.me/api/?limit=1");
    const createRommie = response.data.results[0];
    const roommate = {
      id: uuidv4().slice(0, 6),
      nombre: createRommie.name.first + " " + createRommie.name.last,
      debe: 0,
      recibe: 0,
    };
    const archivo = fs.readFileSync("./data/roommates.json", "utf8");
    const data = await JSON.parse(archivo);
    const roomies = data.roommates;
    roomies.unshift(roommate);
    fs.writeFileSync("./data/roommates.json", JSON.stringify(data));
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Creacion de nuevo roommate fallida.",
    };
  }
};

const getRoommates = async () => {
  try {
    const archivo = fs.readFileSync("./data/roommates.json", "utf8");
    const data = JSON.parse(archivo);
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Obteción de roommates fallida.",
    };
  }
};

module.exports = { postRoommates, getRoommates };
