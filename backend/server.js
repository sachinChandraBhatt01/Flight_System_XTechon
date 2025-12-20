import app from './src/app.js';
import connectDB from './src/config/db.js';
import env from './src/config/env.js';



connectDB().then(() => {
  app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
  });
}).catch((error) => {
  console.error("Failed to start server:", error.message);
});
``