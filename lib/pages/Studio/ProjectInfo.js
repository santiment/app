import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import AddToWatchlist from '../../ducks/Watchlists/Actions/Add';
import ChartSignalCreationDialog from '../../ducks/SANCharts/ChartSignalCreationDialog';
import { useUser } from '../../stores/user';
import styles from './index.module.css';

const ProjectInfo = ({
  studio,
  settings
}) => {
  const [actionsNode, setActionsNode] = useState();
  const {
    slug
  } = settings;
  const {
    isLoggedIn
  } = useUser();
  const [knockNumber, setKnockNumber] = useState(0);
  useEffect(() => {
    if (!studio) return;

    if (knockNumber > 0) {
      setKnockNumber(0);
    }

    setActionsNode(document.querySelector('.project-actions'));
  }, [studio]);
  return actionsNode ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AddToWatchlist, {
    trigger: /*#__PURE__*/React.createElement(Button, {
      border: true,
      className: cx('btn btn--green', styles.watchlist)
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "add-watchlist",
      className: styles.btn__icon
    }), "Watch"),
    projectId: settings.projectId,
    slug: slug,
    isLoggedIn: isLoggedIn
  }), /*#__PURE__*/React.createElement(ChartSignalCreationDialog, {
    slug: slug,
    trigger: /*#__PURE__*/React.createElement(Button, {
      border: true,
      className: cx(styles.btn, styles.signal, 'mrg-s mrg--l')
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "signal",
      className: styles.btn__icon
    }), "Add alert")
  })), actionsNode)) : null;
};

export default ProjectInfo;