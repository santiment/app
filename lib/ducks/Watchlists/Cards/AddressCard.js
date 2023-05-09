function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Card from './Card';
import styles from './AddressCard.module.css';

const AddressCard = props => {
  const {
    listItems
  } = props.watchlist;
  const addressesCount = listItems.length;
  return /*#__PURE__*/React.createElement(Card, _extends({}, props, {
    classes: styles,
    middleChildren: addressesCount ? /*#__PURE__*/React.createElement(React.Fragment, null, addressesCount, /*#__PURE__*/React.createElement("div", {
      className: styles.address
    }, "address", addressesCount > 1 && 'es')) : /*#__PURE__*/React.createElement("div", {
      className: styles.address
    }, "No addresses")
  }));
};

AddressCard.defaultProps = {
  path: '/watchlist/addresses/'
};
export default AddressCard;