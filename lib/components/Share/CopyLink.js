import React, { useState } from 'react';
import cx from 'classnames';
import copy from 'copy-to-clipboard';
import { trackShareLinkCopy } from 'san-webkit/lib/analytics/events/interaction';
import linkImg from '../../assets/link.svg';
import styles from './CopyLink.module.css';

const CopyLink = ({
  link,
  feature,
  source
}) => {
  const [isCopied, setIsCopied] = useState(undefined);

  function handleCopyClick() {
    copy(link);
    trackShareLinkCopy({
      url: link,
      feature,
      source
    });
    setIsCopied(setTimeout(() => setIsCopied(false), 10000));
  }

  return /*#__PURE__*/React.createElement("button", {
    className: cx(styles.btn, 'btn-2 row hv-center body-2'),
    onClick: handleCopyClick
  }, /*#__PURE__*/React.createElement("img", {
    src: linkImg,
    alt: "Link",
    className: "mrg-m mrg--r"
  }), isCopied ? 'Copied!' : 'Copy link');
};

export default CopyLink;