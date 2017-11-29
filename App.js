import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { type NavigationState } from 'react-navigation';
import { useStrict } from 'mobx';
import * as firebase from 'firebase';

// import credentials from './credentials.json';

import launch_drawer from './src/launch.js';
import post_drilldown from './src/tech-discussions/post-drilldown';
import user_profile from './src/user-profile.js';
import colors from './src/colors';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from './src/styles';
import { init_configure_store as init_store, user_session_store as user_store } from './src/state';

const credentials = {};

console.disableYellowBox = true;
useStrict(true);

const Application = StackNavigator(
  {
    home: { screen: launch_drawer },
    post_discussion: { screen: post_drilldown },
    user_profile: { screen: user_profile },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { paddingHorizontal: PADDING_WIDTH_PERCENT_DOUBLE },
    }),
  }
);

export default class extends React.Component {
  // Let's get setup
  async componentDidMount() {
    init_store.load_font();
    // firebase.initializeApp(credentials.firebase);
    // // This happens because of our login modal
    // firebase.auth().onAuthStateChanged(async user => {
    //   if (user != null) {
    //     user_store.set_firebase_user_obj(user);
    //     const g = new Date().getTime();
    //     await firebase
    //       .database()
    //       .ref('users/' + user.uid)
    //       .set({
    //         name: 'Edgar',
    //         logged_in: g,
    //       });
    //     // console.log(user);
    //   }
    // });
  }

  render() {
    return <Application />;
  }
}
