// @flow

import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import tech_discussions from './tech-discussions';
import tech_events from './tech-events';
import bug_bounty_board from './bug-bounty-board';
import jobs_board from './jobs-board';
import settings from './settings';

// This are our core functionalities, then each one could be its own
// setup, most likely a tab navigator in each
export default DrawerNavigator({
  tech_discussions: { screen: tech_discussions },
  tech_events: { screen: tech_events },
  bug_bounty_board: { screen: bug_bounty_board },
  jobs_board: { screen: jobs_board },
  settings: { screen: settings },
});
