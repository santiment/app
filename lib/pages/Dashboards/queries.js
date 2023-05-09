import gql from 'graphql-tag';
export const METRIC_BOUNDARIES_QUERY = gql`
  query ($metric: String!) {
    getMetric(metric: $metric) {
      metadata {
        isRestricted
      }
    }
  }
`;