import React, { useState } from 'react'

import AlertModal from './AlertModal/AlertModal'

const AlertModalMaster = ({ triggerButtonParams }) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false)
  }

  const handleOpenAlertModal = () => {
    setIsAlertModalOpen(true)
  }

  return (
    <AlertModal
      defaultIsOpen={true}
      isOpen={isAlertModalOpen}
      handleClose={handleCloseAlertModal}
      handleOpen={handleOpenAlertModal}
      triggerButtonParams={triggerButtonParams}
    />
  )
}

export default AlertModalMaster
