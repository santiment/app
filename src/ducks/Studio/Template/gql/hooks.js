import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  TEMPLATES_QUERY,
  CREATE_TEMPLATE_MUTATION,
  DELETE_TEMPLATE_MUTATION
} from './index'
import { store } from '../../../../index'

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

export function useCreateTemplate () {
  const [mutate, data] = useMutation(CREATE_TEMPLATE_MUTATION, {
    update: updateTemplatesOnCreation
  })

  function createTemplate (newTemplate) {
    return mutate({
      variables: {
        settings: newTemplate
      }
    })
  }

  return [createTemplate, data]
}

export function useDeleteTemplate () {
  const [mutate, data] = useMutation(DELETE_TEMPLATE_MUTATION, {
    update: updateTemplatesOnDelete
  })

  function deleteTemplate ({ id }) {
    return mutate({
      variables: {
        id: +id
      }
    })
  }

  return [deleteTemplate, data]
}
