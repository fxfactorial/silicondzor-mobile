// @flow

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE, height } from './styles';
import { row_separator, FontText } from './common';

const ROWS_BLOCK_HEIGHT = Math.floor(height * 0.4);

const styles = StyleSheet.create({
  custom_drawer_container: {
    flex: 1,
    height,
  },
  custom_drawer_content: {
    height,
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: '2%',
    paddingTop: '2%',
  },
  custom_drawer_banner: {
    color: 'white',
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
    height: '7%',
  },
  nav_row_block: { paddingRight: '10%' },
  nav_screen_name: { color: 'aliceblue', fontSize: 20 },
  logged_in_name: { color: 'white' },
  rows_block: { minHeight: '50%', maxHeight: '70%' },
  code_icon: { color: colors.drawer_component.start, opacity: 0.9 },
});

const obs = (
  <Observer>
    {() => <FontText content={lang_store.locale.silicondzor} style={styles.custom_drawer_banner} />}
  </Observer>
);

const logged_in_name = (
  <Observer>{() => <FontText content={user_store.name} style={styles.logged_in_name} />}</Observer>
);

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
          {() => (
            <FontText content={lang_store.locale.screens[name]} style={styles.nav_screen_name} />
          )}
        </Observer>
        <FontText content={'another'} />
      </View>
      {row_separator}
      {minispacer}
    </View>
  </TouchableOpacity>
);

const drawer_component = ({ navigation }) => {
  const { navigate } = navigation;
  const { start, end } = colors.drawer_component;
  return (
    <LinearGradient style={styles.custom_drawer_container} colors={[start, end]}>
      <ScrollView>
        <View style={styles.custom_drawer_content}>
          {minispacer}
          {top_drawer_banner()}
          {spacer}
          <View style={styles.rows_block}>
            {row('tech_discussions', () => navigate('tech_discussions'))}
            {row('tech_events', () => navigate('tech_events'))}
            {row('bug_bounty_board', () => navigate('bug_bounty_board'))}
            {row('jobs_board', () => navigate('jobs_board'))}
            {row('settings', () => navigate('settings'))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const open_right = (
  <TouchableOpacity onPress={login_modal_store.toggle_show}>
    <Entypo style={styles.code_icon} name={'login'} size={24} />
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
