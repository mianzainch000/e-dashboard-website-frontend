import config from "../../api/config";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { getProductById } from "../../api/endPoint";
import { useSnackbar } from "../../components/Snackbar";
import { useParams, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

const ProductDetailCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const snackBarMessage = useSnackbar();
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const getData = async () => {
    try {
      const res = await getProductById(id);
      if (res.status === 201) {
        setProduct(res.data);
        setMainImage(
          res.data?.image?.length > 0
            ? `${config.baseURL}uploads/${res.data.image[0]}`
            : "/default-image.jpg"
        );
      } else {
        snackBarMessage({ type: "error", message: t("FETCH_ERROR") });
      }
    } catch (error) {
      snackBarMessage({
        type: "error",
        message: t("FETCH_ERROR"),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) {
    return (
      <Typography
        sx={{
          display: "flex",
          minHeight: "80vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "var(--text-dark)" }} />
      </Typography>
    );
  }

  if (!product) {
    return (
      <Typography
        variant="h5"
        color="error"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        {t("NO_PRODUCT_FOUND")}
      </Typography>
    );
  }

  const stockValue = product.stock[selectedImageIndex];

  const totalPrice = count * product.price;

  const handleIncrement = () => {
    if (count < stockValue) {
      setCount(count + 1);
    } else {
      snackBarMessage({
        type: "error",
        message: t("Stock not available"),
      });
    }
  };

  const handleImageSelect = (img, index) => {
    setMainImage(`${config.baseURL}uploads/${img}`);
    setSelectedImageIndex(index);
    setCount(0);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "70vh", padding: { xs: 2, sm: 4 } }}
    >
      <Card
        sx={{
          padding: 2,
          width: 1000,
          margin: "auto",
          display: "flex",
          maxWidth: "100%",
          color: "var(--text-dark)",
          border: "1px solid white",
          transition: "transform 0.3s ease",
          backgroundColor: "var(--text-light)",
          flexDirection: { xs: "column", sm: "row" },
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardMedia
          component="img"
          src={mainImage}
          alt={product.name || "Product Image"}
          sx={{
            width: { xs: "100%", sm: "30%" },
            height: { xs: 200, sm: 300 },
            objectFit: "cover",
          }}
        />
        <CardContent sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            {t("PRODUCT_NAME")}: {product.name}
          </Typography>
          <br />
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            {t("PRICE")}: {product.price} Rs
          </Typography>
          <br />
          <Typography variant="h5">
            {t("DESCRIPTION")}: {product.description}
          </Typography>
          <br />
          <Typography variant="h5">
            {t("STOCK")}: {stockValue}
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
            mt={2}
            gap={{ xs: 2, sm: 0 }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
              >
                -
              </Button>
              <Typography>{count}</Typography>
              <Button variant="outlined" size="small" onClick={handleIncrement}>
                +
              </Button>
            </Box>

            <Typography
              variant="h5"
              sx={{
                mt: { xs: 2, sm: "-50px", md: "-50px", lg: "-100px" },
                textAlign: "center",
              }}
            >
              {t("TOTAL_PRICE")}: {totalPrice} Rs
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1px",
            }}
          >
            <Button
              color="warning"
              variant="outlined"
              sx={{
                mt: { xs: 2, sm: 0 },
                textTransform: "none",
                width: { xs: "100%", sm: "30%" },
              }}
              onClick={() => navigate(`/addProduct/${id}`)}
            >
              {t("EDIT")}
            </Button>
          </Box>
          <Box
            display="flex"
            gap={2}
            mt={2}
            sx={{
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {product.image?.map((img, index) => (
              <CardMedia
                key={index}
                component="img"
                src={`${config.baseURL}uploads/${img}`}
                alt={`Product Image ${index + 1}`}
                sx={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  cursor: "pointer",
                  border: "2px solid transparent",
                  "&:hover": {
                    border: "2px solid var(--primary-color)",
                  },
                }}
                onClick={() => handleImageSelect(img, index)}
              />
            ))}
          </Box>

          <Button
            color="secondary"
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: 10000,
              padding: "10px 15px",
              textTransform: "none",
              width: { xs: "100%", sm: "50%" },
            }}
            onClick={() => {
              dispatch(
                addToCart({
                  ...product,
                  quantity: count,
                  image: mainImage,
                  id,
                })
              );
              snackBarMessage({
                type: "success",
                message: "Product added to cart successfully!",
              });
            }}
            startIcon={<AddShoppingCartIcon />}
          >
            {t("ADD_TO_CART")}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default ProductDetailCard;
