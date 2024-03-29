import React, { useState, useEffect, useContext } from "react";
import { connect,useDispatch } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
// import { createClient }  from 'redis';
import { FcBarChart } from "react-icons/fc";
import { MdAdd } from "react-icons/md";
import { MdRemove } from "react-icons/md";
import StockContext from "./context/StockContext";
import { useSelector } from "react-redux";
import {loadUser} from "../actions/auth"
function Overview({ auth: { user } }) {
  const dispatch=useDispatch();
  const { stockSymbol } = useContext(StockContext);
  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState([]);
  const currentUser=useSelector((state)=>state.auth);
  console.log(currentUser);
  useEffect(() => {
    const fetchData = async () => {
      const kkeeyy = "SB9I4MIXG3D7OISQ";
      let API_CALL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${kkeeyy}`;
      console.log(API_CALL);
      await fetch(API_CALL)
        .then(function (response) {
          //console.log(response.json);
          return response.json();
        })
        .then(function (dataa) {
          console.log(dataa);
          //console.log(arr);
          setQuote(dataa);
        });
    };
    fetchData();
  }, [stockSymbol]);

  const addStock = async () => {
    try {
      // const res = await axios.put('http://localhost:5000/api/profile/education', formData);
      await axios.put(
        `https://stockview-xd42.onrender.com/api/users/stocks`,
        // {
        //   method: 'PUT',
        // }
        { stockSymbol }
      );
      dispatch(loadUser());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="rounded-md relative p-8 border-2 border-neutral-200">
      <div className="flex gap-2">
        <h1 className="md:4xl xl:text-5xl text-2xl">
          {quote["Global Quote"] && quote["Global Quote"]["05. price"]}
        </h1>
        <br></br>
        <button
          className={`${
            quote["Global Quote"] &&
            quote["Global Quote"]["10. change percent"] > 0
              ? "bg-green-500 text-white"
              : "bg-red-600 text-white"
          } rounded-md p-1`}
        >
          <h4>
            {quote["Global Quote"] &&
              quote["Global Quote"]["10. change percent"]}
          </h4>
        </button>
        {
          currentUser?.isAuthenticated && (
            currentUser?.user?.stocks?.filter(stock=>stock.stockSymbol===stockSymbol).length>0 ?
        <button
          onClick={() => {
            addStock();
          }}
          style={{ padding: "15px",borderRadius:'10px',backgroundColor: "red",color:'black',display:'flex' }}
          className="mx-auto"
        >
         <MdRemove style={{marginTop:'5px'}}/> Remove from Watchlist
        </button>
        : <button
        onClick={() => {
          addStock();
        }}
        style={{ padding: "15px",borderRadius:'10px',backgroundColor: "#76d18f",color:'black',display:'flex' }}
        className="mx-auto"
      >
       <MdAdd style={{marginTop:'5px'}}/> Add to watchlist
      </button>)
}
      </div>
      {/* <h3 className="flex"><FcBarChart className="my-auto"/>  {quote['Global Quote'] && quote['Global Quote']['06. volume']}</h3> */}
    </div>
  );
}

Overview.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Overview);
