import { Request, Response } from "express";
import { Url, IUrl } from "../models/Url";

export const urlController = {
  shortenUrl: async (req: Request, res: Response) => {
    const { url } = req.body;
    console.log("Received URL to shorten:", url);
    try {
      const newUrl = new Url({ url });
      await newUrl.save();
      const { accessCount, ...urlData } = newUrl.toObject();
      res.status(201).json(urlData);
    } catch (error) {
      console.error("Error shortening URL:", error);
      res.status(500).json({ error: "Failed to shorten URL" });
    }
  },
  redirectToOriginalUrl: async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    try {
      const urlEntry: IUrl | null = await Url.findOne({
        shortCode: shortCode as string,
      });
      if (urlEntry) {
        urlEntry.accessCount += 1;
        await urlEntry.save();
        res.redirect(urlEntry.url);
      } else {
        res.status(404).json({ error: "Short URL not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to redirect to original URL" });
    }
  },
  getUrlInfo: async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    try {
      const urlEntry: IUrl | null = await Url.findOne({
        shortCode: shortCode as string,
      });
      if (urlEntry) {
        const { accessCount, ...urlData } = urlEntry.toObject();
        res.json(urlData);
      } else {
        res.status(404).json({ error: "Short URL not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get URL info" });
    }
  },
  updateOriginalUrl: async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    const { url } = req.body;
    try {
      const urlEntry: IUrl | null = await Url.findOne({
        shortCode: shortCode as string,
      });
      if (urlEntry) {
        urlEntry.url = url;
        await urlEntry.save();
        const { accessCount, ...urlData } = urlEntry.toObject();
        res.json(urlData);
      } else {
        res.status(404).json({ error: "Short URL not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update original URL" });
    }
  },
  deleteUrl: async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    try {
      const urlEntry: IUrl | null = await Url.findOneAndDelete({
        shortCode: shortCode as string,
      });
      if (urlEntry) {
        res.json({ message: "URL deleted successfully" });
      } else {
        res.status(404).json({ error: "Short URL not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete URL" });
    }
  },
  getUrlStats: async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    try {
      const urlEntry: IUrl | null = await Url.findOne({
        shortCode: shortCode as string,
      });
      if (urlEntry) {
        res.json(urlEntry);
      } else {
        res.status(404).json({ error: "Short URL not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get URL stats" });
    }
  },
};
