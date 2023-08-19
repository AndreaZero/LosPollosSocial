import { createTheme } from "@mui/material";

const theme = createTheme({
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
            backgroundColor: '#00001E',
            boxShadow: "0px 0px 3px 0px white",
            borderRadius: '1rem',
            color: 'white'
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
