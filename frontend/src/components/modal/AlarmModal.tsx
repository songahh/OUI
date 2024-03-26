import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";

function AlarmModal({ isOpen, closeModal }) {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Paper
        elevation={2}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          maxWidth: "100%",
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        <div>hihihi</div>
      </Paper>
    </Modal>
  );
}

export default AlarmModal;