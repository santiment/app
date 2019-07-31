import React, { useState } from 'react'
import cx from 'classnames'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import { TRENDING_WORDS_TYPE_OPTIONS } from '../../../utils/constants'
import { TriggerProjectsSelector } from './projectsSelector/TriggerProjectsSelector'
import {
  isTrendingWordsByProjects,
  isTrendingWordsByWatchlist,
  isTrendingWordsByWords,
  mapToAssets,
  mapToOptions
} from '../../../utils/utils'
import GetProjects from '../../../common/projects/getProjects'
import TriggerFormWatchlists from './TriggerFormWatchlists'
import styles from '../signal/TriggerForm.module.scss'
import Selector from '@santiment-network/ui/Selector/Selector'

const getWords = (allProjects, trendingWordsWithWords) => {
  const defaultOptions = mapToAssets(allProjects, false)
  const preselectedWords = Array.isArray(trendingWordsWithWords)
    ? trendingWordsWithWords
    : trendingWordsWithWords
      ? [trendingWordsWithWords]
      : []

  return [...preselectedWords, ...defaultOptions]
}

const TriggerFormTrendingWordsTypes = ({
  values: { type, trendingWordsWithWords, target },
  values,
  setFieldValue
}) => {
  const isProjects = isTrendingWordsByProjects(type)
  const isWords = isTrendingWordsByWords(type)
  const isWatchlist = isTrendingWordsByWatchlist(type)

  return (
    <>
      <div className={cx(styles.row, styles.rowTop)}>
        <Selector
          className={styles.selector}
          options={TRENDING_WORDS_TYPE_OPTIONS.map(({ value }) => value)}
          nameOptions={TRENDING_WORDS_TYPE_OPTIONS.map(({ label }) => label)}
          defaultSelected={type.value}
          onSelectOption={selectedValue => {
            const type = TRENDING_WORDS_TYPE_OPTIONS.find(
              ({ value }) => value === selectedValue
            )

            setFieldValue('type', type)
          }}
          variant='border'
        />
      </div>

      <div className={cx(styles.row, styles.rowBottom)}>
        <div className={cx(styles.Field, styles.fieldFilled)}>
          {isWatchlist && (
            <TriggerFormWatchlists
              values={values}
              setFieldValue={setFieldValue}
            />
          )}
          {!isWatchlist && (
            <GetProjects
              render={({ isLoading, allProjects = [] }) => {
                if (isLoading) {
                  return ''
                }

                const [words] = useState(
                  getWords(allProjects, trendingWordsWithWords)
                )

                return (
                  <>
                    {isProjects && (
                      <TriggerProjectsSelector
                        name='target'
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
                  </>
                )
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default TriggerFormTrendingWordsTypes
