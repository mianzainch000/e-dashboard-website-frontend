import { Snackbar, Slide, Alert } from "@mui/material";
import React, { useState, createContext, useContext } from "react";

const SnackbarContext = createContext();

const TransitionLeft = (props) => {
  return <Slide {...props} direction={"left"} />;
};

const TransitionRight = (props) => {
  return <Slide {...props} direction={"right"} />;
};

const TransitionUp = (props) => {
  return <Slide {...props} direction={"up"} />;
};

const TransitionDown = (props) => {
  return <Slide {...props} direction={"down"} />;
};

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(2000);
  const [severity, setSeverity] = useState("error");
  const [position, setPosition] = useState({
    vertical: "top",
    horizontal: "right",
  });
  const [animationDirection, setAnimationDirection] = useState("left");

  const showAlertMessage = ({
    message,
    type = "error",
    duration = 3000,
    animationDirection = "left",
    position = { vertical: "top", horizontal: "right" },
  }) => {
    setMessage(message);
    setSeverity(type);
    setDuration(duration);
    setPosition(position);
    setAnimationDirection(animationDirection);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={showAlertMessage}>
      {children}
      <Snackbar
        anchorOrigin={position}
        autoHideDuration={duration}
        open={open}
        onClose={handleClose}
        TransitionComponent={
          animationDirection === "left"
            ? TransitionLeft
            : animationDirection === "right"
            ? TransitionRight
            : animationDirection === "up"
            ? TransitionUp
            : TransitionDown
        }
      >
        <Alert variant="filled" onClose={handleClose} severity={severity}>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
