import React,{useState,useEffect} from 'react'
import Dashboard from './components/Dashboard'
import StockContext from './components/context/StockContext'
import {Provider} from 'react-redux';
import {loadUser} from './actions/auth';
import store from './store';
import setAuthToken from './utils/setAuthToken'
if(localStorage.token)
{
  setAuthToken(localStorage.token);
}
function App() {
  const [stockSymbol,setStockSymbol]=useState("AAPL");
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  return (
    <Provider store={store}>
    <StockContext.Provider value={{stockSymbol,setStockSymbol}}>
    <Dashboard/>
    </StockContext.Provider>
    </Provider>
  )
}

export default App