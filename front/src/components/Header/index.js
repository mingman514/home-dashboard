import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <header>
      <Box textAlign="center">
        <Typography variant="overline" sx={{ fontSize: "30px" }}>
          Ra-Min House Assistant
        </Typography>
      </Box>
    </header>
  );
};

export default Header;
