import React, { useState } from 'react';
import Button from '@santiment-network/ui/Button';
import Dialog from '@santiment-network/ui/Dialog';
import cx from 'classnames';
import Loader from '@santiment-network/ui/Loader/Loader';
import styles from './PlanPipedriveDialog.module.css';

function useFormLoading() {
  const [loading, setLoading] = useState(true);

  function toggleLoading(newSt) {
    setLoading(state => newSt);
  }

  return [loading, toggleLoading];
}

const PipedriveBtn = ({
  title,
  label,
  src,
  className
}) => {
  const [loading, toggleLoading] = useFormLoading();

  const startLoading = () => toggleLoading(true);

  const stopLoading = () => toggleLoading(false);

  return /*#__PURE__*/React.createElement(Dialog, {
    title: "Contact Information",
    classes: {
      dialog: styles.dialog
    },
    trigger: /*#__PURE__*/React.createElement(Button, {
      className: cx(styles.link, className),
      accent: "positive",
      variant: "fill"
    }, label),
    onOpen: startLoading
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.dialog__content
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.dialog__loading, !loading && styles.dialog__loading_end)
  }, loading && /*#__PURE__*/React.createElement(Loader, null)), /*#__PURE__*/React.createElement("iframe", {
    title: title,
    height: "100%",
    width: "100%",
    frameBorder: "0",
    src: src,
    onLoad: stopLoading
  })));
};

export default PipedriveBtn;