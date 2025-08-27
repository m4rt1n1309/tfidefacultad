const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://ncrmr250253:dSmdxISCrJ7gpDC6@cluster0.7on3xbd.mongodb.net/oscarbarbieri';
    
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB conectado exitosamente');
  } catch (error) {
    console.error('Error al conectar MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
