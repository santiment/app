import React from 'react';
import { Query, Mutation } from 'react-apollo';
import Button from '@santiment-network/ui/Button';
import Panel from '@santiment-network/ui/Panel';
import Dialog from '@santiment-network/ui/Dialog';
import { formatPrice, findSanbasePlan, getAlternativeBillingPlan } from '../../utils/plans';
import { getDateFormats } from '../../utils/dates';
import { PLANS_QUERY, UPDATE_SUBSCRIPTION_MUTATION } from '../../queries/plans';
import PLANS from '../Plans/list';
import styles from './BillingChangeDialog.module.css';

const ChangeBillingDialog = ({
  classes = {},
  subscription: {
    id,
    currentPeriodEnd,
    plan: oldPlan
  }
}) => {
  const {
    amount,
    name: oldName,
    interval: oldInterval
  } = oldPlan;
  const [oldPrice] = formatPrice(amount);
  const {
    MMMM,
    DD,
    YYYY
  } = getDateFormats(new Date(currentPeriodEnd));
  const date = `${MMMM} ${DD}, ${YYYY}`;
  const newAmountMul = oldInterval === 'month' ? 1 : 12;
  const monthToYear = oldInterval === 'month' ? amount * 12 : amount;
  let monthToYearPrice = formatPrice(monthToYear)[0];
  return /*#__PURE__*/React.createElement(Mutation, {
    mutation: UPDATE_SUBSCRIPTION_MUTATION
  }, (updateSubscription, {
    loading: updateLoading
  }) => /*#__PURE__*/React.createElement(Query, {
    query: PLANS_QUERY
  }, ({
    data: {
      productsWithPlans = []
    } = {},
    loading
  }) => {
    let newPrice = 0;
    let yearBillSave = 0;
    let newPlanId;

    if (!loading) {
      const neuro = productsWithPlans.find(findSanbasePlan) || [];
      const {
        amount,
        interval,
        id: newId
      } = getAlternativeBillingPlan(neuro.plans, oldPlan);
      newPlanId = newId;
      newPrice = formatPrice(amount)[0];
      yearBillSave = formatPrice(Math.abs(monthToYear - amount * newAmountMul) / 12)[0];

      if (interval === 'month') {
        monthToYearPrice = formatPrice(amount * newAmountMul)[0];
      }
    }

    return /*#__PURE__*/React.createElement(Dialog, {
      title: "Change billing period",
      trigger: /*#__PURE__*/React.createElement(Button, {
        className: classes.btn,
        accent: "positive"
      }, "Change billing period")
    }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
      className: styles.content
    }, ['month', 'year'].map(bill => /*#__PURE__*/React.createElement(Panel, {
      key: bill,
      className: styles.card
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.row
    }, /*#__PURE__*/React.createElement("h2", {
      className: styles.billing
    }, bill, "ly billing"), /*#__PURE__*/React.createElement("h3", {
      className: styles.price
    }, bill === oldInterval ? oldPrice : newPrice, /*#__PURE__*/React.createElement("span", {
      className: styles.price__type
    }, "/", bill))), /*#__PURE__*/React.createElement("div", {
      className: styles.row
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.desc
    }, PLANS[oldName].title, " Plan is", ' ', bill === oldInterval ? oldPrice : newPrice, " per ", bill, ".", /*#__PURE__*/React.createElement("br", null), "You will", ' ', bill === 'year' ? /*#__PURE__*/React.createElement(React.Fragment, null, "save ", /*#__PURE__*/React.createElement("span", {
      className: styles.save
    }, yearBillSave), " per month") : `spend ${monthToYearPrice} per year.`), /*#__PURE__*/React.createElement(Button, {
      border: true,
      accent: "positive",
      disabled: oldInterval === bill,
      isLoading: oldInterval !== bill && updateLoading,
      onClick: () => updateSubscription({
        variables: {
          subscriptionId: +id,
          planId: +newPlanId
        }
      })
    }, oldInterval === bill ? 'Current plan' : `Change to ${bill}ly`)))), /*#__PURE__*/React.createElement("div", {
      className: styles.desc
    }, "Your ", PLANS[oldName].title, " Plan will renew on ", date, ".")));
  }));
};

export default ChangeBillingDialog;