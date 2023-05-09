import React from 'react';
import chartImg from './../../assets/stories/platform_features/chart.png';
import mvrvImg from './../../assets/stories/platform_features/mvrv.png';
import mmaImg from './../../assets/stories/platform_features/mma.png';
import distroImg from './../../assets/stories/platform_features/distro.png';
import renTopsImg from './../../assets/stories/platform_features/ren.png';
import btcTacImg from './../../assets/stories/platform_features/btc_ta.png';
import email1 from './../../assets/stories/weekly_breif/image1.png';
import email2 from './../../assets/stories/weekly_breif/image2.png';
import email3 from './../../assets/stories/weekly_breif/image3.png';
import weeklySetting from './../../assets/stories/weekly_breif/image4.png';
import weeklyUpdatesImg from './../../assets/stories/platform_features/weekly.png';
export const stories = [{
  type: 'SLIDES',
  previewTitle: "Subscribe to Santiment's Weekly Market Briefs!",
  storyHeaderName: "Subscribe to Santiment's Weekly Market Briefs!",
  slides: [{
    image: email1,
    title: 'Want to know what hard data reveals about the crypto market?',
    description: 'We give the answers in our new Santiment Weekly Briefs - available only to Sanbase users!'
  }, {
    image: email2,
    description: 'Each week, the Santiment team shares the most interesting market findings and analyses, using a combination of reliable on-chain, social and development data'
  }, {
    image: email3,
    description: 'The Weekly Brief is for anyone that wants to truly understand market behavior, and how Santiment tools can make you a better trader or an informed crypto participant'
  }, {
    image: weeklySetting,
    description: 'Sign up to our Weekly Briefs in your Sanbase account settings by navigating to ‘Digest’ and selecting ‘Weekly’. See you in your inbox!',
    buttonLink: 'https://app.santiment.net/account#notifications',
    buttonText: 'Turn on "Weekly Brief"'
  }],
  createdAt: '2020-01-19T00:00:00Z'
}, {
  type: 'SLIDES',
  previewTitle: 'Platform features',
  storyHeaderName: 'Platform features',
  isTutorial: false,
  slides: [{
    description: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, "Santiment has over 120 different on-chain, social and development indicators - many of them 100% custom-built. But how exactly can you use them?"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, "Check out these use case articles, directly from the Santiment team.")),
    image: chartImg
  }, {
    image: mvrvImg,
    title: 'MVRV Difference',
    description: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, "Santiment CTO Valentin Mihov", ' ', /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      href: "https://insights.santiment.net/read/btc-long%2Fshort-mvrv-difference-indicates-an-end-of-the-bear-cycle-377"
    }, ' ', "explained"), ' ', "how our ", /*#__PURE__*/React.createElement("b", null, "MVRV Difference"), " metric may indicate an end of BTC\u2019s bear cycles."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("i", null, "P.S. note the date - when this article was published, BTC trailed at ~$5800. 1 week later, it skyrocketed to $8000", /*#__PURE__*/React.createElement("span", {
      role: "img",
      "aria-label": "looking"
    }, "\uD83D\uDC40")))
  }, {
    image: mmaImg,
    title: 'Maximal Mean Age and HODLer behavior',
    description: /*#__PURE__*/React.createElement(React.Fragment, null, "Santiment developer Tzanko Matev", ' ', /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      href: "https://insights.santiment.net/read/%F0%9F%93%A2-mean-age-653"
    }, "broke down"), ' ', "one of our newly-developed metrics: ", /*#__PURE__*/React.createElement("b", null, "Maximal Mean Age"), " and what it tells us about HODLer behavior.")
  }, {
    image: distroImg,
    title: 'Token Holder metrics',
    description: /*#__PURE__*/React.createElement(React.Fragment, null, "Santiment data scientist Jan Smirny", ' ', /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      href: "https://insights.santiment.net/read/token-distribution-ratio%3A-new-performance-indicator-for-crypto%3F-%5Bsantiment-analysis%5D-314"
    }, "backtested"), ' ', "our ", /*#__PURE__*/React.createElement("b", null, "Token Holder metrics"), " and found that distributed coins tend to outperform centralized coins - and HODLers - across the board.")
  }, {
    image: renTopsImg,
    title: 'On-chain and social indicators',
    isDarkImage: true,
    description: /*#__PURE__*/React.createElement(React.Fragment, null, "Dino Ibisbegovic", ' ', /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      href: "https://insights.santiment.net/read/6-ways-you-could-have-caught-ren%E2%80%99s-summer-tops-643"
    }, "wrote about"), ' ', /*#__PURE__*/React.createElement("b", null, "6 ways"), " that Sanbase metrics and tools could have helped you identify REN\u2019s summer tops, including anomalies in on-chain and social, and a bit of detective work to identify REN\u2019s market makers \uD83D\uDD75\uFE0F\u200D", /*#__PURE__*/React.createElement("span", {
      role: "img",
      "aria-label": "looking"
    }, "\u2642\uFE0F"))
  }, {
    image: btcTacImg,
    title: 'Token Age Consumed',
    description: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, "Maksim Balashevich", ' ', /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      href: "https://insights.santiment.net/read/btc-%22coin-days-destroyed%22-spiked.-volatility-is-coming.-672"
    }, "warned"), ' ', "that Bitcoin\u2019s Token Age Consumed chart suggests intense volatility is coming."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("i", null, "Since then, BTC dumped more than 6% to $7500 on October 23rd, before ballooning to $9850 just 3 days after."))
  }, {
    image: weeklyUpdatesImg,
    title: 'Want more insights like this?',
    description: /*#__PURE__*/React.createElement(React.Fragment, null, "You can find regular use cases for Santiment metrics on our daily", ' ', /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      href: "http://insights.santiment.net"
    }, "Community Insights"), ", or signing up to our team\u2019s Weekly Briefs, where we break down recent market events with our data!"),
    buttonLink: 'http://insights.santiment.net',
    buttonText: 'Community Insights'
  }],
  createdAt: '2020-01-19T00:00:00Z'
}];