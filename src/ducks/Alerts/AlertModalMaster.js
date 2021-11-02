import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import AlertModal from "./AlertModal/AlertModal";

const AlertModalMaster = ({ triggerButtonParams }) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      asset: {}
    },
    onSubmit(val) {
      console.log(val);
    },
    validateOnChange: false
  });

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  const handleFormValueChange = ({ field, value }) => {
    console.log(field)
    formik.setFieldValue(field, value, false);
  };

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  const handleOpenAlertModal = () => {
    setIsAlertModalOpen(true);
  };

  return (
    <AlertModal
      handleFormValueChange={handleFormValueChange}
      formValues={formik.values}
      defaultIsOpen={true}
      isOpen={isAlertModalOpen}
      handleClose={handleCloseAlertModal}
      handleOpen={handleOpenAlertModal}
      triggerButtonParams={triggerButtonParams}
    />
  );
};

export default AlertModalMaster;
