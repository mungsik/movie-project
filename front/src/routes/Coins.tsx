import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

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

const CoinsList = tw.ul``;

const Coin = tw.li`
  bg-white
  mb-2.5
  rounded-2xl
`;

const Title = tw.h1`
  text-5xl
`;

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "usdt-tether",
    name: "Tether",
    symbol: "USDT",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

function Coins() {
  return (
    <Container className="font-base">
      <Header>
        <Title className="text-accentColor">코인들</Title>
      </Header>
      <CoinsList className="text-bgColor">
        {coins.map((coin) => (
          <Coin key={coin.id}>
            {/* 코인 카드 끝부분을 클릭해도 앵커 태그가 작동되게끔 display: block 적용 */}
            {/* 패딩 값을 각각의 코인에 줌으로써 코인 이름이 아닌 그 바깥을 클릭해도 클릭될 수 있게끔함. */}
            {/* 패딩 값을 잘 이용해서 유저의 편리성을 높히자. */}
            <Link
              to={`/${coin.id}`}
              className="hover:text-accentColor transition-colors ease-in block p-5"
            >
              {coin.name} &rarr;
            </Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
}

export default Coins;
