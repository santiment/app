import React, { useCallback, useMemo } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withSizes from 'react-sizes'
import { mapSizesToProps } from '../../../utils/withSizes'
import ProjectsBarHorizontalChart from './ProjectsBarHorizontalChart'
import ProjectsBarVerticalChart from './ProjectsBarVerticalChart'
import { useChartColors } from '../../Chart/colors'
import { PREDEFINED_COLORS } from './utils'

const ProjectsBarChartWrapper = ({
  data,
  layout = 'horizontal',
  redirect,
  ...rest
}) => {
  const onProjectClick = useCallback(
    e => {
      const { value, index } = e
      const { clickable = true } = index ? data[index] : e

      if (!clickable) {
        return
      }

      return redirect(`/projects/${value}`)
    },
    [redirect, data]
  )

  const metrics = useMemo(
    () => {
      return data.map(item => ({
        key: item.slug || item.address
      }))
    },
    [data]
  )
  const MetricColor = useChartColors(metrics, PREDEFINED_COLORS)

  return layout === 'horizontal' ? (
    <ProjectsBarHorizontalChart
      onProjectClick={onProjectClick}
      MetricColor={MetricColor}
      data={data}
      {...rest}
    />
  ) : (
    <ProjectsBarVerticalChart
      onProjectClick={onProjectClick}
      MetricColor={MetricColor}
      data={data}
      {...rest}
    />
  )
}

const mapDispatchToProps = dispatch => ({
  redirect: route => {
    dispatch(push(route))
  }
})

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withSizes(mapSizesToProps)
)(ProjectsBarChartWrapper)
