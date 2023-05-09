import React, { useMemo } from 'react';
import { store } from '../../../../../../redux';
import { showNotification } from '../../../../../../actions/rootActions';
import NotificationActions from '../../../../../../components/NotificationActions/NotificationActions';
import Delete from './Delete';
import Copy from './Copy';
import SaveAs from './SaveAs';
import { useUser } from '../../../../../../stores/user';
import styles from './Actions.module.css';

const reportError = err => store.dispatch(showNotification({
  variant: 'error',
  title: err.message,
  dismissAfter: 2000
}));

const Actions = ({
  type,
  selected,
  watchlist,
  onAdd,
  onRemove,
  assets,
  widgets
}) => {
  const {
    user,
    isLoggedIn
  } = useUser();
  let isOwner = false;

  if (isLoggedIn) {
    const watchlistUserId = watchlist && watchlist.user.id;
    isOwner = watchlistUserId === user.id;
  }

  const selectedText = useMemo(() => `${selected.length} ${selected.length > 1 ? 'items' : 'item'}`, [selected]);

  function normalizeListItems(listItems) {
    if (['SCREENER', 'PROJECT'].includes(type)) {
      listItems = listItems.map(item => ({
        projectId: +item.id
      }));
    }

    return listItems;
  }

  function addHandler(listItems, onAddDone = () => {}) {
    onAdd(parseInt(watchlist.id), listItems, onAddDone).catch(reportError);
  }

  function removeHandler(listItems, onRemoveDone = () => {}) {
    onRemove(parseInt(watchlist.id), normalizeListItems(listItems), () => {
      store.dispatch(showNotification({
        variant: 'info',
        title: `${selectedText} deleted successfully.`,
        description: /*#__PURE__*/React.createElement(NotificationActions, {
          isOpenLink: false,
          onClick: () => addHandler(normalizeListItems(listItems))
        }),
        dismissAfter: 8000
      }));
      onRemoveDone();
    }).catch(reportError);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Copy, {
    selectedText: selectedText,
    watchlist: watchlist,
    assets: assets,
    selected: selected
  }), type === 'PROJECT' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SaveAs, {
    selectedText: selectedText,
    watchlist: watchlist,
    widgets: widgets
  }), isOwner && /*#__PURE__*/React.createElement(Delete, {
    selected: selected,
    onRemove: removeHandler,
    selectedText: selectedText
  })));
};

export default Actions;