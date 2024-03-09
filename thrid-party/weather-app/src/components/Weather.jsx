import React from "react";

function Weather({ weather, onAdd, setActiveCity }) {
  const handleAdd = () => {
    onAdd(weather.name);
    setActiveCity(weather.name);
  };

  return (
    <div>
      {weather && (
        <div className="weather_inner">
          <div className="weather_main">
            {/* <button className="btn_add" onClick={handleAdd}>
              추가하기
            </button> */}
            <p className="weather-icon">
              <img
                className="icon-img"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
            </p>
            <h3 className="location">{weather.name}</h3>
            <p className="temp">{(weather.main.temp - 273.15).toFixed(1)}°C</p>
            <p className="description">{weather.weather[0].description}</p>
          </div>
          <div className="weather_sub">
            <div className="weather_sub_inner">
              <i className="ico_wind"></i>
              <p>{weather.wind.speed} m/s</p>
              <h4>풍속</h4>
            </div>
            <div className="weather_sub_inner">
              <i className="ico_humidity"></i>
              <p>{weather.main.humidity}%</p>
              <h4>습도</h4>
            </div>
            <div className="weather_sub_inner">
              <i className="ico_cloud"></i>
              <p>{weather.clouds.all}%</p>
              <h4>구름</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
