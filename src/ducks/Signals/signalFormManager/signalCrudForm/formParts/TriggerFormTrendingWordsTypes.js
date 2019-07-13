import React, { useState } from 'react'
import cx from 'classnames'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import Label from '@santiment-network/ui/Label'
import {
  TRENDING_WORDS_PROJECT_MENTIONED,
  TRENDING_WORDS_TYPE_OPTIONS,
  TRENDING_WORDS_WORD_MENTIONED
} from '../../../utils/constants'
import styles from '../signal/TriggerForm.module.scss'
import { TriggerProjectsSelector } from './ProjectsSelector/TriggerProjectsSelector'
import { mapToAssets, mapToOptions } from '../../../utils/utils'
import GetProjects from '../../../common/projects/getProjects'

const getWords = (allProjects, trendingWordsWithWords) => {
  const defaultOptions = mapToAssets(allProjects, false)
  const preselectedWords = Array.isArray(trendingWordsWithWords)
    ? trendingWordsWithWords
    : [trendingWordsWithWords]
  return [...mapToOptions(preselectedWords), ...defaultOptions]
}

const TriggerFormTrendingWordsTypes = ({
  values: { type, trendingWordsWithAssets, trendingWordsWithWords },
  values,
  setFieldValue
}) => {
  const isProjects = type.value === TRENDING_WORDS_PROJECT_MENTIONED.value
  const isWords = type.value === TRENDING_WORDS_WORD_MENTIONED.value

  return (
    <GetProjects
      render={({ isLoading, allProjects = [] }) => {
        if (isLoading) {
          return ''
        }

        const [words] = useState(getWords(allProjects, trendingWordsWithWords))

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
      }}
    />
  )
}

export default TriggerFormTrendingWordsTypes
