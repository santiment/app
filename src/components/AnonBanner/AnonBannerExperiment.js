import React, { PureComponent } from 'react'
import Loadable from 'react-loadable'
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'
import emitter from 'react-ab-test/lib/emitter'
import mixpanelHelper from 'react-ab-test/lib/helpers/mixpanel'

// window.mixpanel has been set by Mixpanel's embed snippet.
mixpanelHelper.enable()

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
emitter.addPlayListener(function (Experiment, Variant) {
  console.log(`Displaying experiment "${Experiment}" variant "${Variant}"`)
  window.mixpanel.track('Experiment Play', {
    Experiment,
    Variant
  })
})

// Called when a 'win' is emitted, in this case by this.refs.experiment.win()
emitter.addWinListener(function (Experiment, Variant) {
  console.log(
    `Variant "${Variant}" of the experiment "${Experiment}" was clicked`
  )
  window.mixpanel.track('Experiment Win', { Experiment, Variant })
})

export default AnonBannerExperiment
