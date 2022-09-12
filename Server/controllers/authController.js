const authModel = require("../models/authModel");
const productModel = require("../models/productModel");

const signUp = async (req, res) => {
  const newUser = new authModel({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    userImage: req.file.path,
  });

  if (!req.body.fullName) {
    res.status(402).json({ message: "Full Name is missing" });
    return;
  }

  if (!req.body.email) {
    res.status(402).json({ message: "Email is missing" });
    return;
  }

  if (!req.body.password) {
    res.status(402).json({ message: "Password is missing" });
    return;
  }

  try {
    const userCreated = await newUser.save();
    res.status(200).json({ message: "signed up successfully" });
    return;
  } catch (error) {
    res.status(401).json({ error });
    return;
  }
};

const signIn = async (req, res) => {
  const user = await authModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    res.status(401).json({ message: "email not found" });
    return;
  } else if (user.password != req.body.password) {
    res.status(401).json({ message: "Incorrect password" });
    return;
  }

  res.status(201).json(user);
};

const addtoCart = async (req, res) => {
  if (!req.body.email) {
    res.status(402).json({ message: "Email is missing" });
    return;
  }

  if (!req.body.name) {
    res.status(402).json({ message: "product name is missing" });
    return;
  }

  if (!req.body.id) {
    res.status(402).json({ message: "product id is missing" });
    return;
  }
  const check = authModel.findOne(
    { email: req.body.email, "Cart.id": req.body.id },
    async (err, result) => {
      if (err) {
        res.status(401).json({ message: "error! could not update cart" });
        return;
      }
      if (!result) {
        try {
          await authModel.updateOne(
            { email: req.body.email },
            {
              $push: {
                Cart: { name: req.body.name, id: req.body.id, quantity: 1 },
              },
            }
          );
        } catch (error) {
          res.status(401).json({ message: "error! could not update cart" });
          return;
        }
      } else {
        try {
          await authModel.updateOne(
            { email: req.body.email, "Cart.id": req.body.id },
            {
              $inc: { "Cart.$.quantity": 1 },
            }
          );
        } catch (error) {
          return;
        }
      }
    }
  );

  res.status(202).json({ message: "updated successfully" });
};

const removeFromCart = async (req, res) => {
  if (!req.body.email) {
    res.status(402).json({ message: "Email is missing" });
    return;
  }

  if (!req.body.id) {
    res.status(402).json({ message: "product id is missing" });
    return;
  }

  const check = authModel.findOne(
    {
      email: req.body.email,
      "Cart.id": req.body.id,
    },
    async (err, result) => {
      if (err) {
        return;
      }
      if (!result) {
        res.status(404).json({ message: "no such product in cart" });
        return;
      } else {
        try {
          await authModel.updateOne(
            { email: req.body.email, "Cart.id": req.body.id },
            {
              $inc: { "Cart.$.quantity": -1 },
            }
          );
          res.status(202).json({ message: "updated successfully" });
        } catch (error) {
          res.status(401).json({ message: "error! could not update cart" });
          return;
        }
      }
    }
  );
};

const addtoFavorites = async (req, res) => {
  if (!req.body.email) {
    res.status(402).json({ message: "Email is missing" });
    return;
  }

  if (!req.body.name) {
    res.status(402).json({ message: "product name is missing" });
    return;
  }

  const check = authModel.findOne(
    {
      email: req.body.email,
      "favorites.favoritesId": req.body.id,
    },
    async (err, result) => {
      if (err) {
        res.status(401).json({ message: "error! could not update cart" });
        return;
      }
      if (!result) {
        try {
          await authModel.updateOne(
            { email: req.body.email },
            {
              $push: {
                favorites: {
                  favoritesName: req.body.name,
                  favoritesId: req.body.id,
                },
              },
            }
          );
          res.status(201).json({ message: "added to favorites successfully" });
        } catch (error) {
          res.status(401).json({ message: "could not update favorites" });
          return;
        }
      } else {
        res.status(401).json({ message: "already exists" });
        return;
      }
    }
  );
};

const removeFromFavorites = async (req, res) => {
  if (!req.body.email) {
    res.status(402).json({ message: "Email is missing" });
    return;
  }

  if (!req.body.id) {
    res.status(402).json({ message: "product id is missing" });
    return;
  }
  const check = authModel.findOne(
    {
      email: req.body.email,
      "favorites.favoritesId": req.body.id,
    },
    async (err, result) => {
      if (err) {
        res.status(401).json({ message: "error! could not update cart" });
        return;
      }
      if (!result) {
        return;
      } else {
        try {
          await authModel.updateOne(
            { email: req.body.email },
            { $pull: { favorites: { favoritesId: req.body.id } } }
          );
        } catch (error) {
          res.status(401).json({ message: "error! could not update cart" });
          return;
        }
      }
    }
  );

  res.status(202).json({ message: "updated successfully" });
};

const getUser = async (req, res) => {
  const check = authModel.findOne(
    {
      email: req.body.email,
    },
    async (err, result) => {
      if (err) {
        res.status(401).json({ message: "error! could not find user" });
        return;
      }
      if (!result) {
        res.status(404).json({ message: "user not found" });
        return;
      } else {
        res.status(201).json(result);
      }
    }
  );
};
module.exports = {
  signUp,
  signIn,
  removeFromCart,
  addtoCart,
  removeFromFavorites,
  addtoFavorites,
  getUser,
};
