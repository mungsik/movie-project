const login_required = (req, res, next) => {
  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열
  const userToken = req.headers.authorization?.split(" ")[1] ?? "null";

  // 토큰이 null 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (userToken === "null") {
    console.log(
      "서비스 사용 요청이 있습니다. 그러나, Authorization 토큰이 없습니다."
    );
    res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }

  // 해당 token 이 정상적인 token 인지 확인 -> 토큰에 담긴 user_id 정보 추출
  try {
    const secretkey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretkey);
    const user_id = jwtDecoded.user_id;
    console.log(user_id);
    req.currentUserId = user_id;
    next();
  } catch (error) {
    res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해주세요.");
    return;
  }
};

export default login_required;
