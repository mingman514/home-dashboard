import React from "react";
import { BsSearch } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

function Nav({ open, setOpen, getCurrentLocation }) {
  return (
    <header>
      <div className="header_inner">
        <nav id="nav">
          <h1>Weather App</h1>
          <div className="btn-group">
            <BsSearch
              className="btn_search nav-btn"
              onClick={() => {
                setOpen(!open);
              }}
            />
            <HiLocationMarker
              className="btn_location nav-btn"
              onClick={getCurrentLocation}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
