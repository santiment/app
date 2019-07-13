import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import Label from '@santiment-network/ui/Label'
import { ASSETS_FILTERS } from '../../../utils/constants'
import { allProjectsForSearchGQL } from '../../../../../pages/Projects/allProjectsGQL'
import { mapToAssets } from '../../../utils/utils'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metaFormSettings: PropTypes.any
}

const TriggerFormAssetWallet = ({
  data: { allProjects = [] } = {},
  metaFormSettings
}) => {
  const defaultSignalType = metaFormSettings.signalType

  const [allList, setAll] = useState(allProjects)

  useEffect(() => {
    allProjects.length && setAll(allProjects)
  })

  const { target: defaultAsset } = metaFormSettings

  return (
    <div className={styles.row}>
      <div className={styles.Field}>
        <Label accent='waterloo' className={styles.label}>
          Type
        </Label>
        <FormikSelect
          name='signalType'
          disabled={defaultSignalType.isDisabled}
          defaultValue={defaultSignalType.value.value}
          placeholder={'Pick signal type'}
          options={ASSETS_FILTERS}
        />
      </div>

      <div className={styles.Field}>
        <Label className={styles.label}>&nbsp;</Label>
        <FormikSelect
          name='target'
          disabled={defaultAsset.isDisabled}
          defaultValue={defaultAsset.value.value}
          placeholder='Pick an asset'
          required
          options={allList}
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

TriggerFormAssetWallet.propTypes = propTypes

export default enhance(TriggerFormAssetWallet)
