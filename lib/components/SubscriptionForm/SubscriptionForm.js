function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import cx from 'classnames';
import { graphql } from 'react-apollo';
import * as Sentry from '@sentry/react';
import Button from '@santiment-network/ui/Button';
import Input from '@santiment-network/ui/Input';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import { EMAIL_LOGIN_MUTATION } from './loginGQL';
import { store } from '../../redux';
import { showNotification } from '../../actions/rootActions';
import GA from './../../utils/tracking';
import styles from './SubscriptionForm.module.css';
const SUBSCRIPTION_LABEL = 'Receive product updates and weekly newsletter';

class SubscriptionForm extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      email: '',
      error: undefined,
      hasSubscribed: true
    };

    this.onSubmit = e => {
      e.preventDefault();
      const {
        email,
        error,
        hasSubscribed,
        waiting
      } = this.state;

      if (error || waiting) {
        return;
      }

      if (!email) {
        this.setState({
          error: 'Email is required'
        });
        return;
      }

      this.setState({
        waiting: true
      });
      const {
        emailLogin
      } = this.props;
      emailLogin({
        variables: {
          email,
          subscribeToWeeklyNewsletter: hasSubscribed
        }
      }).then(() => {
        this.setState({
          waiting: false
        });
        GA.event({
          category: 'User',
          action: `User requested an email for verification ${hasSubscribed ? 'with' : 'without'} subscription`
        });
        store.dispatch(showNotification({
          variant: 'success',
          title: `Verification email has been sent to "${email}"`,
          dismissAfter: 8000
        }));
      }).catch(error => {
        this.setState({
          waiting: false
        });
        store.dispatch(showNotification({
          variant: 'error',
          title: `We got an error while generating verification email. Please try again`,
          dismissAfter: 8000
        }));
        Sentry.captureException(error);
      });
    };

    this.onSelect = data => {
      const {
        hasSubscribed
      } = this.state;
      const newValue = !hasSubscribed;
      this.setState({
        hasSubscribed: newValue
      });
    };

    this.onEmailChangeDebounced = ({
      currentTarget: {
        value
      }
    }) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.onEmailChange(value), 500);
    };
  }

  componentWillReceiveProps({
    hasSubscribed
  }) {
    if (hasSubscribed !== undefined && hasSubscribed !== this.state.hasSubscribed) {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        hasSubscribed
      }));
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onEmailChange(email) {
    let error;

    if (!email) {
      error = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = 'Invalid email address';
    }

    this.setState({
      email,
      error
    });
  }

  render() {
    const {
      error,
      waiting,
      email,
      hasSubscribed
    } = this.state;
    const {
      hideCheckbox,
      inputEl: ElInput = Input,
      icon,
      iconPosition,
      classes = {},
      subscriptionLabel,
      subscribeBtnLabel = 'Get started'
    } = this.props;
    const label = subscriptionLabel || SUBSCRIPTION_LABEL;
    const inputIconProps = iconPosition ? {
      iconPosition,
      icon
    } : {};
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
      className: cx(styles.subscription__form, error && styles.subscription__form_error, classes.form),
      onSubmit: this.onSubmit
    }, /*#__PURE__*/React.createElement(ElInput, _extends({
      className: cx(styles.subscription__input, classes.emailInput),
      placeholder: "Enter your email",
      disabled: waiting,
      onChange: this.onEmailChangeDebounced,
      isError: !!error,
      errorText: error
    }, inputIconProps)), !hideCheckbox && /*#__PURE__*/React.createElement("div", {
      className: styles.checkBlock,
      onClick: this.onSelect
    }, /*#__PURE__*/React.createElement(Checkbox, {
      isActive: hasSubscribed,
      className: cx(styles.checkbox, hasSubscribed && classes.selectedCheckbox),
      disabled: waiting || !email
    }), /*#__PURE__*/React.createElement("div", {
      className: cx(styles.subscription__label, classes.subscriptionLabel)
    }, label)), /*#__PURE__*/React.createElement(Button, {
      variant: "fill",
      accent: "positive",
      className: cx(styles.subscription__btn, classes.getStartedBtn),
      disabled: waiting,
      type: "submit"
    }, waiting ? 'Waiting...' : subscribeBtnLabel)));
  }

}

export default graphql(EMAIL_LOGIN_MUTATION, {
  name: 'emailLogin'
})(SubscriptionForm);