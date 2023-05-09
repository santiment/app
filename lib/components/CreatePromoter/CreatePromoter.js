import React from 'react';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import Button from '@santiment-network/ui/Button';
import { showNotification } from '../../actions/rootActions';
import { PROMOTER_MUTATION } from '../../pages/Account/AffiliateSettings/promotersGql';
import styles from './CreatePromoter.module.css';

const CreatePromoter = ({
  userData,
  showAlert,
  setData
}) => {
  const {
    email
  } = userData;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(Mutation, {
    mutation: PROMOTER_MUTATION
  }, (createPromoter, data) => {
    const {
      loading,
      data: {
        createPromoter: createPromoterData
      } = {}
    } = data;

    if (createPromoterData) {
      setData && setData(createPromoterData);
    }

    return /*#__PURE__*/React.createElement(Button, {
      variant: "fill",
      accent: "positive",
      isLoading: loading,
      onClick: () => email ? createPromoter() : showAlert()
    }, "Create referral link");
  }));
};

const mapStateToProps = ({
  user: {
    data = {}
  }
}) => {
  return {
    userData: data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAlert: () => {
      dispatch(showNotification({
        variant: 'error',
        title: 'You need to have valid email address'
      }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePromoter);