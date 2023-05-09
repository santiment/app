import React from 'react';
import { Link } from 'react-router-dom';
import { track } from 'san-webkit/lib/analytics';
import Dialog from '@santiment-network/ui/Dialog';
import Button from '@santiment-network/ui/Button';
import { useUserSubscription } from '../../stores/user/subscriptions';
import { PlanBtn } from '../Plans/Plan';
import PLANS from '../Plans/list';
import { usePlans } from '../../ducks/Plans/hooks';
import HeaderImage from './header';
import styles from './index.module.css';
const INTERVAL = 'month';

const TabLimitModal = ({
  maxTabsCount,
  isPro,
  onOpen
}) => {
  const {
    subscription
  } = useUserSubscription();
  const [plans] = usePlans();
  const PLAN_KEY = isPro ? 'PRO_PLUS' : 'PRO';
  const PLAN = plans.find(({
    interval,
    name
  }) => interval === INTERVAL && name === PLAN_KEY);
  return /*#__PURE__*/React.createElement("div", {
    onContextMenu: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement(Dialog, {
    autoFocus: true,
    open: true,
    showCloseBtn: false,
    classes: styles
  }, /*#__PURE__*/React.createElement(HeaderImage, null), /*#__PURE__*/React.createElement("p", {
    className: styles.descTop
  }, "Browser Tabs Restriction"), /*#__PURE__*/React.createElement("p", {
    className: styles.descBottom
  }, "Dear user, your current plan allows you to use up to ", maxTabsCount, " Browser Tabs for Charts and Screeners. If you want to use more, please upgrade"), /*#__PURE__*/React.createElement("div", {
    className: styles.buttons,
    id: "tabLimitModalButtons"
  }, PLAN && /*#__PURE__*/React.createElement(PlanBtn, {
    subscription: subscription,
    card: PLANS[PLAN_KEY],
    billing: INTERVAL,
    btnProps: {
      variant: 'fill',
      accent: 'orange',
      border: undefined,
      fluid: undefined,
      className: undefined
    },
    amount: PLAN.amount,
    id: PLAN.id,
    onOpen: onOpen
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "flat",
    border: true,
    as: Link,
    to: "/pricing",
    onClick: () => track.event('tab_limit_modal_review_plans_clicked')
  }, "Review plans"))));
};

export default TabLimitModal;