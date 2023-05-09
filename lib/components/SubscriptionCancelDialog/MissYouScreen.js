import React, { useState } from 'react';
import cx from 'classnames';
import { track } from 'webkit/analytics';
import Button from '@santiment-network/ui/Button';
import Dialog from '@santiment-network/ui/Dialog';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import Sorry from './sorry.png';
import { POINTS, Event } from './utils';
import ContactUs from '../ContactUs/ContactUs';
import AccordionContent from '../AccordionContent';
import AutoresizeTextarea from '../AutoresizeTextarea';
import CryingCat from '../Illustrations/CryingCat';
import { contactAction, formatError } from '../../utils/notifications';
import styles from './MissYouScreen.module.css';
const ARR = [];

const MissYouScreen = ({
  closeDialog,
  cancelSubscription,
  addNot,
  loading,
  id
}) => {
  const [selectedPoints, setSelectedPoints] = useState(ARR);
  const [feedback, setFeedback] = useState('');

  function togglePoint(point) {
    const points = new Set(selectedPoints);

    if (!points.delete(point)) {
      points.add(point);
      track.event(Event.SelectReason, {
        reason: point
      });
    }

    setSelectedPoints([...points]);
  }

  function saveFeedback(text) {
    setFeedback(text);
  }

  function writeFeedback() {
    if (feedback) {
      track.event(Event.GiveFeedback, {
        feedback
      });
    }
  }

  return /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("h2", {
    className: styles.title
  }, "We\u2019re sorry to see you go", /*#__PURE__*/React.createElement("img", {
    src: Sorry,
    alt: "sad_emoji",
    width: 28,
    height: 29
  })), /*#__PURE__*/React.createElement("section", {
    className: styles.section
  }, /*#__PURE__*/React.createElement("p", {
    className: styles.text
  }, "Help us understand why:"), POINTS.map(point => /*#__PURE__*/React.createElement("div", {
    className: styles.point,
    key: point,
    onClick: () => togglePoint(point)
  }, /*#__PURE__*/React.createElement(Checkbox, {
    isActive: selectedPoints.includes(point)
  }), /*#__PURE__*/React.createElement("span", {
    className: styles.point__text
  }, point))), /*#__PURE__*/React.createElement(AccordionContent, {
    show: selectedPoints.length > 0
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: cx(styles.text, styles.text__last)
  }, "Just one last thing"), /*#__PURE__*/React.createElement(AutoresizeTextarea, {
    blurOnEnter: true,
    rowsCount: 3,
    name: "feedback",
    placeholder: "Your feedback",
    className: styles.textarea,
    onChange: saveFeedback
  })))), /*#__PURE__*/React.createElement(AccordionContent, {
    show: selectedPoints.length > 0
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.actions,
    onClick: writeFeedback
  }, /*#__PURE__*/React.createElement(ContactUs, {
    variant: "fill",
    accent: "positive",
    onClick: closeDialog,
    className: styles.btn,
    disabled: !feedback
  }, "Maybe we can help with that?"), /*#__PURE__*/React.createElement(Button, {
    accent: "positive",
    isLoading: loading,
    disabled: !feedback,
    onClick: () => cancelSubscription({
      variables: {
        subscriptionId: +id
      }
    }).then(() => {
      closeDialog();
      addNot({
        variant: 'success',
        title: `You have successfully canceled your subscription.`,
        description: 'We will miss you!',
        dismissAfter: 5000
      });
    }).catch(e => addNot({
      variant: 'error',
      title: `Error during the cancellation`,
      description: formatError(e.message),
      dismissAfter: 5000,
      actions: contactAction
    }))
  }, "Cancel subscription")))), /*#__PURE__*/React.createElement("div", {
    className: styles.divider
  }), /*#__PURE__*/React.createElement(CryingCat, {
    className: styles.image
  }));
};

export default MissYouScreen;