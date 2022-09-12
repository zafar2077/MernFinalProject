const mongoose = require("mongoose");

const connectDatabase = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URL);

  console.log(`database connected with host ${connection.connection.host}`);
};

module.exports = connectDatabase;
