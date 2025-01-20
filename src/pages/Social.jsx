import { useState } from 'react';
import InitialPost from '../Database/InitialPosts';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Divider,
  ImageList,
  ImageListItem,
  MobileStepper,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Share,
  MoreVert,
  Image as ImageIcon,
  Place,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Collections,
  GridView,
  ViewAgenda,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    width: '100%',
    height: '700px',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  navigationButtons: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: theme.spacing(2),
    zIndex: 2,
  },
  imageCounter: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: '0.875rem',
  },
}));

function Social() {
  const classes = useStyles();
  const [posts, setPosts] = useState(InitialPost.map(post => ({
    ...post,
    currentImageIndex: 0
  })));
  const [viewMode, setViewMode] = useState('feed'); // 'grid' or 'feed'
  const [selectedPost, setSelectedPost] = useState(null);
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setOpenPostDialog(true);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filteredPosts = () => {
    switch (activeTab) {
      case 0: // All
        return posts;
      case 1: // Destinations
        return posts.filter(post => post.type === 'destination');
      case 2: // Restaurants
        return posts.filter(post => post.type === 'restaurant');
      case 3: // Reviews
        return posts.filter(post => post.type === 'review');
      default:
        return posts;
    }
  };

  const handleNextImage = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          currentImageIndex: (post.currentImageIndex + 1) % post.image.length
        };
      }
      return post;
    }));
  };

  const handlePrevImage = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          currentImageIndex: (post.currentImageIndex - 1 + post.image.length) % post.image.length
        };
      }
      return post;
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Controls */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="All Posts" />
          <Tab label="Destinations" />
          <Tab label="Restaurants" />
          <Tab label="Reviews" />
        </Tabs>
        <Box>
          <IconButton onClick={() => setViewMode('grid')} color={viewMode === 'grid' ? 'primary' : 'default'}>
            <GridView />
          </IconButton>
          <IconButton onClick={() => setViewMode('feed')} color={viewMode === 'feed' ? 'primary' : 'default'}>
            <ViewAgenda />
          </IconButton>
        </Box>
      </Box>

      {/* Create Post Button */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<ImageIcon />}
          onClick={() => setOpenPostDialog(true)}
          sx={{ borderRadius: 2 }}
        >
          Share Your Travel Story
        </Button>
      </Box>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <motion.div className={classes.gridView}>
          <AnimatePresence>
            {filteredPosts().map((post) => (
              <motion.div
                key={post.id}
                className={classes.gridItem}
                onClick={() => handlePostClick(post)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img
                  src={post.image[post.currentImageIndex]}
                  alt={post.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className={classes.gridItemOverlay}>
                  <div className={classes.gridItemStats}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Favorite /> {post.likes}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ChatBubbleOutline /> {post.comments.length}
                    </Box>
                  </div>
                </div>
                {post.image.length > 1 && (
                  <Collections
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      color: 'white',
                    }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Feed View */}
      {viewMode === 'feed' && (
        <Grid container spacing={4}>
          {filteredPosts().map((post) => (
            <Grid item xs={12} key={post.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className={classes.card}>
                  {/* Post Header */}
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={post.user.avatar} alt={post.user.name} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {post.user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {post.user.level}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton onClick={(e) => handleMenuOpen(e, post)}>
                        <MoreVert />
                      </IconButton>
                    </Box>

                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Place fontSize="small" color="primary" />
                      <Typography variant="body2">{post.location}</Typography>
                    </Box>
                  </CardContent>

                  {/* Post Image with Navigation */}
                  <Box className={classes.imageContainer}>
                    <CardMedia
                      component="img"
                      image={post.image[post.currentImageIndex]}
                      alt={post.caption}
                      className={classes.image}
                    />
                    {post.image.length > 1 && (
                      <>
                        {/* Image Counter */}
                        <Box className={classes.imageCounter}>
                          {post.currentImageIndex + 1} / {post.image.length}
                        </Box>
                        
                        {/* Navigation Buttons */}
                        <Box className={classes.navigationButtons}>
                          <Button
                            variant="contained"
                            onClick={() => handlePrevImage(post.id)}
                            disabled={post.currentImageIndex === 0}
                            startIcon={<KeyboardArrowLeft />}
                            sx={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              color: 'black',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                              },
                              '&.Mui-disabled': {
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'rgba(0, 0, 0, 0.3)',
                              },
                            }}
                          >
                            Previous
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => handleNextImage(post.id)}
                            disabled={post.currentImageIndex === post.image.length - 1}
                            endIcon={<KeyboardArrowRight />}
                            sx={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              color: 'black',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                              },
                              '&.Mui-disabled': {
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'rgba(0, 0, 0, 0.3)',
                              },
                            }}
                          >
                            Next
                          </Button>
                        </Box>
                      </>
                    )}
                  </Box>

                  {/* Post Actions */}
                  <CardActions sx={{ px: 2 }}>
                    <IconButton onClick={() => handleLike(post.id)} color={post.liked ? "primary" : "default"}>
                      {post.liked ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                    <IconButton>
                      <ChatBubbleOutline />
                    </IconButton>
                    <IconButton onClick={() => handleShare(post)}>
                      <Share />
                    </IconButton>
                  </CardActions>

                  {/* Post Content */}
                  <CardContent>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>{post.likes} likes</strong>
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>{post.user.name}</strong> {post.caption}
                    </Typography>

                    {/* Trip Plan Tag */}
                    <Chip
                      label={`Trip: ${post.tripPlan}`}
                      size="small"
                      color="primary"
                      sx={{ mb: 2 }}
                    />

                    {/* Comments */}
                    <Box sx={{ mt: 2 }}>
                      {post.comments.map((comment) => (
                        <Typography key={comment.id} variant="body2" sx={{ mb: 1 }}>
                          <strong>{comment.user}</strong> {comment.text}
                        </Typography>
                      ))}
                    </Box>

                    {/* Add Comment */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        onClick={() => handleComment(post.id)}
                      >
                        Post
                      </Button>
                    </Box>

                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                      {post.timestamp}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Post Detail Dialog */}
      <Dialog
        open={openPostDialog && selectedPost !== null}
        onClose={() => {
          setOpenPostDialog(false);
          setSelectedPost(null);
        }}
        className={classes.postDialog}
      >
        <DialogContent sx={{ p: 0 }}>
          <Grid container>
            {/* Image Section */}
            <Grid item xs={12} md={8} sx={{ position: 'relative' }}>
              <img
                src={selectedPost?.image[selectedPost?.currentImageIndex]}
                alt={selectedPost?.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {selectedPost?.image.length > 1 && (
                <MobileStepper
                  steps={selectedPost.image.length}
                  position="static"
                  activeStep={selectedPost.currentImageIndex}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  }}
                  nextButton={<Button size="small" sx={{ color: 'white' }}>Next</Button>}
                  backButton={<Button size="small" sx={{ color: 'white' }}>Back</Button>}
                />
              )}
            </Grid>
            {/* Details Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={selectedPost?.user.avatar} />
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="subtitle1">{selectedPost?.user.name}</Typography>
                    <Typography variant="caption">{selectedPost?.location}</Typography>
                  </Box>
                </Box>
                <Divider />
                <Typography sx={{ my: 2 }}>{selectedPost?.caption}</Typography>
                <Box sx={{ mt: 2 }}>
                  {selectedPost?.comments.map((comment) => (
                    <Box key={comment.id} sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        <strong>{comment.user}</strong> {comment.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Social;