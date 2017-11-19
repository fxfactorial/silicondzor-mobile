import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Observer } from 'mobx-react/native';
import { StyleSheet, Text } from 'react-native';

import events_table from './events';
import post from './post';
import { POST_TAB_ICON, EVENTS_TAB_ICON, DrawerIconOpener } from '../common';
import { PADDING_WIDTH_PERCENT } from '../styles';
import { language_setting_store as lang_store } from '../state';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});

const headerTitle = (
  <Observer>{() => <Text style={styles.title}>{lang_store.locale.tech_events}</Text>}</Observer>
);

export default TabNavigator(
  {
    Events: {
      screen: events_table,
      navigationOptions: {
        tabBarIcon: EVENTS_TAB_ICON,
      },
    },
    Post: {
      screen: post,
      navigationOptions: {
        tabBarIcon: POST_TAB_ICON,
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle,
        tabBarLabel: navigation.state.routeName,
        headerLeft: DrawerIconOpener(navigation),
      };
    },
    tabBarOptions: {
      showIcon: true,
    },
  }
);
