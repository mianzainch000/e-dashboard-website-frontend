import Cookies from "js-cookie";
import { useState } from "react";
import logo from "../../Images/logo.png";
import ThemeToggle from "../ToogleTheme";
import DeleteModal from "../DeleteModal";
import styles from "./styles.module.css";
import { useSnackbar } from "../Snackbar";
import CustomButton from "../CustomButton";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LanguageSelector from "../LanguageSelector";
import { NavLink, useNavigate } from "react-router-dom";
import { Drawer, Box, Button, Grid, IconButton } from "@mui/material";

const DrawerComp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const snackBarMessage = useSnackbar();
  const isAuthenticated = !!Cookies.get("token");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      Cookies.remove("token");
      snackBarMessage({
        message: t("LOGOUT_SUCCESSFULLY"),
        type: "success",
      });
      navigate("/");
    } catch (error) {
      snackBarMessage({
        type: "error",
        message: "Logout Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </Box>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiPaper-root": {
            width: "100%",

            backgroundColor: "var(--text-light)",
          },
        }}
      >
        <Grid container sx={{ padding: "30px 5px" }}>
          <Grid md={10} xs={10}>
            <img src={logo} width={60} alt="Logo" />
          </Grid>

          <Grid md={1} xs={1}>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              className={styles.crossIcon}
            >
              <CloseIcon sx={{ color: "var(--text-light" }} />
            </IconButton>
          </Grid>
        </Grid>

        <Box className={styles.drawer}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {!isAuthenticated ? (
              <>
                <Button>
                  <LanguageSelector />
                </Button>
                <Button>
                  <ThemeToggle />
                </Button>
              </>
            ) : (
              <>
                <Button className={styles.button}>
                  <NavLink to="home/addProduct" className={styles.button}>
                    {t("ADD_PRODUCT")}
                  </NavLink>
                </Button>
                <Button className={styles.button}>
                  <NavLink to="home/products" className={styles.button}>
                    {t("PRODUCT")}
                  </NavLink>
                </Button>
                <Button className={styles.button}>
                  <NavLink to="home/addToCart" className={styles.button}>
                    {t("CART")}
                  </NavLink>
                </Button>
                <Button className={styles.button}>
                  <NavLink to="address/userAddress" className={styles.button}>
                    {t("ADDRESS")}
                  </NavLink>
                </Button>
                <Button>
                  <LanguageSelector />
                </Button>
                <Button>
                  <ThemeToggle />
                </Button>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CustomButton
                    loading={loading}
                    title={t("LOGOUT")}
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
        <DeleteModal
          open={modalOpen}
          title={t("LOGOUT")}
          cancel={t("CANCEL")}
          msg={t("ARE_YOUR_SURE_WANT_TO_LOGOUT")}
          onClose={() => setModalOpen(false)}
          onClick={handleLogout}
        />
      </Drawer>
    </Box>
  );
};

export default DrawerComp;
