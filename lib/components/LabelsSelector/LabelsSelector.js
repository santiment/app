import React, { useEffect, useMemo, useState } from 'react';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import { InputWithIcon as Input } from '@santiment-network/ui/Input';
import Panel from '@santiment-network/ui/Panel';
import Item from '../../ducks/Watchlists/Widgets/Filter/EntryPoint/Item';
import { DISABLED_PAIRS, HOLDERS_LABELS } from './utils';
import styles from './LabelSelector.module.css';
export const MAX_VISIBLE_SYMBOLS = 40;

const initialState = () => [];

const LabelsSelector = ({
  onChange
}) => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    if (onChange) {
      const labels = state.map(({
        type
      }) => type);
      onChange(labels.length > 0 ? labels : ['all']);
    }
  }, [state]);
  const shortInputState = useMemo(() => {
    const text = state.map(({
      label
    }) => label).join(', ');
    return text.length > MAX_VISIBLE_SYMBOLS ? text.slice(0, MAX_VISIBLE_SYMBOLS) + '...' : text;
  }, [state]);

  function addItemInState(item) {
    setState([...state, item]);
    const isInList = state.find(({
      type
    }) => type === item.type);
    setState(isInList ? state.filter(a => a.type !== item.type) : [item, ...state]);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(ContextMenu, {
    passOpenStateAs: "data-isactive",
    position: "bottom",
    align: "start",
    className: styles.dropdown,
    trigger: /*#__PURE__*/React.createElement(Input, {
      readOnly: true,
      className: styles.trigger__btn,
      iconClassName: styles.trigger__arrow,
      icon: "arrow-down",
      iconPosition: "right",
      value: shortInputState,
      placeholder: "Show all labels"
    })
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.scroller
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, HOLDERS_LABELS.map(item => {
    const {
      label,
      type
    } = item;
    const selected = state.find(({
      type: target
    }) => target === type);
    const isDisabled = state.find(({
      type: target
    }) => DISABLED_PAIRS[target] === type);
    return /*#__PURE__*/React.createElement(Item, {
      key: type,
      onClick: () => {
        addItemInState(item);
      },
      isDisabled: isDisabled,
      isActive: selected,
      name: label,
      id: type
    });
  })), state.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: styles.reset,
    onClick: () => setState([])
  }, "Reset to all"))))));
};

export default LabelsSelector;