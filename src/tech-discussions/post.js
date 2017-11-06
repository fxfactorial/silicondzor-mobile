import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { PADDING_WIDTH_PERCENT } from '../styles';

const styles = StyleSheet.create({
  new_post_container: {
    flex: 1,
    backgroundColor: 'purple',
    padding: PADDING_WIDTH_PERCENT,
  },
});

export default () => (
  <View style={styles.new_post_container}>
    <Text>Post new item</Text>
  </View>
);
