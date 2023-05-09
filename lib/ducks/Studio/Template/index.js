const _excluded = ["className", "currentUser", "widgets", "souldReloadOnSave", "setWidgets", "onProjectSelect", "location"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useState, useCallback } from 'react';
import { track } from 'san-webkit/lib/analytics';
import { Event } from 'san-studio/lib/analytics';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import { withRouter } from 'react-router-dom';
import Button from '@santiment-network/ui/Button';
import Panel from '@santiment-network/ui/Panel';
import TemplateButton from './Button';
import TemplateTitle from './Title';
import { buildTemplateMetrics, extractTemplateProject, getChartWidgetsFromTemplate } from './utils';
import { notifySave } from './notifications';
import { useUserTemplates, useUpdateTemplate, useSelectedTemplate, useCreateTemplate } from './gql/hooks';
import DialogFormNewTemplate from './Dialog/NewTemplate';
import DialogFormRenameTemplate from './Dialog/RenameTemplate';
import DialogLoadTemplate from './Dialog/LoadTemplate';
import DeleteTemplate from './Dialog/Delete/DeleteTemplate';
import ShareTemplate from './Share/ShareTemplate';
import { isUserAuthorOfTemplate } from './Dialog/LoadTemplate/utils';
import { useKeyboardCmdShortcut } from '../hooks';
import { normalizeWidgets } from '../url/generate';
import { useUser } from '../../../stores/user';
import { useProjectById } from '../../../hooks/project';
import { PATHS } from '../../../paths';
import { useCtrlSPress } from '../../../hooks/eventListeners';
import { addRecentTemplate } from '../../../utils/recent';
import styles from './index.module.css';

const Action = props => /*#__PURE__*/React.createElement(Button, _extends({}, props, {
  fluid: true,
  variant: "ghost"
}));

const isMac = /(Mac|iPhone|iPod|iPad)/i.test(window.navigator.platform);

const Template = _ref => {
  let {
    className,
    currentUser,
    widgets,
    souldReloadOnSave = true,
    setWidgets,
    onProjectSelect,
    location: {
      pathname
    }
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    user
  } = useUser();
  const {
    projectId,
    saveWidgets = normalizeWidgets
  } = props;
  const [templates] = useUserTemplates(user && user.id);
  const [updateTemplate] = useUpdateTemplate();
  const [createTemplate] = useCreateTemplate();
  const [isLoadDialogOpened, setIsLoadDialogOpened] = useState(false);
  const projectFromUrl = extractTemplateProject();
  const [urlProject] = useProjectById(projectFromUrl);

  window.selectLayout = layout => {
    setSelectedTemplate(layout);
    addRecentTemplate(layout.id);
  };

  const selectTemplate = template => {
    setSelectedTemplate(template);
    if (!template) return;
    const {
      project
    } = template;

    if (onProjectSelect && !projectFromUrl && project) {
      onProjectSelect(project);
    }

    const parseTemplate = props.parseTemplate || getChartWidgetsFromTemplate;
    setWidgets(parseTemplate(template));
    addRecentTemplate(template.id);
    track.event(Event.LoadLayout, {
      id: template.id
    });
  };

  const [selectedTemplate, setSelectedTemplate, loading] = useSelectedTemplate(templates, selectTemplate);
  const toggleLoadDialog = useCallback(() => {
    setIsLoadDialogOpened(!isLoadDialogOpened);
  }, [setIsLoadDialogOpened, isLoadDialogOpened]);
  useKeyboardCmdShortcut('l', toggleLoadDialog);
  useEffect(() => {
    if (onProjectSelect && urlProject) {
      onProjectSelect(urlProject);
    }
  }, [urlProject]);
  useEffect(() => {
    if (pathname === PATHS.CHARTS) {
      selectTemplate();
    }
  }, [pathname]);
  useCtrlSPress(() => {
    if (selectedTemplate) {
      saveTemplate();
    }
  });
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const hasTemplates = templates.length > 0;
  const openMenu = useCallback(() => {
    setIsMenuOpened(true);
  }, [setIsMenuOpened]);
  const closeLoadDialog = useCallback(() => {
    setIsLoadDialogOpened(false);
  }, [setIsLoadDialogOpened]);
  const closeMenu = useCallback(() => {
    setIsMenuOpened(false);
    closeLoadDialog();
  }, [setIsMenuOpened, closeLoadDialog]);
  const rerenderTemplate = useCallback(template => {
    if (selectedTemplate && selectedTemplate.id === template.id) {
      setSelectedTemplate(template);
    }
  }, [selectedTemplate, setSelectedTemplate]);
  const saveTemplate = useCallback(() => {
    const template = selectedTemplate || {};
    const {
      user: {
        id
      } = {},
      title,
      description
    } = template;
    const isCurrentUser = +id === +user.id;
    const metrics = widgets.map(({
      metrics
    }) => metrics).flat().filter(Boolean);
    const comparables = widgets.map(({
      comparables
    }) => comparables).flat().filter(Boolean);
    const options = {
      widgets: saveWidgets(widgets)
    };
    const future = isCurrentUser ? updateTemplate(template, {
      metrics,
      comparables,
      projectId,
      options
    }) : createTemplate({
      title,
      description,
      metrics: buildTemplateMetrics({
        metrics,
        comparables
      }),
      projectId: +projectId,
      options
    });
    future.then(template => {
      track.event(Event.SaveLayout, {
        id: template.id
      });
      return (souldReloadOnSave ? selectTemplate : setSelectedTemplate)(template);
    }).then(closeMenu).then(notifySave);
  }, [projectId, selectedTemplate, user, widgets, updateTemplate, createTemplate, selectTemplate, closeMenu, notifySave]);
  const onTemplateSelect = useCallback(template => {
    selectTemplate(template);
    closeMenu();
  }, [selectTemplate, closeMenu]);
  const onDelete = useCallback(() => {
    closeMenu();
  }, [closeMenu]);
  const isAuthor = isUserAuthorOfTemplate(user, selectedTemplate);
  const openLoadDialog = useCallback(() => {
    setIsLoadDialogOpened(true);
  }, [setIsLoadDialogOpened]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, selectedTemplate && /*#__PURE__*/React.createElement(TemplateTitle, {
    template: selectedTemplate
  }), /*#__PURE__*/React.createElement(ContextMenu, {
    open: isMenuOpened,
    onClose: closeMenu,
    position: "bottom",
    align: "start",
    trigger: /*#__PURE__*/React.createElement(TemplateButton, _extends({}, props, {
      selectedTemplate: selectedTemplate,
      widgets: widgets,
      hasTemplates: hasTemplates,
      openMenu: openMenu,
      saveTemplate: saveTemplate,
      onNewTemplate: onTemplateSelect,
      isMenuOpened: isMenuOpened,
      loading: loading,
      isLoggedIn: user
    }))
  }, /*#__PURE__*/React.createElement(Panel, {
    variant: "modal",
    className: styles.context
  }, selectedTemplate && /*#__PURE__*/React.createElement("div", {
    className: styles.group
  }, user && /*#__PURE__*/React.createElement(Action, {
    onClick: saveTemplate
  }, "Save ", /*#__PURE__*/React.createElement("span", {
    className: styles.copyAction
  }, isMac ? 'Cmd + S' : 'Ctrl + S')), /*#__PURE__*/React.createElement(DialogFormNewTemplate, _extends({}, props, {
    onClose: closeMenu,
    widgets: widgets,
    trigger: /*#__PURE__*/React.createElement(Action, null, "Save as new Chart Layout"),
    title: "Save as new Chart Layout",
    onNew: onTemplateSelect,
    buttonLabel: "Save"
  })), isAuthor && /*#__PURE__*/React.createElement(DialogFormRenameTemplate, {
    onClose: closeMenu,
    trigger: /*#__PURE__*/React.createElement(Action, null, "Edit"),
    template: selectedTemplate,
    onRename: closeMenu
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.group
  }, /*#__PURE__*/React.createElement(Action, {
    onClick: openLoadDialog
  }, "Load"), /*#__PURE__*/React.createElement(DialogFormNewTemplate, _extends({}, props, {
    onClose: closeMenu,
    widgets: widgets,
    trigger: /*#__PURE__*/React.createElement(Action, null, "New"),
    onNew: onTemplateSelect
  })), selectedTemplate && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ShareTemplate, {
    template: selectedTemplate,
    className: styles.shareBtn,
    fluid: true,
    variant: "ghost"
  }), /*#__PURE__*/React.createElement(DeleteTemplate, {
    isAuthor: isAuthor,
    onDelete: onDelete,
    closeMenu: closeMenu,
    template: selectedTemplate,
    className: styles.delete
  }))))), /*#__PURE__*/React.createElement(DialogLoadTemplate, {
    open: isLoadDialogOpened,
    onClose: closeMenu,
    selectedTemplate: selectedTemplate,
    selectTemplate: onTemplateSelect,
    updateTemplate: updateTemplate,
    rerenderTemplate: rerenderTemplate,
    templates: templates,
    projectId: projectId
  }));
};

export default withRouter(Template);