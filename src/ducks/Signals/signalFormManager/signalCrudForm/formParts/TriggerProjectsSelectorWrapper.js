import React from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import {
  ALL_ERC20_PROJECTS_QUERY,
  allProjectsForSearchGQL
} from '../../../../../pages/Projects/allProjectsGQL'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'

export const TriggerProjectsSelector = ({
  data: { projects = [] } = {},
  metaFormSettings,
  target,
  setFieldValue
}) => {
  const { ethAddress, target: defaultAsset } = metaFormSettings

  const options = projects.map(asset => ({
    label: asset.slug,
    value: asset.slug
  }))

  if (
    target &&
    target.value &&
    options.length > 0 &&
    !options.find(p => p.value === target.value)
  ) {
    setFieldValue('target', '')
  }

  return (
    <FormikSelect
      name='target'
      isDisabled={defaultAsset.isDisabled}
      defaultValue={defaultAsset.value.value}
      placeholder='Pick an asset'
      required
      options={options}
      onChange={newAsset => {
        if (ethAddress) {
          if (metaFormSettings.target.value.value === newAsset.value) {
            setFieldValue('ethAddress', ethAddress)
          } else {
            setFieldValue('ethAddress', '')
          }
        }
      }}
    />
  )
}

const mapDataToProps = type => ({ Projects, ownProps }) => {
  return {
    ...ownProps,
    data: {
      projects: Projects[pickProjects(type)] || []
    }
  }
}

const pickProjects = type => {
  const defaultPicker = 'allProjects'

  switch (type) {
    case 'all':
      return defaultPicker
    case 'erc20':
      return 'allErc20Projects'
    default:
      return defaultPicker
  }
}

const pickGQL = type => {
  const defaultQuery = allProjectsForSearchGQL
  switch (type) {
    case 'all':
      return defaultQuery
    case 'erc20':
      return ALL_ERC20_PROJECTS_QUERY
    default:
      return defaultQuery
  }
}

const TriggerProjectsSelectorWrapper = ({
  type = 'all'
}) => WrappedComponent => {
  return compose(
    graphql(pickGQL(type), {
      name: 'Projects',
      props: mapDataToProps(type),
      options: () => {
        return {
          errorPolicy: 'all'
        }
      }
    })
  )(WrappedComponent)
}

export default TriggerProjectsSelectorWrapper
