import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { Dialog, Label } from '@santiment-network/ui';
import { store } from '../../../../redux';
import { showNotification } from '../../../../actions/rootActions';
import NotificationActions from '../../../../components/NotificationActions/NotificationActions';
import { USER_EDIT_ASSETS_IN_LIST } from '../../../../actions/types';
import { ALL_PROJECTS_FOR_SEARCH_QUERY } from '../../gql/allProjectsGQL';
import EditableList from './EditableList';
import { hasAssetById } from '../../utils';
import { useIsAuthor } from '../../gql/list/hooks';
import SearchProjects from '../../../../components/Search/SearchProjects';
import styles from './EditAssets.module.css';

const WatchlistEdit = ({
  assets,
  trigger,
  name,
  onSave,
  watchlistUi: {
    editableWatchlists
  },
  data: {
    allProjects
  },
  id,
  sendChanges,
  watchlist
}) => {
  const {
    isAuthor
  } = useIsAuthor(watchlist);
  const [isShown, setIsShown] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [listItems, setListItems] = useState(assets);
  const [editWatchlistState, setEditWatchlistState] = useState(editableWatchlists);
  const [cachedAssets, setCachedAssets] = useState();

  const close = () => {
    setEditing(false);
    setIsShown(false);
  };

  const open = () => setIsShown(true);

  const applyChanges = () => {
    setCachedAssets(assets);
    sendChanges({
      listItems,
      assetsListId: id
    });
  };

  const toggleAsset = ({
    project,
    listItems,
    isAssetInList
  }) => {
    if (!isEditing) setEditing(true);
    setListItems(isAssetInList ? listItems.filter(({
      id
    }) => id !== project.id) : [...listItems, project]);
  };

  if (editableWatchlists.length !== editWatchlistState.length) {
    setEditWatchlistState(editableWatchlists);

    if (editableWatchlists.length === 0 && isShown) {
      onSave && onSave(() => {
        store.dispatch(showNotification({
          variant: 'info',
          title: `"${name}" was modified`,
          description: /*#__PURE__*/React.createElement(NotificationActions, {
            isOpenLink: false,
            onClick: () => {
              sendChanges({
                listItems: cachedAssets,
                assetsListId: id
              });
              onSave();
            }
          }),
          dismissAfter: 8000
        }));
      });
      close();
    }
  }

  if (!isEditing && assets !== listItems) setListItems(assets);

  if (!isAuthor) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Dialog, {
    title: `Edit "${name}"`,
    trigger: trigger,
    onOpen: open,
    onClose: close,
    open: isShown
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(SearchProjects, {
    noTrends: true,
    watchlistItems: listItems,
    isEditingWatchlist: true,
    className: styles.search,
    onSuggestionSelect: ({
      item: project
    }) => toggleAsset({
      project,
      listItems,
      isAssetInList: hasAssetById({
        listItems,
        id: project.id
      })
    }),
    inputProps: {
      autoFocus: true
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.contentWrapper
  }, /*#__PURE__*/React.createElement(Label, {
    accent: "waterloo",
    className: styles.heading
  }, "Contained in watchlist"), /*#__PURE__*/React.createElement(EditableList, {
    isContained: true,
    items: listItems,
    assetsListId: id,
    listItems: listItems,
    onToggle: toggleAsset
  }), /*#__PURE__*/React.createElement(Label, {
    accent: "waterloo",
    className: styles.heading
  }, "Add more assets"), /*#__PURE__*/React.createElement(EditableList, {
    items: allProjects,
    assetsListId: id,
    listItems: listItems,
    onToggle: toggleAsset
  }))), /*#__PURE__*/React.createElement(Dialog.Actions, {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Dialog.Cancel, {
    onClick: close
  }, "Cancel"), /*#__PURE__*/React.createElement(Dialog.Approve, {
    disabled: editWatchlistState.length > 0 || !isEditing,
    onClick: applyChanges,
    isLoading: editWatchlistState.length > 0,
    className: styles.approve
  }, "Apply")));
};

const mapStateToProps = ({
  watchlistUi
}) => ({
  watchlistUi
});

const mapDispatchToProps = dispatch => ({
  sendChanges: ({
    assetsListId,
    listItems
  }) => dispatch({
    type: USER_EDIT_ASSETS_IN_LIST,
    payload: {
      assetsListId,
      listItems,
      currentId: assetsListId
    }
  })
});

export default compose(graphql(ALL_PROJECTS_FOR_SEARCH_QUERY, {
  options: () => ({
    context: {
      isRetriable: true
    },
    variables: {
      minVolume: 0
    }
  })
}), connect(mapStateToProps, mapDispatchToProps))(WatchlistEdit);