import { useEffect } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useWindowDimensions } from '../../../Hooks/useWindowDimensions';
import { ExternalLink } from '../../../Components/ExternalLink';
import HomepageImage from '../../../Utils/Resources/HomepageImage.JPEG';

const AboutText = ({ children, ...rest }) => {
  const { width } = useWindowDimensions();

  return (
    <Typography
      color='primary.white'
      textAlign={width >= 900 ? 'left' : 'center'}
      mt={2}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export const About = () => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    Aos.init({});
  });
  return (
    <Container
      maxWidth='lg'
      component='section'
      id='about-me'
      sx={{
        height: '100vh',
      }}
    >
      <Grid container mt={3}>
        <Grid item md={7} xs={12} data-aos='fade-down' data-aos-once>
          <AboutText variant='h3' mt={4} mb={2} fontWeight={500}>
            ./ AboutMe
          </AboutText>
          <AboutText>
            I am approaching my final year of BEng Software Engineering at{' '}
            <ExternalLink href='https://www.shu.ac.uk'>
              Sheffield Hallam University
            </ExternalLink>
            . I have finished my year long internship at{' '}
            <ExternalLink href='https://wandisco.com/'>WANdisco</ExternalLink>.
          </AboutText>
          <AboutText>
            The skills I learnt from this internship are extremely valuable in
            my journey and I'm excited to have taken this as my first step
            towards my future.
          </AboutText>
          <AboutText>
            I aspire to attend a{' '}
            <ExternalLink href={'https://russellgroup.ac.uk/'}>
              Russel group university
            </ExternalLink>{' '}
            so I can get a Masters degree in Computer Science. I've had this
            goal in mind for years.
          </AboutText>
          <AboutText>
            Outside of work and academics I enjoy programming, playing video
            games and playing badminton.
          </AboutText>
        </Grid>
        <Grid item md={2} />
        <Grid
          item
          container
          md={3}
          xs={12}
          justifyContent='center'
          alignItems='center'
          mt={width >= 900 ? 8 : 4}
          data-aos='fade-in'
          data-aos-once
        >
          <Box
            component={'img'}
            src={HomepageImage}
            width={250}
            borderRadius={2}
            boxShadow={5}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
