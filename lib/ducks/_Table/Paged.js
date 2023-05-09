const _excluded = ["controlsClassName", "stickyPageControls", "padding", "pageSizes", "defaultPage", "defaultPageSize", "items", "onPageChange"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Input from '@santiment-network/ui/Input';
import Button from '@santiment-network/ui/Button';
import Dropdown from '@santiment-network/ui/Dropdown';
import Table from './index';
import styles from './Paged.module.css';
const DROPDOWN_CLASSES = {
  wrapper: styles.dropdown,
  options: styles.options
};
export const buildPageSizes = sizes => sizes.map(index => ({
  index,
  content: `${index} rows`
}));

const PagedTable = _ref => {
  let {
    controlsClassName,
    stickyPageControls,
    padding,
    pageSizes,
    defaultPage,
    defaultPageSize,
    items,
    onPageChange
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const offset = page * pageSize;
  const pageItems = items.slice(offset, offset + pageSize);
  const maxPage = Math.ceil(items.length / pageSize);
  const isPrevPageDisabled = page < 1;
  const isNextPageDisabled = page >= maxPage - 1;

  function changePage(newPage) {
    if (newPage > -1 && newPage < maxPage) {
      setPage(newPage);
      if (onPageChange) onPageChange(newPage);
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Table, _extends({}, props, {
    items: pageItems,
    offset: offset
  })), maxPage > 1 && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.controls, stickyPageControls && styles.stickyPageControls, padding && styles.padding, controlsClassName)
  }, /*#__PURE__*/React.createElement(Dropdown, {
    options: pageSizes,
    selected: pageSize,
    onSelect: option => setPageSize(option.index),
    classes: DROPDOWN_CLASSES
  }), "Page", /*#__PURE__*/React.createElement(Input, {
    className: styles.input,
    type: "number",
    style: {
      '--width': `${(page + 1).toString().length}ch`
    },
    value: page + 1,
    onChange: ({
      target
    }) => changePage(target.value - 1)
  }), "of ", maxPage || 1, /*#__PURE__*/React.createElement(Button, {
    className: styles.prev,
    border: true,
    disabled: isPrevPageDisabled,
    onClick: () => changePage(page - 1)
  }, "Prev", /*#__PURE__*/React.createElement(Icon, {
    className: styles.prev__icon,
    type: "arrow-left"
  })), /*#__PURE__*/React.createElement(Button, {
    className: styles.next,
    border: true,
    disabled: isNextPageDisabled,
    onClick: () => changePage(page + 1)
  }, /*#__PURE__*/React.createElement(Icon, {
    className: styles.next__icon,
    type: "arrow-right"
  }), "Next")));
};

PagedTable.defaultProps = {
  defaultPage: 0,
  defaultPageSize: 20,
  pageSizes: buildPageSizes([10, 20, 50, 100]),
  items: []
};
export default PagedTable;