const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  nombreUsuario: String,
  nivelUsuario: {
    type: Number,
    default: "1",
  },
  experienciaUsuario: {
    type: Number,
    default: "1",
  },
  mazoUsuario: {
    type: Array,
    default: [],
  },
  monedasUsuario: {
    type: Number,
    default: "0",
  },
  todasLasCartasUsuario: {
    type: Array,
    default: [],
  },
  cantidadStickerAtaqueX2: {
    type: Number,
    default: 0,
  },
  cantidadStickerDefensaX2: {
    type: Number,
    default: 0,
  },
  cantidadStickerAtaqueX3: {
    type: Number,
    default: 0,
  },
  cantidadStickerDefensaX3: {
    type: Number,
    default: 0,
  },
  cantidadStickerAtaqueX4: {
    type: Number,
    default: 0,
  },
  cantidadStickerDefensaX4: {
    type: Number,
    default: 0,
  },
  cantidadStickerAtaqueX5: {
    type: Number,
    default: 0,
  },
  cantidadStickerDefensaX5: {
    type: Number,
    default: 0,
  },
  cantidadStickerAtaqueX6: {
    type: Number,
    default: 0,
  },
  cantidadStickerDefensaX6: {
    type: Number,
    default: 0,
  },
  partidasJugadas: {
    type: Number,
    default: 0,
  },
  partidasGanadas: {
    type: Number,
    default: 0,
  },
  partidasPerdidas: {
    type: Number,
    default: 0,
  },
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
