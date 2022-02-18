import React from "react";
import "./App.css";
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./app_component/weather.component";

// api call api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}
const APIkey = "49858d6dfad2ed0f8263b5eb1ddb818c";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      temp: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };
    this.getWeather();

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

  calcFar(temp) {
    let far = Math.floor(temp - 237.15);
    return far;
  }

  get_WeatherIcon(icon, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 532:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 700 && rangeId <= 781:
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
    }
  }

  getWeather = async() => {
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${APIkey}`
    );
    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: response.name,
      country: response.sys.country,
      temp: this.calcFar(response.main.temp),
      temp_max: this.calcFar(response.main.temp_max),
      temp_min: this.calcFar(response.main.temp_min),
      description: response.weather[0].description,
    });
    this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)
  };

  render() {
    return (
      <div className="App">
        <Weather
          city={this.state.city}
          country={this.state.country}
          weatherIcon={this.state.weatherIcon}
          temp={this.state.temp}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.weatherIcon}
        />
      </div>
    );
  }
}

export default App;
