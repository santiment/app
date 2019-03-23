import * as React from 'react'
import { connect } from 'formik'

class FormikEffect extends React.Component {
  componentDidUpdate (prevProps) {
    if (prevProps.formik !== this.props.formik) {
      this.props.onChange(this.props.formik, prevProps.formik)
    }
  }

  render () {
    return null
  }
}

export default connect(FormikEffect)
