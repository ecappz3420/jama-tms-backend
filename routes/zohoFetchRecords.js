import express from "express";
import {
  fetchAccessToken,
  getRecords,
} from "../controller/controllerZohoData.js";

const router = express.Router();
router.get("/get-records", async (req, res) => {
  try {
    const accessToken = await fetchAccessToken();
    try {
      const { reportName, criteria } = req.query;
      if (!reportName) {
        return res
          .status(400)
          .json({ error: "Missing required query parameters" });
      }
      const records = await getRecords({
        reportName,
        accessToken,
        criteria: criteria ? criteria : `(ID != 0)`,
      });
      return res.status(200).json({ records });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching records" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error Fetching access token" });
  }
});

router.get("/fetch-token", async (req, res) => {
  try {
    const accessToken = await fetchAccessToken();
    return res.status(200).json({ access_token: accessToken });
  } catch (error) {
    console.error("Error fetching access token:", error);
    return res.status(500).json({ error: "Error fetching access token" });
  }
});

export default router;
