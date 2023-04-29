import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#60bafe",
    },
    secondary: {
      main: "#fea460",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "Comfortaa",
    textAlign: "center",
  },
});

export default theme;
