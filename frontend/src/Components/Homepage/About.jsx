import { useEffect } from "react";
import {
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
} from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";

export const About = () => {
  useEffect(() => {
    Aos.init({});
  });
  return (
    <Container maxWidth="lg" component="section" id="about-me">
      <Card
        sx={{ minWidth: 275, mt: 5, backgroundColor: "inherit" }}
        elevation={0}
      >
        <CardContent>
          <Typography
            variant="h2"
            sx={{ mb: 1.5 }}
            color="primary"
            data-aos="fade-down"
            data-aos-once
          >
            <Divider spacing={2}>Hi There</Divider>
          </Typography>
          <Typography
            variant="body1"
            data-aos="fade-down"
            data-aos-once
            color="primary"
          ></Typography>
        </CardContent>
        <CardActions data-aos="fade-down" data-aos-once>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>

      <Typography
        variant="h2"
        sx={{
          height: "100vh",
        }}
        data-aos="fade-down"
        data-aos-once
        mt={10}
      >
        Hi There
      </Typography>
    </Container>
  );
};
