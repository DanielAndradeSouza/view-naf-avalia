import "../styles/ModalMessage.css";

interface AlertModalProps {
  message: string | null;
  onClose: () => void;
}

export default function AlertModal({ message, onClose }: AlertModalProps) {
  if (!message) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}
