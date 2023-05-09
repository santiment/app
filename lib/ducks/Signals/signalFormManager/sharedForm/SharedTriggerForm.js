import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import { couldShowChart } from '../../utils/utils';
import SignalPreview from '../../chart/preview/SignalPreview';
import NoSignalPreview from '../../chart/preview/NoSignalPreview';
import { SignalTypeIcon } from '../../../../components/SignalCard/controls/SignalControls';
import { DesktopOnly, MobileOnly } from '../../../../components/Responsive';
import CopySignal from '../../../../components/SignalCard/controls/CopySignal';
import { isStrictTrendingWords } from '../../../../components/SignalCard/card/utils';
import styles from './ShareTriggerForm.module.css';

const SharedTriggerForm = ({
  trigger,
  onClose,
  settings,
  originalTrigger,
  prepareAlertTitle,
  setIsPreview,
  shouldDisableActions
}) => {
  const {
    metric,
    type
  } = settings;

  if (!originalTrigger.id) {
    return null;
  }

  const {
    settings: originalSettings,
    settings: {
      target
    }
  } = originalTrigger;
  const showChart = target && couldShowChart(originalSettings);
  const isUnsupportedTrigger = isStrictTrendingWords(originalSettings);

  if (isUnsupportedTrigger) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.container
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.unsupported
    }, "This type of alerts is deprecated"));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, /*#__PURE__*/React.createElement(SignalTypeIcon, {
    type: type,
    metric: metric
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.link
  }, prepareAlertTitle(trigger.title))), /*#__PURE__*/React.createElement("div", {
    className: styles.backTesting
  }, showChart ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.preview
  }, /*#__PURE__*/React.createElement(SignalPreview, {
    trigger: trigger,
    type: metric.value
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.chartDivider
  })) : /*#__PURE__*/React.createElement(NoSignalPreview, null)), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(CopySignal, {
    signal: trigger,
    label: "Copy to my alerts",
    onClose: onClose,
    classes: {
      copyBtn: cx(styles.copyBtn, shouldDisableActions && 'c-waterloo')
    },
    as: "div",
    btnParams: {
      variant: 'fill',
      accent: 'positive',
      disabled: shouldDisableActions
    }
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: shouldDisableActions,
    className: styles.btnEdit,
    onClick: () => setIsPreview(false),
    border: true
  }, "Open alert")), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(CopySignal, {
    signal: trigger,
    label: "Add alert",
    onClose: onClose,
    classes: {
      copyBtn: cx(styles.copyBtn, shouldDisableActions && 'c-waterloo')
    },
    as: "div",
    btnParams: {
      fluid: true,
      accent: 'positive',
      disabled: shouldDisableActions
    }
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: shouldDisableActions,
    fluid: true,
    className: styles.btnEdit,
    onClick: () => setIsPreview(false)
  }, "Open alert"))));
};

export default SharedTriggerForm;