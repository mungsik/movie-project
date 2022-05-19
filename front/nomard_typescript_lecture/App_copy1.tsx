import "../src/tailwind.css";
import { useState } from "react";
import styled from "styled-components";

function App() {
  const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
  `;

  const H1 = styled.div`
    color: ${(props) => props.theme.textColor};
  `;

  const [value, setValue] = useState("");
  // 타입스크립트는 이 onChange 함수가 InputElement에 의해서 실행될 것을 알게됐다.
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  /*

  ES6 문법이에요. event안 curentTarget안에 value의 값을 기존 이름 그대로 value 라는 변수를 만드는 거에요.

  const value = event.currentTarget.value 랑 똑같습니다. 왜 저렇게 복잡하게 하냐고 물어보실수도 있는데 사실 저런식으로 한개만 만들때는 저 문법의 장점이 없어요.

  헌데 만약에 currentTarget안에서 value, tagName, width, id 이 4개를 가져오고 싶다고 하면 기존 문법으로는 이렇게 써야 되겠죠?

  const value = event.currentTarget.value;
  const tagName = event.currentTarget.tagName;
  const width = event.currentTarget.width;
  const id = event.currentTarget.id;

  이거를 이렇게 바꿔 쓰실수 있습니다.

  const {
  currentTarget: {value, tagName, width, id}
  } = event;

  */
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={value}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
