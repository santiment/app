function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import CreateAlert from './CreateAlert';
import AddToWatchlist from './AddToWatchlist';
import { useControlledActionsMenu } from '../../../components/ActionsMenu';
import styles from './index.module.css';

const CreateAlertTrigger = ({
  className,
  assets,
  address,
  isWithIcon
}) => /*#__PURE__*/React.createElement(CreateAlert, {
  assets: assets,
  address: address,
  trigger: isWithIcon ? /*#__PURE__*/React.createElement(Button, {
    className: styles.btn
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "signal",
    className: styles.btn__icon
  }), " Create Alert") : /*#__PURE__*/React.createElement("div", {
    className: className
  }, "Create Alert")
});

const Actions = ({
  address,
  infrastructure,
  assets,
  note
}) => {
  const {
    ActionsMenu,
    close
  } = useControlledActionsMenu();

  function onCommentClick() {
    const $comment = document.querySelector('textarea[name="comment"]');

    if ($comment) {
      $comment.focus();
      close();
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(ActionsMenu, {
    Trigger: props => /*#__PURE__*/React.createElement(CreateAlertTrigger, _extends({}, props, {
      assets: assets,
      address: address
    }))
  }, /*#__PURE__*/React.createElement(CreateAlertTrigger, {
    assets: assets,
    address: address,
    isWithIcon: true
  }), /*#__PURE__*/React.createElement(AddToWatchlist, {
    address: address,
    infrastructure: infrastructure,
    note: note
  }), /*#__PURE__*/React.createElement(Button, {
    className: styles.btn,
    onClick: onCommentClick
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "comment",
    className: styles.btn__icon
  }), "Comment")));
};

export default Actions;