function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Tooltip from '@santiment-network/ui/Tooltip';
import Button from '@santiment-network/ui/Button';
import Panel from '@santiment-network/ui/Panel';
import Calendar from '../../ducks/Studio/AdvancedView/Calendar';
import WordCloud from '../../components/WordCloud/WordCloudWithHeader';
import HelpPopup from '../../components/HelpPopup/HelpPopup';
import { SOCIAL_CONTEXT_DESCRIPTION } from '../../ducks/dataHub/metrics/descriptions';
import { getTimePeriod } from './utils';
import styles from './EnhancedWordCloud.module.css';
import stylesTooltip from '../../components/HelpPopup/HelpPopup.module.css';
const MAX_DATE = new Date();

const EnhancedWordCloud = ({
  words,
  isDesktop = true
}) => {
  const [word, setWord] = useState(words[0]);
  const [date, setDate] = useState([MAX_DATE]);
  const [period, setPeriod] = useState(getTimePeriod(MAX_DATE));
  useEffect(() => {
    if (words.length > 1) {
      setDate([MAX_DATE]);
      setPeriod(getTimePeriod(MAX_DATE));
    }

    if (!words.includes(word)) {
      setWord(words[0]);
    }
  }, [words]);

  function onCalendarChange(datetime) {
    setDate([datetime]);
    setPeriod(getTimePeriod(datetime));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, words.length > 1 ? /*#__PURE__*/React.createElement(Tooltip, {
    on: "click",
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "flat",
      border: true,
      className: styles.trigger
    }, word),
    position: "bottom",
    align: "end"
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, words.map(item => /*#__PURE__*/React.createElement("span", {
    className: cx(styles.word, item === word && styles.selected),
    key: item,
    onClick: () => setWord(item)
  }, item)))) : /*#__PURE__*/React.createElement("div", {
    className: cx('row v-center justify', !isDesktop && styles.header)
  }, !isDesktop && /*#__PURE__*/React.createElement("div", {
    className: "row v-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "body-1 mrg-l mrg--r"
  }, "Social context"), /*#__PURE__*/React.createElement(HelpPopup, null, /*#__PURE__*/React.createElement("h4", {
    className: stylesTooltip.title
  }, "Social context"), SOCIAL_CONTEXT_DESCRIPTION)), /*#__PURE__*/React.createElement(Calendar, {
    dates: date,
    onChange: onCalendarChange,
    className: cx(styles.calendar, !isDesktop && cx(styles.mobileCalendar, 'body-3')),
    maxDate: MAX_DATE,
    isDesktop: isDesktop
  })), /*#__PURE__*/React.createElement(WordCloud, _extends({
    isDesktop: isDesktop,
    hideWord: true,
    size: 15,
    className: styles.cloud,
    infoClassName: styles.cloud__header,
    contentClassName: styles.cloud__content,
    word: word
  }, period)));
};

export default EnhancedWordCloud;