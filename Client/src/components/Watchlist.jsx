import React from 'react'
import {useContext} from 'react'
import SignUp from './SignUp'
import Login from './login'
import PropTypes from 'prop-types';
import {logout} from '../actions/auth.js'
import {connect} from 'react-redux';
import StockContext from './context/StockContext'
function Watchlist({isAuthenticated,logout,auth: { user }}) {
  const {setStockSymbol}=useContext(StockContext);
  function stocksInWatchlist() {
    return user.stocks.map((stock) => (
      <div key={stock._id} className="container shadow py-2">
        <p><b>{user.stocks[0].stockSymbol}</b></p>
      </div>
    ))
  }
                
  return (
    <>
    {isAuthenticated ?(<div className="absolute border-2 rounded-md overflow-y-scroll w-1/5 h-screen g-white border-neutral-200 custom-scrollbar z-50 bg-indigo-100">
      <div className="text-center text-xl bg-blue-300 py-2">
      Watchlist
       </div>
      {user && user.stocks.length===0 && !user.stocks ? (
  <p>no stock in the watchlist</p>
) : (
  <div>
    {user && user.stocks.map((stock) => (
      <div key={stock._id} className="cursor-pointer border-slate-900 p-3 m-2 flex items-center justify-between rounded-md hover:bg-indigo-200 transition duration-300">
        <button onClick={()=>{setStockSymbol(stock.stockSymbol)}}><b>{stock.stockSymbol}</b></button>
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

      
    </div>):(
      <div>
      <div className="bg-gray-100 text-center">
      Watchlist
      
       </div>
       <div className="text-center mx-2">
       Login to see you watchlist
       <br></br>
       <SignUp/>   <Login/>
       </div>
       </div>
    ) }
    
            </>
  )
}

Watchlist.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout})(Watchlist);
