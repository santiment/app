import React from 'react'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import Label from '@santiment-network/ui/Label'
import { ASSETS_FILTERS } from '../../../utils/constants'
import { TriggerProjectsSelector } from './TriggerProjectsSelector'
import { allProjectsForSearchGQL } from '../../../../../pages/Projects/allProjectsGQL'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metaFormSettings: PropTypes.any,
  metric: PropTypes.any.isRequired,
  target: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired
}

const TriggerFormTrendingWordsTypes = ({
  data: { allProjects = [] } = {},
  target,
  metaFormSettings,
  metric,
  setFieldValue
}) => {
  const defaultSignalType = metaFormSettings.signalType

  return (
    <div className={styles.row}>
      <div className={styles.Field}>
        <Label accent='waterloo' className={styles.label}>
          Type
        </Label>
        <FormikSelect
          name='signalType'
          isDisabled={defaultSignalType.isDisabled}
          defaultValue={defaultSignalType.value.value}
          placeholder={'Pick signal type'}
          options={ASSETS_FILTERS}
        />
      </div>

      <div className={styles.Field}>
        <Label className={styles.label}>&nbsp;</Label>
        <TriggerProjectsSelector
          metaFormSettings={metaFormSettings}
          setFieldValue={setFieldValue}
          target={target}
          projects={allProjects}
          onChange={newAsset => {}}
        />
      </div>
    </div>
  )
}

const mapDataToProps = ({ Projects: { allProjects }, ownProps }) => {
  const { data = {} } = ownProps
  return {
    ...ownProps,
    data: {
      allProjects: allProjects || data.allProjects || []
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

TriggerFormTrendingWordsTypes.propTypes = propTypes

export default enhance(TriggerFormTrendingWordsTypes)
