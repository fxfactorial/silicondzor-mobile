import React from 'react';
import { TouchableOpacity } from 'react-native';
import { login_modal_store } from './state';
import { Entypo } from '@expo/vector-icons';
import { DrawerNavigator } from 'react-navigation';

import tech_discussions from './tech-discussions';
import tech_events from './tech-events';
import bug_bounty_board from './bug-bounty-board';
import jobs_board from './jobs-board';

const open_right = (
  <TouchableOpacity onPress={login_modal_store.toggle_show}>
    <Entypo name={'login'} size={24} />
  </TouchableOpacity>
);

// This are our core functionalities, then each one could be its own
// setup, most likely a tab navigator in each
export default DrawerNavigator(
  {
    tech_discussions: { screen: tech_discussions },
    tech_events: { screen: tech_events },
    bug_bounty_board: { screen: bug_bounty_board },
    jobs_board: { screen: jobs_board },
  },
  {
    navigationOptions: {
      headerRight: open_right,
    },
  }
);
