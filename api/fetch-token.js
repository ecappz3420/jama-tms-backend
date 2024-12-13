import { fetchAccessToken } from '../backend/controller/controllerZohoData.js';

export default async function handler(req, res) {
  try {
    const accessToken = await fetchAccessToken();
    res.status(200).json({access_token: accessToken});
  } catch (error) {
    res.status(500).json({error: "Error fetching access token"});
  }
}
