function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../../../apollo';
import { FluidSkeleton as Skeleton } from '../../../../components/Skeleton';
import styles from './Recent.module.css';

const getData = ({
  data
}) => data.item;

export const getItemBuilder = query => id => client.query({
  query,
  variables: {
    id
  }
}).then(getData).catch(console.warn);

const Row = props => /*#__PURE__*/React.createElement(Link, _extends({}, props, {
  className: styles.row
}));

export const Column = props => /*#__PURE__*/React.createElement("div", _extends({}, props, {
  className: styles.column
}));

const Recent = ({
  title,
  rightHeader,
  ids,
  getItem,
  getLink,
  Item,
  setHeight
}) => {
  const [items, setItems] = useState(ids);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (items && items.length && !isLoading) {
      setHeight && setHeight(items.length);
    }
  }, [items, isLoading]);
  useEffect(() => {
    Promise.all(ids.map(getItem)).then(items => {
      setItems(items.flat().filter(Boolean));
      setIsLoading(false);
    });
  }, [ids]);
  if (!isLoading && items.length === 0) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, title && /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title), /*#__PURE__*/React.createElement("div", {
    className: styles.headers
  }, /*#__PURE__*/React.createElement("div", null, "Name"), /*#__PURE__*/React.createElement("div", null, rightHeader)), /*#__PURE__*/React.createElement("div", {
    className: styles.rows
  }, items.map((item, i) => /*#__PURE__*/React.createElement(Row, {
    key: i,
    to: getLink(item)
  }, Item(item))), /*#__PURE__*/React.createElement(Skeleton, {
    show: isLoading,
    className: styles.skeleton
  })));
};

export default Recent;