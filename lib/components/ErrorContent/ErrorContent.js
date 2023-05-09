import React from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import * as Sentry from '@sentry/react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import Button from '@santiment-network/ui/Button';
import ErrorSvg from '../Illustrations/Error';
import IncorrectRoute from '../Illustrations/IncorrectRoute';
import NoUser from '../Illustrations/NoUser';
import { showNotification } from '../../actions/rootActions';
import styles from './ErrorContent.module.css';

const ErrorContent = ({
  addNot,
  type = 'error'
}) => {
  const history = useHistory();

  function onErrorClick(e) {
    copy(e.target.innerText);
    addNot({
      variant: 'success',
      title: 'Successfully copied on clipboard!'
    });
  }

  const errorsTypes = {
    error: {
      title: 'Something went wrong',
      description: 'Our team has been notified, but you can send us more details.',
      addAction: onErrorClick,
      btnParams: {
        title: 'Send report',
        action: () => {
          Sentry.showReportDialog();
        }
      },
      img: /*#__PURE__*/React.createElement(ErrorSvg, {
        className: styles.img
      })
    },
    incorrectRoute: {
      title: 'Looks like you get lost',
      description: 'This page is missing or you assembled the link incorrectly.',
      btnParams: {
        title: 'Back to home page',
        action: () => {
          history.push('/');
        }
      },
      img: /*#__PURE__*/React.createElement(IncorrectRoute, {
        className: styles.img
      }),
      containerStyles: styles.bigImgContainer
    },
    noUser: {
      title: 'No such user here',
      description: "This page seems to be missing or the link you've entered is incorrect",
      btnParams: {
        title: 'Back to home page',
        action: () => {
          history.push('/');
        }
      },
      img: /*#__PURE__*/React.createElement(NoUser, {
        className: styles.img
      })
    }
  };
  const error = errorsTypes[type];
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, error.containerStyles)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, error.title), type === 'error' && /*#__PURE__*/React.createElement("div", {
    className: styles.error
  }, "Error ID:", ' ', /*#__PURE__*/React.createElement("span", {
    className: styles.eventId,
    onClick: error.addAction
  }, Sentry.lastEventId())), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, error.description), (Sentry.lastEventId() || type !== 'error') && /*#__PURE__*/React.createElement(Button, {
    onClick: error.btnParams.action,
    variant: "fill",
    accent: "positive",
    className: styles.btn
  }, error.btnParams.title)), error.img);
};

const mapDispatchToProps = dispatch => ({
  addNot: message => dispatch(showNotification(message))
});

export default connect(null, mapDispatchToProps)(ErrorContent);