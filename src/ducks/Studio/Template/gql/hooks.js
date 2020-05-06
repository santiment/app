import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  TEMPLATE_QUERY,
  TEMPLATES_QUERY,
  FEATURED_TEMPLATES_QUERY,
  PUBLIC_PROJECT_TEMPLATES_QUERY,
  CREATE_TEMPLATE_MUTATION,
  UPDATE_TEMPLATE_MUTATION,
  DELETE_TEMPLATE_MUTATION
} from './index'
import {
  buildTemplateMetrics,
  getLastTemplate,
  saveLastTemplate
} from '../utils'
import { store, client } from '../../../../index'
import { getSavedMulticharts } from '../../../../utils/localStorage'

const DEFAULT_TEMPLATES = []

function buildTemplatesCacheUpdater (reducer) {
  return (cache, { data }) => {
    const variables = { userId: +store.getState().user.data.id }

    const { templates } = cache.readQuery({
      variables,
      query: TEMPLATES_QUERY
    })

    cache.writeQuery({
      variables,
      query: TEMPLATES_QUERY,
      data: { templates: reducer(data, templates) }
    })
  }
}

const updateTemplatesOnDelete = buildTemplatesCacheUpdater(
  ({ template: { id: deletedId } }, templates) =>
    templates.filter(({ id }) => id !== deletedId)
)

const updateTemplatesOnCreation = buildTemplatesCacheUpdater(
  ({ template }, templates) => [template].concat(templates)
)

export function useUserTemplates (id) {
  const { data, loading, error } = useQuery(TEMPLATES_QUERY, {
    skip: !id,
    variables: {
      userId: +id
    }
  })

  return [data ? data.templates : DEFAULT_TEMPLATES, loading, error]
}

export function usePublicProjectTemplates (projectId) {
  const { data, loading, error } = useQuery(PUBLIC_PROJECT_TEMPLATES_QUERY, {
    skip: !projectId,
    variables: {
      projectId: +projectId
    }
  })

  return [data ? data.templates : DEFAULT_TEMPLATES, loading, error]
}

export function useFeaturedTemplates () {
  const { data, loading, error } = useQuery(FEATURED_TEMPLATES_QUERY)

  return [data ? data.templates : DEFAULT_TEMPLATES, loading, error]
}

export function useSelectedTemplate (defaultTemplate) {
  const [selectedTemplate, setSelectedTemplate] = useState()

  useEffect(() => {
    const savedTemplate = getLastTemplate()

    if (!savedTemplate) return

    setSelectedTemplate(savedTemplate)

    client
      .query({
        query: TEMPLATE_QUERY,
        fetchPolicy: 'network-only',
        variables: {
          id: +savedTemplate.id
        }
      })
      .then(({ data: { template } }) => setSelectedTemplate(template))
      .catch(console.warn)
  }, [])

  useEffect(
    () => {
      if (!selectedTemplate) {
        setSelectedTemplate(defaultTemplate)
      }
    },
    [defaultTemplate]
  )

  useEffect(
    () => {
      saveLastTemplate(selectedTemplate)
    },
    [selectedTemplate]
  )

  return [selectedTemplate, setSelectedTemplate]
}

export function useCreateTemplate () {
  const [mutate, data] = useMutation(CREATE_TEMPLATE_MUTATION, {
    update: updateTemplatesOnCreation
  })

  function createTemplate (newConfig) {
    if (!newConfig.options) {
      newConfig.options = JSON.stringify({
        multi_chart: getSavedMulticharts()
      })
    }

    return mutate({
      variables: {
        settings: newConfig
      }
    }).then(({ data: { template } }) => template)
  }

  return [createTemplate, data]
}

export function useDeleteTemplate () {
  const [mutate, data] = useMutation(DELETE_TEMPLATE_MUTATION, {
    update: updateTemplatesOnDelete
  })

  function deleteTemplate ({ id }, onDelete) {
    return mutate({
      variables: {
        id: +id
      }
    }).then(onDelete)
  }

  return [deleteTemplate, data]
}

export function useUpdateTemplate () {
  const [mutate, data] = useMutation(UPDATE_TEMPLATE_MUTATION)

  function updateTemplate (oldTemplate, newConfig) {
    const { id, title, description, project, metrics } = oldTemplate
    const { projectId } = newConfig

    return mutate({
      variables: {
        id: +id,
        settings: {
          title: newConfig.title || title,
          description: newConfig.description || description,
          isPublic: newConfig.isPublic,
          options: JSON.stringify({
            multi_chart: getSavedMulticharts()
          }),
          projectId: +(projectId || project.id),
          metrics: buildTemplateMetrics(newConfig) || metrics
        }
      }
    }).then(({ data: { template } }) => Object.assign(oldTemplate, template))
  }

  return [updateTemplate, data]
}
