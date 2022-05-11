import { User } from "../src/database";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class userAuthService {
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용 중입니다. 다른 이메일을 입력해주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    // 길이가 10개인 salt를 사용
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`hased: ${hashedPassword}`);

    // 시용자 id에 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, password: hasedPassword };

    // database에 저장
    const createNewUser = await User.create({ newUser });
    createNewUser.errorMessage = null; // 문제 없이 database에 저장 완료되었으므로 에러 x

    return createNewUser;
  }

  static async getUser({ email, password }) {
    // 이메일 database에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }

    // 로그인 시 사용자가 입력한 비밀번호의 해시값이 데이터베이스에 저장된 해시값과 같은지 비교.
    // bcrypt.compare(비교해볼 문자열, 해시값, 콜백메소드)
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    // jwt.sign(payload, secret, options, [callback])
    const token = jwt.sign({ user_id: user.id }, secretKey);
  }
}
