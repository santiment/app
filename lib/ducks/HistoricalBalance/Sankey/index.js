import React, { useState } from 'react';
import Loadable from 'react-loadable';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Loader from '../../../components/Loader/PageLoader';
import styles from './index.module.css';
const LoadableGraph = Loadable({
  loader: () => import('./Graph'),
  loading: () => /*#__PURE__*/React.createElement(Loader, null)
});

const Sankey = ({
  settings
}) => {
  const [isOpened, setIsOpened] = useState();
  const {
    address
  } = settings;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, isOpened && /*#__PURE__*/React.createElement("div", {
    className: styles.graph
  }, /*#__PURE__*/React.createElement(LoadableGraph, {
    address: address
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.btn, isOpened && styles.btn_opened),
    onClick: () => setIsOpened(!isOpened)
  }, isOpened ? 'Hide' : 'Show', " Money Flow Infographic", /*#__PURE__*/React.createElement(Icon, {
    type: isOpened ? 'arrow-up' : 'arrow-down',
    className: styles.arrow
  })));
};

export default Sankey;