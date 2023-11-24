import { FC } from "react";
//components
import { AppBar, Container } from "@mui/material";
//styles
import { HeaderStyles, ContainerStyles } from "./HeaderStyles";

const Header: FC = () => {
  return (
    <AppBar position="static" sx={HeaderStyles}>
      <Container sx={ContainerStyles}>
        <h1>Exchanger</h1>
      </Container>
    </AppBar>
  );
};

export default Header;
