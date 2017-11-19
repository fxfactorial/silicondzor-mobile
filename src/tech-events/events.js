import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import { observer } from 'mobx-react/native';

import { DrawerIconOpener, WithFBLoginModalAvailable } from '../common';
import { PADDING_WIDTH_PERCENT } from '../styles';

const styles = StyleSheet.create({
  events_container: {
    flex: 1,
  },
  sectioned_events_table: {
    backgroundColor: 'red',
  },
});

// Show the events from today and scrolling downward
export default observer(
  class extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      headerLeft: DrawerIconOpener(navigation),
    });

    render() {
      return (
        <WithFBLoginModalAvailable style={styles.events_container}>
          <SectionList style={styles.sectioned_events_table} sections={[]} />
        </WithFBLoginModalAvailable>
      );
    }
  }
);
