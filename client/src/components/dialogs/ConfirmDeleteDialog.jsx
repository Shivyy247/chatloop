import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          bgcolor: "#111b21", // WhatsApp Dark Surface
          color: "#e9edef",
          borderRadius: "12px",
          padding: "0.5rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{ fontWeight: 700, fontSize: "1.3rem", color: "#e9edef" }}
      >
        Confirm Delete
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ color: "#8696a0", fontSize: "0.95rem" }}>
          Are you sure you want to delete this group chat? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ padding: "1rem" }}>
        <Button
          onClick={handleClose}
          sx={{
            color: "#8696a0",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
          }}
        >
          No, Cancel
        </Button>

        <Button
          onClick={deleteHandler}
          variant="contained"
          color="error"
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 700,
            px: "1.5rem",
            bgcolor: "#ef4444",
            "&:hover": { bgcolor: "#dc2626" },
          }}
        >
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
