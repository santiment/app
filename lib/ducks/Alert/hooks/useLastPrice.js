import { useQuery } from '@apollo/react-hooks';
import { LAST_PRICE_QUERY } from './queries';
export const useLastPrice = slugTitle => {
  const {
    data,
    loading
  } = useQuery(LAST_PRICE_QUERY, {
    variables: {
      slug: slugTitle
    },
    skip: !slugTitle || typeof slugTitle !== 'string'
  });
  return {
    data: data && data.metric.price,
    loading
  };
};