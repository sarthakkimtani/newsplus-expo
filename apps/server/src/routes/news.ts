import { Router } from "express";
import { getHeadlines } from "../controllers";

const router = Router();

router.get("/", getHeadlines);

export default router;
