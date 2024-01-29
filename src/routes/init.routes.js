import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    msg: "closette - your personalized digital wardrobe",
    success: true,
  });
});

export { router as InitRoute };
