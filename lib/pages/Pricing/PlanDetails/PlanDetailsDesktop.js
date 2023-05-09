import React, { useMemo } from 'react';
import cx from 'classnames';
import DETAILS from './details';
import { PlanCard } from './PlanCard';
import styles from './PlanDetails.module.css';
import externalStyles from './PlanDetails.module.css';
export const MarkIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM17.5942 9.28562C17.8791 8.96685 17.8517 8.47745 17.5329 8.19252C17.2141 7.90759 16.7247 7.93503 16.4398 8.25381L10.9682 14.3754L8.37111 11.6208C8.0778 11.3097 7.58785 11.2953 7.27676 11.5886C6.96567 11.8819 6.95125 12.3719 7.24455 12.683L10.4201 16.0511C10.5689 16.2089 10.7769 16.297 10.9937 16.2941C11.2105 16.2913 11.4161 16.1976 11.5606 16.036L17.5942 9.28562Z"
}));

const PlanDetailsDesktop = ({
  showingPlans,
  userPlan,
  subscription,
  plans,
  billing
}) => {
  const all = useMemo(() => new Array(showingPlans.length).fill(true), [showingPlans]);
  return /*#__PURE__*/React.createElement("table", {
    className: styles.table
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: styles.headers
  }, /*#__PURE__*/React.createElement("th", {
    className: cx(styles.head, styles.th),
    key: "empty"
  }, ''), showingPlans.map(plan => {
    return /*#__PURE__*/React.createElement(PlanCard, {
      as: 'th',
      plan: plan,
      key: plan.id,
      plans: plans,
      subscription: subscription,
      userPlan: userPlan,
      billing: billing
    });
  }))), /*#__PURE__*/React.createElement("tbody", null, DETAILS.rows.map((row, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("tr", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("td", {
    className: cx(styles.group, styles.cell, styles.noRightBorder)
  }, row.group.name), all.map((_, index) => /*#__PURE__*/React.createElement("td", {
    key: index,
    className: cx(styles.cell, styles.noRightBorder)
  }))), row.data.map(({
    name,
    checks,
    texts
  }) => {
    let _checks = checks && checks.filter((_, idx) => idx !== 0);

    let checkboxes = !texts ? _checks || all : undefined;
    return /*#__PURE__*/React.createElement("tr", {
      key: name,
      className: externalStyles.row
    }, /*#__PURE__*/React.createElement("td", {
      className: cx(styles.cell, styles.feature__title)
    }, name), checkboxes && checkboxes.map((check, y) => /*#__PURE__*/React.createElement("td", {
      key: y,
      className: cx(styles.cell, styles.feature__cell, !check && styles.feature__check__grey)
    }, check && /*#__PURE__*/React.createElement(MarkIcon, {
      className: styles.feature__check
    }))), texts && texts.filter((_, idx) => idx !== 0).map((text, y) => /*#__PURE__*/React.createElement("td", {
      key: y,
      className: cx(styles.cell, styles.feature__cell)
    }, text)));
  })))));
};

export default PlanDetailsDesktop;