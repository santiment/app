import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import Panel from '@santiment-network/ui/Panel/Panel';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Copy from '../../Actions/Copy';
import Delete from '../../Actions/Delete';
import Edit from '../../Actions/Edit/EditAssets';
import WeeklyReport from '../../Actions/WeeklyReport';
import VisibilityToggle from '../../Actions/ChangeVisibility';
import { upperCaseFirstLetter } from '../../../../utils/formatting';
import styles from './WatchlistMobileActions.module.css';

const WatchlistActions = ({
  isAuthor,
  id,
  title,
  items,
  watchlist = {}
}) => {
  if (!watchlist) {
    return null;
  }

  const name = upperCaseFirstLetter(title);
  return /*#__PURE__*/React.createElement(ContextMenu, {
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "flat",
      className: styles.trigger
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "dots"
    })),
    passOpenStateAs: "isActive",
    position: "bottom",
    align: "end"
  }, /*#__PURE__*/React.createElement(Panel, {
    variant: "modal",
    className: styles.wrapper
  }, isAuthor && /*#__PURE__*/React.createElement("div", {
    className: styles.block
  }, /*#__PURE__*/React.createElement(VisibilityToggle, {
    watchlist: watchlist,
    fluid: true,
    variant: "ghost"
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.block
  }, isAuthor && /*#__PURE__*/React.createElement(Edit, {
    id: id,
    watchlist: watchlist,
    assets: items,
    name: name,
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      fluid: true
    }, "Edit assets")
  }), /*#__PURE__*/React.createElement(Copy, {
    id: id,
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      fluid: true
    }, "Copy assets to ...")
  }), isAuthor && /*#__PURE__*/React.createElement(WeeklyReport, {
    watchlist: watchlist,
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      fluid: true
    }, "Weekly report")
  }), isAuthor && /*#__PURE__*/React.createElement(Delete, {
    id: id,
    name: name,
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      fluid: true
    }, "Delete")
  }))));
};

export default WatchlistActions;