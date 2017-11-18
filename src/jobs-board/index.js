import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { POST_TAB_ICON, GENERIC_BOARD_TAB_ICON, DrawerIconOpener } from '../common';
import { PADDING_WIDTH_PERCENT } from '../styles';

import Board from './board';
import Post from './post';

export default TabNavigator(
  {
    Board: {
      screen: Board,
      navigationOptions: {
        tabBarIcon: GENERIC_BOARD_TAB_ICON,
      },
    },
    Post: {
      screen: Post,
      navigationOptions: {
        tabBarIcon: POST_TAB_ICON,
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: navigation.state.routeName,
        // Should be a component so we can say total number of bounties
        headerTitle: 'Jobs Board',
        headerLeft: DrawerIconOpener(navigation),
        headerStyle: { paddingHorizontal: PADDING_WIDTH_PERCENT },
      };
    },
  }
);
