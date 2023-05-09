function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { TEMPLATE_QUERY, TEMPLATES_QUERY, FEATURED_TEMPLATES_QUERY, PUBLIC_PROJECT_TEMPLATES_QUERY, CREATE_TEMPLATE_MUTATION, UPDATE_TEMPLATE_MUTATION, DELETE_TEMPLATE_MUTATION } from './index';
import { buildTemplateMetrics, getTemplateIdFromURL, saveLastTemplate } from '../utils';
import { addRecentTemplate } from '../../../../utils/recent';
import { store } from '../../../../redux';
import { client } from '../../../../apollo';
import { getSavedMulticharts } from '../../../../utils/localStorage';
import { showNotification } from '../../../../actions/rootActions';
const DEFAULT_TEMPLATES = [];

function buildTemplatesCacheUpdater(reducer) {
  return (cache, {
    data
  }) => {
    const variables = {
      userId: +store.getState().user.data.id
    };
    const {
      templates
    } = cache.readQuery({
      variables,
      query: TEMPLATES_QUERY
    });
    cache.writeQuery({
      variables,
      query: TEMPLATES_QUERY,
      data: {
        templates: reducer(data, templates)
      }
    });
  };
}

const updateTemplatesOnDelete = buildTemplatesCacheUpdater(({
  template: {
    id: deletedId
  }
}, templates) => {
  return templates.filter(({
    id
  }) => id !== deletedId);
});
const updateTemplatesOnUpdate = buildTemplatesCacheUpdater(({
  template
}, templates) => {
  return templates.map(t => t.id === template.id ? template : t);
});
const updateTemplatesOnCreation = buildTemplatesCacheUpdater(({
  template
}, templates) => [template].concat(templates));
export const templateSorter = (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt);

function sortTemplates(templates) {
  return templates ? templates.sort(templateSorter) : [];
}

export function useUserTemplates(id) {
  const {
    data,
    loading,
    error
  } = useQuery(TEMPLATES_QUERY, {
    skip: !id,
    variables: {
      userId: +id
    }
  });
  return [data ? sortTemplates(data.templates) : DEFAULT_TEMPLATES, loading, error];
}
export function usePublicProjectTemplates(projectId) {
  const {
    data,
    loading,
    error
  } = useQuery(PUBLIC_PROJECT_TEMPLATES_QUERY, {
    skip: !projectId,
    variables: {
      projectId: +projectId
    }
  });
  return [data ? data.templates : DEFAULT_TEMPLATES, loading, error];
}
export function useFeaturedTemplates() {
  const {
    data,
    loading,
    error
  } = useQuery(FEATURED_TEMPLATES_QUERY);
  return [data ? data.templates.filter(({
    isPublic
  }) => isPublic) : DEFAULT_TEMPLATES, loading, error];
}
export const getTemplate = id => client.query({
  query: TEMPLATE_QUERY,
  fetchPolicy: 'network-only',
  variables: {
    id
  }
}).then(({
  data: {
    template
  }
}) => template);
export function useSelectedTemplate(templates, selectTemplate) {
  const urlId = getTemplateIdFromURL();
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [loading, setLoading] = useState();

  const loadTemplate = () => {
    if (loading || !urlId) {
      return;
    }

    const targetTemplate = {
      id: +urlId
    };
    setSelectedTemplate(targetTemplate);
    setLoading(true);
    getTemplate(targetTemplate.id).then(template => {
      setSelectedTemplate(template);

      if (template && template.id) {
        addRecentTemplate(template.id);
      }

      if (urlId) {
        selectTemplate(template);
      }
    }).catch(err => {
      if (urlId) {
        store.dispatch(showNotification({
          variant: 'error',
          title: 'Chart Layout with id ' + targetTemplate.id + " is private or doesn't exist"
        }));
      }
    }).finally(data => {
      setLoading(false);
    });
  };

  useEffect(loadTemplate, [urlId]);
  useEffect(() => {
    saveLastTemplate(selectedTemplate);
  }, [selectedTemplate]);
  return [selectedTemplate, setSelectedTemplate, loading];
}
export function useCreateTemplate() {
  const [mutate, data] = useMutation(CREATE_TEMPLATE_MUTATION, {
    update: updateTemplatesOnCreation
  });

  function createTemplate(newConfig) {
    if (!newConfig.options) {
      newConfig.options = {
        multi_chart: getSavedMulticharts()
      };
    }

    newConfig.options = JSON.stringify(newConfig.options);
    return mutate({
      variables: {
        settings: newConfig
      }
    }).then(({
      data: {
        template
      }
    }) => template);
  }

  return [createTemplate, data];
}
export function useDeleteTemplate() {
  const [mutate, {
    loading
  }] = useMutation(DELETE_TEMPLATE_MUTATION, {
    update: updateTemplatesOnDelete,
    notifyOnNetworkStatusChange: true
  });

  function deleteTemplate({
    id
  }, onDelete) {
    return mutate({
      variables: {
        id: +id
      }
    }).then(onDelete);
  }

  return [deleteTemplate, loading];
}
export function useUpdateTemplate() {
  const [mutate, data] = useMutation(UPDATE_TEMPLATE_MUTATION, {
    update: updateTemplatesOnUpdate
  });

  function updateTemplate(oldTemplate, newConfig) {
    const {
      id,
      title,
      description,
      project,
      metrics,
      options
    } = oldTemplate;
    const {
      projectId,
      options: newOptions
    } = newConfig;
    return mutate({
      variables: {
        id: +id,
        settings: {
          title: newConfig.title || title,
          description: newConfig.description || description,
          isPublic: newConfig.isPublic,
          options: JSON.stringify(_objectSpread(_objectSpread(_objectSpread({}, options), newOptions), {}, {
            multi_chart: getSavedMulticharts()
          })),
          projectId: +(projectId || project.id),
          metrics: buildTemplateMetrics(newConfig) || metrics
        }
      }
    }).then(({
      data: {
        template
      }
    }) => _extends(oldTemplate, template));
  }

  return [updateTemplate, data];
}