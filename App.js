import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import { type NavigationState } from 'react-navigation';

import { useStrict } from 'mobx';
import * as firebase from 'firebase';

import credentials from './credentials.json';

import launch_drawer from './src/launch.js';
import post_drilldown from './src/tech-discussions/post-drilldown';
import { login_modal_store } from './src/state';

console.disableYellowBox = true;
useStrict(true);

const open_right = (
  <TouchableOpacity onPress={login_modal_store.toggle_show}>
    <Entypo name={'login'} size={24} />
  </TouchableOpacity>
);

export default StackNavigator({
  home: { screen: launch_drawer },
  post_discussion: { screen: post_drilldown },
},   {
    navigationOptions: {
      headerRight: open_right,
    },
  }
);
