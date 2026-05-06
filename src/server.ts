import app from './app';
import config from './config';
import connectDB from './config/db';

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    app.listen(config.port, () => {
      console.log(`\n🚀 ConsultDesk Server is running`);
      console.log(`   Environment: ${config.env}`);
      console.log(`   Port: ${config.port}`);
      console.log(`   URL: http://localhost:${config.port}`);
      console.log(`   API: http://localhost:${config.port}/api\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error) => {
  console.error('❌ Unhandled Rejection:', reason.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('❌ Uncaught Exception:', error.message);
  process.exit(1);
});

startServer();
