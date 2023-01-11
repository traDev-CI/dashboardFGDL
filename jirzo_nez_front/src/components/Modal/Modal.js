import React from "react";
import { Modal as Mantd } from "antd";

const Modal = ({ children, title, isVisible, setIsVisible }) => {
  return (
    <Mantd
      title={title}
      centered
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={false}
    >
      {children}
    </Mantd>
  );
};

export default Modal;
