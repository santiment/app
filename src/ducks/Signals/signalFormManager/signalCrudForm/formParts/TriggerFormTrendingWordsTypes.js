import React from 'react'
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
import { mapToAssets } from '../../../utils/utils'
import { Creatable } from 'react-select'
import styles from '../signal/TriggerForm.module.scss'

const TriggerFormTrendingWordsTypes = ({
  data: { allProjects = [] } = {},
  values: { type }
}) => {
  const isProjects = type.value === TRENDING_WORDS_PROJECT_MENTIONED.value
  const isWords = type.value === TRENDING_WORDS_WORD_MENTIONED.value

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
            <FormikSelect
              multi={true}
              name='trendingWordsWithAssets'
              backspaceRemoves={true}
              placeholder='Pick a project(s)'
              options={allProjects}
            />
          )}
          {isWords && (
            <FormikSelect
              multi={true}
              componentType={Creatable}
              name='trendingWordsWithWords'
              placeholder='Pick a word(s)'
              backspaceRemoves={true}
              options={allProjects}
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
