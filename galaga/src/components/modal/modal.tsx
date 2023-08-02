import React, { MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode | React.ReactNodeArray | null | undefined;
  header: React.ReactNode | React.ReactNodeArray | null | undefined;
  width?: number | string;
  height?: number | string;
}

const Modal = ({
  isOpen,
  onClose,
  header,
  children,
  width,
  height,
}: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles["modal-overlay"]}>
      <div
        className={styles["modal-content"]}
        style={{
          width,
          height,
        }}
      >
        <div className={styles["modal-header"]}>
          {header}
          <button className={styles["modal-close"]} onClick={onClose}>
            X
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default Modal;
