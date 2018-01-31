import React from 'react';
import Expo, { Asset, Permissions } from 'expo';
import { StyleSheet, View, Text, NativeModules } from 'react-native';

const { ExponentLocalization } = NativeModules;

export default class Localization extends React.Component {
  perms = async () => {
    const list = [
      // Permissions.NOTIFICATIONS,
      // Permissions.LOCATION,
      // Permissions.CAMERA,
      // Permissions.AUDIO_RECORDING,
      Permissions.CONTACTS,
      // Permissions.CAMERA_ROLL,
    ];
    for (const p of list) {
      const r = await Permissions.askAsync(p);
      console.log({ r, p });
    }
  };

  render() {
    return (
      <View style={styles.centered}>
        <Text onPress={this.perms}>Perms</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
