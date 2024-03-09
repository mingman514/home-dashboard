import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const refreshTime = parseInt(
  process.env.REACT_APP_WEATHER_REFRESH_INTERVAL,
  10
);
const Weather = () => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), refreshTime);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box width="100%">
      <Typography variant="h5" component="span" sx={{ fontSize: "25px" }}>
        Weather
      </Typography>
      <Box component="span" sx={{ marginLeft: 3 }}>
        <Countdown date={Date.now() + refreshTime} style=""></Countdown>
      </Box>
      <iframe
        src={process.env.REACT_APP_WEATHER_APP_URL}
        style={{
          display: "block",
          width: "100%",
          height: "80vh",
          overflow: "hidden",
        }}
      />
      {/* <WeatherApp /> */}
    </Box>
  );
};

export default Weather;
