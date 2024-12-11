import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import NightlightRoundRoundedIcon from "@mui/icons-material/NightlightRoundRounded";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";

const ThemeToggle = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    const savedTheme = Cookies.get("themes") || "light";
    setThemeMode(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = (event) => {
    const newTheme =
      event.target.value || (themeMode === "light" ? "dark" : "light");
    setThemeMode(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    Cookies.set("themes", newTheme, { expires: 365 });
  };

  return (
    <div>
      {isMobile ? (
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="theme"
            name="theme"
            value={themeMode}
            onChange={toggleTheme}
            sx={{ color: "var(--text-dark)" }}
          >
            <FormControlLabel
              value="light"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "var(--text-dark) !important",
                    },
                    color: "var(--text-dark)",
                  }}
                />
              }
              label={
                <Typography
                  sx={{ color: "var(--text-dark)", textTransform: "none" }}
                >
                  Light
                </Typography>
              }
            />
            <FormControlLabel
              value="dark"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "var(--text-dark) !important",
                    },
                    color: "var(--text-dark)",
                  }}
                />
              }
              label={
                <Typography
                  sx={{ color: "var(--text-dark)", textTransform: "none" }}
                >
                  Dark
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
      ) : (
        <Button onClick={toggleTheme}>
          {themeMode === "light" ? (
            <>
              <NightlightRoundRoundedIcon sx={{ color: "white" }} />
            </>
          ) : (
            <>
              <WbSunnyRoundedIcon sx={{ color: "white" }} />
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default ThemeToggle;
