import React from 'react';
import cx from 'classnames';
import Page from '../../ducks/Page';
import Table from './Table/Table';
import styles from './NftInfluencersTrx.module.css';

const NftInfluencersTrx = () => /*#__PURE__*/React.createElement(Page, {
  title: "NFT Influencers Trx",
  isCentered: true,
  isWithPadding: true,
  mainClassName: cx(styles.main, 'relative no-scrollbar')
}, /*#__PURE__*/React.createElement(Table, null));

export default NftInfluencersTrx;