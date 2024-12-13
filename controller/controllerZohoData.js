import axios from "axios";

export const fetchAccessToken = async () => {
  const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;
  try {
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          refresh_token: REFRESH_TOKEN,
          grant_type: "refresh_token",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Unable to get access token");
  }
};

export const getRecords = async ({ reportName, criteria, accessToken }) => {
  try {
    const response = await axios.get(
      `https://www.zohoapis.com/creator/v2.1/data/dhaqane/dlz/report/${reportName}?criteria=${criteria}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          Accept: 'application/json'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error Fetching Records:",error);
    throw new Error("Unable to fetch records");
  }
};
