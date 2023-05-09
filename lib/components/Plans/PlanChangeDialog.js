function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import Button from '@santiment-network/ui/Button';
import Dialog from '@santiment-network/ui/Dialog';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { showNotification } from '../../actions/rootActions';
import { UPDATE_SUBSCRIPTION_MUTATION } from '../../queries/plans';
import { formatPrice } from '../../utils/plans';
import { getDateFormats } from '../../utils/dates';
import { formatError, contactAction } from '../../utils/notifications';
import { USER_SUBSCRIPTION_CHANGE } from '../../actions/types';
import planStyles from './Plans.module.css';
import dialogStyles from './Dialog.module.css';
const PlanToTitle = {
  FREE: 'Free',
  BASIC: 'Basic',
  PRO: 'Pro',
  ENTERPRISE: 'Custom'
};

const ChangePlanDialog = ({
  subscription: {
    id,
    currentPeriodEnd,
    plan: {
      amount,
      name,
      interval
    } = {}
  } = {},
  title,
  price,
  billing,
  planId,
  btnProps,
  addNot,
  changeSubscription
}) => {
  const [dialogVisible, setDialogVisiblity] = useState(false);
  const [oldPrice] = formatPrice(amount);
  const [newPrice] = formatPrice(price, null, null);
  const {
    MMMM,
    DD,
    YYYY
  } = getDateFormats(new Date(currentPeriodEnd));
  const date = `${MMMM} ${DD}, ${YYYY}`;

  function hideDialog() {
    setDialogVisiblity(false);
  }

  function showDialog() {
    setDialogVisiblity(true);
  }

  return /*#__PURE__*/React.createElement(Mutation, {
    mutation: UPDATE_SUBSCRIPTION_MUTATION
  }, (updateSubscription, {
    loading
  }) => /*#__PURE__*/React.createElement(Dialog, {
    open: dialogVisible,
    onClose: hideDialog,
    trigger: /*#__PURE__*/React.createElement(Button, _extends({
      onClick: showDialog,
      fluid: true,
      className: planStyles.link,
      border: true,
      accent: "orange"
    }, btnProps), "Change to this plan"),
    title: "Plan change"
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    withPadding: true
  }, "Your current plan (", PlanToTitle[name], " ", oldPrice, "/", interval, ") is active until ", date, ".", /*#__PURE__*/React.createElement("br", null), "Are you sure you want to change to the ", title, " plan (", newPrice, "/", billing, ") on ", date, "?"), /*#__PURE__*/React.createElement(Dialog.Actions, null, /*#__PURE__*/React.createElement(Dialog.Cancel, {
    className: dialogStyles.cancel,
    onClick: hideDialog
  }, "Cancel"), /*#__PURE__*/React.createElement(Dialog.Approve, {
    accent: "positive",
    isLoading: loading,
    onClick: () => updateSubscription({
      variables: {
        subscriptionId: +id,
        planId: +planId
      }
    }).then(({
      data: {
        updateSubscription
      }
    }) => {
      changeSubscription(updateSubscription);
      addNot({
        variant: 'success',
        title: `You have successfully upgraded to the "${title}" plan!`
      });
    }).then(hideDialog).catch(e => addNot({
      variant: 'error',
      title: `Error during the plan change`,
      description: formatError(e.message),
      actions: contactAction
    }))
  }, "Confirm change"))));
};

const mapDispatchToProps = dispatch => ({
  addNot: message => dispatch(showNotification(message)),
  changeSubscription: payload => dispatch({
    type: USER_SUBSCRIPTION_CHANGE,
    payload
  })
});

export default connect(null, mapDispatchToProps)(ChangePlanDialog);