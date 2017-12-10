// @flow

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { row_separator, FontText } from '../common';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default class extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FontText content={'Hello'} />
      </View>
    );
  }
}
