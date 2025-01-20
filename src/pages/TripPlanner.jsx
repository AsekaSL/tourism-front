import React, { useState } from 'react';
import { Button, TextField,
  Card, CardMedia, CardContent, CardActions, Typography, Box,
  Select, MenuItem, FormControl, InputLabel, Rating,
  Grid, Paper, IconButton, Badge, Dialog, DialogTitle,
  DialogContent, DialogActions, Snackbar, Alert
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import suggestionDatas from '../Database/Suggestions';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import budgetPackagesData from '../Database/BudgetData';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
    marginBottom: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
  media: {
    height: 200,
  },
  mapContainer: {
    height: '400px',
    width: '100%',
    marginTop: theme.spacing(2),
    position: 'relative',
    backgroundColor: '#e8f5e9',
    border: '1px solid #81c784',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  mapPoint: {
    position: 'absolute',
    width: '12px',
    height: '12px',
    backgroundColor: '#f44336',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
  },
  mapRoute: {
    position: 'absolute',
    height: '2px',
    backgroundColor: '#1976d2',
    transform: 'translate(0, -50%)',
  },
  mapLabel: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  restaurantCard: {
    maxWidth: 300,
    margin: theme.spacing(1),
  },
  reviewSection: {
    marginTop: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  transportIndicator: {
    position: 'absolute',
    left: '50%',
    top: '45%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
  },
  cartButton: {
    position: 'fixed',
    right: theme.spacing(3),
    top: theme.spacing(3),
    zIndex: 1000,
  },
  budgetCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  selectedBudget: {
    border: '2px solid #4caf50',
  },
}));

const provinces = [
  'Central Province',
  'Eastern Province',
  'North Central Province',
  'Northern Province',
  'North Western Province',
  'Sabaragamuwa Province',
  'Southern Province',
  'Uva Province',
  'Western Province'
];

const tripTypes = {
  single: {
    name: 'Single Traveler',
    multiplier: 1,
    description: 'Perfect for solo adventures'
  },
  family: {
    name: 'Family Package',
    multiplier: 2.5,
    description: 'Ideal for families (2 adults + 2 children)'
  }
};

const budgetPackages = budgetPackagesData;
const suggestions = suggestionDatas;

const TripPlanner = ({id}) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedTripType, setSelectedTripType] = useState('single');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState(suggestions);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredDestinations(
      suggestions.filter(dest => 
        (dest.name.toLowerCase().includes(query) ||
        dest.description.toLowerCase().includes(query)) &&
        (!selectedProvince || dest.region === selectedProvince)
      )
    );
  };

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    setSelectedProvince(province);
    setFilteredDestinations(
      suggestions.filter(dest => 
        (!searchQuery || 
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!province || dest.region === province)
      )
    );
  };

  const handleAddToCart = (destination) => {
    if (id.id == null) {
        navigate('/login');
    }
    if (!selectedBudget) {
      setSnackbarOpen(true);
      return;
    }
    const isInCart = cart.some(item => item.id === destination.id);
    if (!isInCart) {
      setCart([...cart, { ...destination, budgetPackage: selectedBudget }]);
      setSnackbarOpen(true);
    }

  };

  const handleRemoveFromCart = (destinationId) => {
    setCart(cart.filter(item => item.id !== destinationId));
  };

  const getFilteredAccommodations = (destination) => {
    if (!selectedBudget) return { hotels: [], restaurants: [] };
    
    const budget = budgetPackages[selectedBudget];
    return {
      hotels: destination.hotels.filter(hotel => hotel.price <= budget.maxHotelPrice[selectedTripType]),
      restaurants: destination.restaurants.filter(rest => rest.price <= budget.maxRestaurantPrice[selectedTripType]),
    };
  };

  return (
    <Box className={classes.root}>
      {/* Trip Type Selection */}
      <Typography variant="h4" gutterBottom>
        Select Trip Type
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(tripTypes).map(([key, type]) => (
          <Grid item xs={12} md={6} key={key}>
            <Card 
              className={`${classes.budgetCard} ${selectedTripType === key ? classes.selectedBudget : ''}`}
              onClick={() => setSelectedTripType(key)}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {type.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {type.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Province Selection */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Select Province</InputLabel>
        <Select
          value={selectedProvince}
          onChange={handleProvinceChange}
          label="Select Province"
        >
          <MenuItem value="">All Provinces</MenuItem>
          {provinces.map(province => (
            <MenuItem key={province} value={province}>
              {province}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Budget Selection */}
      <Typography variant="h4" gutterBottom>
        Select Your Budget Package
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(budgetPackages).map(([key, pkg]) => (
          <Grid item xs={12} md={4} key={key}>
            <Card 
              className={`${classes.budgetCard} ${selectedBudget === key ? classes.selectedBudget : ''}`}
              onClick={() => setSelectedBudget(key)}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {pkg.name}
                </Typography>
                <Typography color="textSecondary">
                  {pkg.priceRange[selectedTripType]}
                </Typography>
                <Typography variant="body2" component="p">
                  Recommended stay: {pkg.daysRange}
                </Typography>
                <Box mt={2}>
                  {pkg.perks.map((perk, index) => (
                    <Typography key={index} variant="body2">
                      • {perk}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search and Destinations */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search destinations..."
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 4 }}
      />

      {/* Cart Button */}
      <IconButton 
        className={classes.cartButton}
        color="primary"
        onClick={() => setCartOpen(true)}
      >
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      {/* Destinations Grid */}
      <Grid container spacing={3}>
        {filteredDestinations.map((destination) => {
          const { hotels, restaurants } = getFilteredAccommodations(destination);
          return (
            <Grid item xs={12} md={4} key={destination.id}>
              <Card>
                <CardMedia
                  className={classes.media}
                  image={destination.image}
                  title={destination.name}
                />
                <CardContent>
                  <Typography variant="h6">{destination.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {destination.description}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Rating value={destination.rating} readOnly size="small" />
                    <Typography variant="body2" color="textSecondary" ml={1}>
                      ({destination.rating})
                    </Typography>
                  </Box>
                  {selectedBudget && (
                    <><Typography variant="body2" color="textSecondary" mt={2}>
                      <HotelIcon fontSize="small" /> {hotels.length} suitable hotels
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <RestaurantIcon fontSize="small" /> {restaurants.length} restaurants
                    </Typography>
                    </>)}
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={<AddShoppingCartIcon />}
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(destination)}
                    disabled={cart.some(item => item.id === destination.id)}
                  >
                    Add to Trip
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Cart Dialog */}
      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Your Trip Cart</DialogTitle>
        <DialogContent>
          {cart.map((item) => {
            const { hotels, restaurants } = getFilteredAccommodations(item);
            return (
              <Card key={item.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Budget Package: {budgetPackages[item.budgetPackage].name}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="subtitle2">Recommended Accommodations:</Typography>
                    {hotels.slice(0, 2).map((hotel) => (
                      <Typography key={hotel.name} variant="body2">
                        • {hotel.name} - {hotel.price} LKR/night
                      </Typography>
                    ))}
                  </Box>
                  <Box mt={2}>
                    <Typography variant="subtitle2">Recommended Restaurants:</Typography>
                    {restaurants.slice(0, 2).map((restaurant) => (
                      <Typography key={restaurant.name} variant="body2">
                        • {restaurant.name} - Avg. {restaurant.price} LKR/meal
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    color="error"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            );
          })}
          {cart.length === 0 && (
            <Typography variant="body1" align="center">
              Your trip cart is empty. Add some destinations!
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCartOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {selectedBudget ? 'Destination added to your trip!' : 'Please select a budget package first'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TripPlanner;