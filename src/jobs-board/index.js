import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Observer } from 'mobx-react/native';

import { POST_TAB_ICON, GENERIC_BOARD_TAB_ICON, DrawerIconOpener } from '../common';
import { PADDING_WIDTH_PERCENT } from '../styles';
import { language_setting_store as lang_store } from '../state';

import Board from './board';
import Post from './post';

const headerTitle = <Observer>{() => <Text>{lang_store.locale.jobs_board}</Text>}</Observer>;

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
        headerTitle,
        headerLeft: DrawerIconOpener(navigation),
      };
    },
  }
);
