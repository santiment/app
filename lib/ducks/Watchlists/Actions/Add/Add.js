import React, { useState, useEffect } from 'react';
import Dialog from '@santiment-network/ui/Dialog';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import Loader from '@santiment-network/ui/Loader/Loader';
import NewWatchlist from '../New';
import NewBtn from '../New/NewBtn';
import { store } from '../../../../redux';
import { BLOCKCHAIN_ADDRESS } from '../../detector';
import { showNotification } from '../../../../actions/rootActions';
import { VisibilityIndicator } from '../../../../components/VisibilityIndicator';
import styles from './Add.module.css';

const Watchlist = ({
  watchlist,
  isActive,
  onClick
}) => {
  const {
    name,
    isPublic
  } = watchlist;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.watchlist,
    onClick: () => onClick(watchlist)
  }, /*#__PURE__*/React.createElement(Checkbox, {
    className: styles.checkbox,
    isActive: isActive
  }), name, /*#__PURE__*/React.createElement(VisibilityIndicator, {
    className: styles.publicity,
    isPublic: isPublic
  }));
};

const Watchlists = ({
  selections,
  onLoaded,
  onWatchlistClick,
  getWatchlists
}) => {
  const [watchlists, isLoading] = getWatchlists();
  useEffect(() => {
    if (!isLoading) onLoaded(watchlists);
  }, [isLoading]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.watchlists
  }, isLoading && /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }), isLoading || watchlists.length ? watchlists.map(watchlist => /*#__PURE__*/React.createElement(Watchlist, {
    key: watchlist.id,
    watchlist: watchlist,
    isActive: selections.has(watchlist),
    onClick: onWatchlistClick
  })) : "You don't have any watchlists yet."), /*#__PURE__*/React.createElement(NewWatchlist, {
    type: BLOCKCHAIN_ADDRESS,
    openOnSuccess: false,
    trigger: /*#__PURE__*/React.createElement(NewBtn, {
      border: true,
      disabled: isLoading,
      className: styles.new
    })
  }));
};

const SET = new Set();

const AddToWatchlistDialog = ({
  title = 'Add to watchlist',
  trigger,
  getWatchlists,
  checkIsWatchlistSelected,
  onChangesApply
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [initialSelections, setInitialSelections] = useState(SET);
  const [selections, setSelections] = useState(SET);
  const [isWithoutChanges, setIsWithoutChanges] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function openDialog() {
    setIsOpened(true);
  }

  function closeDialog() {
    setIsOpened(false);
  }

  function onWatchlistsLoaded(watchlists) {
    const watchlistsSet = new Set(watchlists.filter(checkIsWatchlistSelected));
    setInitialSelections(watchlistsSet);
    setSelections(watchlistsSet);
  }

  function toggleWatchlist(watchlist) {
    const newSelections = new Set(selections);
    let isWithoutChanges = true;

    if (newSelections.has(watchlist)) {
      newSelections.delete(watchlist);
    } else {
      newSelections.add(watchlist);
    }

    if (newSelections.size !== initialSelections.size) {
      isWithoutChanges = false;
    } else {
      const newSelectionsArray = [...newSelections];

      for (let i = 0; i < newSelectionsArray.length; i++) {
        if (!initialSelections.has(newSelectionsArray[i])) {
          isWithoutChanges = false;
          break;
        }
      }
    }

    setIsWithoutChanges(isWithoutChanges);
    setSelections(newSelections);
  }

  function applyChanges() {
    const removedFromSet = new Set(initialSelections);
    const addedToSet = new Set(selections);
    removedFromSet.forEach(watchlist => {
      if (addedToSet.has(watchlist)) {
        addedToSet.delete(watchlist);
        removedFromSet.delete(watchlist);
      }
    });
    const amountModified = addedToSet.size + removedFromSet.size;
    setIsLoading(true);
    onChangesApply([...addedToSet], [...removedFromSet]).then(() => {
      setIsLoading(false);
      setIsOpened(false);
      store.dispatch(showNotification(`${amountModified} watchlist${amountModified > 1 ? 's were' : ' was'} modified`));
    });
  }

  return /*#__PURE__*/React.createElement(Dialog, {
    open: isOpened,
    title: title,
    trigger: trigger,
    onOpen: openDialog,
    onClose: closeDialog
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    withPadding: true,
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(Watchlists, {
    selections: selections,
    getWatchlists: getWatchlists,
    onWatchlistClick: toggleWatchlist,
    onLoaded: onWatchlistsLoaded
  })), /*#__PURE__*/React.createElement(Dialog.Actions, {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Dialog.Cancel, {
    onClick: closeDialog
  }, "Cancel"), /*#__PURE__*/React.createElement(Dialog.Approve, {
    className: styles.approve,
    disabled: isLoading || isWithoutChanges,
    isLoading: isLoading,
    onClick: applyChanges
  }, "Apply")));
};

export default AddToWatchlistDialog;