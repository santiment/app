function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect, useCallback } from 'react';
import Dialog from '@santiment-network/ui/Dialog';
import { useTrackEvents } from '../../../hooks/tracking';
import PageLoader from '../../../components/Loader/PageLoader';
import LoginPopup from '../../../components/banners/feature/PopupBanner';
import { NoSignal, signalModalTrigger, TriggerModalTitle } from './SignalDialogComponents';
import styles from './SignalMasterModalForm.module.css';

const SignalDialog = ({
  dialogOpenState,
  setDialogOpenState,
  onCloseMainModal,
  closeDialog,
  dialogTrigger,
  enabled,
  label,
  isError,
  isShared,
  isLoggedIn,
  dialogProps,
  isLoading,
  trigger,
  formChangedCallback,
  canRedirect,
  metaFormSettings,
  buttonParams,
  SignalMaster,
  noLoginPopupContainer
}) => {
  const [dialogTitle, onSetDialogTitle] = useState('');
  const [isAnonWarning, setAnonWarning] = useState(false);
  const [isSharedPreview, setSharedPreview] = useState(isShared);
  const [trackEvent] = useTrackEvents();
  const {
    variant,
    border,
    classes
  } = buttonParams;
  const toggleAnon = useCallback((warn = true) => {
    setAnonWarning(warn);
  }, [setAnonWarning]);
  useEffect(() => toggleAnon(!isLoggedIn), [isLoggedIn]);
  useEffect(() => {
    if (isLoading) {
      toggleAnon(false);
    }
  }, [isLoading]);
  useEffect(() => {
    setSharedPreview(isShared);
  }, [isShared]);
  useEffect(() => {
    isSharedPreview && onSetDialogTitle('Alert details');
  }, [isSharedPreview]);
  const canOpen = (isLoggedIn || isShared) && !isAnonWarning;

  if ((isAnonWarning || !canOpen) && !isLoggedIn) {
    return /*#__PURE__*/React.createElement(LoginPopup, {
      noContainer: noLoginPopupContainer
    }, dialogTrigger || signalModalTrigger(enabled, label, variant, border));
  }

  return /*#__PURE__*/React.createElement(Dialog, _extends({
    defaultOpen: dialogOpenState,
    withAnimation: false,
    open: dialogOpenState,
    onOpen: () => {
      // Track opening New signal Dialog
      trackEvent({
        category: 'user',
        action: 'alerts',
        method: 'create_new_alert'
      }, ['ga', 'intercom', 'sanapi']);
      setDialogOpenState(true);
    },
    onClose: onCloseMainModal,
    trigger: dialogTrigger || signalModalTrigger(enabled, label, variant, border, classes),
    title: /*#__PURE__*/React.createElement(TriggerModalTitle, {
      showSharedBtn: isShared && !isSharedPreview,
      isError: isError,
      dialogTitle: dialogTitle,
      isLoggedIn: isLoggedIn
    }),
    classes: styles
  }, dialogProps), /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: styles.TriggerPanel
  }, isError && /*#__PURE__*/React.createElement(NoSignal, null), !isError && isLoading && /*#__PURE__*/React.createElement(PageLoader, {
    className: styles.loading
  }), !isError && !isLoading && /*#__PURE__*/React.createElement(React.Fragment, null, canOpen && /*#__PURE__*/React.createElement(SignalMaster, {
    setSharedPreview: setSharedPreview,
    isSharedPreview: isSharedPreview,
    isShared: isShared,
    trigger: trigger,
    setTitle: onSetDialogTitle,
    onClose: closeDialog,
    canRedirect: canRedirect,
    metaFormSettings: metaFormSettings,
    formChangedCallback: formChangedCallback,
    toggleAnon: toggleAnon
  }))));
};

export default SignalDialog;