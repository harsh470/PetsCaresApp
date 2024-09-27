import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import pets from "./data/pets.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

dotenv.config();
connectDB();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/pets", (req, res) => {
  res.json(pets);
});

app.get("/api/pets/:id", (req, res) => {
  const pet = pets.find((p) => p._id === req.params.id);
  res.json(pet);
});

// Routes
app.use("/api/users", userRoutes);
// Error Handling Middleware
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    chalk.yellowBright.bold(
      `Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`
    )
  );
});
