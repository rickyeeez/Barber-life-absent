const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  uniq: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  nama: {
    required: true,
    type: String,
  },
  asal_kota: {
    required: true,
    type: String,
  },
  pilihan: {
    required: true,
    type: String,
  },
  nama: {
    nama_sertif: true,
    type: String,
  },
  nama: {
    no: true,
    type: String,
  },
});

module.exports = mongoose.model("Data", dataSchema);
