import React from 'react';
import { TouchableOpacity, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { useStrict } from 'mobx';
import { AppLoading, Font } from 'expo';
import * as firebase from 'firebase';
import { observer } from 'mobx-react/native';
// import credentials from './credentials.json';

import launch_drawer from './src/launch.js';
import post_drilldown from './src/tech-discussions/post-drilldown';
import user_profile from './src/user-profile.js';
import colors from './src/colors';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from './src/styles';
import { user_session_store as user_store } from './src/state';

console.disableYellowBox = true;
useStrict(true);

const RootNavigation = StackNavigator(
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

export default observer(
  class YerevanCoderApplication extends React.Component {
    handle_loading_error = e => {
      console.warn('Application encountered error' + JSON.stringify(e));
    };

    async _application_startup_caching() {
      await Font.loadAsync({
        lato_italic: require('silicondzor-mobile/assets/fonts/Lato-Italic.ttf'),
        lato_light: require('silicondzor-mobile/assets/fonts/Lato-Light.ttf'),
        lato_regular: require('silicondzor-mobile/assets/fonts/Lato-Regular.ttf'),
        lato_bold: require('silicondzor-mobile/assets/fonts/Lato-Bold.ttf'),
        lato_black: require('silicondzor-mobile/assets/fonts/Lato-Black.ttf'),
      });
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
      if (user_store.application_ready === false) {
        return (
          <AppLoading
            onError={this._application_startup_caching}
            startAsync={this._application_startup_caching}
            onFinish={user_store.set_app_loaded}
          />
        );
      }
      return <RootNavigation />;
    }
  }
);
