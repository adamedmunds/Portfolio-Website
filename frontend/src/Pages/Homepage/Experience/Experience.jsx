import {
  Box,
  Container,
  Grid,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem as UnstyledListItem,
  ListItemText,
} from '@mui/material';
import Aos from 'aos';
import { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { ExternalLink } from '../../../Components/ExternalLink';
import { HomepageTitle } from '../../../Components/Homepage/HomepageTitle';
import { useWindowDimensions } from '../../../Hooks/useWindowDimensions';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, pt: 0, maxWidth: '600px' }}>{children}</Box>
      )}
    </div>
  );
};

const Header = ({ title, company, time }) => {
  return (
    <Fragment>
      <Typography variant='h6' component='p' gutterBottom>
        {title} @ {company}
      </Typography>
      <Typography variant='body2' sx={{ color: '#E0E0E0' }}>
        {time}
      </Typography>
    </Fragment>
  );
};

const ListItem = ({ children }) => {
  return (
    <UnstyledListItem>
      <ListItemText
        disableTypography
        primary={
          <Typography
            sx={{
              '&::before': {
                content: '"▹   "',
                color: '#91E5F6',
                position: 'absolute',
                left: 0,
              },
            }}
          >
            {children}
          </Typography>
        }
      />
    </UnstyledListItem>
  );
};

export const Experience = () => {
  const { width } = useWindowDimensions();
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    Aos.init({});
  });

  const TabPanels = () => {
    return (
      <Fragment>
        <TabPanel value={value} index={0}>
          <Header
            title='Placement Java Engineer'
            company={
              <ExternalLink href='https://wandisco.com/'>WANdisco</ExternalLink>
            }
            time='Jun 2021 - Jul 2022'
          />
          <List>
            <ListItem>
              Designing a solution for a ticket requested by scrum masters. From
              writing pseudocode on paper to developing the program and having
              it run via Jenkins to automatically generate a report.
            </ListItem>
            <ListItem>
              Collaborate with other engineers and architects to refine tickets
              and implement a given solution.
            </ListItem>
            <ListItem>
              Usage of Jest and Cypress for automated unit and integration
              testing for our React app.
            </ListItem>
            <ListItem>
              Usage of JUnit for automated testing in our Java app
            </ListItem>
            <ListItem>
              Integrate products into Cloud Services such as Google Cloud, AWS
              and Azure.
            </ListItem>
          </List>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Header
            title='IT Teaching Assistant'
            company={
              <ExternalLink href='https://www.beauchamp.org.uk/'>
                Beauchamp College
              </ExternalLink>
            }
            time='Aug - Nov 2018'
          />
          <List>
            <ListItem>Assisting teachers with lesson structure.</ListItem>
            <ListItem>
              Helping lower key stage pupils that had difficulty.
            </ListItem>
            <ListItem>
              Keeping classroom in order while pupils work on tasks.
            </ListItem>
          </List>
        </TabPanel>
      </Fragment>
    );
  };

  return (
    <Container
      maxWidth='lg'
      component='section'
      id='experience'
      sx={{ minHeight: '50vh' }}
    >
      <Grid container mt={3}>
        <Grid item xs={12} data-aos='fade-down' data-aos-once mt={10}>
          <HomepageTitle>./ Experience</HomepageTitle>
          {width >= 900 ? (
            <Box
              mt={5}
              sx={{
                flexGrow: 1,
                bgcolor: 'transparent',
                display: 'flex',
                color: 'white',
              }}
            >
              <Tabs
                orientation='vertical'
                variant='fullWidth'
                value={value}
                onChange={handleChange}
                sx={{
                  borderRight: 1,
                  borderColor: 'divider',
                  minWidth: '15%',
                }}
              >
                <Tab label='WANdisco' sx={{ color: 'white' }} />
                <Tab label='Beauchamp College' sx={{ color: 'white' }} />
              </Tabs>
              <TabPanels />
            </Box>
          ) : (
            <Box sx={{ width: '100%', color: 'white' }}>
              <Box mb={5} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} centered onChange={handleChange}>
                  <Tab label='WANdisco' sx={{ color: 'white' }} />
                  <Tab label='Beauchamp College' sx={{ color: 'white' }} />
                </Tabs>
              </Box>
              <TabPanels />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
