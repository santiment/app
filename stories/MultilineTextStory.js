import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import MultilineText from '../src/components/MultilineText/MultilineText'

const Example = ({ maxLines, text, style, mtId, ...props }) => (
  <Fragment>
    <strong>Max lines: {maxLines}</strong>
    <br />
    <div
      style={{
        wordBreak: 'break-word',
        display: 'inline-block',
        width: 100,
        border: '1px solid red',
        ...style
      }}
      data-mt-id={mtId || 'test'}
      {...props}
    >
      <MultilineText id={mtId || 'test'} maxLines={maxLines} text={text} />
    </div>
  </Fragment>
)

storiesOf('MultilineText', module)
  .add('Default', () => (
    <Fragment>
      <Example
        maxLines={2}
        text='sdhfjshdfshdfi hsdfs iufhsi udfhsiudfh ufsd'
      />

      <Example
        maxLines={2}
        text='sdhfjshdfshdfia hsdfs iufhsi udfhsiudfh ufsd'
      />
      <Example
        maxLines={2}
        text='sdhfjshdfshdfiarb hsdfs iufhsi udfhsiudfh ufsd'
      />
      <Example maxLines={2} text='sdhfjshdfshdfiaverylong word ha' />
      <br />
      <br />
      <Example
        maxLines={3}
        text='sdhfjshdfshdfi hsdfs iufhsi udfhsiudfh ufsd'
      />

      <Example
        maxLines={3}
        text='sdhfjshdfshdfia hsdfs iufhsi udfhsiudfh ufsd'
      />
      <Example
        maxLines={3}
        text='sdhfjshdfshdfiarb hsdfs iufhsi udfhsiudfh ufsd'
      />
      <Example maxLines={3} text='sdhfjshdfshdfiaverylong word ha' />
      <br />
      <br />
      <Example
        maxLines={4}
        text='sdhfjshdfshdfi hsdfs iufhsi udfhsiudfh ufsd'
      />

      <Example
        maxLines={4}
        text='sdhfjshdfshdfia hsdfs iufhsi udfhsiudfh ufsd'
      />
      <Example
        maxLines={4}
        text='sdhfjshdfshdfiarb hsdfs iufhsi udfhsiudfh ufsd'
      />
      <br />
      <br />
    </Fragment>
  ))
  .add('FontSize', () => (
    <Fragment>
      <Example
        maxLines={2}
        text='sdhfjshdfshdf hsdfs iufhsidshfoisudhgoisu udfhsiudfh ufsd'
        style={{ fontSize: 19 }}
        mtId='fontSize'
      />
      <Example
        maxLines={2}
        text='sdhfjshdfshdfi www / hsdfs iufhsi udfhsiudfh ufsd'
        style={{ fontSize: 19 }}
        mtId='fontSize'
      />

      <br />
      <br />
      <Example
        maxLines={3}
        text='sdhfjshdfshdf hsdfs iufhsi udfhsiudfh ufsd'
        style={{ fontSize: 19 }}
        mtId='fontSize'
      />
    </Fragment>
  ))
