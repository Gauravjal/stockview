import React,{useContext} from 'react'
import StockContext from "./context/StockContext";
function DisplayBestMatches({bestMatches,setBestMatches}) {
    const {setStockSymbol}=useContext(StockContext);
  return (
         <ul
      className="absolute top-20 left-50 border-2 rounded-md overflow-y-scroll w-60 h-60 g-white border-neutral-200 custom-scrollbar z-50 bg-indigo-100">
            {bestMatches.map(
                (item)=>{
                    return <li 
                    onClick={() =>{ setStockSymbol(item['1. symbol']);
                  setBestMatches([]);
                  }}
                    className="cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-200 transition duration-300" key={item.symbol}>
                        <span>{item['1. symbol']}</span>
                        {/* <span>{item.description}</span> */}
                        </li>
                }
            )}
        </ul>
  
  )
}

export default DisplayBestMatches