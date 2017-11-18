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
import { user_session_store, language_setting_store as lang_store } from './state';
import { DrawerIconOpener } from './common';
import language_set from './language-set';

const styles = StyleSheet.create({
  settings_container: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
  },
});

// Using class because might want to use animations
export default observer(
  class extends React.Component {
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
          <Text>{lang_store.locale.emoji_flag}</Text>
          <Text>Current language {lang_store.current_language_name}</Text>

          <Text onPress={lang_store.cycle_localization}>Toggle Language</Text>
        </View>
      );
    }
  }
);
