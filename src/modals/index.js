import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export const FBLogin = ({ toggle_enclosing_modal }) => (
  <View style={styles.container}>
    <Text onPress={toggle_enclosing_modal}>Login</Text>
  </View>
);
