const _excluded = ["render", "children"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
export const Case = _ref => {
  let {
    render: El,
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return El ? /*#__PURE__*/React.createElement(El, props) : children;
};

const Switch = ({
  case: id,
  children
}) => {
  const childrenArray = React.Children.toArray(children);

  for (let i = 0; i < childrenArray.length; i++) {
    const child = childrenArray[i];
    const {
      of
    } = child.props;

    if (process.env.NODE_ENV === 'development') {
      if (child.type !== Case) {
        throw new Error(`<Switch> should contain only <Case> elements as children, but you passed a <${child.type.name || child.type}>`);
      }
    }

    if (!of || of === id) {
      return child;
    }
  }

  return null;
};

export default Switch;