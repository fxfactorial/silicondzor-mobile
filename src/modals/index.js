import React from 'react';
import {
  NetInfo,
  Alert,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import { observer } from 'mobx-react/native';
import Modal from 'react-native-modal';
import { Facebook } from 'expo';
import { asyncAction } from 'mobx-utils';

import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_4X } from '../styles';
import { login_store, user_session_store as user_store, login_modal_store } from '../state';
import credentials from 'silicondzor-mobile/credentials';

const common_login_box = {
  backgroundColor: 'white',
  height: '80%',
  width: '80%',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    fontSize: 32,
  },
  login_box:
    Platform.OS === 'ios'
      ? {
          ...common_login_box,
          shadowColor: '#646464',
          shadowOpacity: 0.5,
          shadowOffset: { width: 2, height: 2 },
        }
      : // Android
        {
          ...common_login_box,
        },
  inputs: {
    backgroundColor: 'orange',
    flex: 1,
    justifyContent: 'center',
  },
  login_text: {
    textAlign: 'center',
    paddingTop: '20%',
    fontSize: 24,
  },
  inputs_spaced: {
    height: '40%',
    backgroundColor: 'black',
    justifyContent: 'space-around',
    paddingHorizontal: PADDING_WIDTH_PERCENT,
  },
  login_button: {
    fontSize: 32,
    width: '100%',
    textAlign: 'center',
    marginBottom: PADDING_WIDTH_PERCENT_4X,
  },
  login_input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'purple',
  },
  logout_button: {
    borderWidth: 1,
    backgroundColor: 'red',
  },
});

// Using a class because want to do some animations later and need class for that.
export const FBBasedLogin = observer(
  class extends React.Component {
    not_logged_in_view() {
      // This can be a nice animation transition to enabling
      const backgroundColor = login_store.button_enabled ? 'aliceblue' : 'purple';
      return (
        <View style={styles.container}>
          <View style={styles.login_box}>
            <Text style={styles.login_text}>Silicondzor</Text>
            <Text onPress={this.do_login} style={[styles.login_button, { backgroundColor }]}>
              Login
            </Text>
          </View>
        </View>
      );
    }

    async do_login() {
      const is_connected = __DEV__ ? true : await NetInfo.isConnected.fetch();
      if (is_connected && user_store.logged_in === false) {
        const { type, token } = __DEV__
          ? { type: 'success', token: credentials.dev.fbToken }
          : await Facebook.logInWithReadPermissionsAsync(credentials.fb.appId);
        if (type === 'success') {
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const { id: currentUserId, name } = await response.json();
          const resp = await fetch(
            `https://graph.facebook.com/v2.11/${
              currentUserId
            }?fields=id,name,picture&access_token=${token}`
          );
          await asyncAction(function*({ picture: { data } }) {
            if (__DEV__) {
              console.log({ currentUserId, name, data });
            }
            user_store.name = name;
            user_store.user_fb_id = currentUserId;
            user_store.fb_token = token;
            login_modal_store.show = false;
            user_store.user_fb_profile_picture_url = data.url;
          })(await resp.json());
        }
      } else {
        // Tell user something that we need internet access
      }
    }

    do_logout() {
      // clear out the user
    }

    logged_in_view() {
      setTimeout(async () => {
        await asyncAction(function*() {
          login_modal_store.show = false;
        })();
      }, 1000 * 5);

      return (
        <View style={styles.container}>
          <View style={styles.login_box}>
            <Text>Already Logged in</Text>

            <Text style={styles.logout_button} onPress={this.do_logout}>
              Logout
            </Text>
          </View>
        </View>
      );
    }

    render() {
      const { logged_in } = user_store;
      const content = logged_in === false ? this.not_logged_in_view() : this.logged_in_view();
      return <Modal isVisible={login_modal_store.show}>{content}</Modal>;
    }
  }
);
