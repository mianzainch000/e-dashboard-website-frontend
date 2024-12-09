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
      images: [],
    },
    validationSchema: productFormValidation,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);

      // Image error display

      // Check if the images array has files
      if (!id) {
        if (
          values.images.length === 0 ||
          !values.images.some((image) => image.file)
        ) {
          return snackBarMessage({
            type: "error",
            message: "Atleast one image upload",
          });
        }
      }

      // Append each image file to FormData
      values.images.forEach((image) => {
        if (image?.file) {
          formData.append("images", image.file);
        }
      });

      await postOrUpdateProduct(formData);
    },
  });

  // Fetch product details if in edit mode
  const fetchProductDetails = async (productId) => {
    try {
      const res = await getProductById(productId);
      if (res.status === 201) {
        const productData = res.data;
        formik.setValues({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          images: productData.image?.map((img) => ({
            url: `${config.baseURL}uploads/${img}`,
          })),
        });
      } else {
        snackBarMessage({ type: "error", message: "Product not found" });
      }
    } catch (error) {
      snackBarMessage({
        type: "error",
        message: "Error fetching product details",
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
        formik.resetForm({ values: { ...formik.initialValues, images: [] } });
      } else {
        snackBarMessage({ type: "success", message: res?.data?.message });
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
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formik.values.images.filter(
      (_, idx) => idx !== index
    );
    formik.setFieldValue("images", updatedImages);
  };

  const handleImageChange = (file, index) => {
    const updatedImages = [...formik.values.images];
    updatedImages[index] = { url: URL.createObjectURL(file), file };
    formik.setFieldValue("images", updatedImages);
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
          {formik.touched.name && formik.errors.name ? (
            <Typography className={styles.error}>
              {formik.errors.name}
            </Typography>
          ) : (
            ""
          )}
        </Box>

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
          {formik.touched.price && formik.errors.price ? (
            <Typography className={styles.error}>
              {formik.errors.price}
            </Typography>
          ) : (
            ""
          )}
        </Box>

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
          {formik.touched.description && formik.errors.description ? (
            <Typography className={styles.error}>
              {formik.errors.description}
            </Typography>
          ) : (
            ""
          )}
        </Box>

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
              isEditable={!id} // Only allow remove if id is not present (adding product)
            />
          ))}

          {!id && ( // Only show the button in add mode
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
