import React, { useState, useEffect } from 'react';
import Icon from '@santiment-network/ui/Icon';
import styles from './MeetupWidget.module.css';

const MeetupWidget = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const isHidden = !!localStorage.getItem('HIDDEN_WIDGET_MEETUP_KEY');
    setShow(!isHidden);
  }, []);

  const hideTooltip = () => {
    localStorage.setItem('HIDDEN_WIDGET_MEETUP_KEY', JSON.stringify('true'));
    setShow(false);
  };

  return show ? /*#__PURE__*/React.createElement("section", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "var(--texas-rose)",
    d: "M4.39 17.81l1.28-1.28a.65.65 0 000-.91.65.65 0 00-.9 0l-1.3 1.29a.65.65 0 000 .9c.27.25.67.25.92 0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "var(--texas-rose)",
    d: "M4.03 14.9a.65.65 0 000-.91.65.65 0 00-.91 0l-2.05 2.04a.65.65 0 000 .91c.25.25.67.25.91 0l2.05-2.04z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "var(--texas-rose)",
    d: "M2.38 13.25a.65.65 0 000-.91.65.65 0 00-.9 0l-1.3 1.29a.65.65 0 000 .9c.25.25.67.25.91 0l1.29-1.28z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "var(--texas-rose)",
    d: "M6.94 14.76l.57-.56c.6.85 1.12 1.8 1.48 2.78.15.4.64.53.98.27l2.31-1.97c1-.86 1.38-2.26.93-3.49l-.15-.32 2.74-2.75a6.76 6.76 0 001.95-4.23L18 1.33A1.23 1.23 0 0016.67 0l-3.16.25A6.65 6.65 0 009.29 2.2L6.54 4.95l-.34-.11a3.15 3.15 0 00-3.48.92L.75 8.06a.62.62 0 00.27.98c1 .36 1.93.85 2.78 1.48l-.57.57c-.2.2-.2.55 0 .78l2.94 2.9c.22.2.56.2.77 0zm3.6-7.3a1.83 1.83 0 112.6-2.59 1.83 1.83 0 11-2.6 2.6z"
  })), /*#__PURE__*/React.createElement("h2", {
    className: styles.title
  }, "Free webinar:"), /*#__PURE__*/React.createElement("p", {
    className: styles.desc
  }, "DeFi's Future and Introducing SanR"), /*#__PURE__*/React.createElement("a", {
    href: "https://www.meetup.com/Santiment-Frankfurt/events/278092291/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: styles.link
  }, "Register", /*#__PURE__*/React.createElement(Icon, {
    type: "pointer-right",
    className: styles.arrow
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.closeContainer
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium",
    className: styles.close,
    onClick: hideTooltip
  })))) : null;
};

export default MeetupWidget;