import React, { useState } from 'react'
import cx from 'classnames'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import Label from '@santiment-network/ui/Label'
import {
  TRENDING_WORDS_PROJECT_MENTIONED,
  TRENDING_WORDS_TYPE_OPTIONS,
  TRENDING_WORDS_WORD_MENTIONED
} from '../../../utils/constants'
import { TriggerProjectsSelector } from './ProjectsSelector/TriggerProjectsSelector'
import {
  isTrendingWordsWatchlist,
  mapToAssets,
  mapToOptions
} from '../../../utils/utils'
import GetProjects from '../../../common/projects/getProjects'
import TriggerFormWatchlists from './TriggerFormWatchlists'
import styles from '../signal/TriggerForm.module.scss'

const getWords = (allProjects, trendingWordsWithWords) => {
  const defaultOptions = mapToAssets(allProjects, false)
  const preselectedWords = Array.isArray(trendingWordsWithWords)
    ? trendingWordsWithWords
    : trendingWordsWithWords
      ? [trendingWordsWithWords]
      : []
  return [...mapToOptions(preselectedWords), ...defaultOptions]
}

const TriggerFormTrendingWordsTypes = ({
  values: { type, trendingWordsWithAssets, trendingWordsWithWords, target },
  values,
  setFieldValue
}) => {
  const isProjects = type.value === TRENDING_WORDS_PROJECT_MENTIONED.value
  const isWords = type.value === TRENDING_WORDS_WORD_MENTIONED.value
  const isWatchlist = isTrendingWordsWatchlist(type)

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
              <div
                className={cx(
                  styles.Field,
                  !isWatchlist ? styles.fieldFilled : ''
                )}
              >
                <Label accent='waterloo' className={styles.label}>
                  Type
                </Label>
                <FormikSelect
                  isClearable={false}
                  name='type'
                  placeholder={'Pick type'}
                  options={TRENDING_WORDS_TYPE_OPTIONS}
                  onChange={type => {
                    if (
                      isTrendingWordsWatchlist(type) &&
                      typeof target === 'object'
                    ) {
                      setFieldValue('target', '')
                    }
                  }}
                />
              </div>
              {isWatchlist && <TriggerFormWatchlists />}
            </div>

            {!isWatchlist && (
              <div className={styles.row}>
                <div className={cx(styles.Field, styles.fieldFilled)}>
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
            )}
          </div>
        )
      }}
    />
  )
}

export default TriggerFormTrendingWordsTypes
