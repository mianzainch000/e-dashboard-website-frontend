import * as Yup from "yup";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import React, { useState } from "react";
import styles from "./styles.module.css";
import logo from "../../../Images/logo.png";
import { login } from "../../../api/endPoint";
import { useTranslation } from "react-i18next";
import TextInput from "../../../components/TextInput";
import { useSnackbar } from "../../../components/Snackbar";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useValidationSchemas } from "../../../components/Validation";
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
const Login = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const snackBarMessage = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { loginFormValidation } = useValidationSchemas(t);
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      postData(values);
    },
    validationSchema: loginFormValidation,
  });

  const postData = async (values) => {
    try {
      const data = {
        email: values.email,
        password: values.password,
      };
      const res = await login(data);
      if (res?.status === 201) {
        Cookies.set("token", res?.data?.token, { expires: 2 });

        snackBarMessage({
          type: "success",
          message: res?.data?.message,
          // message: t("LOGIN_SUCCESSFULLY"),
        });
        formik.handleReset();

        navigate("home/products");
      } else {
        snackBarMessage({
          type: "error",
          message: res?.data?.message,
          // message: t("INVALID_EMAIL_OR_PASSWORD"),
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
                  {t("LOGIN_FORM")}
                </Typography>
              </Grid>

              <Grid item xs={12} className={styles.centeredContainer}>
                <TextInput
                  label={t("EMAIL")}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  icon={
                    <IconButton edge="start">
                      <EmailRoundedIcon sx={{ color: "var(--text-dark)" }} />
                    </IconButton>
                  }
                />
                {formik.touched.email && formik.errors.email ? (
                  <Typography className={styles.error}>
                    {formik.errors.email}
                  </Typography>
                ) : null}
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
              <Grid item xs={12} className={styles.forgotPassword}>
                <NavLink to="auth/forgotPassword" variant="body2">
                  <Typography>{t("FORGOT_PASSWORD")}</Typography>
                </NavLink>
              </Grid>

              <Grid item xs={12} className={styles.centeredContainer}>
                <CustomButton
                  title={t("LOGIN")}
                  loading={loading}
                  type="submit"
                />
              </Grid>
              <Grid item>
                <NavLink to="auth/signup" variant="body2">
                  <Typography className={styles.alreadyAccount}>
                    {t("CREAT_Account")}
                  </Typography>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
