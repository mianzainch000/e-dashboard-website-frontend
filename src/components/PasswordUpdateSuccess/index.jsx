import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import { Box, Typography } from "@mui/material";

const PasswordUpdateSuccess = () => {
  return (
    <Box className={styles.container}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className={styles.successMessage}
      >
        <Box className={styles.circleWithTick}>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${styles.feather} ${styles.featherCheckCircle}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M9 11l3 3L22 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            />
          </motion.svg>
        </Box>
        <Typography variant="h2">Password Updated Successfully!</Typography>
      </motion.div>
    </Box>
  );
};

export default PasswordUpdateSuccess;
