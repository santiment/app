import React from 'react';
import { Link } from 'react-router-dom';
import { NFTINFLUENCERS_ANCHOR } from '../../Navigation/anchors';
import { Section, Container } from '../index';
import Table from './Table';
import { PATHS } from '../../../../paths';
import styles from './index.module.css';

const NftInfluencers = () => {
  return /*#__PURE__*/React.createElement(Section, {
    title: "NFT Influencers Trx",
    id: NFTINFLUENCERS_ANCHOR,
    className: styles.section
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.topLink
  }, "Start researching", ' ', /*#__PURE__*/React.createElement(Link, {
    to: PATHS.NFT_INFLUENCERS_TRX,
    className: styles.link
  }, "NFT Influencers Trx")), /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Table, null)));
};

export default NftInfluencers;