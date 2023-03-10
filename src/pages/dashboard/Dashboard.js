import React from 'react'

import SideNavbar from '../../component/SideNavbar'
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./Dashboard.css"
import CreatorDashboard from '../../component/creatorDashboard/CreatorDashboard';

const Dashboard = () => {
  return (

    <div className="row nopadding">
      <div className="col-lg-auto nopadding" style={{background:"#0A3D9D",height:"100vh"}}>
          <ul className='nopadding'>
            <li>
                <i class="fa-solid  fa-magnifying-glass fa-2x mx-2 my-3" style={{color:"white"}}></i>
            </li>
            <li>
            <i class="fa-sharp fa-regular fa-plus fa-2x mx-2 my-3" style={{color:"white"}}></i>
            </li>
          </ul>
      </div>
        <div className='col-lg-2 nopadding'>
            <SideNavbar/>
        </div>
        <div className='col nopadding'>
            <CreatorDashboard/>
        </div>
    </div>
 
  )
}

export default Dashboard