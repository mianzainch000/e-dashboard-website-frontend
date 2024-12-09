import React from "react";
import styles from "./styles.module.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = ({ loading, title, onClick, width = "90%", ...props }) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      variant="contained"
      disableElevation
      className={styles.btn}
      sx={{ width }}
    >
      {title}
      {loading ? <CircularProgress className={styles.loading} /> : null}
    </Button>
  );
};

export default CustomButton;
