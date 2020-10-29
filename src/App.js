import React, { Component } from "react";
import "weather-icons/css/weather-icons.css";
import axios from "axios";
import "./App.css";
import Weather from "./component/Weather/Weather";
import Header from "./component/Header/Header";
const API_key = "4b900a5b7e8434acceef4d05292f09b6";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      description: null,
      celsius: null,
      temp_max: null,
      temp_min: null,
      icon: undefined,
    };
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  exchangeCelsius(temp) {
    return Math.floor(temp - 273);
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
    }
  }
  getCurrentWeather = (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      )
      .then((data) => {
        this.setState({
          name: `${data.data.name}, ${data.data.sys.country}`,
          celsius: this.exchangeCelsius(data.data.main.temp),
          temp_max: this.exchangeCelsius(data.data.main.temp_max),
          temp_min: this.exchangeCelsius(data.data.main.temp_min),
          description: data.data.weather[0].description,
          icon: this.weatherIcon.Thunderstorm,
        });
        this.get_WeatherIcon(this.weatherIcon, data.data.weather[0].id);
      });
  };
  render() {
    const {
      name,
      celsius,
      temp_max,
      temp_min,
      description,
      error,
      icon,
    } = this.state;
    return (
      <div className="weather">
        <Header loadWeather={this.getCurrentWeather} error={error} />
        <Weather
          name={name}
          celsius={celsius}
          temp_max={temp_max}
          temp_min={temp_min}
          description={description}
          weatherIcon={icon}
        />
      </div>
    );
  }
}
