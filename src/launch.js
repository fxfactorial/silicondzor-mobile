import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
import { Entypo, Octicons } from '@expo/vector-icons';

import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from './styles';
import { login_modal_store } from './state';
import tech_events from './tech-events/events';
import bug_bounty_board from './bug-bounty-board/board.js';
import jobs_board from './jobs-board/board.js';

import discussion from './tech-discussions/discussion';
import Search from './tech-discussions/search';
import Post from './tech-discussions/post';

import { DrawerIconOpener } from './common-components';

const open_right = (
  <TouchableOpacity onPress={login_modal_store.toggle_show}>
    <Entypo name={'login'} size={24} />
  </TouchableOpacity>
);

const NEWS_TAB_ICON = <Entypo name={'news'} size={24} />;
const POST_TAB_ICON = <Entypo name={'new-message'} size={24} />;
const SEARCH_TAB_ICON = (
  <Octicons name={'search'} style={{ marginTop: PADDING_WIDTH_PERCENT }} size={24} />
);

const tabs = TabNavigator(
  {
    News: {
      screen: discussion,
      navigationOptions: {
        tabBarIcon: NEWS_TAB_ICON,
      },
    },
    Post: {
      screen: Post,
      navigationOptions: {
        tabBarIcon: POST_TAB_ICON,
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: SEARCH_TAB_ICON,
      },
    },
  },
  // We do it this way so that all the screens get this navigation
  // option. Otherwise, could have passed this separate per object,
  // then it would be per screen
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
    tabBarOptions: {
      showIcon: true,
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
