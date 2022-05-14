import mongoose from "mongoose";
import { User } from "./models/User.js";

const DB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

export { User };

/*
mongoose 사용 이유

mongoDB 자체에는 스키마가 없지만 이렇게 mongoose라는 ODM에서 우리가 코드 상으로 스키마를 정의할 수 있다.
NoSQL 엔 스키마가 없지만, mongoose를 통해 일관성을 주는 것이다.
*/
