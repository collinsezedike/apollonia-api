import buildApp from "./app";
import { connectDB, DATABASE_URI, PORT } from "./config";
import { pinger } from "./utils";

const app = buildApp();

const startServer = async () => {
  try {
    connectDB(DATABASE_URI!);
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
      setInterval(pinger, 5 * 60 * 1000);
    });
  } catch (err: any) {
    console.error(err);
  }
};

startServer();
