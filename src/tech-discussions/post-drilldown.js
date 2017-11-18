// @flow

import React from 'react';
import { observer, Observer } from 'mobx-react/native';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { user_session_store as user_store } from '../state';
import { VOTE_ELEMENTS, WithFBLoginModalAvailable, vote_with_action } from '../common';
import { PADDING_WIDTH_PERCENT } from '../styles';
import { upvote as upvote_query, downvote as downvote_query } from '../query';

const { upvote, downvote } = VOTE_ELEMENTS;

const styles = StyleSheet.create({
  post_container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  current_post_title: {
    // color: 'orange',
  },
  full_post: {
    //
  },
  just_row: {
    backgroundColor: 'red',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  post_toprow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const with_votes_title = store =>
  `${store.currently_viewing_post.upvotes} upvotes ${
    store.currently_viewing_post.downvotes
  } downvotes`;

const headerTitle = (
  <Observer>
    {() => <Text style={styles.current_post_title}>{with_votes_title(user_store)}</Text>}
  </Observer>
);

const upvote_action = post_id => async () => await upvote_query(user_store.user_fb_id, post_id);
const downvote_action = post_id => async () => await downvote_query(user_store.user_fb_id, post_id);

const FullPost = ({
  author_id,
  author_name,
  title,
  content,
  upvotes,
  downvotes,
  post_id,
  replies,
}) => {
  const top_row = (
    <View style={styles.post_toprow}>
      <View>
        {vote_with_action(true, {}, upvote_action(post_id))}
        {vote_with_action(false, {}, downvote_action(post_id))}
      </View>
    </View>
  );
  return (
    <View style={styles.full_post}>
      {top_row}
      {}
    </View>
  );
};

export default observer(
  class extends React.Component<null> {
    static navigationOptions = ({ navigation }) => ({
      headerTitle,
      headerStyle: { paddingHorizontal: PADDING_WIDTH_PERCENT },
    });

    render() {
      return (
        <WithFBLoginModalAvailable style={styles.post_container}>
          <FullPost {...user_store.currently_viewing_post} />
        </WithFBLoginModalAvailable>
      );
    }
  }
);
