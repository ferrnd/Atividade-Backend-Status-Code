import express from "express";
import {
  getAllBruxos,
  getBruxosById,
  createBruxos,
  deleteBruxos,
  updateBruxos,
} from "../controllers/bruxosController.js"

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/:id", getBruxosById);
router.post("/", createBruxos);
router.put("/:id", updateBruxos);
router.delete("/:id", deleteBruxos);

export default router;