import gql from 'graphql-tag'

export const TEMPLATE_COMMON_FRAGMENT = gql`
  fragment templateCommon on ChartConfiguration {
    id
    isPublic
    title
    metrics
    project {
      id
      slug
      name
      ticker
    }
    __typename
  }
`

export const TEMPLATES_QUERY = gql`
  query chartConfigurations($userId: Int) {
    templates: chartConfigurations(userId: $userId) {
      ...templateCommon
    }
  }
  ${TEMPLATE_COMMON_FRAGMENT}
`

export const TEMPLATE_QUERY = gql`
  query chartConfiguration($id: Int) {
    template: chartConfiguration(id: $id) {
      ...templateCommon
    }
  }
  ${TEMPLATE_COMMON_FRAGMENT}
`

export const CREATE_TEMPLATE_MUTATION = gql`
  mutation createChartConfiguration($settings: ProjectChartInputObject!) {
    template: createChartConfiguration(settings: $settings) {
      ...templateCommon
    }
  }
  ${TEMPLATE_COMMON_FRAGMENT}
`

export const UPDATE_TEMPLATE_MUTATION = gql`
  mutation updateChartConfiguration(
    $id: ID!
    $settings: ProjectChartInputObject!
  ) {
    template: updateChartConfiguration(id: $id, settings: $settings) {
      ...templateCommon
    }
  }
  ${TEMPLATE_COMMON_FRAGMENT}
`

export const DELETE_TEMPLATE_MUTATION = gql`
  mutation deleteChartConfiguration($id: ID!) {
    template: deleteChartConfiguration(id: $id) {
      id
    }
  }
`
