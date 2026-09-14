import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hi server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
