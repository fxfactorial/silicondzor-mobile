import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';

import { DrawerIconOpener } from '../common-components';
import { PADDING_WIDTH_PERCENT } from '../styles';

const styles = StyleSheet.create({
  events_container: {
    flex: 1,
  },
  header_style: {
    //
  },
});

const headerTitle = <Text style={styles.header_style}>Tech Events in Armenia</Text>;

export default observer(
  class extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      headerTitle,
      headerLeft: DrawerIconOpener(navigation),
      headerStyle: { paddingHorizontal: PADDING_WIDTH_PERCENT },
    });

    render() {
      return (
        <View style={styles.events_container}>
          <Text>Events</Text>
        </View>
      );
    }
  }
);
