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
            backgroundColor: '#222229',
            color: 'white'
          },
        }),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "md",
      },
    },
  },
});

export default theme;
