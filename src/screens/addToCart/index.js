import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { removeFromCart } from "../../redux/slice";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
  Box,
} from "@mui/material";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { cart } = useSelector((state) => state.allCart);

  const handleContinueShopping = () => {
    navigate("/home");
  };
  const handleAddAdress = () => {
    navigate("/address");
  };
  const handleDelete = (productId, productImage) => {
    dispatch(removeFromCart({ id: productId, image: productImage }));
  };

  // Calculate the total cart price
  const totalCartPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      spacing={4}
      sx={{ minHeight: "70vh", padding: 2 }}
    >
      {cart?.length > 0 ? (
        cart.map((cartItem) => {
          const itemTotalPrice = cartItem.price * cartItem.quantity;

          return (
            <Grid item xs={12} sm={6} md={4} key={cartItem.id}>
              <Card
                sx={{
                  padding: 2,
                  maxWidth: 320,
                  margin: "auto",
                  boxShadow: 3,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  color: "var(--text-dark)",
                  border: "1px solid var(--text-dark)",
                  transition: "transform 0.3s ease",
                  backgroundColor: "var(--text-light)",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 280,
                    borderRadius: 1,
                    objectFit: "cover",
                  }}
                  src={cartItem.image}
                  alt={cartItem.name || "Product Image"}
                />
                <CardContent sx={{ paddingTop: 2 }}>
                  <Typography variant="h6" gutterBottom textAlign="center">
                    {cartItem.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ marginTop: 1 }}
                    textAlign="center"
                  >
                    {t("QUANTITY")} : {cartItem.quantity}
                  </Typography>
                  <Typography variant="h6" gutterBottom textAlign="center">
                    {t("TOTAL_PRICE")}: {itemTotalPrice} Rs
                  </Typography>
                </CardContent>

                <Grid container spacing={2} sx={{ paddingBottom: 2 }}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        color="error"
                        variant="outlined"
                        sx={{ width: "50%", textTransform: "none" }}
                        onClick={() =>
                          handleDelete(cartItem.id, cartItem.image)
                        }
                      >
                        {t("DELETE")}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6" textAlign="center" color="var(--text-dark)">
            {t("YOUR_CART_IS_EMPTY")}
          </Typography>
        </Grid>
      )}

      {cart?.length > 0 && (
        <Grid item xs={12} textAlign="center" sx={{ marginTop: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {t("TOTAL_CART_PRICE")}: {totalCartPrice} Rs
          </Typography>
          <Button
            color="success"
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleContinueShopping}
          >
            {t("CONTINUE_SHOPPING")}
          </Button>
          <br />
          <br />
          <Button
            color="success"
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleAddAdress}
          >
            {t("ADDRESS")}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default CartPage;
