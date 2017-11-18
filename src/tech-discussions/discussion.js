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
import { Entypo } from '@expo/vector-icons';

import { WithFBLoginModalAvailable, row_separator } from '../common';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';
import dummy_data from 'silicondzor-mobile/dev/dummy-data';

const styles = StyleSheet.create({
  posting_container: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
  },
  posts_table: {
    backgroundColor: 'orange',
  },
  post_row: {
    backgroundColor: 'red',
  },
});

const PRESS_EXPAND_DELAY = 2000;

class PostingRow extends React.Component {
  on_long_press_expand() {
    // Implement animation that expand the row with a bounce
  }

  on_short_press_navigate = () => {
    const { navigate } = this.props;
    // Give the ID as parameter so story can be queryied for, not
    // necessary to be logged in
    navigate('post_discussion');
  };

  render() {
    const { title, upvotes, downvotes, id } = this.props;
    return (
      <TouchableWithoutFeedback
        delayLongPress={2000}
        onLongPress={this.on_long_press_expand}
        onPress={this.on_short_press_navigate}>
        <View style={styles.post_row}>
          <Text>
            {title}
            {upvotes}
            {downvotes}
            {id}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const render_row = (navigate, { item }) => {
  return <PostingRow {...item} navigate={navigate} />;
};

export default observer(
  class extends React.Component {
    render() {
      const { navigate } = this.props.navigation;
      return (
        <WithFBLoginModalAvailable style={styles.posting_container}>
          <FlatList
            style={styles.posts_table}
            data={dummy_data}
            ItemSeparatorComponent={() => row_separator}
            renderItem={render_row.bind(null, navigate)}
            keyExtractor={({ id }) => id}
          />
        </WithFBLoginModalAvailable>
      );
    }
  }
);
