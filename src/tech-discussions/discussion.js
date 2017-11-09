import React from 'react';
import { observer } from 'mobx-react/native';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { WithFBLoginModalAvailable } from '../common-components';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';
import dummy_data from 'silicondzor-mobile/dev/dummy-data';

const row_separator = <View style={{ height: PADDING_WIDTH_PERCENT_DOUBLE }} />;

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

class PostingRow extends React.Component {
  render() {
    const { title, upvotes, downvotes, id, navigate } = this.props;
    return (
      <View style={styles.post_row}>
        <Text onPress={() => navigate('post_discussion')}>
          {title}
          {upvotes}
          {downvotes}
          {id}
        </Text>
      </View>
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
