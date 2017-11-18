import React from 'react';
import { observer } from 'mobx-react/native';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';
import { user_session_store } from './state';
import { DrawerIconOpener } from './common';

const styles = StyleSheet.create({
  settings_container: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
  },
});

// Using class because might want to use animations
export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Settings',
    headerRight: null,
    headerLeft: DrawerIconOpener(navigation),
    headerStyle: { paddingHorizontal: PADDING_WIDTH_PERCENT },
  });

  render() {
    return (
      <View style={styles.settings_container}>
        <Text>Settings page, use a button to open modal to login</Text>
      </View>
    );
  }
}
