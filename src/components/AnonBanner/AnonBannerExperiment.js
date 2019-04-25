import React, { PureComponent } from 'react'
import Loadable from 'react-loadable'
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'
import emitter from 'react-ab-test/lib/emitter'

const AnonBannerA = Loadable({
  loader: () => import('./AnonBannerA'),
  loading: () => <div />
})

const AnonBannerB = Loadable({
  loader: () => import('./AnonBannerB'),
  loading: () => <div />
})

class AnonBannerExperiment extends PureComponent {
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

// Called when the experiment is displayed to the user.
emitter.addPlayListener(function (experimentName, variantName) {
  console.log(
    'Displaying experiment ‘' +
      experimentName +
      '’ variant ‘' +
      variantName +
      '’'
  )
})

// Called when a 'win' is emitted, in this case by this.refs.experiment.win()
emitter.addWinListener(function (experimentName, variantName) {
  console.log(
    'Variant ‘' +
      variantName +
      '’ of experiment ‘' +
      experimentName +
      '’  was clicked'
  )
})

export default AnonBannerExperiment
