function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect, useCallback } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { checkIsLoggedIn } from '../../../pages/UserSelectors';
import { useSignal } from '../common/getSignal';
import { ALERT_ROUTES } from '../common/constants';
import ConfirmSignalModalClose from './confirmClose/ConfirmSignalModalClose';
import SignalDialog from './SignalDialog';
import SignalMaster from '../signalFormManager/signalMaster/SignalMaster';

const SignalMasterModalForm = ({
  label = 'Create alert',
  metaFormSettings,
  canRedirect = true,
  enabled = true,
  id: triggerId,
  isLoggedIn,
  match,
  trigger: dialogTrigger,
  buttonParams = {},
  dialogProps,
  shareParams = {},
  userId,
  redirect,
  previousPage = ALERT_ROUTES.ALERTS,
  defaultOpen = true,
  onClose,
  noLoginPopupContainer
}) => {
  const history = useHistory();
  const location = useLocation();
  const {
    id: shareId,
    isShared: isOldShared
  } = shareParams;

  if (!triggerId && match) {
    triggerId = match.params.id;
  } else if (isOldShared && shareId) {
    triggerId = shareId;
  }

  const hasTrigger = +triggerId > 0;
  const [dialogOpenState, setDialogOpenState] = useState(defaultOpen && hasTrigger);
  const [isApproving, setIsAppoving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    defaultOpen && setDialogOpenState(hasTrigger);
  }, [triggerId]);
  const onCancelClose = useCallback(() => {
    setIsAppoving(false);
  }, [setIsAppoving]);
  const goBack = useCallback(() => {
    if (hasTrigger) {
      canRedirect && redirect && redirect(previousPage);
    }
  }, [canRedirect, redirect, hasTrigger]);
  const closeDialog = useCallback(() => {
    setDialogOpenState(false);

    if (hasTrigger && location.pathname.includes(`/${triggerId}`)) {
      history.replace(location.pathname.replace(`/${triggerId}`, ''));
    }

    if (onClose) {
      onClose();
    }
  }, [setDialogOpenState, onClose]);
  const onApprove = useCallback(() => {
    setIsAppoving(false);
    closeDialog();
    goBack();
  }, [goBack, setIsAppoving, closeDialog]);
  const onCloseMainModal = useCallback(() => {
    if (isChanged && isLoggedIn) {
      setIsAppoving(true);
    } else {
      closeDialog();
      goBack();
    }
  }, [isChanged, setIsAppoving, closeDialog, goBack, isLoggedIn]);
  const formChangedCallback = useCallback(isChanged => {
    setIsChanged(isChanged);
  }, [setIsChanged]);
  const {
    data = {},
    loading: isLoading,
    error: isError
  } = useSignal({
    triggerId,
    skip: !dialogOpenState
  });
  const {
    trigger = {}
  } = data;
  const {
    authorId
  } = trigger;
  const isShared = isOldShared || !!authorId && +userId !== authorId;

  if (isShared && trigger && trigger.trigger) {
    trigger.trigger = _objectSpread(_objectSpread({}, trigger.trigger), shareParams);
  }

  trigger.userId = authorId;
  return /*#__PURE__*/React.createElement(React.Fragment, null, isApproving && /*#__PURE__*/React.createElement(ConfirmSignalModalClose, {
    isOpen: isApproving,
    onCancel: onCancelClose,
    onApprove: onApprove
  }), /*#__PURE__*/React.createElement(SignalDialog, {
    dialogOpenState: dialogOpenState,
    setDialogOpenState: setDialogOpenState,
    closeDialog: closeDialog,
    onCloseMainModal: onCloseMainModal,
    dialogTrigger: dialogTrigger,
    enabled: enabled,
    label: label,
    isError: isError,
    isShared: isShared,
    isLoggedIn: isLoggedIn,
    dialogProps: dialogProps,
    isLoading: isLoading,
    trigger: trigger,
    formChangedCallback: formChangedCallback,
    canRedirect: canRedirect,
    metaFormSettings: metaFormSettings,
    buttonParams: buttonParams,
    SignalMaster: SignalMaster,
    noLoginPopupContainer: noLoginPopupContainer
  }));
};

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state),
    userId: +state.user.data.id
  };
};

const mapDispatchToProps = dispatch => ({
  redirect: url => {
    dispatch(push(url || ALERT_ROUTES.ALERTS));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignalMasterModalForm);