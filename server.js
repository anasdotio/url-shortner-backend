import app from "./src/app.js";
import { connectDB, disconnectDB } from "./src/config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    disconnectDB();
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();