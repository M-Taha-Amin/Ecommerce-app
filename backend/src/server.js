const app = require('./app');
const config = require('./config');
const connectDB = require('./config/database');

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log('🚀 Server running');
      console.log(`Visit: http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
