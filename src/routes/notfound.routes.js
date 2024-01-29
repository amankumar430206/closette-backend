import { Router } from "express";
const router = Router();

router.all("*", (req, res) => {
  res.status(404).json({
    msg: "PATH NOT FOUND",
    path: req.url,
    success: false,
  });
});

export { router as NotFoundRoute };
