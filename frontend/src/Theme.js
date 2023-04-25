import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#60bafe", // Update this with your desired primary color
    },
    secondary: {
      main: "#fea460", // Update this with your desired secondary color
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    // Define other custom colors here
  },
  shape: {
    borderRadius: 8, // Set your desired border radius
  },
  typography: {
    fontFamily: "Comfortaa", // Update this with your desired font family
    textAlign: "center",
  },
});

export default theme;
