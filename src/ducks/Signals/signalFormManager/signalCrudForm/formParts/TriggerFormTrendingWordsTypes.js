import React, { useState } from 'react'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import Label from '@santiment-network/ui/Label'
import {
  TRENDING_WORDS_PROJECT_MENTIONED,
  TRENDING_WORDS_TYPE_OPTIONS,
  TRENDING_WORDS_WORD_MENTIONED
} from '../../../utils/constants'
import { allProjectsForSearchGQL } from '../../../../../pages/Projects/allProjectsGQL'
import styles from '../signal/TriggerForm.module.scss'
import { TriggerProjectsSelector } from './ProjectsSelector/TriggerProjectsSelector'
import { mapToAssets, mapToOptions } from '../../../utils/utils'

const TriggerFormTrendingWordsTypes = ({
  data: { allProjects = [] } = {},
  values: { type, trendingWordsWithAssets, trendingWordsWithWords },
  values,
  setFieldValue
}) => {
  const isProjects = type.value === TRENDING_WORDS_PROJECT_MENTIONED.value
  const isWords = type.value === TRENDING_WORDS_WORD_MENTIONED.value

  const getWords = () => {
    const defaultOptions = mapToAssets(allProjects, false)
    return [...mapToOptions(trendingWordsWithWords), ...defaultOptions]
  }

  const [words] = useState(getWords())

  return (
    <div>
      <div className={cx(styles.row, styles.rowInner)}>
        <div className={cx(styles.Field, styles.fieldFilled)}>
          <Label accent='waterloo' className={styles.label}>
            Type
          </Label>
          <FormikSelect
            isClearable={false}
            name='type'
            placeholder={'Pick type'}
            options={TRENDING_WORDS_TYPE_OPTIONS}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={cx(styles.Field, styles.fieldFilled)}>
          <Label accent='waterloo' className={styles.label}>
            Condition
          </Label>

          {isProjects && (
            <TriggerProjectsSelector
              name='trendingWordsWithAssets'
              fieldValueList={trendingWordsWithAssets}
              values={values}
              projects={allProjects}
              setFieldValue={setFieldValue}
            />
          )}
          {isWords && (
            <FormikSelect
              multi={true}
              isCreatable={true}
              name='trendingWordsWithWords'
              placeholder='Pick a word(s)'
              backspaceRemoves={true}
              options={words}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const mapDataToProps = ({ Projects: { allProjects }, ownProps }) => {
  const { data = {} } = ownProps
  return {
    ...ownProps,
    data: {
      allProjects: allProjects || data.allProjects
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
