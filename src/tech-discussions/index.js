import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';
import { Observer } from 'mobx-react/native';

import { NEWS_TAB_ICON, POST_TAB_ICON, SEARCH_TAB_ICON, DrawerIconOpener } from '../common';
import { login_modal_store, language_setting_store as lang_store } from '../state';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from '../styles';

import discussion from './discussion';
import search from './search';
import newpost from './new-post';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});

const headerTitle = (
  <Observer>{() => <Text style={styles.title}>{lang_store.locale.silicondzor}</Text>}</Observer>
);

export default TabNavigator(
  {
    News: {
      screen: discussion,
      navigationOptions: {
        tabBarIcon: NEWS_TAB_ICON,
      },
    },
    Post: {
      screen: newpost,
      navigationOptions: {
        tabBarIcon: POST_TAB_ICON,
      },
    },
    Search: {
      screen: search,
      navigationOptions: {
        tabBarIcon: SEARCH_TAB_ICON,
      },
    },
  },
  // We do it this way so that all the screens get this navigation
  // option. Otherwise, could have passed this separate per object,
  // then it would be per screen
  {
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: navigation.state.routeName,
        headerTitle,
        headerLeft: DrawerIconOpener(navigation),
        headerStyle: { paddingHorizontal: PADDING_WIDTH_PERCENT },
      };
    },
    tabBarOptions: {
      showIcon: true,
    },
  }
);
