const _excluded = ["onNew", "projectId", "widgets", "saveWidgets"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { track } from 'san-webkit/lib/analytics';
import { Event } from 'san-studio/lib/analytics';
import DialogForm from './DialogForm';
import { notifyCreation } from '../notifications';
import { buildTemplateMetrics } from '../utils';
import { useCreateTemplate } from '../gql/hooks';
import { normalizeWidgets } from '../../url/generate';

const NewTemplate = _ref => {
  let {
    onNew,
    projectId,
    widgets,
    saveWidgets = normalizeWidgets
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [createTemplate, {
    loading
  }] = useCreateTemplate();

  function onSubmit({
    title,
    description
  }) {
    const metrics = widgets.map(({
      metrics
    }) => metrics).flat().filter(Boolean);
    const comparables = widgets.map(({
      comparables
    }) => comparables).flat().filter(Boolean);
    const options = {
      widgets: saveWidgets(widgets)
    };
    createTemplate({
      title,
      description,
      options,
      metrics: buildTemplateMetrics({
        metrics,
        comparables
      }),
      projectId: +projectId
    }).then(template => {
      track.event(Event.NewLayout, {
        id: template.id
      });
      return onNew(template);
    }).then(notifyCreation);
  }

  return /*#__PURE__*/React.createElement(DialogForm, _extends({}, props, {
    title: "New Chart Layout",
    onFormSubmit: onSubmit,
    buttonLabel: "Create",
    isLoading: loading
  }));
};

export default NewTemplate;