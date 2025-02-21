import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#a8d5ba',
    },
    secondary: {
      main: '#8abeb7',
    },
    background: {
      default: '#f7f9f7',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
