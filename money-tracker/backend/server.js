import express from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(cookieParser());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello from money tracker root route");
});

app.listen(port, () => {
  console.log(`money tracker server is started on port ${port} `);
});
