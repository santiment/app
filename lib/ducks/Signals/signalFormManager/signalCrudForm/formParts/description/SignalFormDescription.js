import React from 'react';
import cx from 'classnames';
import FormikLabel from '../../../../../../components/formik-santiment-ui/FormikLabel';
import { MAX_DESCR_LENGTH } from '../../../../utils/constants';
import FormikTextarea from '../../../../../../components/formik-santiment-ui/FormikTextarea';
import styles from '../../signal/TriggerForm.module.css';

const SignalFormDescription = ({
  setFieldValue,
  description,
  className
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.Field, styles.fieldFilled)
  }, /*#__PURE__*/React.createElement(FormikLabel, {
    text: `Description (${(description || '').length}/${MAX_DESCR_LENGTH})`
  }), /*#__PURE__*/React.createElement(FormikTextarea, {
    placeholder: "Description of the alert",
    name: "description",
    className: cx(styles.descriptionTextarea, className),
    rowsCount: 3,
    maxLength: MAX_DESCR_LENGTH,
    onChange: () => setFieldValue('descriptionChangedByUser', true)
  })));
};

export default SignalFormDescription;