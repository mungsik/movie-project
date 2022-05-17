import React from "react";
import tw from "tailwind-styled-components";
import "../src/tailwind.css";
import styled from "styled-components";

const Father = tw.div`
  display: flex;
`;
const BoxOne = tw.div`
  bg-slate-400
  w-40
  h-40
`;

const BoxTwo = tw.div`
  bg-blue-400
  w-40
  h-40
`;

function App() {
  return (
    <Father>
      <BoxOne />
      <BoxTwo />
      <div className="bg-orange-400 w-40 h-40">외않되..?</div>
    </Father>
  );
}

export default App;
