import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Movie App 입니다");
});

export { app };
