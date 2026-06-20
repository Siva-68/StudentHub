import Modal from "../Modal/Modal";
import Button from "../Button/Button";

function ConfirmDialog({
  isOpen,
  title = "Confirm",
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
    >
      <p>{message}</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Button
          text="Cancel"
          variant="primary"
          onClick={onCancel}
        />

        <Button
          text="Confirm"
          variant="danger"
          onClick={onConfirm}
        />
      </div>
    </Modal>
  );
}

export default ConfirmDialog;