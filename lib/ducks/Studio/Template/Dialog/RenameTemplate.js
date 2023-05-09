const _excluded = ["template", "onRename", "isAuthor"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { connect } from 'react-redux';
import DialogForm from './DialogForm';
import { notifyRename } from '../notifications';
import { useUpdateTemplate } from '../gql/hooks';
import { TemplateStatusToggle } from '../TemplateStatus/TemplateStatus';
import { isUserAuthorOfTemplate, usePublicTemplates } from './LoadTemplate/utils';
import styles from '../TemplateDetailsDialog/TemplateDetailsDialog.module.css';

const RenameTemplate = _ref => {
  let {
    template,
    onRename,
    isAuthor
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    title,
    description
  } = template;
  const [updateTemplate, {
    loading
  }] = useUpdateTemplate();

  function onSubmit({
    title,
    description
  }) {
    updateTemplate(template, {
      title,
      description
    }).then(onRename).then(notifyRename);
  }

  const {
    isPublic,
    toggleIsPublic
  } = usePublicTemplates(template);
  return /*#__PURE__*/React.createElement(DialogForm, _extends({}, props, {
    title: "Save Chart Layout as...",
    onFormSubmit: onSubmit,
    buttonLabel: "Save",
    defaultValue: title,
    description: description,
    isLoading: loading,
    actions: isAuthor ? /*#__PURE__*/React.createElement(TemplateStatusToggle, {
      isPublic: isPublic,
      classes: styles,
      toggleIsPublic: toggleIsPublic
    }) : null
  }));
};

const mapStateToProps = ({
  user
}, {
  template
}) => ({
  isAuthor: isUserAuthorOfTemplate(user, template)
});

export default connect(mapStateToProps)(RenameTemplate);