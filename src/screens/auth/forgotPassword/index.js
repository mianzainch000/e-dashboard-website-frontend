import * as Yup from "yup";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../../Images/logo.png";
import { useTranslation } from "react-i18next";
import TextInput from "../../../components/TextInput";
import { forgotPassword } from "../../../api/endPoint";
import { useSnackbar } from "../../../components/Snackbar";
import CustomButton from "../../../components/CustomButton";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useValidationSchemas } from "../../../components/Validation";
import {
  useMediaQuery,
  useTheme,
  IconButton,
  Grid,
  Box,
  Typography,
} from "@mui/material";

YupPassword(Yup);
const ForgotPassword = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const snackBarMessage = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { forgotFormValidation } = useValidationSchemas(t);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      postData(values);
    },
    validationSchema: forgotFormValidation,
  });

  const postData = async (values) => {
    try {
      const data = {
        email: values.email,
      };
      const res = await forgotPassword(data);
      if (res?.status === 201) {
        snackBarMessage({
          type: "success",
          message: res?.data?.message,
          // message: t("LOGIN_SUCCESSFULLY"),
        });
        formik.handleReset();
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
              className={styles.a}
            >
              <Grid item xs={12} className={styles.centeredContainer}>
                <Typography
                  color={"--text-dark"}
                  fontSize={"20px"}
                  fontWeight={"bolder"}
                >
                  {t("FORGOT_PASSWORD")}
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
                <CustomButton
                  title={t("VERIFY")}
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
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
