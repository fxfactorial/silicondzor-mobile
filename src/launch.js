import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
import { observer } from 'mobx-react/native';
import { Entypo } from '@expo/vector-icons';

import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from './styles';
import { login_modal_store } from './stores';
import tech_events from './tech-events/events';
import bug_bounty_board from './bug-bounty-board/board.js';
import jobs_board from './jobs-board/board.js';

import discussion from './tech-discussions/discussion';
import Search from './tech-discussions/search';
import Post from './tech-discussions/post';

const DrawerIconOpener = ({ navigate }) => (
  <TouchableOpacity onPress={() => navigate('DrawerOpen')}>
    <Entypo name={'code'} size={24} />
  </TouchableOpacity>
);

const open_right = (
  <TouchableOpacity onPress={login_modal_store.toggle_show}>
    <Entypo name={'login'} size={24} />
  </TouchableOpacity>
);

const tabs = TabNavigator(
  {
    News: {
      screen: discussion,
    },
    Post: { screen: Post },
    Search: { screen: Search },
  },
  {
    navigationOptions: ({ navigation, store }) => {
      return {
        tabBarLabel: navigation.state.routeName,
        headerTitle: 'Silicondzor',
        headerRight: open_right,
        headerLeft: DrawerIconOpener(navigation),
        headerStyle: { paddingHorizontal: PADDING_WIDTH_PERCENT },
      };
    },
  }
);

// This are our core functionalities, then each one could be its own
// setup, most likely a tab navigator in each
export default DrawerNavigator({
  tech_discussions: { screen: tabs },
  tech_events: { screen: tech_events },
  bug_bounty_board: { screen: bug_bounty_board },
  jobs_board: { screen: jobs_board },
});
