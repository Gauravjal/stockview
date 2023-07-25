import React, { useContext, useEffect, useState } from "react";
import ChartFilter from "./ChartFilter";
//import { chartConfig } from "../constants/config";
//import { fetchHistoricalData } from "../API/stockAPI";
import StockContext from "./context/StockContext";
import ReactApexChart from "react-apexcharts";
import {
  createDate,
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
} from "../helper/dateHelper.js";
function Chart() {
  const { stockSymbol } = useContext(StockContext);
  const [data, setData] = useState([]);
  const [fetchedData, setFetchedData] = useState({});
  const [interval, setInterval] = useState(365);
  useEffect(() => {
    const fetchData = async () => {
      const kkeeyy = "SB9I4MIXG3D7OISQ";
      let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=full&apikey=${kkeeyy}`;
      console.log(API_CALL);
      await fetch(API_CALL)
        .then(function (response) {
          //console.log(response.json);
          return response.json();
        })
        .then(function (dataa) {
          console.log("why no data",dataa);
          setFetchedData(dataa);
        });
    };
    fetchData();
  }, [stockSymbol]);

  useEffect(() => {
    const t = [];
    for (var key in fetchedData["Time Series (Daily)"]) {
      //t.push(fetchedData['Time Series (Daily)'][key]);
      const obj = {
        x: key,
        y: [
          fetchedData["Time Series (Daily)"][key]["1. open"],
          fetchedData["Time Series (Daily)"][key]["2. high"],
          fetchedData["Time Series (Daily)"][key]["3. low"],
          fetchedData["Time Series (Daily)"][key]["4. close"],
        ],
      };
      t.push(obj);
    }
    const t1 = [];
    for (let i = 0; i < interval; i++) t1.push(t[i]);
    console.log("t1", t1.length);
    const arr = [
      {
        data: t1,
      },
    ];
    //console.log(arr);
    setData(arr);
    console.log("check", data[1]);
  }, [interval, fetchedData]);

  const temp = {
    series: [
      {
        data: { data },
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };

  return (
    <div className="border" id="chart">
      {data ? (
        <>
          <div className="flex md:gap-2 xl:gap-2 gap-1 justify-end">
            <button
              style={{ color: interval === 7 ? "#76d18f" : "" }}
              className="bg-blue-100 px-2 hover:bg-green-300"
              onClick={() => {
                setInterval(7);
              }}
            >
              1W
            </button>
            <button
              style={{ color: interval === 30 ? "#76d18f" : "" }}
              className="bg-blue-100 px-2  hover:bg-green-300"
              onClick={() => {
                setInterval(30);
              }}
            >
              1M
            </button>
            <button
              style={{ color: interval === 90 ? "#76d18f" : "" }}
              className="bg-blue-100 px-2  hover:bg-green-300"
              onClick={() => {
                setInterval(3 * 30);
              }}
            >
              3M
            </button>
            <button
              style={{ color: interval === 180 ? "#76d18f" : "" }}
              className="bg-blue-100 px-2  hover:bg-green-300"
              onClick={() => {
                setInterval(6 * 30);
              }}
            >
              6M
            </button>
            <button
              style={{ color: interval === 365 ? "#76d18f" : "" }}
              className="bg-blue-100 px-2  hover:bg-green-300"
              onClick={() => {
                setInterval(365);
              }}
            >
              1Y
            </button>
            <button
              style={{ color: interval === 1095 ? "#76d18f" : "" }}
              className="bg-blue-100 px-2  hover:bg-green-300"
              onClick={() => {
                setInterval(3 * 365);
              }}
            >
              3Y
            </button>
          </div>

          <ReactApexChart
            options={temp.options}
            series={data}
            type="candlestick"
            height={450}
          />
        </>
      ) : (
        <div className="loading mx-auto text-center align-content-center align-items-center my-5"></div>
      )}
    </div>
  );
}

export default Chart;
