import React,{useState,useEffect,useContext} from 'react'
import Search from './Search.jsx'
import {AiOutlineBarChart} from 'react-icons/ai'
import {ImNewspaper} from 'react-icons/im'
import {CiViewTable} from 'react-icons/ci'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 
import { mockCompanyDetails } from '../constants/mock.js'
import Details from './Details.jsx'
import Overview from './Overview.jsx'
import Chart from './Chart.jsx'
import {logout} from '../actions/auth.js'
import News from './News.jsx'
import Watchlist from './Watchlist.jsx'
import StockContext from './context/StockContext'
import SideBar from './SideBar.jsx'
function Dashboard({ auth: { isAuthenticated }, logout }) {
  const{stockSymbol}=useContext(StockContext)
  const [toDisplay,setToDisplay]=useState("Chart");
  return (
   
    <div className="w-screen container ">
      
        <div className="w-full bg-white nav col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <nav className="z-10 border-b-2 border-gray-500">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div class="flex items-center justify-between h-16">
      
      <div class="flex-shrink-0">
        <a href="#" class="flex items-center">

        {/* <link rel="icon" href="%PUBLIC_URL%/trend.png" /> */}
          <img class="h-8 w-8" src="/trend.png" alt="Logo"></img>
          <span style={{color:'#76d18f'}} class=" text-lg font-bold ml-2">Stock View</span>
        </a>
      </div>
      

      <SideBar/>
      <Search/>
      
    </div>
  </div>
</nav>

           
            
            </div>

            <hr className="w-screen"></hr>
            <div className="">
            
            <div className="col-span-3">
            {/* <Card className="md:col-span-2 row-span-4" child="stock"/> */}
        {/* {data[1]?<Chart data={data}/> : <h1 className="text-center">Loading Chart...</h1>} */}
        <h1 className="text-blue-500 text-center py-3">{stockSymbol}</h1>
        <div className="bg-white xl:py-0">
        <Overview/>
        </div>
        <div className="py-4 flex gap-4">
      <button className="zoom-button" style={{ display: 'inline-flex', alignItems: 'center'}} onClick={() => setToDisplay("Chart")}>
        <AiOutlineBarChart  style={{ color: toDisplay==="Chart" ? '#76d18f' : '' }} className="mr-2" />
        Chart
      </button>
      <button className="zoom-button" style={{ display: 'inline-flex', alignItems: 'center'}} onClick={() => setToDisplay("Fundamentals")}>
        <CiViewTable style={{ color: toDisplay==="Fundamentals" ? '#76d18f' : '' }} className="mr-2" />
        Fundamentals
      </button>
      <button className="zoom-button" style={{ display: 'inline-flex', alignItems: 'center'}} onClick={() => setToDisplay("News")}>
        <ImNewspaper style={{ color: toDisplay==="News" ? '#76d18f' : '' }} className="mr-2" />
        News
      </button>
    </div>
        <hr></hr>
        <div className="bg-white">
        {toDisplay==="Chart" && <Chart/>}
        {toDisplay==="News" && <News/>}
        {toDisplay==="Fundamentals" && <Details/>}
        {/* <Chart/> */}
        {/* <News/> */}
        </div>
        <br></br>
        
        {/* <div className="py-60 md:py-40 xl:py-20">
            <Details details={mockCompanyDetails}/>
        </div> */}
    </div>
    </div>
    </div>
  )
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Dashboard);
