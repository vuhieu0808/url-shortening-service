import express from 'express';
import { urlController } from '../controllers/urlController';

const router = express.Router();

router.post("/shorten", urlController.shortenUrl);
router.get("/:shortCode", urlController.redirectToOriginalUrl);
router.get("/shorten/:shortCode", urlController.getUrlInfo);
router.put("/shorten/:shortCode", urlController.updateOriginalUrl);
router.delete("/shorten/:shortCode", urlController.deleteUrl);
router.get("/shorten/:shortCode/stats", urlController.getUrlStats);

export default router;