import express from "express";
import routes from "./routes/index";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from money tracker root route");
});

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`money tracker server is started on port ${port} `);
});
