import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
// app.use("/users", userRouter);
// app.use("/movie", movieRouter);

app.listen(8080);
