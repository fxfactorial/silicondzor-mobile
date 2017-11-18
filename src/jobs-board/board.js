import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';

import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';
import { bug_bounty_store as store } from '../state';
import { WithFBLoginModalAvailable, row_separator } from '../common';

const styles = StyleSheet.create({
  board_container: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
  },
  board_table: {
    backgroundColor: 'aliceblue',
  },
});

const BountyRow = ({ poster_id, poster_name, title, content, amount }) => {
  return (
    <Text key={poster_id}>
      {title}->{content}
    </Text>
  );
};

const render_row = (navigate, { item }) => {
  console.log(JSON.stringify(item));
  return <BountyRow {...item} key={item.poster_id} />;
};

export default ({ navigation }) => (
  <WithFBLoginModalAvailable style={styles.board_container}>
    <FlatList
      style={styles.board_table}
      data={store.bounties}
      ItemSeparatorComponent={() => row_separator}
      renderItem={render_row.bind(null, navigation.navigate)}
      keyExtractor={({ id }) => id}
    />
  </WithFBLoginModalAvailable>
);
