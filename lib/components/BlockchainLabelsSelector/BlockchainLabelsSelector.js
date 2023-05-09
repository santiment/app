const _excluded = ["labels"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo, useState } from 'react';
import cx from 'classnames';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Panel from '@santiment-network/ui/Panel';
import { InputWithIcon } from '@santiment-network/ui/Input';
import Item from '../../ducks/Watchlists/Widgets/Filter/EntryPoint/Item';
import { getBlockchainLabelReadable, useBlockchainLabels } from './hooks';
import Skeleton from '../Skeleton/Skeleton';
import styles from './BlockchainLabelsSelector.module.css';

const LabelItem = ({
  label,
  addItemInState,
  selected
}) => {
  return /*#__PURE__*/React.createElement(Item, {
    key: label,
    className: styles.item,
    onClick: () => {
      addItemInState(label);
    },
    isActive: selected,
    name: getBlockchainLabelReadable(label),
    id: label
  });
};

const DefaultTrigger = _ref => {
  let {
    labels
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", _extends({
    className: styles.trigger
  }, rest), "Select labels ", labels.length > 0 ? `(${labels.length})` : '');
};

const BlockchainLabelsSelector = ({
  onChange,
  value,
  trigger: Trigger = DefaultTrigger
}) => {
  const {
    data: labels,
    loading
  } = useBlockchainLabels();
  const [searchTerm, setSearchTerm] = useState('');

  function onChangeSearch(e) {
    setSearchTerm(e.target.value);
  }

  function addItemInState(label) {
    const found = value.find(l => l === label);

    if (found) {
      onChange(value.filter(l => l !== label));
    } else {
      onChange([...value, label]);
    }
  }

  function filterBySearch(list) {
    if (!searchTerm) {
      return list;
    }

    const term = searchTerm.toLowerCase();
    return list.filter(label => label.indexOf(term) !== -1 || getBlockchainLabelReadable(label).indexOf(term) !== -1);
  }

  const selectedLabels = useMemo(() => {
    return filterBySearch(value);
  }, [value, searchTerm]);
  const selectableLabels = useMemo(() => {
    const cache = new Set(selectedLabels);
    return filterBySearch(labels.filter(s => !cache.has(s)));
  }, [selectedLabels, labels, searchTerm]);
  const countSelected = selectedLabels.length;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(ContextMenu, {
    passOpenStateAs: "data-isactive",
    position: "bottom",
    align: "start",
    className: styles.dropdown,
    trigger: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Trigger, {
      labels: value
    }))
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement(InputWithIcon, {
    type: "text",
    icon: "search-small",
    iconPosition: "left",
    onChange: onChangeSearch,
    defaultValue: searchTerm,
    className: styles.search,
    placeholder: "Type to search"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    repeat: 1,
    className: styles.skeleton,
    show: loading
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.scroller
  }, countSelected > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Active labels"), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.list, styles.noMargin)
  }, selectedLabels.map(l => {
    return /*#__PURE__*/React.createElement(LabelItem, {
      key: l,
      label: l,
      addItemInState: addItemInState,
      selected: true
    });
  }))), selectableLabels.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Choose more labels"), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.list, styles.noMargin)
  }, selectableLabels.map(l => {
    return /*#__PURE__*/React.createElement(LabelItem, {
      key: l,
      label: l,
      addItemInState: addItemInState,
      selected: false
    });
  }))))))));
};

export default BlockchainLabelsSelector;