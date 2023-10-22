import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string | undefined;
  isDark: boolean;
}

const Chart = ({ coinId, isDark }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => parseFloat(price.close)) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                background: "transparent", 
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                },
                type: "datetime",
                categories:
                  data?.map((price) =>
                    new Date(price.time_close * 1000).toUTCString()
                  ) ?? [],
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["#2ecc71"],
                  stops: [0, 100],
                },
              },
              colors: ["#2980b9"],
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexChart
            type="candlestick"
            series={[
              {
                data:
                  data?.map((price) => ({
                    x: parseFloat(price.close),
                    y: [
                      parseFloat(price.open),
                      parseFloat(price.high),
                      parseFloat(price.low),
                      parseFloat(price.close),
                    ],
                  })) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                background: "transparent", 
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
              },
              grid: { show: true },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                },
                type: "datetime",
                categories:
                  data?.map((price) =>
                    new Date(price.time_close * 1000).toUTCString()
                  ) ?? [],
              },
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default Chart;
