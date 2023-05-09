const _excluded = ["onDuplicate", "template", "buttonLabel"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import DialogForm from './DialogForm';
import { notifyDuplication } from '../notifications';
import { useCreateTemplate } from '../gql/hooks';
export default (_ref => {
  let {
    onDuplicate,
    template,
    buttonLabel = 'Duplicate'
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    title
  } = template;
  const [createTemplate, {
    loading
  }] = useCreateTemplate();

  function onSubmit({
    title,
    description
  }) {
    const {
      metrics,
      project,
      options
    } = template;
    createTemplate({
      title,
      description,
      metrics,
      isPublic: false,
      projectId: +project.id,
      options: options
    }).then(onDuplicate).then(notifyDuplication);
  }

  return /*#__PURE__*/React.createElement(DialogForm, _extends({
    title: "Duplicate Chart Layout"
  }, props, {
    onFormSubmit: onSubmit,
    buttonLabel: buttonLabel,
    defaultValue: title ? title + ' copy' : title,
    isLoading: loading
  }));
});