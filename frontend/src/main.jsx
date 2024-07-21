import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraBaseProvider, ChakraProvider, extendBaseTheme, extendTheme, theme as chakraTheme } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material";


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
