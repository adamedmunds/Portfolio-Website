import { Container } from "@mui/material";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <h1>Login Page</h1>
      <Container maxWidth="false"></Container>
      <Link to="/">Go Back</Link>
    </>
  );
};
