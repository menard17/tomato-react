import React from "react";
import styles from "./modal.module.css";
import SubscribeForm from "../Form/Form";

interface ModalComponentProps {
  showModal: boolean;
  onClose: () => void;
}

interface SubscribeModalProps {
  showModal: boolean;
  currentEmail: string;
  onClose: () => void;
  handleAlertVisibility: (email: string) => void
}



const SubscribeModal: React.FC<SubscribeModalProps> = ({ showModal, onClose, handleAlertVisibility, currentEmail }) => {
  return (
    <div
      className={`modal`}
      id="staticBackdrop"
      tabIndex={-1}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className={`modal-header ` + styles.customModalHeader}>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body m-sm-1 p-sm-0 p-md-4 m-md-5">
            <div className="mb-5">
              <label>We'll let you know as soon as we're ready to ship</label>
            </div>
            <SubscribeForm currentEmail={currentEmail} handleAlertVisibility={handleAlertVisibility} onClose={onClose}/> 
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalOverlay: React.FC<ModalComponentProps> = ({
  showModal,
  onClose,
}) => {
  return (
    <div
      className={`modal-backdrop fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
      onClick={onClose}
    />
  );
};

export { SubscribeModal, ModalOverlay };
