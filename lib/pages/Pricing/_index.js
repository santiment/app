import React from 'react';
import Twitter from '@santiment-network/ui/Twitter';
import Plans from './Plans/Plans';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import { useUser } from '../../stores/user';
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout';
import SpeakBlocks from './SpeakBlocks/SpeakBlocks';
import PricingFAQ from './PricingFAQ/PricingFAQ';
import Testimonials from '../../components/Testimonials';
import Companies from '../../pages/Pricing/Companies/Companies';
import { TwitterBg } from './TwitterFeedbacks/TwitterFeedbacks';
import twitterStyles from './twitter.module.css';
import styles from './index.module.css';

const TwitterFeed = () => /*#__PURE__*/React.createElement("div", {
  className: twitterStyles.container
}, /*#__PURE__*/React.createElement("div", {
  className: twitterStyles.header
}, /*#__PURE__*/React.createElement(TwitterBg, {
  className: twitterStyles.headerBg
}), /*#__PURE__*/React.createElement("div", {
  className: twitterStyles.title
}, /*#__PURE__*/React.createElement(TwitterBg, {
  className: twitterStyles.twitterBlue
}), "More reviews from Twitter")), /*#__PURE__*/React.createElement(Twitter, null));

const Header = ({
  trialDaysLeft
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.top
}, /*#__PURE__*/React.createElement("div", {
  className: styles.headerContent
}, /*#__PURE__*/React.createElement("h1", {
  className: styles.title
}, "Be ahead of the game in crypto"), /*#__PURE__*/React.createElement("h2", {
  className: styles.description
}, "Choose the plan which fits your needs and enjoy our premium metrics", trialDaysLeft && /*#__PURE__*/React.createElement("div", {
  className: styles.trial
}, "(", trialDaysLeft, " in your free trial)"))), /*#__PURE__*/React.createElement("div", {
  className: styles.img
}));

const Page = () => {
  const {
    user
  } = useUser();
  const {
    trialDaysLeft,
    isPro,
    isProPlus
  } = useUserSubscriptionStatus();
  const showConversion = !user || !isPro && !isProPlus;
  return /*#__PURE__*/React.createElement(DashboardLayout, {
    showResearchers: false
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.inner
  }, /*#__PURE__*/React.createElement(Header, {
    trialDaysLeft: trialDaysLeft
  }), /*#__PURE__*/React.createElement(Plans, {
    id: "plans",
    classes: styles
  }), showConversion && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Companies, {
    header: /*#__PURE__*/React.createElement("div", {
      className: styles.companiesHeader
    }, "You are in good company")
  }), /*#__PURE__*/React.createElement(Testimonials, {
    slice: 3,
    wrapperClass: styles.testimonials
  }), /*#__PURE__*/React.createElement(TwitterFeed, null)), /*#__PURE__*/React.createElement(PricingFAQ, null), showConversion && /*#__PURE__*/React.createElement(SpeakBlocks, null)));
};

export default Page;