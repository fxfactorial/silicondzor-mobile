import React from 'react';
import { observer, Observer } from 'mobx-react/native';
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
import {
  user_session_store as user_store,
  tech_discussion_store,
  language_setting_store as lang_store,
} from '../state';
import { get_post } from '../query';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';

const styles = StyleSheet.create({
  posting_container: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
    backgroundColor: colors.palette.brighter,
    opacity: 0.75,
  },
  post_row: { padding: PADDING_WIDTH_PERCENT },
  no_discuss_text: { fontSize: 24, textAlign: 'center' },
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
const outer_style = { height: window_height, alignItems: 'center', margin: '20%' };
const inner_style = {
  justifyContent: 'center',
  width: '100%',
  backgroundColor: 'white',
  height: '25%',
};

const no_discussions = (
  <Observer>
    {() => (
      <View style={outer_style}>
        <View style={inner_style}>
          <FontText
            style={styles.no_discuss_text}
            font={'lato_bold'}
            content={'No discussions yet'}
          />
        </View>
      </View>
    )}
  </Observer>
);

export default observer(
  class extends React.Component {
    render() {
      const { navigate } = this.props.navigation;

      return (
        <WithFBLoginModalAvailable style={styles.posting_container}>
          <FlatList
            ListEmptyComponent={no_discussions}
            ItemSeparatorComponent={() => white_space}
            data={tech_discussion_store.discussions}
            renderItem={render_row.bind(null, navigate)}
            keyExtractor={({ id }) => id}
          />
        </WithFBLoginModalAvailable>
      );
    }
  }
);
