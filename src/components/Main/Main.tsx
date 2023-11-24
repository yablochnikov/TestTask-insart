import { Box } from "@mui/material";
import React, { FC } from "react";
import Converter from "../Converter/Converter";
import ExchangeTable from "../ExchangeTable/ExchangeTable";

const Main: FC = () => {
  return (
    <Box component="main">
      <ExchangeTable />
      <Converter />
    </Box>
  );
};

export default Main;
