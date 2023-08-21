import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Abel', sans-serif;",
    fontWeightBold:'true',
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: "outlined",
        
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...{
            padding: theme.spacing(2),
            borderWidth: "1px",
            backgroundColor: '#001F4A',
            boxShadow: '0px 0px 5px 0px black',
            borderRadius: '1rem',
            color: 'black'
          },
        }),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "1000px"
      },
    },
  },
});

export default theme;
