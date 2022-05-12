/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - id
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          id:
 *            type: string
 *          email:
 *            type: string
 *        example:
 *          name: mungsik
 *          email: mungsik@gmail.com
 */

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

/*
마지막 줄 model()을 호출할 때 스키마가 등록됩니다. 나중에 스키마를 수정할 때, 미리 저장되어 있던 데이터들은 바꾸지 않으니 조심해야 합니다. 대신 SQL처럼 alter table 명령 없이 자유롭게 수정할 수 있어 좋습니다.

참고로 몽구스는 model의 첫 번째 인자로 컬렉션 이름을 만듭니다. User이면 소문자화 후 복수형으로 바꿔서 users 컬렉션이 됩니다. Book 스키마였다면 books 컬렉션이 됩니다. 이런 강제 개명이 싫다면 세 번째 인자로 컬렉션 이름을 줄 수 있습니다. mongoose.model('User', userSchema, 'myfreename')
*/

export { UserModel };
