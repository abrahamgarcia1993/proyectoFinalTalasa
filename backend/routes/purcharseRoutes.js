import express from "express";
import { createNewPurchase, getUserPurchases } from "../controllers/purcharseController.js";

const router = express.Router();


router.post("/", async (req, res) => {
    await createNewPurchase(req, res);
});


router.get("/:userId", async (req, res) => {
    await getUserPurchases(req, res);
});

export default router;
