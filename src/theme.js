import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Abel', sans-serif;",
    fontWeightBold: 'true',
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          padding: "12px",
          borderWidth: "1px",
          backgroundColor: '#001F4A',
          boxShadow: '0px 0px 5px 0px black',
          borderRadius: '1rem',
          color: 'black'
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontWeight: "bold",
          color: 'grey'
        },
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'gray',
          border: "none",
          fontWeight: "normal"
        },
      }
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "1000px"
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '8px',
        },
      },
    },
  },
});

export default theme;
