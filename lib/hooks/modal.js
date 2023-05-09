function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
export function newModalController(name, Component) {
  const controller = {
    open: () => controller.setIsOpened(true),
    close: () => controller.setIsOpened(false),
    [name]: props => /*#__PURE__*/React.createElement(Component, _extends({
      position: "bottom",
      on: "click"
    }, props, {
      open: controller.isOpened,
      onOpen: controller.open,
      onClose: controller.close
    }))
  };
  return controller;
}
export function useControlledModal(modalController, isOpenedDefault) {
  const [isOpened, setIsOpened] = useState(isOpenedDefault);
  const controller = useState(modalController)[0];
  controller.isOpened = isOpened;
  controller.setIsOpened = setIsOpened;
  return controller;
}