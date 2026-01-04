import "dotenv/config";
import express from "express";
import morgan from "morgan";

import newsRouter from "./routes/news";
import stocksRouter from "./routes/stocks";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/news", newsRouter);
app.use("/stocks", stocksRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
