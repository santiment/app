import React from 'react'
import gql from 'graphql-tag'
import Recent, { getItemBuilder, Column } from './Recent'
import PercentChanges from '../../../../components/PercentChanges'
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon'
import { usdFormatter } from '../../../../ducks/dataHub/metrics/formatters'
import styles from '../index.module.scss'

const getLink = ({ slug }) => `/studio?slug=${slug}`
const getItem = getItemBuilder(gql`
  query projectBySlug($id: String!) {
    item: projectBySlug(slug: $id) {
      id
      slug
      ticker
      logoUrl
      priceUsd
      percentChange24h
    }
  }
`)

const Asset = ({ ticker, logoUrl, priceUsd, percentChange24h }) => {
  if (!ticker) return null

  return (
    <>
      <Column>
        <ProjectIcon className={styles.icon} logoUrl={logoUrl} />
        {ticker}
      </Column>

      <Column>
        {usdFormatter(priceUsd)}
        <PercentChanges className={styles.change} changes={percentChange24h} />
      </Column>
    </>
  )
}

const Assets = ({ slugs }) => (
  <Recent
    title='Assets'
    rightHeader='Price, 24h change'
    ids={slugs}
    getItem={getItem}
    getLink={getLink}
    Item={Asset}
  />
)

export default Assets
