import React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import { observer } from 'mobx-react/native';

import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_4X } from '../styles';
import { login_store, user_session_store } from '../stores';

const common_login_box = {
  backgroundColor: 'blue',
  height: '80%',
  width: '80%',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
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

            <View style={styles.inputs}>
              <View style={styles.inputs_spaced}>
                <TextInput
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    backgroundColor: 'purple',
                  }}
                  onChangeText={login_store.set_login}
                  value={login_store.login}
                />
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={login_store.set_password}
                  value={login_store.password}
                />
              </View>
            </View>

            <Text onPress={this.do_login} style={[styles.login_button, { backgroundColor }]}>
              Login
            </Text>
          </View>
        </View>
      );
    }

    logged_in_view() {
      return (
        <View>
          <Text>Logged in view</Text>
        </View>
      );
    }

    render() {
      const { logged_in } = user_session_store;
      if (logged_in === false) {
        return this.not_logged_in_view();
      } else {
        return this.logged_in_view();
      }
    }
  }
);
