import { FC } from "react";
//store
import { useCurrencyStore } from "../../store/store";
//components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Box,
} from "@mui/material";
import CustomTableCell from "./CustomTableCell";
//styles
import { TableCellStyles, TableStyles } from "./TableStyles";

const ExchangeRatesTable: FC = () => {
  const { currenciesData } = useCurrencyStore();

  return (
    <Box component="section">
      <Container>
        <Table className="table" sx={TableStyles}>
          <TableHead>
            <TableRow>
              <TableCell className="table__cell" sx={TableCellStyles}>
                Currency/Current Date
              </TableCell>
              <TableCell className="table__cell" sx={TableCellStyles}>
                Buy
              </TableCell>
              <TableCell className="table__cell" sx={TableCellStyles}>
                Sale
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currenciesData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={TableCellStyles}>
                  {`${row.ccy}/${row.base_ccy}`}
                </TableCell>
                <CustomTableCell
                  className="table__cell"
                  currency={row.ccy}
                  value={row.buy}
                  mode="buy"
                />
                <CustomTableCell
                  className="table__cell"
                  currency={row.ccy}
                  value={row.sale}
                  mode="sale"
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
};

export default ExchangeRatesTable;
