import React, { useMemo } from 'react';
import cx from 'classnames';
import ReactSwipe from 'react-swipe';
import { PlanCard } from './PlanCard';
import DETAILS from './details';
import { MarkIcon } from './PlanDetailsDesktop';
import { useSwipeState } from '../../../components/SwipablePages/SwipablePages';
import externalStyles from './PlanDetails.module.css';
import styles from './PlanDetailsMobile.module.css';

const PlanDetailsMobile = ({
  showingPlans,
  userPlan,
  subscription,
  plans,
  billing
}) => {
  const {
    active,
    onChange
  } = useSwipeState();
  const all = useMemo(() => new Array(showingPlans.length).fill(true), [showingPlans]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(ReactSwipe, {
    className: styles.swipeContainer,
    swipeOptions: {
      callback: onChange,
      continuous: false,
      startSlide: active
    }
  }, showingPlans.map(plan => /*#__PURE__*/React.createElement("div", {
    key: plan.id
  }, /*#__PURE__*/React.createElement(PlanCard, {
    plan: plan,
    key: plan.id,
    plans: plans,
    subscription: subscription,
    userPlan: userPlan,
    billing: billing,
    classes: styles
  })))), /*#__PURE__*/React.createElement("div", {
    className: styles.dots
  }, showingPlans.map((item, index) => {
    return /*#__PURE__*/React.createElement("svg", {
      className: cx(styles.dot, index === active && styles.active),
      key: index,
      width: "6",
      height: "6",
      viewBox: "0 0 6 6",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "3",
      cy: "3",
      r: "3",
      fill: "inherit"
    }));
  }))), /*#__PURE__*/React.createElement("table", {
    className: cx(externalStyles.table, styles.table)
  }, /*#__PURE__*/React.createElement("tbody", null, DETAILS.rows.map((row, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("tr", {
    className: externalStyles.row
  }, /*#__PURE__*/React.createElement("td", {
    className: cx(externalStyles.group, externalStyles.cell, externalStyles.noRightBorder)
  }, row.group.name), /*#__PURE__*/React.createElement("td", {
    className: externalStyles.cell
  })), row.data.map(({
    name,
    checks,
    texts
  }) => {
    const checkboxes = !texts ? checks || all : undefined;
    const activePlan = checkboxes && checkboxes.length === 2 ? active : active + 1;
    return /*#__PURE__*/React.createElement("tr", {
      key: name,
      className: externalStyles.row
    }, /*#__PURE__*/React.createElement("td", {
      className: cx(externalStyles.cell, externalStyles.feature__title)
    }, name), checkboxes && /*#__PURE__*/React.createElement("td", {
      className: cx(externalStyles.cell, externalStyles.feature__cell, !checkboxes[activePlan] && externalStyles.feature__check__grey)
    }, checkboxes[activePlan] && /*#__PURE__*/React.createElement(MarkIcon, {
      className: cx(externalStyles.feature__check, active === 0 && externalStyles.feature__check__green)
    })), texts && /*#__PURE__*/React.createElement("td", {
      className: cx(externalStyles.cell, externalStyles.feature__cell)
    }, texts[activePlan]));
  }))))));
};

export default PlanDetailsMobile;