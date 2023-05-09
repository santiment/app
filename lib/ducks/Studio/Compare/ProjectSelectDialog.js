const _excluded = ["activeSlug", "projects", "open", "onSelect", "onClose"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import Search from '@santiment-network/ui/Search';
import Dialog from '@santiment-network/ui/Dialog';
import Projects from './Projects';
import ProjectsSelectTabs from './ProjectSelectTabs';
import { assetsSorter } from '../../../components/Search/SearchProjects';
import styles from './ProjectSelectDialog.module.css';

const ProjectSelectDialog = _ref => {
  let {
    activeSlug,
    projects,
    open,
    onSelect,
    onClose
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const [allProjects, setAllProjects] = useState(projects);
  const [searchedProjects, setSearchedProjects] = useState(allProjects);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  useEffect(() => {
    if (!open) {
      setSearchedProjects(allProjects);
      setLastSearchTerm('');
    }
  }, [open]);
  useEffect(() => {
    searchProjects(lastSearchTerm);
  }, [allProjects]);

  function searchProjects(searchTerm) {
    const lowerCase = searchTerm.toLowerCase();
    setSearchedProjects(allProjects.filter(({
      ticker,
      name
    }) => name.toLowerCase().includes(lowerCase) || ticker.toLowerCase().includes(lowerCase)).sort(assetsSorter(searchTerm)));
    setLastSearchTerm(searchTerm);
  }

  function onDialogClose() {
    setSearchedProjects(allProjects);

    if (onClose) {
      onClose();
    }
  }

  function onTabSelect(projects, isLoading) {
    if (!projects || isLoading) return;
    setAllProjects(projects.filter(({
      slug
    }) => slug !== activeSlug));
  }

  return /*#__PURE__*/React.createElement(Dialog, _extends({
    title: "Select project",
    onClose: onDialogClose,
    open: open
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(Search, {
    className: styles.search,
    onChange: searchProjects,
    autoFocus: true
  }), /*#__PURE__*/React.createElement(ProjectsSelectTabs, _extends({}, rest, {
    onSelect: onTabSelect,
    className: styles.tabs
  })), /*#__PURE__*/React.createElement(Projects, {
    projects: searchedProjects,
    onSelect: onSelect,
    className: styles.projects
  })));
};

ProjectSelectDialog.defaultProps = {
  projects: []
};
export default ProjectSelectDialog;