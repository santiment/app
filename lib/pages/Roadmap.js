import React from 'react';
import { Helmet } from 'react-helmet';
import { getOrigin } from './../utils/utils';
import './Roadmap.css';

const StatusItemWithProgress = ({
  text = '',
  progress = 100,
  child = false
}) => /*#__PURE__*/React.createElement("li", {
  style: {
    marginLeft: child ? 20 : 0
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "status-row embedded",
  id: "crypto-projects-item"
}, /*#__PURE__*/React.createElement("span", {
  className: "status-item"
}, text), /*#__PURE__*/React.createElement("span", {
  className: "status-container"
}, /*#__PURE__*/React.createElement("div", {
  className: "status-percent"
}, progress, "%"), /*#__PURE__*/React.createElement("div", {
  className: "status-border"
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: `${progress}%`
  },
  className: "status-progress"
})))));

const Roadmap = () => /*#__PURE__*/React.createElement("div", {
  className: "page roadmap"
}, /*#__PURE__*/React.createElement(Helmet, null, /*#__PURE__*/React.createElement("title", null, "Roadmap"), /*#__PURE__*/React.createElement("link", {
  rel: "canonical",
  href: `${getOrigin()}/roadmap`
})), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Sanbase Roadmap"), /*#__PURE__*/React.createElement("p", null, "Please see our Sanbase roadmap below. It is a living document; milestones may adjust.")), /*#__PURE__*/React.createElement("div", {
  className: "panel"
}, /*#__PURE__*/React.createElement("div", {
  className: "fadeout"
}, /*#__PURE__*/React.createElement("div", {
  className: "timeline"
}, /*#__PURE__*/React.createElement("div", {
  className: "entry past"
}, /*#__PURE__*/React.createElement("div", {
  className: "title"
}, /*#__PURE__*/React.createElement("h3", null, "Launch"), /*#__PURE__*/React.createElement("p", null, "Q1-Q2, 2017")), /*#__PURE__*/React.createElement("div", {
  className: "body"
}, /*#__PURE__*/React.createElement("p", null, "Generate first proofs of concept and initial funding"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Concierge MVP for crowdsourcing via community"), /*#__PURE__*/React.createElement("li", null, "Pre-Sale"), /*#__PURE__*/React.createElement("li", null, "Mobile alpha with charts and historical price feeds"), /*#__PURE__*/React.createElement("li", null, "Sentiment journaling game prototype"), /*#__PURE__*/React.createElement("li", null, "Trollbox feeds"), /*#__PURE__*/React.createElement("li", null, "Subscription smart contract"), /*#__PURE__*/React.createElement("li", null, "First set of strategic partnerships"), /*#__PURE__*/React.createElement("li", null, "Whitepaper Release"), /*#__PURE__*/React.createElement("li", null, "Crowdsale")))), /*#__PURE__*/React.createElement("div", {
  className: "entry past"
}, /*#__PURE__*/React.createElement("div", {
  className: "title"
}, /*#__PURE__*/React.createElement("h3", null, "Low Orbit"), /*#__PURE__*/React.createElement("p", null, "Q3-Q4, 2017"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "Transparency", /*#__PURE__*/React.createElement("br", null), "Product", /*#__PURE__*/React.createElement("br", null), "Community")), /*#__PURE__*/React.createElement("div", {
  className: "body"
}, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Develop Sanbase backend architecture"), /*#__PURE__*/React.createElement("li", null, "UI/UX. Overview and detailed view"), /*#__PURE__*/React.createElement("li", null, "Bring first data-feeds"), /*#__PURE__*/React.createElement("li", null, "First set of signals (delivered to the slack channel, later moved to discord)"), /*#__PURE__*/React.createElement("li", null, "Initial SAN token integration"), /*#__PURE__*/React.createElement("li", null, "First experiments with SAN rewards")), /*#__PURE__*/React.createElement("p", null, "Release: Sanbase alpha release"))), /*#__PURE__*/React.createElement("div", {
  className: "entry future"
}, /*#__PURE__*/React.createElement("div", {
  className: "title"
}, /*#__PURE__*/React.createElement("h3", null, "Medium Orbit"), /*#__PURE__*/React.createElement("p", null, "2018"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "Business"), /*#__PURE__*/React.createElement("p", null, "Models"), /*#__PURE__*/React.createElement("p", null, "Token"), /*#__PURE__*/React.createElement("p", null, "Economy")), /*#__PURE__*/React.createElement("div", {
  className: "body"
}, /*#__PURE__*/React.createElement("p", null, "Slight pivot. Increase focus for on-chain data/analyses"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Data-feeds for all ERC-20 tokens"), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Daily Active Addresses (DAA), TokenAging (Burn Rate), Transaction volume',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'In/Out exchanges',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'ETH Genesis Address Activity',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Price-Volume Difference Indicator',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Token Circulation',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Transaction Volume',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Velocity of Token',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Top 100 Transactions',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Network growth',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement("li", null, "Data-feeds for all EOS tokens"), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Actions Volume',
  progress: 50,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Number of Active Currencies',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Transaction Volume of the Most Active Currencies',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Transaction Volume of EOS',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Daily Active Addresses of EOS',
  progress: 100,
  child: true
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Gateway to include data from other blockchains',
  progress: 90
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'EOS',
  child: true,
  progress: 100
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Bitcoin',
  child: true,
  progress: 100
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'XLM',
  child: true,
  progress: 10
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'ADA',
  child: true,
  progress: 10
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'TRON',
  child: true,
  progress: 10
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'VET',
  child: true,
  progress: 10
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'NEO',
  child: true,
  progress: 10
}), /*#__PURE__*/React.createElement("li", null, "Different interfaces to work with data"), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'API, SQL, Grafana',
  child: true,
  progress: 100
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'UI Components',
  child: true,
  progress: 10
}), /*#__PURE__*/React.createElement("li", null, "Social metrics"), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Topic Search',
  child: true,
  progress: 100
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Relative Social Dominance',
  child: true,
  progress: 100
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Social Volume',
  child: true,
  progress: 100
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Social Data feed',
  child: true,
  progress: 100
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Development Activity',
  progress: 100
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Base NLP models. Allows to build more complicated AI algorithms for social data',
  progress: 100
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Advanced AI/ML models',
  progress: 20
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Community “insights”',
  progress: 100
}), /*#__PURE__*/React.createElement(StatusItemWithProgress, {
  text: 'Token economy',
  progress: 60
}), /*#__PURE__*/React.createElement("li", null, "Signals - ongoing process")))), /*#__PURE__*/React.createElement("div", {
  className: "entry future"
}, /*#__PURE__*/React.createElement("div", {
  className: "title"
}, /*#__PURE__*/React.createElement("h3", null, "High Orbit"), /*#__PURE__*/React.createElement("p", null, "2019"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "Decentralization")), /*#__PURE__*/React.createElement("div", {
  className: "body"
}, /*#__PURE__*/React.createElement("p", null, "Product/community/network is self-sustaining, ready for general availability."), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Social/Reputation systems"), /*#__PURE__*/React.createElement("li", null, "Self-publishing systems"), /*#__PURE__*/React.createElement("li", null, "200+ datafeeds"), /*#__PURE__*/React.createElement("li", null, "Functioning payment/staking/reward token economy"), /*#__PURE__*/React.createElement("li", null, "Desktop & Mobile terminals first commercial release"), /*#__PURE__*/React.createElement("li", null, "3rd party integrations"))))))));

export default Roadmap;