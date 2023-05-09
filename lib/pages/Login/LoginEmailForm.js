import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import cx from 'classnames';
import { Form, Formik } from 'formik';
import isEqual from 'lodash.isequal';
import { trackLoginStart, LoginType } from 'san-webkit/lib/analytics/events/general';
import { trackSignupStart } from 'san-webkit/lib/analytics/events/onboarding';
import { InputWithIcon as Input } from '@santiment-network/ui/Input';
import { PATHS } from '../../paths';
import { store } from '../../redux';
import { showNotification } from '../../actions/rootActions';
import MobileWrapper from './Mobile/MobileWrapper';
import FormikInput from '../../components/formik-santiment-ui/FormikInput';
import FormikEffect from '../../components/formik-santiment-ui/FormikEffect';
import { EMAIL_LOGIN_MUTATION } from '../../components/SubscriptionForm/loginGQL';
import styles from './index.module.css';
export const EmailForm = ({
  loading,
  loginEmail,
  setEmail,
  placeholder = 'Your email',
  label = 'Sign up',
  signUp,
  className
}) => {
  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      email: ''
    },
    onSubmit: ({
      email
    }) => {
      setEmail && setEmail(email);

      if (signUp) {
        trackSignupStart(LoginType.EMAIL);
      } else {
        trackLoginStart(LoginType.EMAIL);
      }

      loginEmail({
        variables: {
          email: email,
          consent: ''
        }
      });
    }
  }, ({
    validateForm
  }) => {
    return /*#__PURE__*/React.createElement(Form, {
      className: cx(styles.email__form, className)
    }, /*#__PURE__*/React.createElement(FormikEffect, {
      onChange: (current, prev) => {
        let {
          values: newValues
        } = current;

        if (!isEqual(newValues, prev.values)) {
          validateForm();
        }
      }
    }), /*#__PURE__*/React.createElement(FormikInput, {
      el: Input,
      icon: "mail",
      iconPosition: "left",
      required: true,
      placeholder: placeholder,
      name: "email",
      type: "email",
      className: styles.emailInput
    }), /*#__PURE__*/React.createElement("button", {
      className: cx(styles.submit, 'btn-1 body-2 row hv-center mrg-l mrg--t'),
      type: "submit"
    }, loading ? 'Waiting...' : label));
  });
};

const SuccessState = ({
  email,
  isDesktop,
  history,
  showBack = true
}) => {
  function clickHandler(event) {
    event.preventDefault();
    history.push(PATHS.LOGIN);
  }

  const child = /*#__PURE__*/React.createElement("div", {
    className: cx(styles.emailSuccess)
  }, /*#__PURE__*/React.createElement("h2", {
    className: cx(styles.title, styles.email__title)
  }, "Email Confirmation"), /*#__PURE__*/React.createElement("h3", {
    className: cx(styles.email__subtitle, styles.email__subtitleSuccess)
  }, "We just sent an email to ", /*#__PURE__*/React.createElement("span", {
    className: styles.emailCheck
  }, email), ". Please check your inbox and click on the confirmation link."), showBack && /*#__PURE__*/React.createElement("span", {
    className: cx(styles.email__link, styles.email__linkSuccess)
  }, "Back to", ' ', /*#__PURE__*/React.createElement("a", {
    href: PATHS.LOGIN,
    className: styles.loginLink,
    onClick: clickHandler
  }, "log in options")));
  return isDesktop ? child : /*#__PURE__*/React.createElement(MobileWrapper, {
    withHeader: true
  }, child);
};

const PrepareState = ({
  loading,
  loginEmail,
  setEmail,
  isDesktop
}) => {
  const child = /*#__PURE__*/React.createElement("div", {
    className: styles.loginViaEmail
  }, /*#__PURE__*/React.createElement("h2", {
    className: cx(styles.title, styles.email__title)
  }, "Welcome back"), /*#__PURE__*/React.createElement("h3", {
    className: styles.email__subtitle
  }, "Log in to your Sanbase account to access additional features of our platform"), /*#__PURE__*/React.createElement(EmailForm, {
    loading: loading,
    loginEmail: loginEmail,
    setEmail: setEmail,
    label: "Log in"
  }), /*#__PURE__*/React.createElement(Link, {
    to: PATHS.LOGIN,
    className: styles.email__link
  }, "Or choose", ' ', /*#__PURE__*/React.createElement(Link, {
    to: PATHS.LOGIN,
    className: styles.loginLink
  }, "another log in option")));
  return isDesktop ? child : /*#__PURE__*/React.createElement(MobileWrapper, {
    withHeader: true
  }, child);
};

const LoginEmailForm = ({
  isDesktop,
  history,
  prepareState: PrepareStateEl = PrepareState,
  showBack = true
}) => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  return /*#__PURE__*/React.createElement(Mutation, {
    mutation: EMAIL_LOGIN_MUTATION,
    key: location.key
  }, (loginEmail, {
    loading,
    data: {
      emailLogin: {
        success
      } = {}
    } = {}
  }) => {
    function login(data) {
      loginEmail(data).catch(() => {
        store.dispatch(showNotification({
          variant: 'error',
          title: 'Too many login attempts',
          description: 'Please try again after a few minutes'
        }));
      });
    }

    return success ? /*#__PURE__*/React.createElement(SuccessState, {
      email: email,
      isDesktop: isDesktop,
      history: history,
      showBack: showBack
    }) : /*#__PURE__*/React.createElement(PrepareStateEl, {
      loading: loading,
      loginEmail: login,
      setEmail: setEmail,
      isDesktop: isDesktop,
      history: history
    });
  });
};

export default LoginEmailForm;