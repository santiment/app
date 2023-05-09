import React from 'react';
import cx from 'classnames';
import Select from '@santiment-network/ui/Select/Select';
import styles from './FeedSorters.module.css';
import './../../../components/formik-santiment-ui/FormikSelect.scss';
import './FeedSortersCustom.scss';
export const DATETIME_SORT = {
  label: 'Newest',
  type: 'DATETIME'
};
export const VOTES_SORT = {
  label: 'Popular',
  type: 'VOTES'
};
export const COMMENTS_SORT = {
  label: 'Comments',
  type: 'COMMENTS'
};
export const FILTER_OPTIONS = [DATETIME_SORT, VOTES_SORT // COMMENTS_SORT, #GarageInc: temporary removed before backend San-7187
];

const FeedSorters = ({
  sortType,
  onChangeSort,
  className
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.select, 'filters-sorters')
  }, /*#__PURE__*/React.createElement(Select, {
    clearable: false,
    value: sortType,
    options: FILTER_OPTIONS,
    onChange: value => {
      onChangeSort && onChangeSort(value);
    }
  })));
};

export default FeedSorters;