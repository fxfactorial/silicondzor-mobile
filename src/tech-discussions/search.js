import React from 'react';
import { Text, TextInput, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';

import { WithFBLoginModalAvailable } from '../common-components';
import { PADDING_WIDTH_PERCENT } from '../styles';
import { search_discussions_store } from '../state';

const styles = StyleSheet.create({
  search: {
    flex: 1,
    backgroundColor: 'aliceblue',
    padding: PADDING_WIDTH_PERCENT,
  },
  search_bar_container: {
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: 'purple',
    height: '10%',
  },
  search_results_table: {
    backgroundColor: 'orange',
    padding: PADDING_WIDTH_PERCENT,
  },
  spacer: { height: '5%' },
  search_text_input: {
    width: '100%',
    borderRadius: 50,
    paddingLeft: '5%',
    backgroundColor: 'green',
  },
});

const spacer = <View style={styles.spacer} />;

const SearchBar = observer(() => (
  <View style={styles.search_bar_container}>
    <TextInput
      style={styles.search_text_input}
      onChangeText={search_discussions_store.set_search_text}
      value={search_discussions_store.search_text}
    />
  </View>
));

const SearchResult = ({ author, id, title, upvotes, downvotes }) => (
  <View>
    <Text>
      {author}-{id}-{title}-{upvotes}-{downvotes}
    </Text>
  </View>
);

const render_search_result = ({ item }) => {
  return <SearchResult {...item} />;
};

const key_for_search_extract = ({ id }) => id;

const SearchResults = observer(() => (
  <FlatList
    style={styles.search_results_table}
    renderItem={render_search_result}
    keyExtractor={key_for_search_extract}
    data={search_discussions_store.search_results}
  />
));

export default observer(({ navigation }) => (
  <WithFBLoginModalAvailable style={styles.search}>
    <SearchBar />
    {spacer}
    <SearchResults />
  </WithFBLoginModalAvailable>
));
