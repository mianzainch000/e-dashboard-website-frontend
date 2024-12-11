import React from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography, Input } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const UploadImageSection = ({
  imageFile,
  onImageChange,
  onRemove,
  isEditable,
}) => {
  const { t } = useTranslation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <Box sx={{ position: "relative", marginBottom: "16px" }}>
      <label
        htmlFor={`upload-${imageFile?.url || "new"}`}
        style={{ cursor: "pointer" }}
      >
        <Box
          sx={{
            width: 160,
            height: 160,
            borderRadius: "16px",
            border: "2px dashed var(--text-dark)",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: imageFile
              ? "transparent"
              : "var(--background-light)",
          }}
        >
          {imageFile && imageFile.url ? (
            <img
              src={imageFile.url}
              alt="Uploaded"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <AddPhotoAlternateIcon
                sx={{ fontSize: 48, color: "var(--text-dark)" }}
              />
              <Typography
                variant="body2"
                sx={{ marginTop: 1, color: "var(--text-dark)" }}
              >
                {t("UPLOAD_IMAGE")}
              </Typography>
            </Box>
          )}
        </Box>
      </label>
      <Input
        type="file"
        id={`upload-${imageFile?.url || "new"}`}
        sx={{ display: "none" }}
        onChange={handleFileChange}
      />
      {isEditable && (
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "var(--text-dark)",
            "&:hover": {
              backgroundColor: "var(--text-dark)",
            },
            borderRadius: "50%",
          }}
          onClick={onRemove}
        >
          <CloseIcon sx={{ fontSize: 20, color: "var(--text-light)" }} />
        </IconButton>
      )}
    </Box>
  );
};

export default UploadImageSection;
