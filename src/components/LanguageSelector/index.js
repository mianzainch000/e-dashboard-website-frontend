import Cookies from "js-cookie";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // On component mount, check if a language is saved in cookies
  useEffect(() => {
    const savedLanguage = Cookies.get("language") || "en"; // Default to 'en' if no language is saved
    setSelectedLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage); // Change language using i18n
  }, [i18n]);

  // Language Button Click Handler for Dropdown
  const handleLanguageButtonClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  // Language Menu Close Handler
  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  // Unified Language Change Handler for Dropdown
  const handleLanguageChange = (newLanguage) => {
    i18n.changeLanguage(newLanguage); // Change language using i18n
    setSelectedLanguage(newLanguage);
    Cookies.set("language", newLanguage, { expires: 365 }); // Set cookie to expire in one year
    handleLanguageMenuClose();
  };

  // Mobile Radio Button Change Handler
  const handleRadioChange = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage); // Change language using i18n
    setSelectedLanguage(newLanguage);
    Cookies.set("language", newLanguage, { expires: 365 }); // Save the language in cookies for one year
  };

  return (
    <>
      {isMobile ? (
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={selectedLanguage}
            onChange={handleRadioChange} // Use the RadioChange handler here
          >
            <FormControlLabel
              value="en"
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
                  English
                </Typography>
              }
            />
            <FormControlLabel
              value="de"
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
                  German
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
      ) : (
        <>
          <Button className={styles.button} onClick={handleLanguageButtonClick}>
            Language
          </Button>

          {/* Language Dropdown Menu */}
          <Menu
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={handleLanguageMenuClose}
            sx={{
              "& .MuiMenu-paper": {
                color: "var(--text-dark)",
                backgroundColor: "var(--text-light)",
              },
            }}
          >
            <MenuItem onClick={() => handleLanguageChange("en")}>
              English
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("de")}>
              German
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default LanguageSelector;
