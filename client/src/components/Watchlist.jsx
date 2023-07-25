import React from "react";
import { useContext } from "react";
import SignUp from "./SignUp";
import Login from "./login";
import PropTypes from "prop-types";
import { logout } from "../actions/auth.js";
import { connect } from "react-redux";
import StockContext from "./context/StockContext";
import { AiOutlineStock } from "react-icons/ai";
function Watchlist({ isAuthenticated, logout, auth: { user } }) {
  console.log(user?.stocks);
  const { setStockSymbol } = useContext(StockContext);
  function stocksInWatchlist() {
    
    return user?.stocks?.map((stock) => (
      <div key={stock._id} className="container shadow py-2">
        <p>
          <b>{user?.stocks[0]?.stockSymbol}</b>
        </p>
      </div>
    ));
  }

  return (
    <>
      {isAuthenticated ? (
        <div className=" border-r-2 rounded-md overflow-y-scroll h-screen  border-neutral-200 custom-scrollbar z-50">
          <div
            style={{ borderBottom: "1px solid black", color: "#76d18f" }}
            className="flex items-center justify-center text-xl py-2"
          >
            <AiOutlineStock className="mr-2" />{" "}
            {/* Assuming 'AiOutlineStock' is the icon component */}
            Watchlist
          </div>

          {user && user?.stocks?.length === 0 && !user?.stocks ? (
            <p>no stock in the watchlist</p>
          ) : (
            <div>
              
              {user &&
                user?.stocks?.map((stock) => (
                  <div
                    key={stock?._id}
                    className="border-b-2 cursor-pointer border-slate-900 p-3 m-2 flex items-center justify-between hover:bg-green-300 transition duration-300"
                  >
                    <button
                      onClick={() => {
                        setStockSymbol(stock?.stockSymbol);
                      }}
                    >
                      <b>{stock?.stockSymbol}</b>
                    </button>
                  </div>
                ))}
            </div>
          )}
          {/* <ul style={{ paddingLeft: '0', marginLeft: '0' }}>
                                                {user.stocks.slice(0, 4).map((skill, index) => (
                                                    <li key={index} style={{ listStyleType: 'none', marginBottom: '10px' }}>
                                                        <i className='fas fa-check w3-margin-right w3-large w3-text-teal' />
                                                        <span style={{ fontWeight: 'bold' }}>{skill}</span>
                                                    </li>
                                                ))}
                                            </ul>  */}
        </div>
      ) : (
        <div>
          <div
            style={{ borderBottom: "1px solid black", color: "#76d18f" }}
            className="flex items-center justify-center text-xl py-2"
          >
            <AiOutlineStock className="mr-2" />{" "}
            {/* Assuming 'AiOutlineStock' is the icon component */}
            Watchlist
          </div>

          <div className="text-center mx-2">
            Login to see you watchlist
            <br></br>
            <SignUp /> <Login />
          </div>
        </div>
      )}
    </>
  );
}

Watchlist.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Watchlist);
