const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 8,
  },
  fileFilter: fileFilter,
});

router.get("/getAllProducts", productController.getAllProducts);
router.post("/deleteProduct", productController.deleteProduct);
router.post(
  "/addProduct",
  upload.single("productImage"),
  productController.addProduct
);

router.post("/addField", productController.addField);

module.exports = router;
