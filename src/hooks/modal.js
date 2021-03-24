import React, { useState } from 'react'

export function newModalController (name, Component) {
  const controller = {
    open: () => controller.setIsOpened(true),
    close: () => controller.setIsOpened(false),
    [name]: props => (
      <Component
        position='bottom'
        on='click'
        {...props}
        open={controller.isOpened}
        onOpen={controller.open}
        onClose={controller.close}
      />
    )
  }
  return controller
}

export function useControlledModal (modalController, isOpenedDefault) {
  const [isOpened, setIsOpened] = useState(isOpenedDefault)
  const controller = useState(modalController)[0]

  controller.isOpened = isOpened
  controller.setIsOpened = setIsOpened

  return controller
}
