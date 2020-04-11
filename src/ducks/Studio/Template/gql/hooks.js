import { useQuery, useMutation } from '@apollo/react-hooks'
import { TEMPLATES_QUERY, CREATE_TEMPLATE_MUTATION } from './index'

const DEFAULT_TEMPLATES = []

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
  const [mutate, data] = useMutation(CREATE_TEMPLATE_MUTATION)

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
