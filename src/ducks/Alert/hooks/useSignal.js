import { useQuery } from '@apollo/react-hooks'
import { TRIGGER_BY_ID_QUERY } from './queries'

export const useSignal = ({ triggerId, skip }) => {
  const { data, loading, error } = useQuery(TRIGGER_BY_ID_QUERY, {
    skip: skip || !triggerId,
    variables: { id: +triggerId }
  })

  return { data, loading, error }
}
