import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo, Octicons } from '@expo/vector-icons';
import { observer, Observer } from 'mobx-react/native';
import { Badge, Divider } from 'react-native-elements';

import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from './styles';
import { FBBasedLogin } from './modals';

const styles = StyleSheet.create({
  post_title: {
    fontSize: 18,
  },
  post_author: {
    fontSize: 11,
  },
});

export const DrawerIconOpener = ({ navigate }) => (
  <TouchableOpacity onPress={() => navigate('DrawerOpen')}>
    <Entypo name={'code'} size={24} />
  </TouchableOpacity>
);

export const NEWS_TAB_ICON = <Entypo name={'news'} size={24} />;

export const POST_TAB_ICON = <Entypo name={'new-message'} size={24} />;

export const SEARCH_TAB_ICON = (
  <Octicons name={'search'} style={{ marginTop: PADDING_WIDTH_PERCENT }} size={24} />
);

export const EVENTS_TAB_ICON = <Entypo name={'calendar'} size={24} />;

export const GENERIC_BOARD_TAB_ICON = <Entypo name={'blackboard'} size={24} />;

export const WithFBLoginModalAvailable = p => (
  <View {...p}>
    <FBBasedLogin />
    {p.children}
  </View>
);

export const row_separator = <Divider />;

export const VOTE_ELEMENTS = {
  upvote: <Entypo name={'chevron-up'} size={24} />,
  downvote: <Entypo name={'chevron-down'} size={24} />,
};

export const vote_with_action = (up_arrow, styles = {}, action = null) => (
  <TouchableOpacity onPress={action}>
    {React.cloneElement(up_arrow ? VOTE_ELEMENTS.upvote : VOTE_ELEMENTS.downvote, {
      style: { ...styles },
    })}
  </TouchableOpacity>
);

export const post_title = (title, author_name) => (
  <View>
    <Text style={styles.post_title}>{title}</Text>
    <Badge textStyle={styles.post_author} value={author_name} />
  </View>
);
