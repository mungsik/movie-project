import express from "express";
import cors from "cors";
import moviesRouter from "./router/moives";

const app = express();

app.use(express.json());
app.use(cors());
// app.use("/users", userRouter);
// app.use("/movie", movieRouter);

// app.use("/movies", moviesRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((req, res, next, err) => {
  console.error(error);
  res.sendStatus(500);
});
app.listen(8080);
