import { useFormik } from "formik";
import config from "../../api/config";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import TextInput from "../../components/TextInput";
import { useSnackbar } from "../../components/Snackbar";
import CustomButton from "../../components/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import UploadImageSection from "../../components/UploadImage";
import { useValidationSchemas } from "../../components/Validation";
import { Box, Button, Container, Typography } from "@mui/material";
import { getProductById, postProduct, updateProduct } from "../../api/endPoint";

const ProductForm = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const snackBarMessage = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { productFormValidation } = useValidationSchemas(t);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      stock: [],
      images: [],
    },
    validationSchema: productFormValidation,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);

      // Append each stock value to FormData (as strings)
      values.stock.forEach((stock) => {
        formData.append("stock", stock);
      });

      // Append each image to FormData
      values.images.forEach((image) => {
        if (image?.file) {
          formData.append("images", image.file);
        }
      });

      await postOrUpdateProduct(formData);
    },
  });

  const fetchProductDetails = async (productId) => {
    try {
      const res = await getProductById(productId);
      if (res.status === 201) {
        const productData = res.data;
        formik.setValues({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          stock: productData.stock || [],
          images:
            productData.image?.map((img) => ({
              url: `${config.baseURL}uploads/${img}`,
            })) || [],
        });
      } else {
        snackBarMessage({ type: "error", message: t("NO_PRODUCT_FOUND") });
      }
    } catch (error) {
      snackBarMessage({
        type: "error",
        message: t("FETCH_ERROR"),
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const postOrUpdateProduct = async (formData) => {
    try {
      const res = id
        ? await updateProduct(id, formData)
        : await postProduct(formData);
      if (res?.status === 201) {
        snackBarMessage({ type: "success", message: res?.data?.message });
        // snackBarMessage({
        //   type: "success",
        //   message: t("PRODUCT_ADDED_SUCCESSFULLY"),
        // });
        formik.resetForm({ values: { ...formik.initialValues, images: [] } });
      } else {
        snackBarMessage({ type: "success", message: res?.data?.message });
        // snackBarMessage({
        //   type: "success",
        //   message: t("PRODUCT_UPDATED_SUCCESSFULLY"),
        // });
        formik.resetForm({ values: { ...formik.initialValues, images: [] } });
        navigate("/addProduct");
      }
    } catch (error) {
      snackBarMessage({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = () => {
    formik.setFieldValue("images", [...formik.values.images, null]);
    formik.setFieldValue("stock", [...formik.values.stock, ""]); // Add stock value for new image
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formik.values.images.filter(
      (_, idx) => idx !== index
    );
    const updatedStock = formik.values.stock.filter((_, idx) => idx !== index);
    formik.setFieldValue("images", updatedImages);
    formik.setFieldValue("stock", updatedStock); // Remove the corresponding stock
  };

  const handleImageChange = (file, index) => {
    const updatedImages = [...formik.values.images];
    updatedImages[index] = { url: URL.createObjectURL(file), file };
    formik.setFieldValue("images", updatedImages);
  };

  const handleStockTextChange = (newStockValue, index) => {
    const updatedStock = [...formik.values.stock];
    updatedStock[index] = String(newStockValue); // Ensure it's a string for each image
    formik.setFieldValue("stock", updatedStock);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
          width: { xs: "100%", sm: "80%", md: "60%", lg: "500px" },
        }}
      >
        <Typography variant="h4" textAlign="center" sx={{ mb: 2 }}>
          {id ? t("UPDATE_PRODUCT") : t("ADD_PRODUCT")}
        </Typography>

        {/* Product Name */}
        <Box className={styles.centeredContainer}>
          <TextInput
            fullWidth
            id="name"
            name="name"
            autoComplete="off"
            label={t("PRODUCT_NAME")}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <Typography className={styles.error}>
              {formik.errors.name}
            </Typography>
          )}
        </Box>

        {/* Product Price */}
        <Box className={styles.centeredContainer}>
          <TextInput
            fullWidth
            id="price"
            name="price"
            label={t("PRICE")}
            type="number"
            autoComplete="off"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && (
            <Typography className={styles.error}>
              {formik.errors.price}
            </Typography>
          )}
        </Box>

        {/* Product Description */}
        <Box className={styles.centeredContainer}>
          <TextInput
            fullWidth
            id="description"
            name="description"
            label={t("DESCRIPTION")}
            autoComplete="off"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            multiline
            rows={4}
          />
          {formik.touched.description && formik.errors.description && (
            <Typography className={styles.error}>
              {formik.errors.description}
            </Typography>
          )}
        </Box>

        {/* Image Upload Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {formik.values.images.map((image, index) => (
            <UploadImageSection
              key={index}
              imageFile={image}
              onImageChange={(file) => handleImageChange(file, index)}
              onRemove={() => handleRemoveImage(index)}
              isEditable={!id}
              stockText={formik.values.stock[index] || ""} // Stock for each image
              onStockTextChange={(newStockValue) =>
                handleStockTextChange(newStockValue, index)
              }
            />
          ))}

          {!id && (
            <Button
              variant="contained"
              onClick={handleAddImage}
              className={styles.btn}
              sx={{ marginBottom: "10px", width: "90%" }}
            >
              {formik.values.images.length === 0
                ? t("UPLOAD_IMAGE")
                : t("ADD_MORE_IMAGE")}
            </Button>
          )}
        </Box>

        {formik.errors.images && formik.touched.images ? (
          <Typography className={styles.error}>
            {formik.errors.images}
          </Typography>
        ) : null}
        {formik.errors.stock && formik.touched.stock ? (
          <Typography className={styles.error}>
            {formik.errors.stock}
          </Typography>
        ) : null}

        {/* Submit Button */}
        <Box className={styles.centeredContainer}>
          <CustomButton
            title={id ? t("UPDATE_PRODUCT") : t("ADD_PRODUCT")}
            loading={loading}
            type="submit"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ProductForm;
