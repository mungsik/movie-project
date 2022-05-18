import styled from "styled-components";
import tw from "tailwind-styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor?: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string; // required
  borderColor?: string; // '?'를 붙여줌으로써 optional로 지정
  text?: string;
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  // text가 없으면 default text 출력
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {/* borderColor가 있으면 borderColor로 사용하고 없으면 bgColor로 사용하세요 */}
      {text}
    </Container>
  );
}

/*
위의 function Circle은 아래와 동일하다. es6 문법을 활용해서 바로 bgColor={bgColor}
로 표기한 것이다.

function Circle(bgColor: CircleProps) {
  return <Container bgColor={props.bgColor} />;
}
*/

export default Circle;
