import "dotenv/config";
import express from "express";
import { routes } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi server is running");
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
