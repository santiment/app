import React from 'react'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import Label from '@santiment-network/ui/Label'
import {
  TRENDING_WORDS_PROJECT_MENTIONED,
  TRENDING_WORDS_TYPE_OPTIONS,
  TRENDING_WORDS_WATCHLIST,
  TRENDING_WORDS_WORD_MENTIONED
} from '../../../utils/constants'
import { allProjectsForSearchGQL } from '../../../../../pages/Projects/allProjectsGQL'
import { mapToAssets } from '../../../utils/utils'
import { Creatable } from 'react-select'
import styles from '../signal/TriggerForm.module.scss'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'

const DEFAULT_WORDS = [
  {
    label: 'bitcoin',
    value: 'bitcoin'
  },
  {
    label: 'santiment',
    value: 'santiment'
  },
  {
    label: 'ethereum',
    value: 'ethereum'
  }
]

const TriggerFormTrendingWordsTypes = ({
  data: { allProjects = [] } = {},
  type
}) => {
  const isProjects = type.value === TRENDING_WORDS_PROJECT_MENTIONED.value
  const isWords = type.value === TRENDING_WORDS_WORD_MENTIONED.value
  const isProjectsOrWords = isProjects || isWords

  return (
    <div>
      <div className={cx(styles.row, styles.rowInner)}>
        <div
          className={cx(
            styles.Field,
            isProjectsOrWords ? styles.fieldFilled : ''
          )}
        >
          <Label accent='waterloo' className={styles.label}>
            Condition
          </Label>
          <FormikSelect
            name='type'
            placeholder={'Pick type'}
            options={TRENDING_WORDS_TYPE_OPTIONS}
          />
        </div>
        {type.value === TRENDING_WORDS_WATCHLIST.value && (
          <div className={styles.Field}>
            <Label accent='waterloo' className={styles.label}>
              &nbsp;
            </Label>

            <FormikInput
              name='trendingWordsWatchlistCount'
              placeholder='Input watchlist number'
              step='any'
              min={0}
              type='number'
            />
          </div>
        )}
      </div>

      {isProjectsOrWords && (
        <div className={styles.row}>
          <div className={cx(styles.Field, styles.fieldFilled)}>
            <Label accent='waterloo' className={styles.label}>
              Include
            </Label>

            {isProjects && (
              <FormikSelect
                multi={true}
                name='trendingWordsSelect'
                placeholder='Pick a project(s)'
                options={allProjects}
              />
            )}
            {isWords && (
              <FormikSelect
                componentType={Creatable}
                multi={true}
                simpleValue={true}
                name='trendingWordsSelect'
                placeholder='Pick a word(s)'
                options={DEFAULT_WORDS}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const mapDataToProps = ({ Projects: { allProjects }, ownProps }) => {
  const { data = {} } = ownProps
  return {
    ...ownProps,
    data: {
      allProjects: mapToAssets(allProjects, false) || data.allProjects
    }
  }
}

const enhance = compose(
  graphql(allProjectsForSearchGQL, {
    name: 'Projects',
    props: mapDataToProps,
    options: () => {
      return {
        errorPolicy: 'all'
      }
    }
  })
)

export default enhance(TriggerFormTrendingWordsTypes)
