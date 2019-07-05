import React from 'react'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'

export const TriggerProjectsSelector = ({
  projects = [],
  onChange,
  metaFormSettings,
  target,
  setFieldValue
}) => {
  const { ethAddress, target: defaultAsset } = metaFormSettings

  const options = projects.map(asset => ({
    label: asset.slug,
    value: asset.slug
  }))

  if (
    target &&
    target.value &&
    options.length > 0 &&
    !options.find(p => p.value === target.value)
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
      options={options}
      onChange={newAsset => {
        if (ethAddress) {
          if (metaFormSettings.target.value.value === newAsset.value) {
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
