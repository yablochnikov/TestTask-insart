import React, { FC, useState, useEffect, useRef } from "react";
//store
import { useCurrencyStore } from "../../store/store";
//components
import {
  TableCellProps,
  TableCell,
  TextField,
  IconButton,
} from "@mui/material";
//images
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
//styles
import { InputStyles, TableCellStyles } from "./TableStyles";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

interface CustomTableCellProps extends TableCellProps {
  value: number | string;
  mode: "buy" | "sale";
  currency: string;
}

const CustomTableCell: FC<CustomTableCellProps> = ({
  value,
  mode,
  currency,
}) => {
  const { updateValue } = useCurrencyStore();
  const [valueFromApi] = useState(value);
  const [inputValue, setInputValue] = useState<number | string>(value);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    if (!isSaveDisabled) {
      setIsEditMode(false);
      updateValue(currency, mode, inputValue as string);
    }
  };

  const handleChangeTextData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    validateInput(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const validKeys = /^[0-9\b]+$/;
    if (!validKeys.test(e.key)) {
      e.preventDefault();
    }
  };

  const validateInput = (textData: string) => {
    const initialValue = parseFloat(valueFromApi as string);
    const editedFloatValue = parseFloat(textData);

    const minValue = initialValue - initialValue * 0.1;
    const maxValue = initialValue + initialValue * 0.1;

    if (
      isNaN(editedFloatValue) ||
      editedFloatValue < minValue ||
      editedFloatValue > maxValue
    ) {
      setIsSaveDisabled(true);
      setValidationError("Value must be within 10% of the original value.");
    } else {
      setIsSaveDisabled(false);
      setValidationError("");
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setInputValue(valueFromApi);
    setIsSaveDisabled(false);
    setValidationError("");
  };

  return (
    <>
      <TableCell
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={TableCellStyles}
        aria-label="table-cell"
      >
        <TextField
          aria-label="text-field"
          value={inputValue}
          onChange={handleChangeTextData}
          onKeyPress={handleKeyPress}
          sx={{
            ...InputStyles,
            "& input:disabled": {
              backgroundColor: "#f0f0f0",
              color: "#000",
              WebkitTextFillColor: "initial",
            },
          }}
          size="small"
          error={isSaveDisabled}
          inputMode="numeric"
          disabled={!isEditMode}
          inputRef={inputRef}
        />
        <div
          className="adornments"
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          {isHovered && !isEditMode && (
            <IconButton onClick={handleEditClick} aria-label="edit-button">
              <EditIcon color="primary" />
            </IconButton>
          )}
          {isEditMode && (
            <>
              <IconButton
                disabled={isSaveDisabled}
                onClick={handleSave}
                aria-label="save-button"
              >
                <CheckBoxIcon color={isSaveDisabled ? "inherit" : "success"} />
              </IconButton>
              <IconButton onClick={handleCancel} aria-label="cancel-button">
                <CancelIcon color="error" />
              </IconButton>
            </>
          )}
        </div>
      </TableCell>
      <CustomSnackbar
        open={isSaveDisabled}
        message={validationError}
        severity="error"
      />
    </>
  );
};

export default CustomTableCell;
