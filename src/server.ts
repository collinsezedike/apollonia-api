import { connectDB, DATABASE_URI, PORT } from "./config";
import buildApp from "./app";

const app = buildApp();

const startServer = async () => {
  try {
    connectDB(DATABASE_URI!);
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  } catch (err: any) {
    console.error(err);
  }
};

startServer();
