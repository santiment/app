function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import Button from '@santiment-network/ui/Button';
import { useUser } from '../../../../../../../stores/user';
import LoginPopup from '../../../../../../../components/banners/feature/PopupBanner';
import EditForm from './EditForm';
import styles from './EditForm.module.css';
export const NewConfigTrigger = props => /*#__PURE__*/React.createElement(Button, _extends({
  variant: "flat",
  border: true,
  className: styles.trigger
}, props), "Save columns as set");

const UpdateConfig = ({
  trigger,
  onChange,
  sets,
  title,
  name,
  buttonLabel
}) => {
  const {
    isLoggedIn
  } = useUser();
  const [isOpened, setIsOpened] = useState(false);
  if (!isLoggedIn) return /*#__PURE__*/React.createElement(LoginPopup, null, trigger);
  return /*#__PURE__*/React.createElement(EditForm, {
    title: title,
    name: name,
    buttonLabel: buttonLabel,
    onFormSubmit: name => onChange(name).then(() => setIsOpened(false)),
    open: isOpened,
    sets: sets,
    toggleOpen: setIsOpened,
    trigger: trigger
  });
};

UpdateConfig.defaultProps = {
  trigger: /*#__PURE__*/React.createElement(NewConfigTrigger, null),
  title: 'New set',
  buttonLabel: 'Create'
};
export default UpdateConfig;