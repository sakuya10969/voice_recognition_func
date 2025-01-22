import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SuccessModal = ({ open, onClose }) => {
    const modalStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    height: 200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    position: "relative",
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography
                variant="h6"
                component="h2"
                textAlign="center"
                  >
                音声処理に成功しました
            </Typography>
            <CheckCircleIcon edge="end" size="large" color="success" sx={{ ml: 1, mb: 0.5 }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button 
                variant="contained"
                color="success"
                onClick={onClose}
                sx={{ fontSize: 16 }}
            >
                OK
            </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
