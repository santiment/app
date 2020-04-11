import { useQuery, useMutation } from '@apollo/react-hooks'
import { TEMPLATES_QUERY, CREATE_TEMPLATE_MUTATION } from './index'
import { store } from '../../../../index'

const DEFAULT_TEMPLATES = []

function updateTemplatesCache (cache, { data: { template } }) {
  const variables = { userId: +store.getState().user.data.id }

  const { templates } = cache.readQuery({
    variables,
    query: TEMPLATES_QUERY
  })

  cache.writeQuery({
    variables,
    query: TEMPLATES_QUERY,
    data: { templates: [template].concat(templates) }
  })
}

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
    update: updateTemplatesCache
  })

  function createTemplate (title) {
    return mutate({
      variables: {
        settings: {
          title,
          metrics: ['price_usd'],
          projectId: +'1505'
        }
      }
    })
  }

  return [createTemplate, data]
}
