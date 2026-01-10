import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

export const requireApiAuth = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  if (!auth.isAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return next();
};
