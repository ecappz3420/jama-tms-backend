import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import zohoFetchRecords from "./routes/zohoFetchRecords.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(express());

app.use("/api", zohoFetchRecords);

app.listen(5000, () => {
  console.log("Server Running at 5000");
});
