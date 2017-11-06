import React from 'react';
import { observer } from 'mobx-react/native';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { user_session_store } from '../state';

const styles = StyleSheet.create({
  post_container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default observer(
  class extends React.Component {
    render() {
      return (
        <View style={styles.post_container}>
          <Text>Hello</Text>
        </View>
      );
    }
  }
);
