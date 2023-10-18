import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { useQuery } from "react-query";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: ${(props) => props.theme.accentColor};
`;
const PriceMenu = styled.div`
  background-color: ${(props) => props.theme.priceMenuColor};
  padding: 15px 20px;
  border-radius: 15px;
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    margin: 2px 0px;
  }
  span:nth-child(1) {
    font-size: 15px;
  }
  span:nth-child(2) {
    font-size: 20px;
  }
`;

const UpRate = styled.span`
  color: ${(props) => props.theme.upColor};
`;

const DownRate = styled.span`
  color: ${(props) => props.theme.downColor};
`;

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

const Price = () => {
  const { coinId } = useParams();

  const { isLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <Container>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <PriceMenu>
            <span>가격: </span>
            <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
          </PriceMenu>
          <PriceMenu>
            <span>시가 총액: </span>
            <span>${tickersData?.quotes.USD.market_cap}</span>
          </PriceMenu>
          <PriceMenu>
            <span>15m 변화율: </span>
            {tickersData?.quotes.USD.percent_change_15m &&
            tickersData?.quotes.USD.percent_change_15m >= 0 ? (
              <UpRate>↗️{tickersData?.quotes.USD.percent_change_15m}%</UpRate>
            ) : (
              <DownRate>↘️{tickersData?.quotes.USD.percent_change_15m}%</DownRate>
            )}
          </PriceMenu>
          <PriceMenu>
            <span>1h 변화율: </span>
            {tickersData?.quotes.USD.percent_change_1h &&
            tickersData?.quotes.USD.percent_change_1h >= 0 ? (
              <UpRate>↗️{tickersData?.quotes.USD.percent_change_1h}%</UpRate>
            ) : (
              <DownRate>↘️{tickersData?.quotes.USD.percent_change_1h}%</DownRate>
            )}
          </PriceMenu>
          <PriceMenu>
            <span>24h 변화율: </span>
            {tickersData?.quotes.USD.percent_change_24h &&
            tickersData?.quotes.USD.percent_change_24h >= 0 ? (
              <UpRate>↗️{tickersData?.quotes.USD.percent_change_24h}%</UpRate>
            ) : (
              <DownRate>↘️{tickersData?.quotes.USD.percent_change_24h}%</DownRate>
            )}
          </PriceMenu>
          <PriceMenu>
            <span>24h 시가 총액 변동: </span>
            {tickersData?.quotes.USD.market_cap_change_24h &&
            tickersData?.quotes.USD.market_cap_change_24h >= 0 ? (
              <UpRate>↗️{tickersData?.quotes.USD.market_cap_change_24h}%</UpRate>
            ) : (
              <DownRate>↘️{tickersData?.quotes.USD.market_cap_change_24h}%</DownRate>
            )}
          </PriceMenu>
        </>
      )}
    </Container>
  );
};

export default Price;
