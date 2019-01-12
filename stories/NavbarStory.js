import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import Navbar from './../src/components/Navbar/Navbar'
import NavbarProfileDropdown from './../src/components/Navbar/NavbarProfileDropdown'
import NavbarHelpDropdown from './../src/components/Navbar/NavbarHelpDropdown'
import NavbarLabsDropdown from './../src/components/Navbar/NavbarLabsDropdown'
import NavbarAssetsDropdown from './../src/components/Navbar/NavbarAssetsDropdown'
import {
  UnwrappedNavbarAssetsDropdownWatchlist,
  watchlistGQL
} from './../src/components/Navbar/NavbarAssetsDropdownWatchlist'
import { Provider } from 'react-redux'
import store from './store'
import { MockedProvider } from 'react-apollo/test-utils'

const mockedData = {
  fetchUserLists: [
    {
      __typename: 'UserList',
      color: 'NONE',
      id: '177',
      insertedAt: '2018-12-01T13:37:02.070807',
      isPublic: false,
      listItems: [],
      name: 'testst',
      updatedAt: '2018-12-21T07:25:02.516756'
    }
  ]
}
const query = watchlistGQL

const mocks = [
  { request: { query, variables: {} }, result: { data: mockedData } }
]

storiesOf('Navbar', module)
  .addDecorator(StoryRouter())
  .addDecorator(story => (
    <MockedProvider mocks={mocks}>{story()}</MockedProvider>
  ))
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)

  .add('Default', () => (
    <div>
      <Navbar />
      <br />
      {[
        '/sonar',
        '/assets',
        '/insights',
        '/labs/trends',
        '/reports',
        '/support',
        '/account'
      ].map(link => {
        return (
          <Fragment key={link}>
            On the '{link}' page
            <Navbar activeLink={link} />
            <br />
          </Fragment>
        )
      })}
    </div>
  ))
  .add('Profile Dropdown', () => (
    <div>
      <NavbarProfileDropdown />
      <br />
      Profile status and picture
      <NavbarProfileDropdown
        status='active'
        picUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iB-yPaTXvwWqWiLP3kuHf_WocZXm_uN2lhsNMvkN-BsMLZcDUQ'
      />
      <br />
      On the '/account' page
      <NavbarProfileDropdown activeLink='/account' />
    </div>
  ))
  .add('Help Dropdown', () => (
    <div>
      <NavbarHelpDropdown />
      <br />
      On the '/support' page
      <NavbarHelpDropdown activeLink='/support' />
    </div>
  ))
  .add('Labs Dropdown', () => (
    <div>
      <NavbarLabsDropdown />
      <br />
      On the '/labs/trends' page
      <NavbarLabsDropdown activeLink='/labs/trends' />
    </div>
  ))
  .add('Assets Dropdown', () => (
    <div>
      <NavbarAssetsDropdown isLoggedIn />
      <br />
      On the '/assets/list?name=top%2050%20erc20%40227#shared' page
      <NavbarAssetsDropdown
        isLoggedIn
        activeLink='/assets/list?name=top%2050%20erc20%40227#shared'
      />
      <br />
      On the '/assets/list?name=testst@177#shared' page
      <NavbarAssetsDropdown
        isLoggedIn
        activeLink='/assets/list?name=testst@177'
      />
    </div>
  ))
