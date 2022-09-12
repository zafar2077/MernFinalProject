const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  productImage: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);
