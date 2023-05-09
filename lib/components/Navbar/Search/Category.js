const _excluded = ["className", "As", "isCursored"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Category.module.css'; // eslint-disable-next-line

const Title = props => /*#__PURE__*/React.createElement("h3", _extends({
  className: styles.title
}, props));

export const Button = _ref => {
  let {
    className,
    As = Link,
    isCursored
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(As, _extends({}, props, {
    className: cx(styles.button, className, isCursored && styles.button_cursored)
  }));
};

const Category = ({
  className,
  title,
  titleKey = title,
  items,
  Item,
  cursor: {
    row: cursorRow,
    columnName
  },
  propsAccessor,
  isLoading,
  registerCursorColumn,
  onSuggestionSelect
}) => {
  const isCursoredColumn = columnName === titleKey;
  useEffect(() => registerCursorColumn(titleKey, items), [items]);
  useEffect(() => () => registerCursorColumn(titleKey, []), []);

  function buildItemMouseDownHandler(item) {
    return e => {
      e.preventDefault();
      onSuggestionSelect(e.currentTarget, item, titleKey);
    };
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.category, className)
  }, /*#__PURE__*/React.createElement(Title, null, title, isLoading && /*#__PURE__*/React.createElement("div", {
    className: styles.loader
  })), items.map((item, i) => /*#__PURE__*/React.createElement(Button, _extends({}, propsAccessor(item), {
    isCursored: isCursoredColumn && i === cursorRow,
    onClick: buildItemMouseDownHandler(item)
  }), /*#__PURE__*/React.createElement(Item, item))));
};

export default Category;