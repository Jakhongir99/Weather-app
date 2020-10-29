import React from "react";
import "./Header.css";
const Header = ({ loadWeather }) => {
  return (
    <form className="header" onSubmit={loadWeather}>
      <input
        type="text"
        className="form-control w-25 mr-3"
        placeholder="City"
        name="city"
      />
      <input
        type="text"
        className="form-control w-25 mr-3"
        placeholder="Country"
        name="country"
      />
      <button className="btn btn-warning">Get Weather</button>
    </form>
  );
};

export default Header;
