import React from 'react'
import {useState} from 'react'
import { FcSearch} from 'react-icons/fc';
import {connect} from 'react-redux';
import { MdClear} from 'react-icons/md';
import {MdLogout} from 'react-icons/md'
import DisplayBestMatches from './DisplayBestMatches.jsx';
import {logout} from '../actions/auth.js'
import { searchSymbol } from '../API/stockAPI.js';
import PropTypes from 'prop-types';
function Search({isAuthenticated,logout,auth: { user }}) {
    const [input,setInput]=useState("");
    const [bestMatches,setBestMatches]=useState([]);
    function clear(){
        setInput("");
        setBestMatches([]);
    }

    const updateBestMatches=async()=>{
        try{
          
            if (input) {
                // const searchResults = await searchSymbol(input);
                // const result = searchResults.result;
                const kkeeyy="SB9I4MIXG3D7OISQ";
        let API_CALL=`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${kkeeyy}`
        console.log(API_CALL);
        await fetch(API_CALL)
        .then(
          function(response){
            //console.log(response.json);
            return response.json();
          }
        )
        .then(
          function(detailsa){
            console.log("details=",detailsa.bestMatches);
            setBestMatches(detailsa.bestMatches);
          }
        )
      }
              }
        catch(error){
            setBestMatches([]);
            console.log(error);
        }
    }

  return (
    <div className="w-screen place-content-center relative flex justify-center px-10 py-10">
        <div className="relative mx-auto">
        <input
  type="text"
  value={input}
  className="shadow bg-blue-100 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  placeholder="Search stock..."
  onChange={(event) => setInput(event.target.value)}
  onKeyPress={(event) => {
    if (event.key === "Enter") {
      updateBestMatches();
    }
  }}
/>
  {input && (
    <button
      className="absolute top-3 right-3 bg-blue-100 px-1"
      style={{ top: "50%", transform: "translateY(-50%)", right: "8px" }}
      onClick={clear}
    >
      <MdClear />
    </button>
  )}
  <button
    className="absolute top-3 right-3"
    style={{
      top: "50%",
      transform: "translateY(-50%)",
      right: "36px",
      backgroundColor: "#e1e1e1",
    }}
    onClick={updateBestMatches}
  >
    <FcSearch className="fill-current" />
  </button>
{input && bestMatches.length>0 ? <DisplayBestMatches bestMatches={bestMatches} setBestMatches={setBestMatches} />:null}
</div>

        
{isAuthenticated && (
        <button className="btn btn-sm rounded-md shadow ml-auto" onClick={logout}>
              <MdLogout/>
              </button>)
}
    </div>
      

  )
}

Search.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {logout})(Search);