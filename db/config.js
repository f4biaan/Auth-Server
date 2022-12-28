const mongoose = require("mongoose");

const dbConection = async () => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(process.env.BD_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la BD ver logs');
  }
}

module.exports = {
  dbConection
}