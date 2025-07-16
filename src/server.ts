import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { app } from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

const main = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
};

main()