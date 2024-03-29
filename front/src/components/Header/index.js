import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import QRcode from "../../assets/qrcode_104363704_19858192fc62f184a1493d2e6a8f76f3.png";

const Header = () => {
  return (
    <header>
      <Box textAlign="center">
        <Typography variant="overline" sx={{ fontSize: "30px" }}>
          Ra-Min House Assistant
        </Typography>
        {/* <img
          style={{
            position: "sticky",
            bottom: "20px",
            right: "20px",
            width: "50px",
            height: "50px",
          }}
          src={QRcode}
          alt="QR code"
        /> */}
      </Box>
    </header>
  );
};

export default Header;
