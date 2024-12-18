import * as Yup from "yup";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import React, { useState } from "react";
import styles from "./styles.module.css";
import logo from "../../../Images/logo.png";
import { useTranslation } from "react-i18next";
import { resetPassword } from "../../../api/endPoint";
import TextInput from "../../../components/TextInput";
import { useSnackbar } from "../../../components/Snackbar";
import CustomButton from "../../../components/CustomButton";
import { NavLink, useSearchParams } from "react-router-dom";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useValidationSchemas } from "../../../components/Validation";
import PasswordUpdateSuccess from "../../../components/PasswordUpdateSuccess";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  useMediaQuery,
  useTheme,
  IconButton,
  Grid,
  Box,
  Typography,
} from "@mui/material";

YupPassword(Yup);
const ResetPassword = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const snackBarMessage = useSnackbar();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [loading, setLoading] = useState(false);
  const { resetFormValidation } = useValidationSchemas(t);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      postData(values, token);
    },
    validationSchema: resetFormValidation,
  });

  const postData = async (values, token) => {
    setLoading(true);
    try {
      if (!token) {
        snackBarMessage({
          type: "error",
          message: t("INVALID_OR_MISSING_TOKEN"),
        });
        return;
      }

      const data = {
        newPassword: values.password,
      };

      const res = await resetPassword(data, token);
      if (res?.status === 201) {
        setSuccessMessage(res?.data.message);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        // snackBarMessage({
        //   type: "success",
        //   message: res?.data?.message,
        // });
        formik.handleReset();
      } else {
        snackBarMessage({
          type: "error",
          message: res?.data?.message,
        });
      }
    } catch (error) {
      snackBarMessage({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container lg={12}>
      <Grid lg={6} md={6} sm={6} xs={12}>
        {!isMobile && (
          <img
            alt="logo"
            src={logo}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </Grid>

      <Grid lg={6} md={6} sm={6} xs={12}>
        <Box
          sx={{
            height: {
              lg: "85vh",
              md: "80vh",
              sm: "80vh",
              xs: "100vh",
            },
          }}
          className={styles.centeredContainer}
        >
          {successMessage ? (
            <PasswordUpdateSuccess />
          ) : (
            <Box
              component="form"
              sx={{
                width: "100%",
                overflowY: "auto",
              }}
              className={styles.centeredContainer}
              onSubmit={formik.handleSubmit}
            >
              {isMobile && (
                <img
                  alt="logo"
                  src={logo}
                  style={{
                    width: "30%",
                    height: "100px",
                    marginTop: "20px",
                  }}
                />
              )}

              <Grid
                container
                spacing={2}
                sx={{ marginTop: "10px", overflowY: "auto" }}
                xs={12}
              >
                <Grid item xs={12} className={styles.centeredContainer}>
                  <Typography
                    color={"--text-dark"}
                    fontSize={"20px"}
                    fontWeight={"bolder"}
                  >
                    {t("RESET_PASSWORD")}
                  </Typography>
                </Grid>

                <Grid item xs={12} className={styles.centeredContainer}>
                  <TextInput
                    name="password"
                    label={t("PASSWORD")}
                    type={showPassword ? "text" : "password"}
                    icon={
                      <IconButton edge="start">
                        <LockRoundedIcon sx={{ color: "var(--text-dark)" }} />
                      </IconButton>
                    }
                    endIcon={
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon
                            sx={{ color: "var(--text-dark)" }}
                          />
                        ) : (
                          <VisibilityOffOutlinedIcon
                            sx={{ color: "var(--text-dark)" }}
                          />
                        )}
                      </IconButton>
                    }
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <Typography className={styles.error}>
                      {formik.errors.password}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={12} className={styles.centeredContainer}>
                  <TextInput
                    name="confirmPassword"
                    label={t("CONFIRM_PASSWORD")}
                    type={showConfirmPassword ? "text" : "password"}
                    icon={
                      <IconButton edge="start">
                        <LockRoundedIcon sx={{ color: "var(--text-dark)" }} />
                      </IconButton>
                    }
                    endIcon={
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOutlinedIcon
                            sx={{ color: "var(--text-dark)" }}
                          />
                        ) : (
                          <VisibilityOffOutlinedIcon
                            sx={{ color: "var(--text-dark)" }}
                          />
                        )}
                      </IconButton>
                    }
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <Typography className={styles.error}>
                      {formik.errors.confirmPassword}
                    </Typography>
                  ) : null}
                </Grid>

                <Grid item xs={12} className={styles.centeredContainer}>
                  <CustomButton
                    title={t("RESET_PASSWORD")}
                    loading={loading}
                    type="submit"
                  />
                </Grid>
                <Grid item>
                  <NavLink to="/" variant="body2">
                    <Typography className={styles.goBackToLogin}>
                      {t("GO_BACK_TO_LOGIN")}
                    </Typography>
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
