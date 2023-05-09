import React from 'react';
import Dialog from '../../components/banners/feature/PopupBanner';

const LoginCTA = ({
  isLoginCTAOpened,
  setIsLoginCTAOpened
}) => /*#__PURE__*/React.createElement(Dialog, {
  open: isLoginCTAOpened,
  onClose: () => setIsLoginCTAOpened(false),
  noContainer: true
});

export default LoginCTA;