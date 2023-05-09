import { useQuery } from '@apollo/react-hooks';
import { TRIGGER_BY_ID_QUERY } from './queries';
export const useSignal = ({
  id,
  skip
}) => {
  const {
    data,
    loading,
    error
  } = useQuery(TRIGGER_BY_ID_QUERY, {
    skip: skip || !id,
    variables: {
      id: +id
    }
  });
  return {
    data,
    loading,
    error
  };
};