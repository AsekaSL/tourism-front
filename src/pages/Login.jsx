import { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Twitter,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import usersLoginData from '../Database/LoginData';
import usersDatas from '../Database/ProfilesData';
import axios from 'axios';

let profileData = {};

function Login({setId, id}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setFName] = useState('');
  const [profileDatas, setProfileDatas] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  const getUserData = (e, data) => {
    e.preventDefault();
    axios.get(`http://localhost:3001/profileDatas?email=${data.email}&password=${data.password}`, data)
      .then((response) => {
        profileData = response.data;
        setId(profileData);
        navigate('/profile');
      });
  };
  
  const addUserData = (data,e) => {
    axios.post('http://localhost:3001/addProfileData', data)
    .then((response) => {
      getUserData(e,{email:data.email,password:data.password});
    })
    .catch((error) => {
      console.log(error);
    });
  };

  

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card">
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
              {isSignUp 
                ? 'Create an account to start planning your adventures'
                : 'Sign in to continue your journey'}
            </Typography>

            <Box component="form" onSubmit={(e) =>{
                if(!isSignUp){
                  let data = {
                    email,
                    password
                  }
                  
                  getUserData(e, data);
                }else{
                  e.preventDefault();
                  
                  addUserData({
                    email, 
                    password, 
                    name:fName,
                    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                    level: "Explorer Level 1",
                    xp: 0,
                    nextLevelXp: 1000,
                    joinDate: "January 2024",
                    location: "Kadawatha, Sri Lanka",
                    bio: "Adventure seeker | Photography enthusiast | World explorer",
                    stats: {
                      countriesVisited: 0,
                      citiesExplored: 0,
                      totalTrips: 0,
                      photosShared: 0
                    },
                    badges: [
                      { id: 1, name: '', icon: '', description: '' }
                    ],
                    trips: [
                      {
                        id: 1,
                        destination: '',
                        date: '',
                        image: '',
                        status: '',
                        places: ['', "", ''],
                      }]
                  },e);
                }
                
              }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {isSignUp && (
                <TextField
                  onChange={(e) => setFName(e.target.value)}
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  required
                />
              )}
              
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
              onChange={(e) => setPassword(e.target.value)}
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {isSignUp && (
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  required
                />
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </Typography>
                <Button onClick={() => 
                  {
                    setIsSignUp(!isSignUp);
                    getUserData();
                    console.log("hello");
                    if(!isSignUp){
                      
                    }else{
                      console.log("sign up");
                    }
                  }}>
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
              </Box>

              <Divider sx={{ my: 2 }}>OR</Divider>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton sx={{ bgcolor: '#DB4437', color: 'white', '&:hover': { bgcolor: '#C53929' } }}>
                  <Google />
                </IconButton>
                <IconButton sx={{ bgcolor: '#4267B2', color: 'white', '&:hover': { bgcolor: '#365899' } }}>
                  <Facebook />
                </IconButton>
                <IconButton sx={{ bgcolor: '#1DA1F2', color: 'white', '&:hover': { bgcolor: '#1A91DA' } }}>
                  <Twitter />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}

export default Login;