import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import TripPlanning from './pages/TripPlanner';
import Destinations from './pages/Destinations';
import Profile from './pages/Profile';
import Social from './pages/Social';
import Login from './pages/Login';
import './App.css';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#3f51b5',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        },
      },
    },
  },
});

// Animated page wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes({id, setId}) {
  const location = useLocation();
  
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/destinations" element={<PageWrapper><Destinations /></PageWrapper>} />
        <Route path="/trip-planning" element={<PageWrapper><TripPlanning id={id} /></PageWrapper>} /> 
        <Route path="/profile" element={<PageWrapper><Profile id={id} /></PageWrapper>} />
        <Route path="/login" element={<Login setId={(data) => setId(data)} id={id}/>} />
        <Route path="/social" element={id.id == null ?<Login setId={(data) => setId(data)} id={id}/> : <PageWrapper><Social /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [id, setId] = useState({});
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          {/* Animated background shapes */}
          <div className="animated-bg">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          
          {/* Main content */}
          <div className="content-container">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="navbar-animation"
            >
              <Navbar id={id} setId={(data) => setId(data)}/>
            </motion.div>
            <AnimatedRoutes id={id} setId={(data) => setId(data)} />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;