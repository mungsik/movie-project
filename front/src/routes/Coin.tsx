import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinTickers, fetchCoinInfo } from "./../api";
import { Helmet } from "react-helmet";

const Container = tw.div`
  pl-0
  pr-5
  max-w-md
  m-auto
`;
// m-auto => 가운데 정렬

const Header = tw.header`
  h-headerHeight
  flex
  justify-center
  items-center
`;

const Title = tw.h1`
  text-5xl
`;

const Overview = tw.div`
  flex
  justify-between
  bg-overviewBgColor
  py-2.5
  px-5
  rounded-xl
`;

const OverviewItem = tw.div`
  flex
  flex-col
  items-center
`;

const Description = tw.p`
  my-5
  mx-0
`;

const Span = tw.p`
  text-textColor
`;

const Tabs = tw.div`
  grid
  grid-cols-2
  my-5
  mx-0
  gap-2.5
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

// const Tab = tw.span<{ isActive: boolean}>`
//   text-center
//   uppercase
//   text-xs
//   font-normal
//   bg-overviewBgColor
//   py-2
//   px-0
//   rounded-xl
//   color: ${(props) => props.isActive ? props.theme.accentColor : props.text-textColor}
// `;

interface LocationParams {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  // const [loading, setLoading] = useState(true);
  const { state } = useLocation() as LocationParams;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart"); // useLoaction을 이용해 coin의 name을 직접 뿌려준다.

  /*
  useQuery의 인자로 넘길때는 함수의 형태로 넘겨야 하기 때문에 그냥 fetchCoinInfo(coinId)라고 작성하면 그 함수를 바로 실행해버리는 것이 되어
  fetchCoinInfo(coinId)를 실행하여 리턴된 promise가 바로 들어가버립니다. 함수를 바로 실행하는 것이 아닌 () => fetchCoinInfo(coinId)로 작성하여
  이 함수를 실행하는 함수를 새로 만들어 인자로 넘겨야 함수 자체를 넘길 수 있습니다.
  */

  /*
  isLoading: infoLoading => isLoading의 기능을 그대로 갖는 infoLoading
  */
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 10000,
    }
  );
  /*
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  */
  /*
  useMatch()의 인자로 url 을 넘기면 해당 url과 일치할 경우 url의 정보를 반환하고,
  일치하지 않을 경우 null을 반환한다.
  이를 이용해서 여러 개의 탭 중 현재 보여지고 있는 탭에만 accent color를 줄 수 있다.
  */

  /*
  hooks는 최선의 성능을 위해서는 hook 안에서 사용한 것은 그게 어떤 것이든
  deps에 dependency를 넣어야한다고함.
  우리가 이 hooks에 coinId를 사용한다고 알려주는 것. coinId가 변한다면 이 코드들이 다시 실행됨.
  */
  /*
  useEffect(() => {
    (async () => {
      const infoData = await fetch(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      );
      const infoDataJson = await infoData.json();
      console.log(infoDataJson);
      const priceData = await fetch(
        `https://api.coinpaprika.com/v1/tickers/${coinId}`
      );
      const priceDataJson = await priceData.json();
      console.log(priceDataJson);
      setInfo(infoDataJson);
      setPriceInfo(priceDataJson);
      setLoading(false);
    })();
  }, [coinId]);
  */
  const loading = infoLoading || tickersLoading;
  return (
    <Container className="font-base">
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        {/* 왜 {coinId}가 아닌 {state.name} 으로 주는가? */}
        {/* {coinId}는 API에서 받아오는 것이므로 속도가 느릴 수 있다. */}
        {/* 그러나 {state.name} 으로 받아오면 기존에 알고 있는 state에서 값을 가져오는 것이므로 */}
        {/* 빠르게 유저에게 정보를 줄 수 있다. */}
        {/* 문제는 이렇게하면, localhost:3000/bnb-binance-coin을 바로 입력할 경우 */}
        {/* state의 상태가 null 로 변한다. state는 Coins 화면을 통해야만 생성이 되기 때문이다. */}
        {/* 이걸 막기 위해 아래 ?를 넣는다 */}
        <Title className="text-accentColor">
          {/* state가 있으면 name을 가져오고 없으면 loading 출력 */}
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <div className="text-center block text-textColor">"Loading..."</div>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <Span>Rank:</Span>
              <Span>{infoData?.rank}</Span>
            </OverviewItem>
            <OverviewItem>
              <Span>Symbol:</Span>
              <Span>{infoData?.symbol}</Span>
            </OverviewItem>
            <OverviewItem>
              <Span>Price:</Span>
              <Span>${tickersData?.quotes.USD.price.toFixed(3)}</Span>
            </OverviewItem>
          </Overview>
          <Description className="text-textColor">
            {infoData?.description}
          </Description>
          <Overview>
            <OverviewItem>
              <Span>Total Suply:</Span>
              <Span>{tickersData?.total_supply}</Span>
            </OverviewItem>
            <OverviewItem>
              <Span>Max Supply:</Span>
              <Span>{tickersData?.max_supply}</Span>
            </OverviewItem>
          </Overview>

          {/* state를 사용하지 않고 */}
          {/* Link를 사용해서 URL을 바꿈으로써 트리러가 되어 re-render을 할 수 잇게해줌. */}
          <Tabs>
            {/* useMatch를 이용했기 때문에 isActive={chartMatch !== null} */}
            {/* null 인지 아닌지 판단 가능 */}
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`} className="block">
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`} className="block">
                Price
              </Link>
            </Tab>
          </Tabs>

          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
