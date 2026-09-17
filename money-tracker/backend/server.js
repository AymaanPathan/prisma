import express from "express";
import routes from "./routes/index.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello from money tracker root route");
});

app.listen(port, () => {
  console.log(`money tracker server is started on port ${port} `);
});
