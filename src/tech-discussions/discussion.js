import React from 'react';
import { observer } from 'mobx-react/native';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Badge } from 'react-native-elements';

import colors from '../colors';
import {
  WithFBLoginModalAvailable,
  row_separator,
  FontText,
  VOTE_ELEMENTS,
  five_between,
  Card,
} from '../common';
import { height as window_height } from '../styles';
import { user_session_store as user_store, language_setting_store as lang_store } from '../state';
import { get_post } from '../query';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';
import dummy_data from 'silicondzor-mobile/dev/dummy-data';

const styles = StyleSheet.create({
  posting_container: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
    backgroundColor: colors.palette.brighter,
    opacity: 0.75,
  },
  posts_table: { flex: 2, height: 100000 },
  post_row: { padding: PADDING_WIDTH_PERCENT },
});

// Need to find out height of a component.
// https://github.com/airamrguez/react-native-measure-text
// But requires a detach, ask in expo chat
const render_row = (navigate, { item }) => (
  <Card
    {...item}
    on_short_press={async () => {
      user_store.set_current_post(await get_post(item.post_id));
      navigate('post_discussion');
    }}
  />
);

const white_space = <View style={{ height: 15 }} />;

export default observer(
  class extends React.Component {
    render() {
      const { navigate } = this.props.navigation;

      return (
        <WithFBLoginModalAvailable style={styles.posting_container}>
          <FlatList
            style={styles.posts_table}
            ItemSeparatorComponent={() => white_space}
            data={dummy_data}
            renderItem={render_row.bind(null, navigate)}
            keyExtractor={({ id }) => id}
          />
        </WithFBLoginModalAvailable>
      );
    }
  }
);
