import React from "react";
import { useState, useEffect, useContext } from "react";
import StockContext from "./context/StockContext.js";
import FundamentalDiv from "./FundamentalDiv.jsx";
function Details() {
  const { stockSymbol } = useContext(StockContext);
  const [details, setDetails] = useState({});
  useEffect(() => {
    const fetchDetails = async () => {
      const kkeeyy = "SB9I4MIXG3D7OISQ";
      let API_CALL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${kkeeyy}`;
      console.log(API_CALL);
      await fetch(API_CALL)
        .then(function (response) {
          //console.log(response.json);
          return response.json();
        })
        .then(function (detailsa) {
          //console.log("details=",detailsa);
          setDetails(detailsa);
        });
    };
    fetchDetails();
  }, [stockSymbol]);
  return (
    <>
      {console.log("details", details)}
      {details && details.Symbol ? (
        <div className=" border-2">
          <FundamentalDiv name="Company Name" child={details.Name} />
          <hr className="h-px py-0 w-100 bg-gray-200 border-0 dark:bg-gray-400"></hr>
          <FundamentalDiv
            name="Market Capitalization"
            child={details.MarketCapitalization}
          />
          <hr className="h-px py-0 w-100 bg-gray-200 border-0 dark:bg-gray-400"></hr>
          <FundamentalDiv name="Industry" child={details.Industry} />
          <hr className="h-px py-0 w-100 bg-gray-200 border-0 dark:bg-gray-400"></hr>
          <FundamentalDiv name="PE Ratio" child={details.PERatio} />
          <hr className="h-px py-0 w-100 bg-gray-200 border-0 dark:bg-gray-400"></hr>
          <FundamentalDiv name="EPS" child={details.EPS} />
        </div>
      ) : (
        <div className="loading mx-auto text-center align-content-center align-items-center my-5"></div>
      )}
    </>
  );
}

export default Details;
