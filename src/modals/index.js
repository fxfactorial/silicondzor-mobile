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
import { extendObservable, when } from 'mobx';

import { PADDING_WIDTH_PERCENT } from '../styles';

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
  },
  inputs_spaced: {
    height: '40%',
    backgroundColor: 'black',
    justifyContent: 'space-around',
    paddingHorizontal: PADDING_WIDTH_PERCENT,
  },
});

const login_store = new function() {
  extendObservable(this, {
    login: '',
    password: '',
  });
  when(
    () => this.login !== '' && this.password !== '',
    async () => {
      console.warn('Ready to check password');
      //
    }
  );
  this.set_login = l => (this.login = l);
  this.set_password = l => (this.password = l);
}();

// Using a class because want to do some animations later and need class for that.
export const FBLogin = observer(
  class extends React.Component {
    render() {
      const { toggle_enclosing_modal } = this.props;

      return (
        <View style={styles.container}>
          <View style={styles.login_box}>
            <Text style={styles.login_text}>Login</Text>

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
          </View>
        </View>
      );
    }
  }
);
