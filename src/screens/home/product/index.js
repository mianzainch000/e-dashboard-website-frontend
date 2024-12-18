import config from "../../../api/config";
import { NavLink } from "react-router-dom";
import logo from "../../../Images/logo.png";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import DeleteModal from "../../../components/DeleteModal";
import { useSnackbar } from "../../../components/Snackbar";
import { getProducts, deleteProduct } from "../../../api/endPoint";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";

const Home = () => {
  const { t } = useTranslation();
  const snackBarMessage = useSnackbar();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const getData = async () => {
    try {
      const res = await getProducts();
      if (res.status === 201) {
        setData(res?.data);
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

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setModalOpen(true);
  };

  const deleteProducts = async () => {
    try {
      const res = await deleteProduct(selectedProductId);
      if (res.status === 201) {
        setData((prevData) =>
          prevData.filter((product) => product._id !== selectedProductId)
        );
        snackBarMessage({
          type: "success",
          message: t("PRODUCT_DELETED_SUCCESSFULLY"),
        });
        setModalOpen(false);
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
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle drag end
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedData = Array.from(data);
    const [removed] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, removed);

    setData(reorderedData);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          minHeight: "80vh",
          alignItems: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : data.length > 0 ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="products" direction="horizontal">
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                  }}
                >
                  {data.map((product, index) => (
                    <Draggable
                      key={product._id}
                      draggableId={product._id}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            m: 2,
                            display: "flex",
                            width: "300px",
                            flexDirection: "column",
                            color: "var(--text-dark)",
                            border: "1px solid white",
                            transition: "transform 0.3s ease",
                            backgroundColor: "var(--text-light)",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                          key={product._id}
                        >
                          <CardMedia
                            component="img"
                            src={`${config.baseURL}uploads/${product.image[0]}`}
                            alt={product.name}
                            sx={{ height: 300 }}
                            onError={(e) => {
                              e.target.src = logo; // Set default logo image on error
                            }}
                          />
                          <CardContent>
                            <Typography variant="h4" textAlign="center">
                              {product.price} Rs
                            </Typography>

                            <Box
                              display="flex"
                              marginTop="20px"
                              justifyContent="center"
                              flexDirection={"column"}
                            >
                              <NavLink
                                to={{
                                  pathname: `/home/detail/${product._id}`,
                                }}
                              >
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  sx={{ width: "100%", textTransform: "none" }}
                                >
                                  {t("VIEW_DETAIL")}
                                </Button>
                              </NavLink>
                              <br />
                              <Button
                                color="error"
                                variant="outlined"
                                sx={{ width: "100%", textTransform: "none" }}
                                onClick={() => handleDeleteClick(product._id)}
                              >
                                {t("DELETE")}
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <Typography variant="h5" color="error">
            {t("NO_PRODUCT_FOUND")}
          </Typography>
        )}
      </Box>
      <DeleteModal
        open={modalOpen}
        title={t("DELETE_PRODUCT")}
        cancel={t("CANCEL")}
        msg={t("ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_PRODUCT?")}
        onClose={() => setModalOpen(false)}
        onClick={deleteProducts}
      />
    </>
  );
};

export default Home;
