import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { PADDING_WIDTH_PERCENT } from '../styles';
import { search_discussions_store } from '../state';

const styles = StyleSheet.create({
  search_container: {
    flex: 1,
    backgroundColor: 'purple',
    padding: PADDING_WIDTH_PERCENT,
  },
});

export default () => (
  <View style={styles.search_container}>
    <Text>Search Tab</Text>
  </View>
);
