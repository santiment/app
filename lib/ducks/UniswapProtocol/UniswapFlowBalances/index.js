import React, { useState } from 'react';
import Icon from '@santiment-network/ui/Icon';
import Chord from '../../Studio/Tabs/Flow/Chord';
import { usePeriodMatrix, useDayMatrix, useAnimatedDayIndex } from '../../Studio/Tabs/Flow/hooks';
import { sumCategory, format, getDaysAmount } from '../../Studio/Tabs/Flow/utils';
import { addDays } from '../../../utils/dates';
import Skeleton from '../../../components/Skeleton/Skeleton';
import HelpPopup from '../../../components/HelpPopup/HelpPopup';
import { wrapper as wrapClassName } from '../UniswapPieChart/UniswapPieChart.module.css';
import Calendar from '../../Studio/AdvancedView/Calendar';
import styles from './index.module.css';
const LabelColor = {
  'DEX Traders': '#5275FF',
  'Decentralized Exchanges': '#785549',
  'Centralized Exchanges': '#68DBF4',
  DeFi: '#ffad4d',
  Whales: '#6edeaf',
  Others: '#D4E763'
};
const COLORS = Object.values(LabelColor);
const LABELS = Object.keys(LabelColor);
const FROM = new Date('2020-09-16T00:00:00.000Z');
const TO = new Date();
TO.setHours(23, 59, 59, 59);
const DAYS_AMOUNT = getDaysAmount(FROM, TO);
const DATES = [FROM, TO];

const getDayIndexDate = dayIndex => addDays(FROM, dayIndex);

const Value = ({
  flows
}) => /*#__PURE__*/React.createElement("span", {
  className: styles.value
}, format('UNI', sumCategory(flows)));

const Info = ({
  matrix
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.info
}, LABELS.map((label, i) => /*#__PURE__*/React.createElement("div", {
  key: label,
  className: styles.label,
  style: {
    '--color': COLORS[i]
  }
}, label, ": ", /*#__PURE__*/React.createElement(Value, {
  flows: matrix[i]
}))));

const UniswapFlowBalances = () => {
  const [isHovered, setIsHovered] = useState();
  const {
    periodMatrix,
    isLoading
  } = usePeriodMatrix('uniswap', DATES, DAYS_AMOUNT);
  const [dayIndex, setDayIndex] = useAnimatedDayIndex(DAYS_AMOUNT, isHovered || isLoading);
  const {
    matrix
  } = useDayMatrix(periodMatrix, dayIndex);

  function onHover() {
    setIsHovered(true);
  }

  function onBlur() {
    setIsHovered(false);
  }

  function onCalendarChange(newFrom) {
    setDayIndex(DAYS_AMOUNT - getDaysAmount(newFrom, TO));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Skeleton, {
    repeat: 1,
    className: styles.skeleton,
    show: isLoading
  }), !isLoading && /*#__PURE__*/React.createElement("div", {
    className: wrapClassName
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.chord,
    onMouseEnter: onHover,
    onMouseLeave: onBlur
  }, /*#__PURE__*/React.createElement(Chord, {
    ticker: "UNI",
    matrix: matrix,
    width: 365,
    height: 365,
    colors: COLORS
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.bottom
  }, /*#__PURE__*/React.createElement(Icon, {
    className: styles.playpause,
    type: isHovered ? 'pause' : 'play'
  }), /*#__PURE__*/React.createElement(Calendar, {
    maxDate: TO,
    minDate: FROM,
    dates: [getDayIndexDate(dayIndex)],
    onChange: onCalendarChange,
    className: styles.calendar
  }), /*#__PURE__*/React.createElement(HelpPopup, {
    triggerClassName: styles.help,
    content: "Hover over the diagram to pause animation"
  }))), /*#__PURE__*/React.createElement(Info, {
    matrix: matrix
  })));
};

export default UniswapFlowBalances;