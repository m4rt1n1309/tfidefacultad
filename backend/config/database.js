const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tfidefacultad';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB conectado exitosamente');
  } catch (error) {
    console.error('Error al conectar MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
