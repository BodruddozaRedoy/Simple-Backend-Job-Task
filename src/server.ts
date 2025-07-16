import dotenv from "dotenv";
import { connectDB } from "./config/db";
import  app  from "./app";
import { Server } from "http";

dotenv.config();
let server: Server;

const PORT = process.env.PORT || 5000;

const main = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
};

main()