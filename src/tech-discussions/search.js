import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';

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
  },
  search_results_table: {
    backgroundColor: 'red',
    //
  },
});

const SearchBar = observer(() => (
  <View style={styles.search_bar_container}>
    <Text>Search</Text>
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
  <View style={styles.search}>
    <SearchBar />
    <SearchResults />
  </View>
));
