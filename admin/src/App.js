

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// ==============================|| APP ||============================== //

const App = () => {

  const navigate = useNavigate();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("admin"));
    console.log(user)
    if (user) {
      navigate("/dashboard")
    }

  }, [])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes()}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
          <ToastContainer
            autoClose={2000}
            position='top-right'
          />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
