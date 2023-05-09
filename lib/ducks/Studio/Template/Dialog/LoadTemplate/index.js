const _excluded = ["placeholder", "onFormSubmit", "templates", "selectedTemplate", "selectTemplate", "rerenderTemplate", "currentUserId", "projectId", "redirect", "isFeatured", "asProject", "asLink"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect, useCallback } from 'react';
import { compose } from 'recompose';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Dialog from '@santiment-network/ui/Dialog';
import Search from '@santiment-network/ui/Search';
import Tabs from '@santiment-network/ui/Tabs';
import Icon from '@santiment-network/ui/Icon';
import Template, { openTemplate } from './Template';
import { templateSorter, useFeaturedTemplates, usePublicProjectTemplates } from '../../gql/hooks';
import TemplateDetailsDialog from '../../TemplateDetailsDialog/TemplateDetailsDialog';
import NoChartLayouts from '../../NoChartLayouts/NoChartLayouts';
import { prepareTemplateLink } from '../../utils';
import styles from './index.module.css';
const TABS = {
  PROJECT: 'Explore',
  OWN: 'My library'
};
const TABS_FOR_USER = [TABS.OWN, TABS.PROJECT];

const LoadTemplate = _ref => {
  let {
    placeholder,
    onFormSubmit,
    templates,
    selectedTemplate,
    selectTemplate,
    rerenderTemplate,
    currentUserId,
    projectId,
    redirect,
    isFeatured = false,
    asProject,
    asLink
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const [tab, setTab] = useState(TABS.OWN);
  const [searchTerm, setSearchTerm] = useState('');
  const [openedTemplate, setOpenedTemplate] = useState();
  const [projectTemplates = [], loadingProjectTemplates] = isFeatured ? useFeaturedTemplates() : usePublicProjectTemplates(projectId);
  const getUsageTemplates = useCallback(() => {
    if (tab === TABS.PROJECT) {
      return projectTemplates.filter(({
        user: {
          id
        }
      }) => +id !== +currentUserId);
    } else {
      return templates;
    }
  }, [TABS, tab, projectTemplates, currentUserId, templates]);
  const search = useCallback(() => {
    const lowerCaseValue = searchTerm.toLowerCase();
    const templates = getUsageTemplates();
    const filtered = lowerCaseValue ? templates.filter(({
      title
    }) => title.toLowerCase().includes(lowerCaseValue)) : templates;
    setFilteredTemplates(filtered);
  }, [searchTerm, getUsageTemplates, setFilteredTemplates]);
  useEffect(() => {
    if (templates.length === 0 && projectTemplates.length > 0) {
      setTab(TABS.PROJECT);
    } else {
      setTab(TABS.OWN);
    }
  }, [templates, loadingProjectTemplates]);
  useEffect(search, [tab, searchTerm, templates.length]);
  const rerenderTemplates = useCallback(() => {
    setFilteredTemplates(state => state.slice());
  }, [setFilteredTemplates]);
  const onRename = useCallback(template => {
    rerenderTemplates && rerenderTemplates();
    rerenderTemplate && rerenderTemplate(template);
  }, [rerenderTemplate, rerenderTemplates]);
  const onDelete = useCallback(() => {
    setOpenedTemplate();
  }, [setOpenedTemplate]);
  return /*#__PURE__*/React.createElement(Dialog, _extends({
    title: openedTemplate ? /*#__PURE__*/React.createElement("div", {
      onClick: () => setOpenedTemplate(),
      className: styles.header
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "arrow-left-big",
      className: styles.headerIcon
    }), " ", openedTemplate.title) : 'Load Chart Layout',
    classes: styles
  }, props), !openedTemplate ? /*#__PURE__*/React.createElement(React.Fragment, null, !loadingProjectTemplates && /*#__PURE__*/React.createElement(Tabs, {
    options: TABS_FOR_USER,
    defaultSelectedIndex: tab,
    onSelect: tab => {
      setTab(tab);
    },
    className: styles.tabs,
    classes: styles,
    disabledClassName: styles.disabledTab
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.search
  }, /*#__PURE__*/React.createElement(Search, {
    className: styles.searchInput,
    placeholder: "Search chart layout...",
    value: searchTerm,
    onChange: setSearchTerm
  })), /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: styles.wrapper
  }, filteredTemplates.length === 0 ? /*#__PURE__*/React.createElement(NoChartLayouts, null) : filteredTemplates.sort(templateSorter).map(template => /*#__PURE__*/React.createElement(Template, {
    key: template.id,
    template: template,
    selectedTemplate: selectedTemplate,
    selectTemplate: template => {
      template && redirect(prepareTemplateLink(template));
      selectTemplate && selectTemplate(template);
    },
    rerenderTemplates: rerenderTemplates,
    rerenderTemplate: rerenderTemplate,
    onOpenTemplate: setOpenedTemplate,
    onRename: onRename,
    asProject: asProject,
    asLink: asLink
  })))) : /*#__PURE__*/React.createElement(TemplateDetailsDialog, {
    template: openedTemplate,
    onRename: onRename,
    onDelete: onDelete,
    isDialog: false,
    selectTemplate: data => {
      selectTemplate ? selectTemplate(data) : openTemplate({
        redirect,
        template: data,
        asProject
      });
    }
  }));
};

const mapStateToProps = state => {
  return {
    currentUserId: state.user.data ? +state.user.data.id : null
  };
};

const mapDispatchToProps = dispatch => ({
  redirect: (path = '/') => {
    dispatch(push(path));
  }
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(LoadTemplate);