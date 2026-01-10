import "dotenv/config";

import { clerkMiddleware } from "@clerk/express";
import express from "express";
import morgan from "morgan";

import { env, rateLimiter } from "./config";
import { requireApiAuth } from "./middleware/auth";
import { newsRouter, stocksRouter } from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(rateLimiter);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/news", requireApiAuth, newsRouter);
app.use("/stocks", requireApiAuth, stocksRouter);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
