import * as Yup from "yup";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../../Images/logo.png";
import { signup } from "../../../api/endPoint";
import { useTranslation } from "react-i18next";
import TextInput from "../../../components/TextInput";
import { useSnackbar } from "../../../components/Snackbar";
import CustomButton from "../../../components/CustomButton";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useValidationSchemas } from "../../../components/Validation";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
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
const Signup = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const snackBarMessage = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { signupFormValidation } = useValidationSchemas();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      postData(values);
    },
    validationSchema: signupFormValidation,
  });
  const postData = async (values) => {
    try {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };
      const res = await signup(data);
      if (res?.status === 201) {
        snackBarMessage({
          type: "success",
          message: res?.data?.message,
          // message: t("ACCOUNT_CREATED_SUCCESSFULLY"),
        });
        formik.handleReset();
      } else {
        snackBarMessage({
          type: "error",
          message: res?.data?.message,
          // message: t("EMAIL_ALREADY_IN_USE"),
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
                <Typography color={""} fontSize={"20px"} fontWeight={"bolder"}>
                  {t("SIGNUP_FORM")}
                </Typography>
              </Grid>
              <Grid item xs={12} className={styles.centeredContainer}>
                <TextInput
                  label={t("FIRST_NAME")}
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  icon={
                    <IconButton edge="start">
                      <Person2RoundedIcon sx={{ color: "var(--text-dark)" }} />
                    </IconButton>
                  }
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <Typography className={styles.error}>
                    {formik.errors.firstName}
                  </Typography>
                ) : null}
              </Grid>

              <Grid item xs={12} className={styles.centeredContainer}>
                <TextInput
                  label={t("LAST_NAME")}
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  icon={
                    <IconButton edge="start">
                      <Person2RoundedIcon sx={{ color: "var(--text-dark)" }} />
                    </IconButton>
                  }
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <Typography className={styles.error}>
                    {formik.errors.lastName}
                  </Typography>
                ) : null}
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
                  title={t("SIGNUP")}
                  loading={loading}
                  type="submit"
                />
              </Grid>
              <Grid item>
                <NavLink to="/" variant="body2">
                  <Typography className={styles.alreadyAccount}>
                    {t("ALREADY_ACOOUNT")}
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

export default Signup;
