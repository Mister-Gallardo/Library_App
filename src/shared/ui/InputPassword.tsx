import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";

// Интерфейс для пропсов компонента
interface InputPasswordProps {
  label: string;
  error: boolean;
  helperText: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    { label, error, helperText, value, onChange, onBlur }: InputPasswordProps,
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    const handleMouseUpPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    return (
      <FormControl
        sx={{ width: "100%" }}
        variant="outlined"
        error={error}
      >
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput
          ref={ref} // Применяем ref
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
        {error && (
          <div style={{ color: "red", fontSize: "12px" }}>{helperText}</div>
        )}
      </FormControl>
    );
  }
);

export default InputPassword;
