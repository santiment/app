import React from 'react'
import gql from 'graphql-tag'
import Recent, { getItemBuilder, Column } from './Recent'
import { getSEOLinkFromIdAndTitle } from '../../../../components/Insight/utils'

const getLink = ({ id, title }) =>
  `/studio/${id && getSEOLinkFromIdAndTitle(id, title)}`
const getItem = getItemBuilder(gql`
  query chartConfiguration($id: Int!) {
    item: chartConfiguration(id: $id) {
      id
      title
    }
  }
`)

const ChartLayout = ({ title }) => (title ? <Column>{title}</Column> : null)

const ChartLayouts = ({ ids }) => {
  return (
    <Recent
      title='Chart Layouts'
      rightHeader=''
      ids={ids}
      getItem={getItem}
      getLink={getLink}
      Item={ChartLayout}
    />
  )
}

export default ChartLayouts
