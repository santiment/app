import React from 'react'
import gql from 'graphql-tag'
import { client } from '../../../../apollo'
import Recent, { Column } from './Recent'
import PercentChanges from '../../../../components/PercentChanges'
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon'
import { usdFormatter } from '../../../../ducks/dataHub/metrics/formatters'
import styles from '../index.module.scss'

const getLink = ({ slug }) => `/charts?slug=${slug}`
const getData = ({ data }) => data.items.projects

const query = gql`
  query allProjectsByFunction($function: json) {
    items: allProjectsByFunction(function: $function) {
      projects {
        id
        slug
        ticker
        logoUrl
        darkLogoUrl
        priceUsd
        percentChange24h
      }
    }
  }
`

export const getSlugs = slugs => {
  const func = JSON.stringify({
    args: { baseProjects: [{ slugs }] },
    name: 'selector'
  })

  return client
    .query({ query, variables: { function: func } })
    .then(getData)
    .catch(console.warn)
}

const Asset = ({
  ticker,
  logoUrl,
  darkLogoUrl,
  priceUsd,
  percentChange24h
}) => {
  if (!ticker) return null

  return (
    <>
      <Column>
        <ProjectIcon
          className={styles.icon}
          logoUrl={logoUrl}
          darkLogoUrl={darkLogoUrl}
        />
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
    ids={[slugs]}
    getItem={getSlugs}
    getLink={getLink}
    Item={Asset}
  />
)

export default Assets
