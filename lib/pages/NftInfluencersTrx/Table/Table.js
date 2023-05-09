import React from 'react';
import cx from 'classnames';
import { FluidSkeleton as Skeleton } from '../../../components/Skeleton';
import TipPopup from '../../../components/EmptySection/Tip/TipPopup';
import Row from './Row/Row';
import { useNftQuery } from '../../Index/Section/NftInfluencers/hooks';
import styles from './Table.module.css';
export function formatKey({
  trxHash,
  datetime
}, idx) {
  return `${trxHash}-${datetime}-${idx}`;
}

const Table = () => {
  const {
    data,
    loading
  } = useNftQuery(0, 25);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !loading && /*#__PURE__*/React.createElement(TipPopup, null), /*#__PURE__*/React.createElement("div", {
    className: "column relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.header, 'fluid txt-m c-casper row v-center justify')
  }, /*#__PURE__*/React.createElement("span", null, "Twitter influencer"), /*#__PURE__*/React.createElement("span", null, "Activity"), /*#__PURE__*/React.createElement("span", {
    className: "txt-right"
  }, "When")), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.content, 'fluid column')
  }, !loading && data.map((trx, idx) => /*#__PURE__*/React.createElement(Row, {
    key: formatKey(trx, idx),
    data: trx
  })), /*#__PURE__*/React.createElement(Skeleton, {
    show: loading,
    className: styles.skeleton
  }))));
};

export default Table;