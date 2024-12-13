import { fetchAccessToken, getRecords } from "../controller/controllerZohoData.js"; 

export default async function handler(req, res) {
  try {

    const { reportName, criteria } = req.query; 
    const accessToken = await fetchAccessToken();

    if (!reportName) {
      return res
        .status(400)
        .json({
          error: "Missing required parameters: reportName",
        });
    }


    const records = await getRecords({
      accessToken,
      reportName,
      criteria: criteria || "(ID != 0)",
    });

   
    return res.status(200).json({ records });
  } catch (error) {
    console.error("Error fetching records:", error);
    return res.status(500).json({ error: "Error fetching records from Zoho" });
  }
}
