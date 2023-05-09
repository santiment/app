const _excluded = ["name", "origin", "className", "forwardedRef"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo, useState } from 'react';
import cx from 'classnames';
import Tooltip from '@santiment-network/ui/Tooltip';
import Icon from '@santiment-network/ui/Icon';
import { useAddressLabels } from '../hooks';
import styles from './Labels.module.css'; // eslint-disable-next-line

const WriteLabel = ({
  name = ''
}) => {
  const [value, setValue] = useState(name);
  const [isFocused, setIsFocused] = useState();

  function onInput({
    target
  }) {
    setValue(target.textContent);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.label, styles.write, isFocused && styles.write_focused, !value && styles.empty)
  }, /*#__PURE__*/React.createElement("div", {
    contentEditable: true,
    className: cx(styles.input),
    value: value,
    onInput: onInput,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.close
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "close-small"
  })));
}; // eslint-disable-next-line


const NewLabel = () => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.label, styles.new)
}, /*#__PURE__*/React.createElement(Icon, {
  type: "plus"
}));

export const Label = _ref => {
  let {
    name,
    origin,
    className,
    forwardedRef
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", _extends({}, props, {
    key: name,
    className: cx(styles.label, className, origin === 'santiment' && styles.san),
    ref: forwardedRef
  }), name);
};
export const CollapsedTooltip = props => /*#__PURE__*/React.createElement(Tooltip, _extends({}, props, {
  on: "click",
  className: styles.collapsed__tooltip
}));
export const CollapsedLabels = ({
  labels,
  el: El = Label
}) => /*#__PURE__*/React.createElement(CollapsedTooltip, {
  on: "click",
  className: styles.collapsed__tooltip,
  trigger: /*#__PURE__*/React.createElement(El, {
    className: styles.collapsed,
    name: `+${labels.length}`,
    origin: "santiment"
  })
}, labels.map(El));

const labelsSorter = (a, b) => a.name.localeCompare(b.name);

const Labels = ({
  settings,
  showCount = 5
}) => {
  const labels = useAddressLabels(settings);
  const sorted = useMemo(() => {
    return labels.sort(labelsSorter);
  }, [labels]);
  const visibleLabels = sorted.slice(0, showCount);
  const hiddenLabels = sorted.slice(showCount);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, visibleLabels.map(Label), !!hiddenLabels.length && /*#__PURE__*/React.createElement(CollapsedLabels, {
    labels: hiddenLabels
  }));
};

export default Labels;