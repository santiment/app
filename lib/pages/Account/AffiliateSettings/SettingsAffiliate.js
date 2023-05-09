import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import Settings from '../Settings';
import PageLoader from '../../../components/Loader/PageLoader';
import CreatePromoter from '../../../components/CreatePromoter/CreatePromoter';
import AffiliateStatistics from './AffiliateStatistics/AffiliateStatistics';
import PromotionLink from './PromotionLink/PromotionLink';
import { SHOW_PROMOTER_QUERY } from './promotersGql';
import styles from './SettingsAffiliate.module.css';

const SettingsAffiliate = ({
  isPromoter
}) => {
  const [settings, setSettings] = useState(null);

  if (!isPromoter && !settings) {
    return /*#__PURE__*/React.createElement(Settings, {
      id: "affiliate",
      header: "Referral link"
    }, /*#__PURE__*/React.createElement(CreatePromoter, {
      setData: setSettings
    }));
  }

  return /*#__PURE__*/React.createElement(Query, {
    query: SHOW_PROMOTER_QUERY,
    skip: !!settings
  }, ({
    data = {}
  }) => {
    const {
      loading,
      showPromoter
    } = data;

    if (showPromoter) {
      setSettings(showPromoter);
    }

    if (!settings || loading) {
      return /*#__PURE__*/React.createElement(PageLoader, {
        className: styles.loader
      });
    }

    const {
      promotions
    } = settings;
    return /*#__PURE__*/React.createElement("div", {
      className: styles.container
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.left
    }, /*#__PURE__*/React.createElement(Settings, {
      id: "affiliate",
      header: "Referral link"
    }, /*#__PURE__*/React.createElement(Settings.Row, null, /*#__PURE__*/React.createElement("div", {
      className: styles.block
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, "Your Sanbase referral link"), promotions.map(item => /*#__PURE__*/React.createElement(PromotionLink, {
      data: item,
      key: item.referralLink
    })))))), /*#__PURE__*/React.createElement("div", {
      className: styles.right
    }, /*#__PURE__*/React.createElement(Settings, {
      id: "affiliate-statistics",
      header: "Statistics",
      contentClassName: styles.statistics
    }, /*#__PURE__*/React.createElement(Settings.Row, {
      className: styles.statisticsSetting
    }, /*#__PURE__*/React.createElement(AffiliateStatistics, {
      promotions: promotions
    })))));
  });
};

const mapStateToProps = ({
  user: {
    data: {
      settings: {
        isPromoter
      } = {}
    } = {}
  }
}) => {
  return {
    isPromoter
  };
};

export default connect(mapStateToProps)(SettingsAffiliate);