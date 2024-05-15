import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PoolIcon from '@mui/icons-material/Pool';

import SpaIcon from '@mui/icons-material/Spa';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
const items = [
  {
    icon: <SpaIcon />,
    title: 'Relaxing Spa',
    description:
      'Indulge in ultimate relaxation at our rejuvenating spa. Unwind with a variety of soothing treatments and therapies provided by our skilled professionals. From massages to facials and body treatments, our spa offers a serene sanctuary where you can escape the stresses of everyday life',
    imageLight: `url('https://img.grouponcdn.com/deal/cDrtH4QqqGemPDoyz312/e8-5000x3000/v1/t600x362.jpg')`,
    imageDark: 'url("data:image/jpeg;base64,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")',
  },
  {
    icon: <FitnessCenterIcon />,
    title: 'Fitness Center',
    description:
      'Stay active and maintain your fitness routine at our well-equipped fitness center. Whether you prefer cardio exercises or strength training, our state-of-the-art facilities cater to all your workout needs. Enjoy a revitalizing exercise session and keep up with your fitness goals during your stay',
    imageLight: 'url("https://img.freepik.com/premium-photo/african-american-woman-smiling-running-treadmill-gym_124865-23050.jpg")',
    imageDark: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwSBEl3uOgbU8j8G0qLlx8BZ2eMoU1Gls9QdaL3XbHQnwxK7rECa5E6tLcAJNRS5quAeo&usqp=CAUhttps://st.focusedcollection.com/18590116/i/650/focused_228984156-stock-photo-beautiful-woman-exercising-treadmill-gym.jpghttps://st.focusedcollection.com/18590116/i/650/focused_228984156-stock-photo-beautiful-woman-exercising-treadmill-gym.jpg")',
  },
  {
    icon: <PoolIcon />,
    title: 'Swimming Pool',
    description:
      'Take a refreshing dip in our sparkling swimming pool or soak up the sun on our sun deck.',
    imageLight: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3QMWiD2XkcCyVrTD82O1O7tCoSc4b2QugQ&s")',
    imageDark: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZRS9oPb5qxK0K3bb1B6kJKYX07n5-13jxhQ&s")',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Amazing features
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
Indulge in a truly exceptional stay at our hotel, where luxury, comfort, and impeccable service converge to create an unforgettable experience. Book your stay with us today and let us exceed your expectations."
            </Typography>
          </div>
          <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'primary.light' : '';
                    }
                    return selectedItemIndex === index ? 'primary.light' : '';
                  },
                  background: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'none' : '';
                    }
                    return selectedItemIndex === index ? 'none' : '';
                  },
                  backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                  '& .MuiChip-label': {
                    color: selectedItemIndex === index ? '#fff' : '',
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: 'auto', sm: 'none' },
              mt: 4,
            }}
          >
            <Box
              sx={{
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography color="text.primary" variant="body2" fontWeight="bold">
                {selectedFeature.title}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                {selectedFeature.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: '1px', ml: '2px' }}
                />
              </Link>
            </Box>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor:
                    selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index
                        ? 'primary.light'
                        : 'grey.200';
                    }
                    return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === 'light') {
                          return selectedItemIndex === index
                            ? 'primary.main'
                            : 'grey.300';
                        }
                        return selectedItemIndex === index
                          ? 'primary.main'
                          : 'grey.700';
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>Learn more</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: '1px', ml: '2px' }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                m: 'auto',
                width: 420,
                height: 500,
                backgroundSize: 'contain',
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
