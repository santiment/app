import React, { useEffect, useRef } from 'react';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { showNotification } from '../../actions/rootActions';
import EditableInputSetting from './EditableInputSetting';
import EditableInput from '../../ducks/Watchlists/Actions/WeeklyReport/EditableInput';
import { USER_EMAIL_CHANGE } from '../../actions/types';
import { connect } from 'react-redux';
import styles from './userName/UsernameSettings.module.css';
const TAKEN_MSG = 'Email has already been taken';
const CHANGE_EMAIL_MUTATION = gql`
  mutation changeEmail($value: String!) {
    changeEmail(email: $value) {
      success
    }
  }
`;

const EmailSetting = ({
  email,
  dispatchNewEmail,
  changeEmail,
  showNotification,
  hideIfEmail = false,
  classes,
  withoutButtons,
  isEmailConnected,
  onChangeStatus = () => {},
  statuses = {}
}) => {
  const show = !hideIfEmail || hideIfEmail && !email;
  const ref = useRef();
  useEffect(() => {
    if (ref && ref.current && ref.current.inputRef) {
      ref.current.inputRef.current.type = 'email';
    }
  }, []);

  const onSubmit = value => {
    onChangeStatus(statuses.loading);
    changeEmail({
      variables: {
        value
      }
    }).then(() => {
      onChangeStatus(statuses.success);
      showNotification(`Verification email was sent to "${value}"`);
      dispatchNewEmail(value);
    }).catch(error => {
      onChangeStatus(statuses.error);

      if (error.graphQLErrors[0].details.email.includes(TAKEN_MSG)) {
        showNotification({
          variant: 'error',
          title: `Email "${value}" is already taken`
        });
      }
    });
  };

  function validateEmail() {
    const input = ref.current.inputRef.current;
    if (!input) return;

    if (!input.value) {
      return 'Email is required';
    }

    if (input.validity.typeMismatch) {
      return 'Invalid email address';
    }
  }

  return (// NOTE(haritonasty): temporal solution - until designers don't update mockups for email setting
    withoutButtons ? /*#__PURE__*/React.createElement(EditableInput, {
      label: "Enter your email",
      ref: ref,
      defaultValue: email,
      validate: validateEmail,
      onSubmit: onSubmit,
      isEmailConnected: isEmailConnected
    }) : show ? /*#__PURE__*/React.createElement(EditableInputSetting, {
      ref: ref,
      label: "Email",
      defaultValue: email,
      validate: validateEmail,
      classes: classes || styles,
      onSubmit: onSubmit
    }) : null
  );
};

const mapStateToProps = ({
  user: {
    data: {
      email
    } = {}
  }
}) => ({
  email
});

const mapDispatchToProps = dispatch => ({
  dispatchNewEmail: email => dispatch({
    type: USER_EMAIL_CHANGE,
    email
  }),
  showNotification: data => dispatch(showNotification(data))
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), graphql(CHANGE_EMAIL_MUTATION, {
  name: 'changeEmail'
}));
export default enhance(EmailSetting);