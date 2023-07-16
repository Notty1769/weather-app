import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

  const search = async (city) => {
    try {
      const { data } = await axios.get(
        `${apiKeys.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      );
      let icon;
      switch (data.weather[0].main) {
        case "Haze":
          icon = "CLEAR_DAY";
          break;
        case "Clouds":
          icon = "CLOUDY";
          break;
        case "Rain":
          icon = "RAIN";
          break;
        case "Snow":
          icon = "SNOW";
          break;
        case "Dust":
          icon = "WIND";
          break;
        case "Drizzle":
          icon = "SLEET";
          break;
        case "Fog":
          icon = "FOG";
          break;
        case "Smoke":
          icon = "FOG";
          break;
        case "Tornado":
          icon = "WIND";
          break;
        default:
          icon = "CLEAR_DAY";
      }
      setWeather({
        ...data,
        icon,
      });
    } catch (error) {
      console.log(error);
      setWeather(null);
      setQuery("");
      setError({ message: "Not Found", query: query });
    }
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("delhi");
  }, []);

  return (
    <div className="forecast">
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <div className="img-box">
          {" "}
          <img
            src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
            onClick={search}
          />
        </div>
      </div>
      {weather ? (
        <>
          <div className="forecast-icon">
            <ReactAnimatedWeather
              icon={weather.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          </div>
          <div className="today-weather">
            <h3>{weather.weather[0].main}</h3>
            <ul>
              <div>
                {" "}
                <li className="cityHead">
                  <p>
                    {weather.name}, {weather.sys.country}
                  </p>
                  <img
                    className="temp"
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  />
                </li>
                <li>
                  Temperature{" "}
                  <span className="temp">
                    {Math.round(weather.main.temp)}°c ({weather.weather[0].main}
                    )
                  </span>
                </li>
                <li>
                  Humidity{" "}
                  <span className="temp">
                    {Math.round(weather.main.humidity)}%
                  </span>
                </li>
                <li>
                  Visibility{" "}
                  <span className="temp">
                    {Math.round(weather.visibility)} mi
                  </span>
                </li>
                <li>
                  Wind Speed{" "}
                  <span className="temp">
                    {Math.round(weather.wind.speed)} Km/h
                  </span>
                </li>
              </div>
            </ul>
          </div>
        </>
      ) : (
        <li>
          {error.query} {error.message}
        </li>
      )}
    </div>
  );
}
export default Forcast;
