import useSWR from "swr";
import { useEffect, useState } from "react";
import { fetcher } from "../../api";
import { useCurrencyStore } from "../../store/store";
//components
import { Header, Footer, Main } from "..";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//styles
import {
  AppStyles,
  ContainerStyles,
  ErrorStyles,
  LoaderStyles,
} from "./AppStyles";

const App = () => {
  const { currenciesData, setCurrenciesData } = useCurrencyStore();
  const { data, error, isLoading } = useSWR(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4",
    fetcher
  );
  let apiRequestCounter =
    Number(localStorage.getItem("apiRequestCounter")) || 0;
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isLoading) {
      apiRequestCounter++;
      localStorage.setItem("apiRequestCounter", apiRequestCounter.toString());

      if (apiRequestCounter % 5 === 0) {
        setErrorMessage("Server error. Please try again later.");
      }
    }
  }, []);

  useEffect(() => {
    if (apiRequestCounter % 5 === 0) {
      localStorage.removeItem("apiRequestCounter");
    }
  }, [apiRequestCounter]);

  useEffect(() => {
    if (data) {
      setCurrenciesData(data);
    }
  }, [data, error, setCurrenciesData]);

  return (
    <Box sx={AppStyles}>
      <Header />

      <Box sx={ContainerStyles}>
        {isLoading && (
          <Box sx={LoaderStyles}>
            <CircularProgress />
          </Box>
        )}
        {errorMessage && (
          <Box sx={ErrorStyles}>
            <p>{errorMessage}</p>
          </Box>
        )}
        {currenciesData && !errorMessage && <Main />}
      </Box>

      <Footer />
    </Box>
  );
};

export default App;
