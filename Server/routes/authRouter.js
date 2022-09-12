const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
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
router.post("/signup", upload.single("userImage"), authController.signUp);

router.post("/signin", authController.signIn);

router.post("/addToCart", authController.addtoCart);

router.post("/removeFromCart", authController.removeFromCart);

router.post("/addToFavorites", authController.addtoFavorites);

router.post("/removeFromFavorites", authController.removeFromFavorites);

router.post("/getUser", authController.getUser);

module.exports = router;
