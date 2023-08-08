import React, { useState } from "react";
import Axios from "axios";
import classes from "./weather.module.css";

const Api = {
  key: "19a86cd9568a88a0d8414bfa06498378",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [weather, setWeather] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [img, setImg] = useState("");
  const fetchData = async (event) => {
    try {
      const response = await Axios.get(
        `${Api.base}weather?q=${city}&units=metric&appid=${Api.key}`
      );
      console.log(response.data);
      setData(response.data);
      setName(response.data.name.toUpperCase());
      setTemp(response.data.main.temp + "\xB0C");
      setLat(response.data.coord.lat);
      setLong(response.data.coord.lon);
      setWeather(response.data.weather[0].main);
      setHumidity(response.data.main.humidity + "%");
      setWind(response.data.wind.speed + "km/s ");
      setImg(response.data.weather[0].icon);
    } catch (err) {
      alert("Please Enter the city name..");
    }
  };

  const inputHandler = (e) => {
    setCity(e.target.value);
  };
  const reloadHandler = ()=>{
    return window.location.reload()
  }
  return (
    <div className={classes.search}>
      <h3>Weather App</h3>
      <div className={classes.lab}>
        <input
          type="text"
          value={city}
          onChange={inputHandler}
          placeholder="Enter the city name.."
        />
        <button onClick={fetchData}>submit</button>
      </div>
      {data && (
        <div>
        <div>
          <h1>{name}</h1>

          <img src={`http://openweathermap.org/img/wn/${img}@2x.png`} />
          <div className={classes.weather}>
            <h3>{weather}</h3>
            <h4>{temp}</h4>
          </div>

          <div className={classes.weather}>
            <div>
              <p>Latitude: {lat}</p>
              <p>Longitude: {long}</p>
            </div>
            <div>
              <p>Humidity: {humidity}</p>
              <p>Wind:{wind}</p>
            </div>
          </div>
        </div>
        <div>

        <button className={classes.reload} onClick={reloadHandler}>X</button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
