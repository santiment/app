import React, { useState } from 'react';
import cx from 'classnames';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Icon from '@santiment-network/ui/Icon';
import Dialog from '@santiment-network/ui/Dialog';
import { DesktopOnly, MobileOnly } from '../Responsive';
import styles from './Filter.module.css';

const FilterWrapper = ({
  children,
  dialogTitle = 'Filter',
  isMobile
}) => {
  const [isOpen, setOpen] = useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(ContextMenu, {
    position: "bottom",
    align: "end",
    className: styles.contextMenu,
    trigger: /*#__PURE__*/React.createElement("div", {
      className: cx(styles.trigger, isOpen && styles.openState)
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "filter",
      className: styles.iconFilter
    })),
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false)
  }, children)), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(Dialog, {
    open: isOpen,
    title: dialogTitle,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    trigger: /*#__PURE__*/React.createElement("div", {
      className: cx(styles.trigger, isOpen && styles.openState)
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "filter",
      className: styles.iconFilter
    })),
    classes: styles
  }, children, isMobile && /*#__PURE__*/React.createElement("div", {
    className: styles.btnWrapper
  }, /*#__PURE__*/React.createElement("button", {
    className: cx(styles.btn, 'btn-1 body-2 fluid row hv-center'),
    onClick: () => setOpen(false)
  }, "Apply filter")))));
};

export default FilterWrapper;