import React from "react";
import './index.css';
import logo from '../../assets/AppIogo.png';
import searchIcon from '../../assets/search_icon.png';


const Header = (props) => {
    return(
       <div className="headNavbar">
           <div className="logo_container">
                <img className="logo" src={logo} alt="Logo" />
                <h2 className="logo_name">Weather</h2>
           </div>
           <div className="SearchBar">
               <div className="search-container">
                    <img className="search_icon" src={searchIcon} alt="SearchIcon" />
                    <input list="browsers" name="browser" className="search_field" onChange={props.handleChange} />
                    <datalist id="browsers">
                        <option value="Current location" />
                        <option value="Hyderabad" />
                        <option value="Kolkata" />
                        <option value="Bangalore" />
                        <option value="Chennai" />
                        <option value="Mummbai" />
                        <option value="Moscow" />
                    </datalist>
                    <button className="search_button" type="submit" onClick={props.handleSearch}>Search</button>
               </div>
           </div>
       </div> 
    )
}

export default Header;