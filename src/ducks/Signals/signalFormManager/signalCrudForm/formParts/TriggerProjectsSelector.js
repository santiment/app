import React from 'react'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'

export const TriggerProjectsSelector = ({
  projects = [],
  onChange,
  metaFormSettings,
  target,
  setFieldValue,
  heldByWallet = []
}) => {
  const { ethAddress, target: defaultAsset } = metaFormSettings

  if (
    target &&
    target.value &&
    projects.length > 0 &&
    !projects.find(p => p.value === target.value)
  ) {
    setFieldValue('target', '')
  }

  return (
    <FormikSelect
      name='target'
      isDisabled={defaultAsset.isDisabled}
      defaultValue={defaultAsset.value.value}
      placeholder='Pick an asset'
      required
      options={projects}
      onChange={newAsset => {
        if (ethAddress) {
          if (
            metaFormSettings.target.value.value === newAsset.value ||
            heldByWallet.find(a => a.value === newAsset.value)
          ) {
            setFieldValue('ethAddress', ethAddress)
          } else {
            setFieldValue('ethAddress', '')
          }
        }
        onChange && onChange(newAsset)
      }}
    />
  )
}
