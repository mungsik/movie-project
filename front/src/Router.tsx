import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          {/* Router에게 우리의 url이 변수값을 갖는다는 것을 알려줌 */}
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
