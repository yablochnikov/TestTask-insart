import { FC, useState, useEffect } from "react";
//store
import { useCurrencyStore } from "../../store/store";
//types
import { ICurrency } from "../../types";
//components
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Container,
  IconButton,
} from "@mui/material";
//images
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { ContainerStyles } from "./ConverterStyles";

const Converter: FC = () => {
  const { currenciesData } = useCurrencyStore();

  const [amount, setAmount] = useState<number>(0);
  const [toCurrency, setToCurrency] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleSwap = () => {
    setFromCurrency((prevFromCurrency) => {
      setToCurrency((prevToCurrency) => prevFromCurrency);
      return toCurrency;
    });
  };

  const handleCalculate = () => {
    if (
      !fromCurrency ||
      !toCurrency ||
      isNaN(amount) ||
      amount <= 0 ||
      currenciesData.length === 0
    ) {
      setResult(null);
      return;
    }

    const fromRate =
      currenciesData.find((rate) => rate.ccy === toCurrency)?.buy ?? 1;
    const toRate =
      currenciesData.find((rate) => rate.ccy === fromCurrency)?.buy ?? 1;

    const convertedResult = (amount / Number(fromRate)) * Number(toRate);
    setResult(convertedResult);
  };

  useEffect(() => {
    handleCalculate();
  }, [fromCurrency, toCurrency, amount, currenciesData]);

  return (
    <Box>
      <Container sx={ContainerStyles}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          sx={{ minWidth: 120 }}
          inputProps={{ min: 0 }}
        />

        <FormControl
          sx={{ minWidth: 120 }}
          aria-labelledby="from-currency-label"
        >
          {/* Use aria-label on the div element */}
          <InputLabel id="from-currency-label" htmlFor="from-currency">
            Change
          </InputLabel>

          <Select
            labelId="from-currency"
            id="from-currency"
            name="from-currency"
            type="text"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value as string)}
            aria-label="select-change"
          >
            <MenuItem value="UAH">UAH</MenuItem>
            {currenciesData.map((currency: ICurrency, index: number) => (
              <MenuItem key={index} value={currency.ccy}>
                {currency.ccy}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton
          aria-label="swap-currencies"
          sx={{
            cursor: "pointer",
            fontSize: 30,
          }}
          onClick={handleSwap}
        >
          <SwapHorizIcon />
        </IconButton>

        <FormControl sx={{ minWidth: 120 }} aria-labelledby="to-currency-label">
          <InputLabel id="to-currency-label" htmlFor="to-currency">
            Get
          </InputLabel>

          <Select
            id="to-currency"
            aria-label="select-get"
            labelId="to-currency-label"
            value={fromCurrency}
            name="to-currency"
            type="text"
            onChange={(e) => setFromCurrency(e.target.value as string)}
          >
            <MenuItem value="UAH">UAH</MenuItem>
            {currenciesData.map((currency: ICurrency, index: number) => (
              <MenuItem key={index} value={currency.ccy}>
                {currency.ccy}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Result"
          value={result !== null ? result : ""}
          sx={{ minWidth: 120 }}
        />
      </Container>
    </Box>
  );
};

export default Converter;
