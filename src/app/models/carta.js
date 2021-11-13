const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartaSchema = new Schema({
  idCarta: Number,
  nombreCarta: String,
  descripcionCarta: String,
  ataqueCarta: String,
  defensaCarta: String,
  puntosCuraJugador: Number,
  casillerosMovimientoHorizontal: Number,
  casillerosMovimientoVertical: Number,
  casillerosMovimientoDiagonal: Number,
  tipoCarta: {
    type: String,
    default: "normal",
  },
  imagenCarta: String,
  stickerAtaque: {
    type: Number,
    default: 0,
  },

  stickerDefensa: {
    type: Number,
    default: 0,
  },

  precioCarta: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("carta", cartaSchema);
