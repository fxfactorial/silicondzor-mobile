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
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import * as firebase from 'firebase';

import {
  PADDING_WIDTH_PERCENT,
  PADDING_WIDTH_PERCENT_4X,
  height as window_height,
} from '../styles';
import {
  login_store,
  user_session_store as user_store,
  login_modal_store,
  new_reply_store as reply_store,
} from '../state';
import { FontText } from '../common';
import credentials from 'silicondzor-mobile/credentials';
import colors from '../colors';

const common_login_box = {
  backgroundColor: 'white',
  height: '80%',
  width: '80%',
};

const REPLY_BOX_HEIGHT = Math.floor(window_height * 0.7);
// Have 0.7 to play with
const REPLY_HEADER_HEIGHT = Math.floor(window_height * 0.15);
const REPLY_INPUT_HEIGHT = Math.floor(window_height * 0.45);
const REPLY_SEND_BUTTON_HEIGHT = Math.floor(window_height * 0.1);

const styles = StyleSheet.create({
  reply_container: {
    flex: 1,
  },
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
  reply_modal: {
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: REPLY_BOX_HEIGHT,
  },
  reply_title_header: {
    minHeight: REPLY_HEADER_HEIGHT,
  },
  reply_text_content: {
    padding: PADDING_WIDTH_PERCENT,
    minHeight: REPLY_INPUT_HEIGHT,
  },
  reply_send_button: {
    minHeight: REPLY_SEND_BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.palette.base,
  },
  reply_send_button_text: {
    fontSize: 24,
    color: 'white',
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
          const firebase_credentials = firebase.auth.FacebookAuthProvider.credential(token);
          const result = await firebase.auth().signInWithCredential(firebase_credentials);
          console.log({ result });

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

export const Reply = observer(() => {
  // This should be a swipe up animation, use gesture handler later
  const content = (
    <View style={styles.reply_container}>
      <View style={styles.reply_title_header}>
        <FormLabel>Optional Reply Title</FormLabel>
        <FormInput
          maxLength={140}
          value={reply_store.title}
          onChangeText={reply_store.set_title}
          style={styles.post_title_input}
        />
        <FormValidationMessage />
      </View>

      <TextInput
        multiline={true}
        onChangeText={reply_store.set_body}
        style={[styles.reply_text_content]}
        value={reply_store.body}
      />
      <TouchableOpacity onPress={reply_store.send_reply}>
        <View style={styles.reply_send_button}>
          <FontText style={styles.reply_send_button_text} content={'Post Reply'} />
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <Modal style={styles.reply_modal} isVisible={reply_store.show_reply_modal}>
      {content}
    </Modal>
  );
});
