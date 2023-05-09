import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Loader from '@santiment-network/ui/Loader/Loader';
import Dialog from '@santiment-network/ui/Dialog';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import SearchProjects from '../../../../../../components/Search/SearchProjects';
import { hasAssetById } from '../../../../../Watchlists/utils';
import ProjectsList from './ProjectsList';
import { useDialogState } from '../../../../../../hooks/dialog';
import styles from './TriggerProjectsSelector.module.css';

const validateTarget = ({
  force,
  listItems,
  projects,
  setSelectedAssets,
  target
}) => {
  const hasSelectedItems = listItems.length > 0;

  if (force || !hasSelectedItems) {
    const targetAssets = Array.isArray(target) ? target : [target];

    if (targetAssets.length > 0 && projects.length > 0) {
      const preSelected = projects.filter(({
        slug: projectSlug
      }) => {
        return targetAssets.some(({
          value,
          slug
        } = {}) => value === projectSlug || slug === projectSlug);
      });
      setSelectedAssets(preSelected);
    } else if (force) {
      setSelectedAssets([]);
    }
  }

  if (!force) {
    const emptyTarget = Array.isArray(target) && target.length === 0;

    if (emptyTarget && hasSelectedItems) {
      setSelectedAssets([]);
    }
  }
};

export const TriggerProjectsSelector = ({
  projects = [],
  setFieldValue,
  onChange,
  target,
  name,
  trigger: Trigger = ProjectsSelectorTrigger,
  title = 'Select assets',
  isSingle = false,
  isLoading = false
}) => {
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, {
      className: styles.loader
    });
  }

  const {
    isOpened,
    openDialog,
    closeDialog
  } = useDialogState();
  const [listItems, setListItems] = useState([]);
  const checkedAssetsAsSet = useMemo(() => {
    return new Set(listItems);
  }, [listItems]);
  useEffect(() => {
    function listenHotkey({
      target,
      ctrlKey,
      code
    }) {
      if (target === document.body && ctrlKey && code === 'KeyK') {
        openDialog();
      }
    }

    window.addEventListener('keypress', listenHotkey);
    return () => window.removeEventListener('keypress', listenHotkey);
  }, []);
  const approve = useCallback((selected, shouldClose = true) => {
    setFieldValue && setFieldValue(name, selected);
    onChange && onChange(selected, closeDialog);

    if (shouldClose) {
      closeDialog();
    }
  }, [setFieldValue, onChange, closeDialog]);
  const setSelectedAssets = useCallback(selected => {
    const newItems = isSingle && selected.length > 0 ? [selected[selected.length - 1]] : selected;

    if (isSingle || listItems.length !== newItems.length) {
      setListItems(newItems);
    }

    approve(newItems, isSingle);
  }, [isSingle, setListItems, listItems, approve]);
  const validate = useCallback(force => {
    return validateTarget({
      force,
      listItems,
      projects,
      setSelectedAssets,
      target
    });
  }, [listItems, projects, setSelectedAssets, target]);
  useEffect(() => {
    validate();
  }, [target, projects]);
  const toggleAsset = useCallback(({
    project,
    listItems: items,
    isAssetInList
  }) => {
    if (isAssetInList) {
      setSelectedAssets(items.filter(({
        id
      }) => id !== project.id));
    } else {
      setSelectedAssets([...items, project]);
    }
  }, [setSelectedAssets]);
  const cancel = useCallback(() => {
    validate(true);
    closeDialog();
  }, [validate, closeDialog]);
  const onSuggestionSelect = useCallback(project => {
    if (project) {
      const target = project.item ? project.item : project;
      toggleAsset({
        project: target,
        listItems,
        isAssetInList: hasAssetById({
          listItems,
          id: target.id
        })
      });
    }
  }, [toggleAsset, listItems]);
  const onRemove = useCallback(project => {
    toggleAsset({
      project,
      listItems,
      isAssetInList: true
    });
  }, [toggleAsset, listItems]);
  const sortedProjects = useMemo(() => {
    return projects.slice().sort(({
      rank: a
    }, {
      rank: b
    }) => (a || Infinity) - (b || Infinity));
  }, [projects]);
  return /*#__PURE__*/React.createElement(Dialog, {
    title: title,
    open: isOpened,
    onClose: cancel,
    autoFocus: true,
    trigger: /*#__PURE__*/React.createElement("div", {
      onClick: openDialog
    }, /*#__PURE__*/React.createElement(Trigger, {
      listItems: listItems,
      onRemove: onRemove
    }))
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(SearchProjects, {
    noTrends: true,
    searchIconPosition: "left",
    className: styles.search,
    projects: sortedProjects,
    suggestionsProps: {
      style: {
        zIndex: 50
      }
    },
    checkedAssets: checkedAssetsAsSet,
    onSuggestionSelect: onSuggestionSelect,
    inputProps: {
      autoFocus: true
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.contentWrapper
  }, isSingle || /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProjectsList, {
    classes: styles,
    isContained: true,
    listItems: listItems,
    items: listItems,
    onToggleProject: toggleAsset
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.divider
  })), /*#__PURE__*/React.createElement(ProjectsList, {
    classes: styles,
    listItems: listItems,
    items: sortedProjects,
    hideCheckboxes: isSingle,
    onToggleProject: toggleAsset
  }))), !isSingle && /*#__PURE__*/React.createElement(Dialog.Actions, {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Dialog.Cancel, {
    onClick: cancel
  }, "Cancel"), /*#__PURE__*/React.createElement(Dialog.Approve, {
    disabled: !listItems || listItems.length === 0,
    className: styles.approve,
    onClick: () => {
      approve(listItems);
    },
    isLoading: isLoading
  }, "Apply")));
};
export const ProjectsSelectorTrigger = ({
  listItems,
  onRemove
}) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: styles.assetsSelect
}, /*#__PURE__*/React.createElement(AssetsListDescription, {
  assets: listItems,
  onRemove: onRemove
})), listItems.length === 0 && /*#__PURE__*/React.createElement("div", {
  className: "error error-message"
}, "Please, pick an asset(s)"));

const AssetsListDescription = ({
  assets,
  label = 'Pick an asset(s)',
  onRemove
}) => {
  if (!assets || !assets.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.label
    }, label);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.assetGroup
  }, assets.map(asset => {
    const {
      id,
      name,
      slug,
      label
    } = asset;
    return /*#__PURE__*/React.createElement("span", {
      className: styles.asset,
      key: id || name
    }, /*#__PURE__*/React.createElement("span", {
      className: styles.name
    }, name || slug || label), /*#__PURE__*/React.createElement(Button, {
      type: "button",
      className: styles.close,
      onClick: e => {
        e.stopPropagation();
        onRemove(asset);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "close-small",
      className: styles.closeIcon
    })));
  }));
};