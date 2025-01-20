import { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import galle from '../assets/travelGalleFort.jpg';
import popularDestination from '../Database/PopularDestination';
import { useNavigate } from 'react-router-dom';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const HeroSection = styled(Box)(({ bgImage }) => ({
  height: '80vh',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${galle})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background 0.3s ease-in-out',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    backgroundSize: '400% 400%',
    opacity: 0.3,
    mixBlendMode: 'overlay',
    animation: `${gradientAnimation} 15s ease infinite`,
    zIndex: 2,
  },
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 3,
});

const StyledCard = styled(Card)({
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  },
});

const popularDestinations = popularDestination;

function Home() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('https://source.unsplash.com/random/1920x1080/?travel');
  
  const handleDestinationClick = (destination) => {
    setBackgroundImage(destination.image);
    setSearchText(destination.name);
    navigate('/destinations')
  };

  return (
    <Box>
      <HeroSection bgImage={backgroundImage}>
        <ContentWrapper>
          <Container>
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 3
              }}
            >
              Discover Your Next Adventure
            </Typography>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                mb: 4
              }}
            >
              Explore the world's most beautiful destinations
            </Typography>
            <Box sx={{ mt: 4 }}>
              <TextField
                variant="outlined"
                placeholder="Where do you want to go?"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 1,
                  width: '300px',
                  mr: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                }}
              >
                Search
              </Button>
            </Box>
          </Container>
        </ContentWrapper>
      </HeroSection>

      <Container sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Popular Destinations
        </Typography>
        <Grid container spacing={4}>
          {popularDestinations.map((destination) => (
            <Grid item xs={12} md={4} key={destination.id}>
              <StyledCard onClick={() => handleDestinationClick(destination)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={destination.image}
                  alt={destination.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {destination.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {destination.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;