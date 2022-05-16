import { app } from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(
    `✅ http://localhost:${PORT} 에서 정상적으로 서버가 시작되었습니다.`
  );
});
