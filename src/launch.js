// @flow

import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerNavigator, SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { Observer } from 'mobx-react/native';
import { Avatar } from 'react-native-elements';

import tech_discussions from './tech-discussions';
import tech_events from './tech-events';
import bug_bounty_board from './bug-bounty-board';
import jobs_board from './jobs-board';
import settings from './settings';
import {
  login_modal_store,
  language_setting_store as lang_store,
  user_session_store as user_store,
} from './state';
import colors from './colors';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from './styles';
import { row_separator } from './common';

const { theme: { c, d, e } } = colors;

const styles = StyleSheet.create({
  custom_drawer_container: {
    flex: 1,
  },
  custom_drawer_content: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: '10%',
    paddingTop: '10%',
  },
  custom_drawer_banner: {
    textAlign: 'right',
    fontSize: 24,
  },
  top_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_WIDTH_PERCENT_DOUBLE,
  },
  top_row_name_block: {
    paddingRight: PADDING_WIDTH_PERCENT,
  },
  spacer: {
    height: '10%',
  },
  mini_spacer: {
    height: '5%',
  },
  nav_row_block: { paddingRight: '15%' },
  nav_screen_name: { color: 'purple' },
});

const obs = (
  <Observer>
    {() => <Text style={styles.custom_drawer_banner}>{lang_store.locale.silicondzor}</Text>}
  </Observer>
);

const logged_in_name = <Observer>{() => <Text>{user_store.name}</Text>}</Observer>;

const top_drawer_banner = () => (
  <View style={styles.top_row}>
    <Avatar medium={true} rounded={true} source={{ uri: user_store.user_fb_profile_picture_url }} />
    <View style={styles.top_row_name_block}>
      {obs}
      {logged_in_name}
    </View>
  </View>
);

const spacer = <View style={styles.spacer} />;
const minispacer = <View style={styles.mini_spacer} />;

// Need to do logic of when app signs in, we record the time and then
// we register the login time with the DB. Then we compare all the
// items posted SINCE we logged in, say new ones
const row = (name, action) => (
  <TouchableOpacity onPress={action}>
    <View style={styles.nav_row_block}>
      <View style={[styles.top_row]}>
        <Observer>
          {() => <Text style={styles.nav_screen_name}>{lang_store.locale.screens[name]}</Text>}
        </Observer>
        <Text>Another</Text>
      </View>
      {row_separator}
      {minispacer}
    </View>
  </TouchableOpacity>
);

const drawer_component = ({ navigation }) => {
  const { navigate } = navigation;
  return (
    <LinearGradient style={styles.custom_drawer_container} colors={[c, d, e]}>
      <View style={styles.custom_drawer_content}>
        {top_drawer_banner()}
        {spacer}
        {row('tech_discussions', () => navigate('tech_discussions'))}
        {row('tech_events', () => navigate('tech_events'))}
        {row('bug_bounty_board', () => navigate('bug_bounty_board'))}
        {row('jobs_board', () => navigate('jobs_board'))}
        {row('settings', () => navigate('settings'))}
      </View>
    </LinearGradient>
  );
};

const open_right = (
  <TouchableOpacity onPress={login_modal_store.toggle_show}>
    <Entypo name={'login'} size={24} />
  </TouchableOpacity>
);

export default DrawerNavigator(
  {
    tech_discussions: { screen: tech_discussions },
    tech_events: { screen: tech_events },
    bug_bounty_board: { screen: bug_bounty_board },
    jobs_board: { screen: jobs_board },
    settings: { screen: settings },
  },
  {
    contentComponent: drawer_component,
    navigationOptions: () => ({ headerRight: open_right }),
  }
);
