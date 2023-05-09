function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import Button from '@santiment-network/ui/Button';
import Dialog from '@santiment-network/ui/Dialog';
import Panel from '@santiment-network/ui/Panel';
import { Elements, injectStripe } from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import IconLock from './IconLock';
import IconDollar from './IconDollar';
import { showNotification } from '../../actions/rootActions';
import { USER_SUBSCRIPTIONS_QUERY, SUBSCRIBE_MUTATION } from '../../queries/plans';
import { formatError, contactAction } from '../../utils/notifications';
import { getDateFormats } from '../../utils/dates';
import { getAlternativeBillingPlan, hasInactiveTrial } from '../../utils/plans';
import { usePlans } from '../../ducks/Plans/hooks';
import { useTrackEvents } from '../../hooks/tracking';
import { USER_SUBSCRIPTION_CHANGE } from '../../actions/types';
import { updateUserSubscriptions, useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import FreeTrialLabel from './PlanDialogLabels/FreeTrialLabel';
import ProExpiredLabel from './PlanDialogLabels/ProExpiredLabel';
import styles from './PlanPaymentDialog.module.css';
import sharedStyles from './Plans.module.css';

function useFormLoading() {
  const [loading, setLoading] = useState(false);

  function toggleLoading() {
    setLoading(state => !state);
  }

  return [loading, toggleLoading];
}

function updateCache(cache, {
  data: {
    subscribe
  }
}) {
  const {
    currentUser
  } = cache.readQuery({
    query: USER_SUBSCRIPTIONS_QUERY
  });
  let subscriptions = currentUser.subscriptions ? [subscribe, ...currentUser.subscriptions] : [subscribe];
  updateUserSubscriptions(subscriptions);
  cache.writeQuery({
    query: USER_SUBSCRIPTIONS_QUERY,
    data: {
      currentUser: _objectSpread(_objectSpread({}, currentUser), {}, {
        subscriptions
      })
    }
  });
}

const Form = props => /*#__PURE__*/React.createElement(Panel, _extends({
  as: "form"
}, props));

const getTokenDataByForm = form => {
  const res = {};
  new FormData(form).forEach((value, key) => {
    if (key === 'coupon') {
      return;
    }

    res[key] = value;
  });
  return res;
};

const NEXT_DATE_GET_SET_MONTH = ['setMonth', 'getMonth'];
const NEXT_DATE_GET_SET_YEAR = ['setFullYear', 'getFullYear'];

const getNextPaymentDates = billing => {
  const [setter, getter] = billing === 'year' ? NEXT_DATE_GET_SET_YEAR : NEXT_DATE_GET_SET_MONTH;
  const date = new Date();
  date[setter](date[getter]() + 1);
  const {
    DD,
    MM,
    YY
  } = getDateFormats(date);
  return `${DD}/${MM}/${YY}`;
};

const getFreeTrialEnd = trialDate => {
  let date = new Date(trialDate);

  if (!Number.isFinite(+date)) {
    date = new Date();
  }

  if (!trialDate) {
    date.setDate(date.getDate() + 14);
  }

  const {
    DD,
    MM,
    YY
  } = getDateFormats(date);
  return `${DD}/${MM}/${YY}`;
};

const PlanPaymentDialog = ({
  title: name,
  billing: interval,
  label,
  price: amount,
  planId: id,
  stripe,
  disabled,
  addNot,
  btnProps,
  updateSubscription,
  subscription,
  Trigger = Button,
  onOpen
}) => {
  const [plans] = usePlans();
  const [loading, toggleLoading] = useFormLoading();
  const [paymentVisible, setPaymentVisiblity] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [trackEvent] = useTrackEvents();
  const {
    trialDaysLeft,
    isEligibleForSanbaseTrial
  } = useUserSubscriptionStatus();
  const {
    id: planId,
    name: title,
    interval: billing,
    amount: price
  } = selectedPlan;
  useEffect(() => {
    setSelectedPlan({
      id,
      name,
      interval,
      amount
    });
  }, [id, name, amount, interval]);

  function changeSelectedPlan(interval) {
    if (selectedPlan.interval !== interval) {
      setSelectedPlan(getAlternativeBillingPlan(plans, selectedPlan));
    }
  }

  function hidePayment() {
    setPaymentVisiblity(false);
  }

  function showPayment() {
    if (onOpen) onOpen();
    trackEvent({
      category: 'User',
      action: 'Payment form opened'
    });
    setPaymentVisiblity(true);
  }

  const nextPaymentDate = getNextPaymentDates(billing);
  const hasCompletedTrial = hasInactiveTrial(subscription);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Trigger, _extends({
    className: sharedStyles.link,
    fluid: true,
    border: true,
    accent: "positive"
  }, btnProps, {
    disabled: disabled,
    onClick: showPayment
  }), label), /*#__PURE__*/React.createElement(Mutation, {
    mutation: SUBSCRIBE_MUTATION,
    update: updateCache
  }, (subscribe, {
    called,
    error,
    data
  }) => {
    return /*#__PURE__*/React.createElement(Dialog, {
      title: "Payment details",
      classes: styles,
      open: paymentVisible,
      onClose: hidePayment,
      as: Form,
      modalProps: {
        onSubmit: e => {
          e.preventDefault();
          if (loading) return;
          toggleLoading();
          trackEvent({
            category: 'User',
            action: 'Payment form submitted'
          });
          const form = e.currentTarget;
          const formCoupon = form.coupon;
          const coupon = formCoupon.dataset.isValid === 'true' && formCoupon.value;
          stripe.createToken(getTokenDataByForm(form)).then(({
            token,
            error
          }) => {
            if (error) {
              return Promise.reject(error);
            }

            const variables = {
              cardToken: token.id,
              planId: +planId
            };

            if (coupon) {
              variables.coupon = coupon;
            }

            return subscribe({
              variables
            });
          }).then(({
            data: {
              subscribe
            }
          }) => {
            addNot({
              variant: 'success',
              title: `You have successfully upgraded to the "${title}" plan!`
            });
            updateSubscription(subscribe);
            hidePayment();
            trackEvent({
              category: 'User',
              action: 'Payment success'
            });
          }).catch(e => {
            addNot({
              variant: 'error',
              title: `Error during the payment`,
              description: formatError(e.message),
              actions: contactAction
            });
            toggleLoading();
          });
        }
      }
    }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
      className: styles.content
    }, isEligibleForSanbaseTrial ? /*#__PURE__*/React.createElement(FreeTrialLabel, {
      price: price,
      trialEndData: getFreeTrialEnd(subscription && subscription.trialEnd)
    }) : /*#__PURE__*/React.createElement(ProExpiredLabel, {
      price: price,
      nextPaymentDate: nextPaymentDate,
      period: billing,
      trialDaysLeft: trialDaysLeft
    }), /*#__PURE__*/React.createElement(CheckoutForm, {
      plan: title,
      price: price,
      billing: billing,
      loading: loading,
      subscription: subscription,
      hasCompletedTrial: hasCompletedTrial,
      changeSelectedPlan: changeSelectedPlan
    })), /*#__PURE__*/React.createElement("div", {
      className: styles.bottom
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.bottom__info
    }, /*#__PURE__*/React.createElement(IconLock, null), " Fully secured checkout"), /*#__PURE__*/React.createElement("div", {
      className: styles.bottom__info
    }, /*#__PURE__*/React.createElement(IconDollar, null), " 30 day money back guarantee")));
  }));
};

const mapDispatchToProps = dispatch => ({
  addNot: message => dispatch(showNotification(message)),
  updateSubscription: payload => dispatch({
    type: USER_SUBSCRIPTION_CHANGE,
    payload
  })
});

const InjectedForm = connect(null, mapDispatchToProps)(injectStripe(PlanPaymentDialog));
export default (props => /*#__PURE__*/React.createElement(Elements, null, /*#__PURE__*/React.createElement(InjectedForm, props)));