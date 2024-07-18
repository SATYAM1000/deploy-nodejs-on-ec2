import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const startServer = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is missing");
    }

    await mongoose.connect(process.env.DATABASE_URL);

    console.log("Connected to Database");

    app.get("/", (req, res) => {
      res.send("Hello World");
    });

    app.get("/test", (req, res) => {
      res.send("test app is working fine");
    });
    app.get("/hello-satyam", (req, res) => {
      res.send("Server is working fine");
    });

    app.get("/hello-world", (req, res) => {
      res.send("Hello World from backend");
    });

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

startServer();
