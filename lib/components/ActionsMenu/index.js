const _excluded = ["children", "trigger", "Trigger", "onTriggerClick"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Panel from '@santiment-network/ui/Panel/Panel';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import { useControlledModal, newModalController } from '../../hooks/modal';
import styles from './index.module.css';

const Button = ({
  forwardedRef,
  children,
  Trigger,
  isOpened,
  open,
  onClick
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.btn,
  ref: forwardedRef
}, /*#__PURE__*/React.createElement(Trigger, {
  className: styles.trigger,
  onClick: onClick
}, children), /*#__PURE__*/React.createElement("div", {
  className: cx(styles.more, isOpened && styles.more_opened)
}, /*#__PURE__*/React.createElement(Icon, {
  type: "arrow-down",
  className: styles.arrow,
  onClick: open
})));

Button.defaultProps = {
  Trigger: 'div'
};
const actionsMenuController = newModalController('ActionsMenu', _ref => {
  let {
    children,
    trigger,
    Trigger,
    onTriggerClick
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    open: isOpened,
    onOpen
  } = props;
  return /*#__PURE__*/React.createElement(ContextMenu, _extends({
    align: "end"
  }, props, {
    trigger: /*#__PURE__*/React.createElement(Button, {
      Trigger: Trigger,
      isOpened: isOpened,
      open: onOpen,
      onClick: onTriggerClick
    }, trigger)
  }), /*#__PURE__*/React.createElement(Panel, {
    variant: "modal",
    className: styles.modal
  }, children));
});
export const useControlledActionsMenu = () => useControlledModal(actionsMenuController);

const ActionsMenu = props => {
  const Controller = useControlledActionsMenu().ActionsMenu;
  return /*#__PURE__*/React.createElement(Controller, props);
};

export default ActionsMenu;