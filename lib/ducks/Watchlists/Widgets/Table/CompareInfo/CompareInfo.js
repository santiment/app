import React from 'react';
import Actions from './Actions/index';
import { useDeleteWatchlistItems, useAddWatchlistItems } from './Actions/hooks';
import styles from './CompareInfo.module.css';

const CompareInfo = ({
  type,
  selected,
  cleanAll,
  watchlist,
  refetchAssets,
  widgets
}) => {
  const {
    removeWatchlistItems
  } = useDeleteWatchlistItems();
  const {
    addWatchlistItems
  } = useAddWatchlistItems();
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, ['SCREENER', 'PROJECT'].includes(type) && /*#__PURE__*/React.createElement(Actions, {
    widgets: widgets,
    type: type,
    selected: selected,
    assets: watchlist.listItems.map(item => item.project),
    watchlist: watchlist,
    onAdd: (watchlistId, listItems, onAddDone) => addWatchlistItems({
      variables: {
        id: watchlistId,
        listItems
      }
    }).then(() => refetchAssets(onAddDone)),
    onRemove: (watchlistId, listItems, onRemoveDone) => removeWatchlistItems({
      variables: {
        id: watchlistId,
        listItems
      }
    }).then(() => refetchAssets(onRemoveDone))
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.text
  }, selected.length, " asset", selected.length !== 1 ? 's are ' : ' is ', "selected"), selected.length > 0 && cleanAll && /*#__PURE__*/React.createElement("div", {
    className: styles.clean,
    onClick: cleanAll
  }, "Clear all")));
};

export default CompareInfo;