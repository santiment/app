import React from 'react';
import cx from 'classnames';
import { FluidSkeleton as Skeleton } from '../../../components/Skeleton';
import { Activity, getTwitterAccount } from '../../Index/Section/NftInfluencers/utils';
import { formatKey } from './Table';
import { useNftQuery } from '../../Index/Section/NftInfluencers/hooks';
import { capitalizeStr } from '../../../utils/utils';
import rowStyles from './Row/Row.module.css';
import styles from './Table.module.css';

const MarketTable = () => {
  const {
    data,
    loading
  } = useNftQuery(0, 5);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.content, styles.marketTable, 'fluid column relative')
  }, !loading && data.map((trx, idx) => {
    const {
      nft
    } = trx;
    const account = getTwitterAccount(trx);
    return /*#__PURE__*/React.createElement("div", {
      key: formatKey(trx, idx),
      className: cx(rowStyles.marketRow, 'fluid row v-center justify')
    }, /*#__PURE__*/React.createElement("span", {
      className: cx(rowStyles.influencer, rowStyles.account, 'body-2 single-line')
    }, account && `@${account.Name}`), /*#__PURE__*/React.createElement("div", {
      className: "row v-center"
    }, /*#__PURE__*/React.createElement(Activity, {
      onlyIcon: true,
      original: trx
    }), /*#__PURE__*/React.createElement("span", {
      className: cx(rowStyles.collection, 'mrg-s mrg--r single-line')
    }, capitalizeStr(nft.name))));
  }), /*#__PURE__*/React.createElement(Skeleton, {
    show: loading,
    className: cx(styles.skeleton, styles.skeletonMarket)
  }));
};

export default MarketTable;