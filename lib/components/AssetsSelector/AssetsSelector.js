import React, { useMemo, useState, useRef } from 'react';
import cx from 'classnames';
import Panel from '@santiment-network/ui/Panel';
import Input from '@santiment-network/ui/Input';
import Item from '../../ducks/Watchlists/Widgets/Filter/EntryPoint/Item';
import { useProject } from '../../hooks/project';
import { toggleByKey } from '../../pages/Index/Section/KeystackeholdersEvents/StakeholderLabels/StakeholderLabels';
import { useOnClickOutside } from '../../hooks/click';
import styles from './AssetsSelector.module.css';

const ProjectItem = ({
  project: targetProject,
  slug,
  addItemInState,
  selected
}) => {
  const [project = targetProject] = useProject(!targetProject && slug);
  const {
    ticker,
    slug: targetSlug = slug,
    name = slug
  } = project || {};
  return /*#__PURE__*/React.createElement(Item, {
    key: targetSlug,
    onClick: () => {
      addItemInState(targetSlug);
    },
    isActive: selected,
    name: name,
    ticker: ticker,
    id: targetSlug,
    className: styles.item
  });
};

const AssetsSelector = ({
  onChange,
  selected,
  projects,
  slugs,
  className
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowPanel(false));

  function onChangeSearch(e) {
    setSearchTerm(e.target.value);
  }

  function addItemInState(slug) {
    toggleByKey(slug, selected, onChange);
  }

  function filterBySearch(list) {
    if (!searchTerm) {
      return list;
    }

    const term = searchTerm.toLowerCase();
    return list.filter(slug => slug.indexOf(term) !== -1);
  }

  const selectedAssets = useMemo(() => {
    return filterBySearch(Object.keys(selected));
  }, [selected, searchTerm]);
  const selectableAssets = useMemo(() => {
    const cache = new Set(selectedAssets);
    return filterBySearch(slugs.filter(s => !cache.has(s)));
  }, [selectedAssets, slugs, searchTerm]);
  const countSelected = selectedAssets.length;
  const isResetVisible = selectableAssets.length > 0;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper,
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.trigger, className),
    onClick: () => setShowPanel(old => !old)
  }, "All assets", countSelected > 0 ? `: ${countSelected}` : ''), /*#__PURE__*/React.createElement(Panel, {
    className: cx(styles.panel, showPanel && styles.panel_show)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement(Input, {
    type: "text",
    onChange: onChangeSearch,
    defaultValue: searchTerm,
    className: styles.search,
    placeholder: "Search for asset"
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.scroller
  }, countSelected > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Selected assets"), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.list, !isResetVisible && styles.noMargin)
  }, selectedAssets.map(slug => {
    return /*#__PURE__*/React.createElement(ProjectItem, {
      key: slug,
      slug: slug,
      project: projects[slug],
      addItemInState: addItemInState,
      selected: true
    });
  }))), selectableAssets.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Assets"), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.list, styles.noMargin)
  }, selectableAssets.map(slug => {
    return /*#__PURE__*/React.createElement(ProjectItem, {
      key: slug,
      slug: slug,
      project: projects[slug],
      addItemInState: addItemInState,
      selected: false
    });
  }))))), isResetVisible ? /*#__PURE__*/React.createElement("div", {
    className: styles.reset,
    onClick: () => {
      onChange(slugs.reduce((acc, s) => {
        acc[s] = true;
        return acc;
      }, {}));
    }
  }, "Select all") : /*#__PURE__*/React.createElement("div", {
    className: styles.reset,
    onClick: () => {
      onChange({});
    }
  }, "Deselect all")));
};

export default AssetsSelector;