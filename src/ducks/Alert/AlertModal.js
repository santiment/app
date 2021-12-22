import React, { useState } from "react";
import Dialog from "@santiment-network/ui/Dialog";
import LoginPopup from "../../components/banners/feature/PopupBanner";
import AlertTriggerButton from "./components/AlertTriggerButton/AlertTriggerButton";
import ConfirmClose from "./components/ConfirmClose/ConfirmClose";
import AlertModalFormMaster from "./AlertModalFormMaster";
import { useUser } from "../../stores/user";
import styles from "./AlertModal.module.scss";

const AlertModal = ({
  disabled,
  triggerButtonProps,
  modalTitle,
  defaultOpen
}) => {
  const { isLoggedIn } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  if (!isLoggedIn) {
    return (
      <LoginPopup>
        <AlertTriggerButton
          disabled={disabled}
          triggerButtonProps={triggerButtonProps}
        />
      </LoginPopup>
    );
  }

  return (
    <>
      <Dialog
        withAnimation
        title={modalTitle}
        defaultOpen={defaultOpen}
        open={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsClosing(true)}
        trigger={
          <AlertTriggerButton
            disabled={disabled}
            triggerButtonProps={triggerButtonProps}
          />
        }
        classes={{
          dialog: styles.dialog
        }}
      >
        <AlertModalFormMaster setIsModalOpen={setIsModalOpen} />
      </Dialog>
      <ConfirmClose
        isOpen={isClosing}
        onApprove={() => {
          setIsClosing(false);
          setIsModalOpen(false);
        }}
        onCancel={() => setIsClosing(false)}
      />
    </>
  );
};

AlertModal.defaultProps = {
  modalTitle: "Create alert for",
  disabled: false,
  defaultOpen: false
};

export default AlertModal;
