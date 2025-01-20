import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import destination from '../Database/Destination.jsx';
import region from '../Database/Region.jsx' ;
import categorie from '../Database/Categories.jsx';
import activitie from '../Database/Activities.jsx';
import { useNavigate } from 'react-router-dom';

const destinations = destination;

const categories = categorie;
const regions = region;
const activities = activitie;

function Destinations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 15000]);

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
    const matchesActivity = selectedActivity === 'All' || dest.activities.includes(selectedActivity);
    const matchesPrice = dest.price >= priceRange[0] && dest.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesRegion && matchesActivity && matchesPrice;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Filters Section */}
      <Box className="glass-card" sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Search Destinations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Region</InputLabel>
              <Select
                value={selectedRegion}
                label="Region"
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regions.map((region) => (
                  <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Activity</InputLabel>
              <Select
                value={selectedActivity}
                label="Activity"
                onChange={(e) => setSelectedActivity(e.target.value)}
              >
                {activities.map((activity) => (
                  <MenuItem key={activity} value={activity}>{activity}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography gutterBottom>Price Range (Rs.)</Typography>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={15000}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Destinations Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4}>
          {filteredDestinations.map((destination) => (
            <Grid item xs={12} md={4} key={destination.id}>
              <motion.div variants={itemVariants}>
                <Card 
                  className="glass-card"
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={destination.image}
                    alt={destination.name}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>{destination.name}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Rating value={destination.rating} precision={0.1} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        රු.{destination.price} per person
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {destination.description}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      {destination.activities.map((activity) => (
                        <Chip
                          key={activity}
                          label={activity}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/trip-planning`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
}

export default Destinations;