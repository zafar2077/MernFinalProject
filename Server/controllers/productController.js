const productModel = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(202).json(products);
  } catch (error) {
    res.status(401).json({ message: "error" });
  }
};

const addProduct = async (req, res) => {
  const newProduct = new productModel({
    id: req.body.id,
    name: req.body.name,
    stock: req.body.stock,
    price: req.body.price,
    Category: req.body.Category,
    productImage: req.file.path,
  });
  if (!req.body.id) {
    res.status(402).json({ message: "Id is missing" });
    return;
  }
  if (!req.body.name) {
    res.status(402).json({ message: "Full Name is missing" });
    return;
  }

  if (!req.body.stock) {
    res.status(402).json({ message: "Stock is missing" });
    return;
  }

  if (!req.body.price) {
    res.status(402).json({ message: "Price is missing" });
    return;
  }

  if (!req.file.path) {
    res.status(402).json({ message: "Image is missing" });
    return;
  }

  if (!req.body.Category) {
    res.status(402).json({ message: "Category is missing" });
    return;
  }

  try {
    const productCreated = await newProduct.save();
  } catch (error) {
    res.status(401).json({ error });
    return;
  }

  res.status(201).json({ message: "product added successfully" });
};

const deleteProduct = async (req, res) => {
  if (!req.body.id) {
    res.status(402).json({ message: "id is missing" });
    return;
  }
  try {
    const response = await productModel.deleteOne({ id: req.body.id });
  } catch (error) {
    res.status(401).json({ message: "error" });
    return;
  }
  res.status(201).json({ message: "deleted successfully" });
};

const updateProduct = async (req, res) => {
  if (!req.body.id) {
    res.status(402).json({ message: "id is missing" });
    return;
  }
  if (!req.body.name) {
    res.status(402).json({ message: "Full Name is missing" });
    return;
  }

  if (!req.body.stock) {
    res.status(402).json({ message: "Stock is missing" });
    return;
  }

  if (!req.body.price) {
    res.status(402).json({ message: "Price is missing" });
    return;
  }

  if (!req.body.Category) {
    res.status(402).json({ message: "Category is missing" });
    return;
  }

  try {
    productModel.updateOne(
      { id: req.body.id },
      {
        $set: {
          name: req.body.name,
          stock: req.body.stock,
          price: req.body.price,
          Category: req.body.Category,
        },
      }
    );
  } catch (error) {
    res.status(401).json({ message: "error" });
    return;
  }
  res.status(201).json({ message: "Updated successfully" });
};

const addField = async (req, res) => {
  try {
    await productModel.update(
      {},
      { $set: { Category: "Laptop" } },
      { multi: true }
    );
    res.status(201).json({ message: "Updated successfully" });
  } catch (error) {
    return;
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  addField,
};
