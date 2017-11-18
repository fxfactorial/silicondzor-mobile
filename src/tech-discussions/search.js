import React from 'react';
import { Text, TextInput, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';
import { SearchBar } from 'react-native-elements';

import { WithFBLoginModalAvailable } from '../common';
import { PADDING_WIDTH_PERCENT } from '../styles';
import {
  search_discussions_store as search_store,
  language_setting_store as lang_store,
} from '../state';

const styles = StyleSheet.create({
  search: {
    flex: 1,
    backgroundColor: 'aliceblue',
    padding: PADDING_WIDTH_PERCENT,
  },
  search_results_table: {
    backgroundColor: 'orange',
    padding: PADDING_WIDTH_PERCENT,
  },
  spacer: { height: '5%' },
});

const spacer = <View style={styles.spacer} />;

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
    data={search_store.search_results}
  />
));

export default observer(({ navigation }) => (
  <WithFBLoginModalAvailable style={styles.search}>
    <SearchBar
      lightTheme
      onChangeText={search_store.change_search_text}
      onClearText={null}
      placeholder={lang_store.locale.search}
    />
    {spacer}
    <SearchResults />
  </WithFBLoginModalAvailable>
));
