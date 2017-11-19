import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { type NavigationState } from 'react-navigation';

import { useStrict } from 'mobx';
import * as firebase from 'firebase';

import credentials from './credentials.json';

import launch_drawer from './src/launch.js';
import post_drilldown from './src/tech-discussions/post-drilldown';
import user_profile from './src/user-profile.js';
import colors from './src/colors';
import { PADDING_WIDTH_PERCENT } from './src/styles';

console.disableYellowBox = true;
useStrict(true);

export default StackNavigator(
  {
    home: { screen: launch_drawer },
    post_discussion: { screen: post_drilldown },
    user_profile: { screen: user_profile },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { paddingHorizontal: PADDING_WIDTH_PERCENT },
    }),
  }
);
