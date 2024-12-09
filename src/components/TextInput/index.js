import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const TextInput = ({ icon, endIcon, InputProps, label, error, ...props }) => {
  return (
    <TextField
      autoComplete="off"
      sx={{
        "& fieldset": {
          borderWidth: error ? "1px !important" : "1px",
          borderColor: error
            ? "var(--error-color) !important"
            : "var(--text-dark) !important",
        },
        "&:hover fieldset": {
          borderWidth: error ? "1px !important" : "1px",
          borderColor: error
            ? "var(--error-color) !important"
            : "var(--text-dark) !important",
        },

        borderRadius: 2,
        width: "90%",
        backgroundColor: "var(--text-light)",
        color: "var(--text-dark)",
        "& .MuiOutlinedInput-root": {
          color: "var(--text-dark)",
        },
        "& .MuiInputBase-input": {
          backgroundColor: "var(--text-light)",
          color: "var(--text-dark)",
        },
      }}
      placeholder={label}
      {...props}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">{icon}</InputAdornment>
        ) : null,
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : null,
      }}
      variant="outlined"
    />
  );
};

export default TextInput;
