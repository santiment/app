import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { store } from '../../index';
import { showNotification } from '../../actions/rootActions';
import EditableInputSetting from './EditableInputSetting';
const TAKEN_MSG = 'has already been taken';
const CHANGE_USERNAME_MUTATION = gql`
  mutation changeUsername($value: String!) {
    changeUsername(username: $value) {
      username
    }
  }
`;

const validateUsername = username => {
  if (!username || username.length < 3) {
    return 'Username should be at least 3 characters long';
  }
};

const UsernameSetting = ({
  dispatchNewUsername,
  username,
  changeUsername
}) => {
  return /*#__PURE__*/React.createElement(EditableInputSetting, {
    label: "Username",
    defaultValue: username,
    validate: validateUsername,
    onSubmit: (value, revertValue) => changeUsername({
      variables: {
        value
      }
    }).then(() => {
      store.dispatch(showNotification(`Username successfully changed to "${value}"`));
      dispatchNewUsername(value);
    }).catch(error => {
      if (error.graphQLErrors[0].details.username.includes(TAKEN_MSG)) {
        store.dispatch(showNotification({
          variant: 'error',
          title: `Username "${value}" is already taken`
        }));
      }
    })
  });
};

export default graphql(CHANGE_USERNAME_MUTATION, {
  name: 'changeUsername'
})(UsernameSetting);