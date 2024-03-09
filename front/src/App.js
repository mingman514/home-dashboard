// App.js
import * as React from "react";

import Header from "./components/Header";
import Weather from "./components/Weather";
import Bus from "./components/Bus";
import Notes from "./components/Notes";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const styleCommonGrid = {
  // Dev
  border: "1px solid",
  // Common
  padding: "20px",
};

const App = () => {
  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={4} md={4} sx={styleCommonGrid}>
            <Weather />
          </Grid>
          <Grid item xs={4} md={4} sx={styleCommonGrid}>
            <Bus />
          </Grid>
          <Grid item xs={4} md={4} sx={styleCommonGrid}>
            <Notes />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default App;
