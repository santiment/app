import React from 'react';
import cx from 'classnames';
import Panel from '@santiment-network/ui/Panel/Panel';
import Icon from '@santiment-network/ui/Icon';
import styles from '../HelpPopup.module.css';

const SecondQuestion = ({
  isOpen,
  onClick
}) => /*#__PURE__*/React.createElement(Panel, {
  padding: true,
  className: styles.block,
  onClick: onClick
}, /*#__PURE__*/React.createElement("div", {
  className: styles.header
}, /*#__PURE__*/React.createElement("h4", {
  className: styles.headingSmall
}, "How do I use the list?"), /*#__PURE__*/React.createElement(Icon, {
  type: "arrow-right-big",
  className: cx(styles.arrow, isOpen && styles.openedArrow)
})), isOpen && /*#__PURE__*/React.createElement("div", {
  className: styles.content
}, /*#__PURE__*/React.createElement("p", null, "Although it\u2019s still very new, we keep finding new ways that you can use our list to", ' ', /*#__PURE__*/React.createElement("b", null, "keep up with the crypto crowd or inform your trading decisions.")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "1. Get a 1-minute overview of the biggest (developing) stories in crypto")), /*#__PURE__*/React.createElement("p", null, "There\u2019s a lot of noise on crypto social media daily, and dozens of minor or irrelevant stories published on crypto news sites."), /*#__PURE__*/React.createElement("p", null, "Our list filters out this noise to only ", /*#__PURE__*/React.createElement("b", null, "show what sticks"), ", and eliminate topics and narratives that didn\u2019t get the crowd\u2019s attention. It crowns the \u2018social winners\u2019 and weeds out \u2018social losers\u2019 so you can ", /*#__PURE__*/React.createElement("b", null, "pinpoint"), " where the community focus lies at any point."), /*#__PURE__*/React.createElement("p", null, "Our list also often picks up on important stories that fly ", /*#__PURE__*/React.createElement("b", null, "under the radar"), " of major crypto publications."), /*#__PURE__*/React.createElement("p", null, "For example, when Afri Schoeden, one of Ethereum long-standing devs was accused of conflict of interest and denounced by the Ethereum community across major crypto subreddits, the story showed up on our list ", /*#__PURE__*/React.createElement("b", null, "days"), " before any news outlet reported on it. If you want to discover grassroots crypto narratives before they turn mainstream, bookmark our list ASAP."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "2. Spot local tops and hype peaks")), /*#__PURE__*/React.createElement("p", null, "In our experience so far, we found that a coin ticker\u2019s appearance on the list can be a fairly effective top indicator."), /*#__PURE__*/React.createElement("p", null, "If the coin is already in an uptrend, its presence on our Top 10 list might signal that a local top is nearing, as the hype around the coin reaches its peak."), /*#__PURE__*/React.createElement("p", null, "One of many examples is Waves, which topped our list back on December 19th, 2018, at exactly the time its price hit a 6-month high:"), /*#__PURE__*/React.createElement("img", {
  src: "https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/trends.png",
  alt: "Waves in trends page",
  className: styles.img
}), /*#__PURE__*/React.createElement("img", {
  src: "https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/top.png",
  alt: "Waves in project page",
  className: styles.img
}), /*#__PURE__*/React.createElement("p", null, "Soon after hitting \u2018peak hype\u2019, the price of Waves began trending downwards, and has failed to recapture that local top since:"), /*#__PURE__*/React.createElement("img", {
  src: "https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/chart.png",
  alt: "Waves in project page",
  className: styles.img
}), /*#__PURE__*/React.createElement("p", null, "One of our community members shared how he\u2019s already made our list a part of his swing trading strategy:"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("i", null, "\u201CThere were strong enough signals about LUN from my scanner to begin paying attention to Santiment dashboards on the 18th. On the 21st, Sanbase metrics offered a positive RR, so I entered there. Then, ", /*#__PURE__*/React.createElement("b", null, "late on the 22nd, LUN showed up on the Top 10 list"), ", so I started to seek an exit. It arrived late on the 23rd, as the crowd really started talking about LUN.\u201D")), /*#__PURE__*/React.createElement("img", {
  src: "https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/chart-and-arrows.png",
  alt: "Waves in project page",
  className: styles.img
}), /*#__PURE__*/React.createElement("p", null, "That said, ", /*#__PURE__*/React.createElement("b", null, "not every hype peak"), " (during an uptrend) = an impending price retraction. For example, the recent increase in mentions of RCN on crypto social media correlated to (what turned out to be) a first leg of a prolonged rally:"), /*#__PURE__*/React.createElement("img", {
  src: "https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/social.png",
  alt: "Waves in project page",
  className: styles.img
}), /*#__PURE__*/React.createElement("img", {
  src: "https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/trend-explore.png",
  alt: "Waves in project page",
  className: styles.img
}), /*#__PURE__*/React.createElement("p", null, "This is why it\u2019s always a good idea to combine our list with other indicators and do your own research to get a better idea of why the crowd has suddenly gained interest in a coin.")));

export default SecondQuestion;