import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/db";
import urlRoutes from "./routes/urlRoute";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(
  cors({ origin: process.env.CLIENT_URL!.split(",").map((url) => url.trim()) }),
);

// Routes

app.use("/", urlRoutes);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
