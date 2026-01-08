import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { env } from "./config";
import { newsRouter, stocksRouter } from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/news", newsRouter);
app.use("/stocks", stocksRouter);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
