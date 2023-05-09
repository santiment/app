import React from 'react';
import cx from 'classnames';
import Loader from '@santiment-network/ui/Loader/Loader';
import Icon from '@santiment-network/ui/Icon';
import { formatCryptoCurrency, formatNumber } from '../../../utils/formatting';
import HelpPopup from '../../../components/HelpPopup/HelpPopup';
import Tooltip from '@santiment-network/ui/Tooltip';
import styles from './GeneralInfoBlock.module.css';

const GeneralInfoBlock = ({
  websiteLink,
  slackLink,
  twitterLink,
  githubLinks,
  blogLink,
  whitepaperLink,
  marketcapUsd,
  rank,
  priceUsd,
  totalSupply,
  volumeUsd,
  ticker,
  roiUsd,
  loading
}) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(SocialLink, {
  link: websiteLink,
  text: "Website"
}), /*#__PURE__*/React.createElement(SocialLink, {
  link: slackLink,
  text: "Community"
}), /*#__PURE__*/React.createElement(SocialLink, {
  link: twitterLink,
  text: "Twitter"
}), /*#__PURE__*/React.createElement(SocialLink, {
  link: blogLink,
  text: "Blog"
}), /*#__PURE__*/React.createElement(GithubLinks, {
  links: githubLinks
}), /*#__PURE__*/React.createElement(SocialLink, {
  link: whitepaperLink,
  text: "Whitepaper"
})), /*#__PURE__*/React.createElement(Row, {
  loading: loading,
  value: marketcapUsd,
  format: value => formatNumber(value, {
    currency: 'USD'
  }),
  title: "Market Cap"
}), /*#__PURE__*/React.createElement(Row, {
  loading: loading,
  value: priceUsd,
  format: value => formatNumber(value, {
    currency: 'USD'
  }),
  title: "Price (USD)"
}), /*#__PURE__*/React.createElement(Row, {
  loading: loading,
  value: volumeUsd,
  format: value => formatNumber(value, {
    currency: 'USD'
  }),
  title: "Volume (USD)"
}), /*#__PURE__*/React.createElement(Row, {
  loading: loading,
  value: totalSupply,
  format: value => formatCryptoCurrency(ticker, formatNumber(totalSupply)),
  title: "Total supply"
}), /*#__PURE__*/React.createElement(Row, {
  loading: loading,
  value: rank,
  format: value => value,
  title: "Rank"
}), /*#__PURE__*/React.createElement(Row, {
  loading: loading,
  value: roiUsd,
  format: value => parseFloat(value).toFixed(2),
  title: /*#__PURE__*/React.createElement("span", null, "ROI since ICO", ' ', /*#__PURE__*/React.createElement(HelpPopup, {
    position: "top",
    align: "start",
    content: "This ROI takes into account pre-sales, the token price during all sales and the amount of tokens distributed in each sale. Example: SAN had a pre-sale when around ~15m (12k ETH) tokens were distributed at a much lower price, and an ICO where the equivalent of 33k ETH were distributed. Both these sales are taken into account for this ROI, while most aggregators calculate ROI based only on the ICO\u2019s price."
  }))
}));

const GithubLinks = ({
  links
}) => {
  if (!links || !links.length) {
    return null;
  }

  if (links.length === 1) {
    return /*#__PURE__*/React.createElement(SocialLink, {
      link: links[0],
      text: "Github"
    });
  }

  return /*#__PURE__*/React.createElement(Tooltip, {
    trigger: /*#__PURE__*/React.createElement("div", {
      className: styles.socialLink
    }, "Github"),
    position: "bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.tooltip
  }, links.map(link => /*#__PURE__*/React.createElement(SocialLink, {
    key: link,
    link: link,
    text: link
  }))));
};

const SocialLink = ({
  link,
  text = ''
}) => /*#__PURE__*/React.createElement("a", {
  className: cx(styles.socialLink, !link && styles.disabled),
  target: "_blank",
  rel: "noopener noreferrer",
  href: link || ''
}, text || /*#__PURE__*/React.createElement(Icon, {
  type: "link",
  fill: link ? 'var(--shark)' : 'var(--porcelain)'
}));

const Row = ({
  title,
  value,
  format,
  loading
}) => /*#__PURE__*/React.createElement("div", {
  className: cx('row-info', value === undefined || !value && styles.disabled)
}, /*#__PURE__*/React.createElement("div", null, title), /*#__PURE__*/React.createElement("div", {
  className: styles.value
}, loading ? /*#__PURE__*/React.createElement(Loader, {
  className: styles.loader
}) : value ? format(value) : 'No data'));

export default GeneralInfoBlock;