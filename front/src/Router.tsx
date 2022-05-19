import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />}></Route>
        <Route path="/:coinId" element={<Coin />}></Route>
        {/* Router에게 우리의 url이 변수값을 갖는다는 것을 알려줌 */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
