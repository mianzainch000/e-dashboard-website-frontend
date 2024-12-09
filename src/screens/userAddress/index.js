import { useFormik } from "formik";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { UserAdress } from "../../api/endPoint";
import TextInput from "../../components/TextInput";
import { Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from "../../components/Snackbar";
import CustomButton from "../../components/CustomButton";
import { useValidationSchemas } from "../../components/Validation";

const AddressPage = () => {
  const { t } = useTranslation();
  const snackBarMessage = useSnackbar();
  const { userAddressValidation } = useValidationSchemas(t);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },

    onSubmit: (values) => {
      setLoading(true);
      postData(values);
    },
    validationSchema: userAddressValidation,
  });
  const postData = async (values) => {
    try {
      const data = {
        name: values.name,
        phoneNumber: values.phone,
        city: values.city,
        zipCode: values.zipCode,
      };
      const res = await UserAdress(data);
      if (res?.status === 201) {
        snackBarMessage({
          type: "success",
          message: res?.data?.message,
        });
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
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign={"center"}
        color="var(--text-dark)"
      >
        {t("MANAGE_ADDRESS")}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={styles.centeredContainer}>
            <TextInput
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            {formik.touched.name && formik.errors.name ? (
              <Typography className={styles.error}>
                {formik.errors.name}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6} className={styles.centeredContainer}>
            <TextInput
              fullWidth
              label="Phone Number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <Typography className={styles.error}>
                {formik.errors.phone}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} className={styles.centeredContainer}>
            <TextInput
              fullWidth
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              multiline
              rows={3}
              sx={{
                width: "95%",
                "& fieldset": {
                  borderWidth: "1px !important",
                  borderColor:
                    formik.touched.address && formik.errors.address
                      ? "var(--error-color) !important"
                      : "var(--text-dark) !important",
                },
                "& .MuiOutlinedInput-root": {
                  color: "var(--text-dark)",
                },
              }}
            />
            {formik.touched.address && formik.errors.address ? (
              <Typography className={styles.error}>
                {formik.errors.address}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6} className={styles.centeredContainer}>
            <TextInput
              fullWidth
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
            />
            {formik.touched.city && formik.errors.city ? (
              <Typography className={styles.error}>
                {formik.errors.city}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6} className={styles.centeredContainer}>
            <TextInput
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formik.values.postalCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.postalCode && Boolean(formik.errors.postalCode)
              }
            />
            {formik.touched.postalCode && formik.errors.postalCode ? (
              <Typography className={styles.error}>
                {formik.errors.postalCode}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} className={styles.centeredContainer}>
            <CustomButton
              title={t("SAVE_ADDRESS")}
              loading={loading}
              type="submit"
              width="50%"
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressPage;
