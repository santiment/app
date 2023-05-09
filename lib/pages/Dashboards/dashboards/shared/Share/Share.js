import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { copy } from 'webkit/utils';
import Svg from 'webkit/ui/Svg/react';
import { trackShareLinkCopy } from 'webkit/analytics/events/interaction';
import ShareModalTrigger from '../../../../../components/Share/ShareModalTrigger';
import styles from './Share.module.css';

const Share = ({
  id,
  feature,
  source
}) => {
  const clearTimerRef = useRef();
  const [isShareOpened, setIsShareOpened] = useState(false);

  function onShareClick() {
    setIsShareOpened(true);
  }

  useEffect(() => () => clearTimerRef.current && clearTimerRef.current(), []);

  function onCopyLinkClick(event) {
    if (clearTimerRef.current) clearTimerRef.current();
    trackShareLinkCopy({
      url: window.location.href,
      feature,
      source
    });

    const clb = () => event.currentTarget && (event.currentTarget.ariaLabel = 'Copy link');

    if (event.currentTarget) event.currentTarget.ariaLabel = 'Copied!';
    clearTimerRef.current = copy(window.location.href, clb);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "row v-center btn--green"
  }, /*#__PURE__*/React.createElement("button", {
    className: cx(styles.share, styles.action, 'btn'),
    onClick: onShareClick
  }, "Share"), /*#__PURE__*/React.createElement("button", {
    id: id,
    className: cx(styles.link, styles.action, 'btn row hv-center expl-tooltip'),
    "aria-label": "Copy link",
    onClick: onCopyLinkClick
  }, /*#__PURE__*/React.createElement(Svg, {
    id: "link",
    w: "16"
  }))), /*#__PURE__*/React.createElement(ShareModalTrigger, {
    isDialogOnly: true,
    feature: "dashboard",
    source: "dashboards",
    classes: styles,
    shareLink: window.location.href,
    open: isShareOpened,
    onClose: () => setIsShareOpened(false)
  }));
};

export default Share;