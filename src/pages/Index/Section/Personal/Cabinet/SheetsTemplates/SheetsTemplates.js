import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import ExpansionItem from '../../../../../../components/ExpansionItem/ExpansionItem'
import { DEFAULT_SHEETS_TEMPLATES } from './utils'
import { ProLabel } from '../../../../../../components/ProLabel'
import { useUserSubscriptionStatus } from '../../../../../../stores/user/subscriptions'
import Skeleton from '../../../../../../components/Skeleton/Skeleton'
import styles from './SheetsTemplates.module.scss'

const SHEETS_TEMPLATES_QUERY = gql`
  {
    getSheetsTemplates {
      url
      name
      description
      isPro
    }
  }
`

function useSheetsTemplates () {
  const { data, loading } = useQuery(SHEETS_TEMPLATES_QUERY)
  return {
    loading,
    templates: data ? data.getSheetsTemplates : []
  }
}

const SheetsTemplates = () => {
  const { loading, templates } = useSheetsTemplates()

  const { isPro } = useUserSubscriptionStatus()

  const list = templates.length > 0 ? templates : DEFAULT_SHEETS_TEMPLATES

  return (
    <>
      <Skeleton repeat={1} className={styles.skeleton} show={loading} />
      {!loading &&
        list.map(({ name, description, url, isPro: isProTemplate }) => {
          const requirePro = !isPro && isProTemplate

          return (
            <ExpansionItem
              title={
                <>
                  {name}
                  {requirePro && <ProLabel className={styles.pro} />}
                </>
              }
              key={name}
              classes={styles}
            >
              <div className={styles.description}>
                <div>{description}</div>

                {url && !requirePro && (
                  <Button
                    as='a'
                    target='_blank'
                    href={url}
                    accent='positive'
                    variant='fill'
                    className={styles.btn}
                  >
                    Open Template
                    <Icon type='external-link' className={styles.external} />
                  </Button>
                )}
              </div>
            </ExpansionItem>
          )
        })}
    </>
  )
}

export default SheetsTemplates
