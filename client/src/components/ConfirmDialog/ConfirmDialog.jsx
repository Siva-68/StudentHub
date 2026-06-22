import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import "./ConfirmDialog.css";

function ConfirmDialog({
  isOpen,
  title = "Confirm Action",
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
      <p className="confirm-dialog-body">{message}</p>

      <div className="confirm-dialog-actions">
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