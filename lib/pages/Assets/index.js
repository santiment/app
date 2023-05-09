import React from 'react';
import { Redirect } from 'react-router-dom';
import Section from '../Watchlists/Section';
import Page from '../../ducks/Page';
import Trends from '../../components/Trends/Trends';
import NftInfluencersTrxTable from '../NftInfluencersTrx/Table/MarketTable';
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched';
import FeaturedWatchlistCards from '../../ducks/Watchlists/Cards/Featured';
import styles from '../Watchlists/index.module.css';

const Assets = ({
  isDesktop
}) => {
  if (isDesktop) {
    return /*#__PURE__*/React.createElement(Redirect, {
      to: "/watchlists"
    });
  }

  return /*#__PURE__*/React.createElement(Page, {
    title: "Markets overview",
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(RecentlyWatched, {
    type: "assets"
  }), /*#__PURE__*/React.createElement(Section, {
    title: "Indices"
  }, /*#__PURE__*/React.createElement(FeaturedWatchlistCards, {
    className: styles.card
  })), /*#__PURE__*/React.createElement(Section, {
    title: "Social Trends",
    link: "/labs/trends/explore/"
  }, /*#__PURE__*/React.createElement(Trends, {
    className: styles.trends,
    isWithColumnTitles: false
  })), /*#__PURE__*/React.createElement(Section, {
    title: "Latest NFT Trx",
    link: "/nft"
  }, /*#__PURE__*/React.createElement(NftInfluencersTrxTable, null)));
};

export default Assets;