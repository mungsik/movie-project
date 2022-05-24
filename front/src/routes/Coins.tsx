import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./../api";
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

const CoinsList = tw.ul``;

const Coin = tw.li`
  bg-white
  mb-2.5
  rounded-2xl
`;

const Title = tw.h1`
  text-5xl
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  console.log(isLoading, data);
  /*
  // state가 coin으로 된 array 라고 말해줌
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  // 아래 useEffect 안의 코드는 우리 component life의 시작점에서만 실행하도록함. 즉, 컴포넌트가 처음 시작될때 만.
  */
  return (
    <Container className="font-base">
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title className="text-accentColor">Coins</Title>
      </Header>
      {isLoading ? (
        <div className="text-center block text-textColor">"Loading..."</div>
      ) : (
        <CoinsList className="text-bgColor">
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              {/* 코인 카드 끝부분을 클릭해도 앵커 태그가 작동되게끔 display: block 적용 */}
              {/* 패딩 값을 각각의 코인에 줌으로써 코인 이름이 아닌 그 바깥을 클릭해도 클릭될 수 있게끔함. */}
              {/* 패딩 값을 잘 이용해서 유저의 편리성을 높히자. */}
              <Link
                to={`/${coin.id}`}
                state={{ name: coin.name }}
                className="hover:text-accentColor transition-colors ease-in flex p-5 items-center"
              >
                <img
                  className="w-6 h-6 mr-2.5"
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
