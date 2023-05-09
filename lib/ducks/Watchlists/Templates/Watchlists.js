import React from 'react';
import cx from 'classnames';
import Checkboxes from '@santiment-network/ui/Checkboxes';
import { PROJECT } from '../detector';
import { hasAssetById } from '../utils';
import NewWatchlist from '../Actions/New';
import NewBtn from '../Actions/New/NewBtn';
import { VisibilityIndicator } from '../../../components/VisibilityIndicator';
import { LoaderImage } from '../../../components/Loader/PageLoader';
import styles from './Watchlists.module.css';

const Watchlists = ({
  lists = [],
  projectId,
  slug,
  onWatchlistClick,
  withNewButton = true,
  classes = {},
  loading = false,
  source
}) => {
  let watchlistsContent = loading ? /*#__PURE__*/React.createElement("div", {
    className: styles.loading
  }, /*#__PURE__*/React.createElement(LoaderImage, null), " ", /*#__PURE__*/React.createElement("p", null, "Loading ...")) : /*#__PURE__*/React.createElement("div", null, "You don't have any watchlists yet.");

  if (lists.length > 0) {
    watchlistsContent = lists.map(({
      id,
      name,
      isPublic,
      listItems = []
    }) => /*#__PURE__*/React.createElement("div", {
      className: styles.watchlist,
      key: id
    }, /*#__PURE__*/React.createElement(Checkboxes, {
      className: styles.checkbox,
      options: [name],
      defaultSelectedIndexes: hasAssetById({
        listItems,
        id: projectId
      }) ? [name] : [],
      key: id,
      labelOnRight: true,
      labelClassName: styles.label,
      onSelect: () => onWatchlistClick({
        id,
        slug,
        listItems
      })
    }), /*#__PURE__*/React.createElement(VisibilityIndicator, {
      isPublic: isPublic
    })));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.listWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.list, classes.list)
  }, watchlistsContent)), withNewButton && /*#__PURE__*/React.createElement(NewWatchlist, {
    source: source,
    type: PROJECT,
    openOnSuccess: false,
    trigger: /*#__PURE__*/React.createElement(NewBtn, {
      border: true,
      className: styles.watchlistNew
    })
  }));
};

export default Watchlists;