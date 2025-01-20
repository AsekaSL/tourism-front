import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  LinearProgress,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Badge,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  EmojiEvents,
  Collections,
  Edit,
  Map,
  FlightTakeoff,
  Hotel,
  DirectionsCar,
  Restaurant,
  Camera,
  Star,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import usersDatas from '../Database/ProfilesData';

// Mock user data


function Profile({id}) {
  let userData = id;
  const [tabValue, setTabValue] = useState(0);
 
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card" sx={{ mb: 4 }}>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={2}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <IconButton size="small" sx={{ bgcolor: 'background.paper' }}>
                        <Edit fontSize="small" />
                      </IconButton>
                    }
                  >
                    <Avatar
                      src={userData.avatar}
                      alt={userData.name}
                      sx={{ width: 120, height: 120 }}
                    />
                  </Badge>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography variant="h4" gutterBottom>
                    {userData.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {userData.bio}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationOn fontSize="small" color="primary" />
                    <Typography variant="body2">{userData.location}</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Member since {userData.joinDate}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button variant="contained" fullWidth sx={{ mb: 1 }}>
                    Edit Profile
                  </Button>
                  <Button variant="outlined" fullWidth>
                    Share Profile
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Level Progress */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card" sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmojiEvents color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Level {Math.floor(userData.xp / 1000)} - {userData.level}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(userData.xp % 1000) / 10}
                sx={{ height: 10, borderRadius: 5, mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                {userData.xp} / {userData.nextLevelXp} XP to next level
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6} sm={3}>
              <Card className="glass-card">
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Map color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4">{userData.stats.countriesVisited}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Countries Visited
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card className="glass-card">
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <FlightTakeoff color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4">{userData.stats.totalTrips}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Trips
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card className="glass-card">
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <LocationOn color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4">{userData.stats.citiesExplored}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cities Explored
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card className="glass-card">
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Camera color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4">{userData.stats.photosShared}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Photos Shared
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Tabs Section */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card">
            <CardContent>
              <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 3 }}>
                <Tab label="Achievements" />
                <Tab label="Trips" />
                <Tab label="Photos" />
              </Tabs>

              {/* Achievements Tab */}
              {tabValue === 0 && (
                <Grid container spacing={2}>
                  {userData.badges.map((badge) => (
                    <Grid item xs={12} sm={6} md={4} key={badge.id}>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Typography variant="h2" sx={{ mb: 1 }}>
                              {badge.icon}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                              {badge.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {badge.description}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Trips Tab */}
              {tabValue === 1 && (
                <Grid container spacing={3}>
                  {userData.trips.map((trip) => (
                    <Grid item xs={12} sm={6} md={4} key={trip.id}>
                      <Card sx={{ height: '100%' }}>
                        <Box
                          sx={{
                            height: 200,
                            backgroundImage: `url(${trip.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {trip.destination}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {trip.date}
                          </Typography>
                          <Chip
                            label={trip.status}
                            color={trip.status === 'Upcoming' ? 'primary' : 'success'}
                            size="small"
                            sx={{ mb: 1 }}
                          />
                          <Box sx={{ mt: 1 }}>
                            {trip.places.map((place, index) => (
                              <Chip
                                key={index}
                                label={place}
                                size="small"
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Photos Tab */}
              {tabValue === 2 && (
                <Grid container spacing={2}>
                  {userData.photos.map((photo) => (
                    <Grid item xs={6} sm={4} key={photo.id}>
                      <Card>
                        <Box
                          sx={{
                            position: 'relative',
                            paddingTop: '100%',
                            backgroundImage: `url(${photo.url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 8,
                              left: 8,
                              display: 'flex',
                              alignItems: 'center',
                              color: 'white',
                              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                            }}
                          >
                            <Star sx={{ mr: 0.5 }} fontSize="small" />
                            <Typography variant="body2">{photo.likes}</Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Container>
  );
}

export default Profile;