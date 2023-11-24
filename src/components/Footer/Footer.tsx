import { FC } from "react";
//components
import { AppBar, Container, Typography } from "@mui/material";
//styles
import { ContainerStyles, FooterStyles } from "./FooterStyles";

const Footer: FC = () => {
  return (
    <AppBar sx={FooterStyles} component="footer" position="static">
      <Container sx={ContainerStyles}>
        <Typography variant="body2" color="inherit" align="center">
          © 2023 All rights reserved.
        </Typography>
      </Container>
    </AppBar>
  );
};

export default Footer;
