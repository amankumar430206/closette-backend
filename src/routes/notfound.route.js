import { Router } from "express";
const router = Router();

router.all("*", (req, res) => {
  res.status(404).json({
    msg: "PATH NOT FOUND",
    success: false,
  });
});

export { router as NotFoundRoute };
