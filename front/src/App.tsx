import "../src/tailwind.css";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <>
      <Router />;
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
