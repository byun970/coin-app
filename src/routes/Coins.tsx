import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    color: ${(props) => props.theme.textColor};
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const ToggleDarkButton = styled.button`
  background-color: ${props => props.theme.bgColor};
  border: none;
  color: ${props => props.theme.accentColor};
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {
  isDark: boolean;
  toggleDark: () => void;
}

const Loader = styled.span`
  text-align: center;
  display: block;
  color: ${props => props.theme.accentColor};
`;

const Coins = ({toggleDark, isDark}: ICoinsProps) => {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  /* const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  console.log(coins); */
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <ToggleDarkButton onClick={toggleDark}>{isDark ? "LightMode" : "DarkMode"}</ToggleDarkButton>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.id}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
