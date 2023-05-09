import React, { useState } from 'react';
import Button from '@santiment-network/ui/Button';
import Panel from '@santiment-network/ui/Panel';
import Input from '@santiment-network/ui/Input';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import { useDebounce } from '../../../../../../hooks';
import styles from './TimeRangeDropdown.module.css';

const TimeRangeDropdown = ({
  timeRange,
  timeRanges,
  withInput,
  onChange
}) => {
  const [open, setOpen] = useState(false);
  const onChangeDebounced = useDebounce(value => onChange(value), 500);
  return /*#__PURE__*/React.createElement(ContextMenu, {
    on: "click",
    trigger: /*#__PURE__*/React.createElement(Button, {
      className: styles.trigger,
      border: true,
      variant: "flat"
    }, timeRange),
    position: "bottom",
    align: "end",
    open: open,
    onClose: () => setOpen(false),
    onOpen: () => setOpen(true),
    className: styles.tooltip
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, timeRanges.map(item => /*#__PURE__*/React.createElement(Button, {
    key: item.type,
    variant: "ghost",
    fluid: true,
    className: styles.button,
    onClick: () => {
      onChange(item.type);
      setOpen(false);
    }
  }, item.label)), withInput && /*#__PURE__*/React.createElement("div", {
    className: styles.input__wrapper
  }, /*#__PURE__*/React.createElement(Input, {
    className: styles.input,
    onChange: ({
      currentTarget: {
        value
      }
    }) => {
      const transformedValue = isNaN(parseInt(value)) ? `1d` : `${parseInt(value)}d`;
      onChangeDebounced(transformedValue);
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: styles.input__badge
  }, "day(s)"))));
};

export default TimeRangeDropdown;