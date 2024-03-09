import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiCelsiusLine } from "react-icons/ri";

function FavList() {
  const [weatherData, setWeatherData] = useState([]);

  const favlist = ['seoul', 'jeju', 'london', 'tokyo'];

  useEffect(() => {
    getWeatherByCity();
  }, []);

  // 날씨 호출
  function getWeatherByCity() {
    const api = {
      key: import.meta.env.VITE_API_KEY,
      url: "https://api.openweathermap.org/data/2.5/"
    };

    Promise.all(
      favlist.map((city) =>
        axios.get(`${api.url}weather?q=${city}&appid=${api.key}&lang=kr&units=metric`)
      )
    )
      .then((responses) => {
        const weatherData = responses.map((res) => ({
          city: res.data.name
          // ,
          // weatherDes: res.data.weather[0].description,
          // temp: res.data.main.temp,
        }));
        setWeatherData(weatherData);
      })
      .catch((error) => {
        console.log(error);
        alert('페이지 오류');
        window.history.back();
      });
  }

  return (
    <div className='favlist'>
      <div className='favlist-head'>
        <h3>내가 저장한 지역</h3>
      </div>
      <div className='favlist-body'>
        {weatherData.map((data, i) => (
          <div key={i} className='favlist-inner'>
            <h3>{data.city}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavList;