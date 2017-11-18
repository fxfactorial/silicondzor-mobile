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

const headerTitle = <Text style={styles.header_style}>Tech Events in Armenia</Text>;

// Show the events from today and scrolling downward
export default observer(
  class extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      headerTitle,
      headerLeft: DrawerIconOpener(navigation),
      headerStyle: { paddingHorizontal: PADDING_WIDTH_PERCENT },
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
