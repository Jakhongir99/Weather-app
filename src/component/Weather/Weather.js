import React from "react";
import "./Weather.css";
const Weather = ({
  name,
  celsius,
  temp_max,
  temp_min,
  description,
  weatherIcon,
}) => {
  return (
    <div className={name ? "wrapperWeather" : ""}>
      <div className="weatherCountry">
        <h3>{name}</h3>
      </div>
      <div className="weatherImage">
        <i className={`wi ${weatherIcon}`}></i>
      </div>

      <div className="celsius">
        {celsius ? <h1>{celsius}&deg;</h1> : null}
        <div className="minMaxCelsius">
          {temp_max ? <h4>{temp_max}&deg;</h4> : null}
          {temp_min ? <h4>{temp_min}&deg;</h4> : null}
        </div>
      </div>
      <h5 className="description">{description}</h5>
    </div>
  );
};

export default Weather;
