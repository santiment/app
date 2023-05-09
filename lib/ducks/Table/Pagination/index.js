import React, { useMemo, useState } from 'react';
import Icon from '@santiment-network/ui/Icon';
import Input from '@santiment-network/ui/Input';
import Button from '@santiment-network/ui/Button';
import Dropdown from '@santiment-network/ui/Dropdown';
import styles from './index.module.css';

function prepareOptions(options) {
  return options.map(option => ({
    content: `${option} rows`,
    index: option
  }));
}

const Pagination = ({
  pageSize,
  pageOptions,
  pageIndex,
  canNextPage,
  canPreviousPage,
  setPageSize,
  onGotoPage,
  previousPage: onPreviousPage,
  nextPage: onNextPage,
  onChangePage,
  pageSizeOptions,
  className
}) => {
  const [selected, setSelected] = useState({
    index: pageSize,
    content: `${pageSize} rows`
  });
  const preparedOptions = useMemo(() => prepareOptions(pageSizeOptions), [pageSizeOptions]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(Dropdown, {
    options: preparedOptions,
    selected: selected,
    onSelect: option => {
      setSelected(option);
      setPageSize(option.index);
    },
    classes: {
      wrapper: styles.dropdown,
      options: styles.options
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.totalPages
  }, "Page", /*#__PURE__*/React.createElement(Input, {
    type: "number",
    className: styles.input,
    style: {
      '--width': `${(pageIndex + 1).toString().length}ch`
    },
    value: pageIndex + 1,
    onChange: evt => {
      const newPage = evt.target.value ? Number(evt.target.value) - 1 : 0;
      onChangePage ? onChangePage(newPage) : onGotoPage(newPage);
    }
  }), "of ", pageOptions.length), /*#__PURE__*/React.createElement("div", {
    className: styles.buttons
  }, /*#__PURE__*/React.createElement(Button, {
    border: true,
    onClick: evt => onChangePage ? onChangePage(pageIndex - 1) : onPreviousPage(evt),
    disabled: !canPreviousPage,
    className: styles.button
  }, "Prev", /*#__PURE__*/React.createElement(Icon, {
    className: styles.prev,
    type: "arrow-left"
  })), /*#__PURE__*/React.createElement(Button, {
    border: true,
    onClick: evt => onChangePage ? onChangePage(pageIndex + 1) : onNextPage(evt),
    disabled: !canNextPage,
    className: styles.button
  }, /*#__PURE__*/React.createElement(Icon, {
    className: styles.next,
    type: "arrow-right"
  }), "Next"))));
};

export default Pagination;