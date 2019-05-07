import React, { PureComponent } from 'react'
import Loadable from 'react-loadable'
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'

const AnonBannerA = Loadable({
  loader: () => import('./AnonBannerA'),
  loading: () => <div />
})

const AnonBannerB = Loadable({
  loader: () => import('./AnonBannerB'),
  loading: () => <div />
})

class AnonBannerStaticExperiment extends PureComponent {
  experimentRef = React.createRef()

  onClick = () => {
    this.experimentRef.current.win()
  }

  render () {
    return (
      <Experiment ref={this.experimentRef} name='Anon Banner'>
        <Variant name='A'>
          <AnonBannerA {...this.props} onClick={this.onClick} />
        </Variant>
        <Variant name='B'>
          <AnonBannerB {...this.props} onClick={this.onClick} />
        </Variant>
      </Experiment>
    )
  }
}

export default AnonBannerStaticExperiment
