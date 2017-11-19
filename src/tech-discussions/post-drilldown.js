// @flow

import React from 'react';
import { observer, Observer } from 'mobx-react/native';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Badge } from 'react-native-elements';

import { user_session_store as user_store, language_setting_store as lang_store } from '../state';
import { VOTE_ELEMENTS, WithFBLoginModalAvailable, vote_with_action, post_title } from '../common';
import { PADDING_WIDTH_PERCENT } from '../styles';
import { upvote as upvote_query, downvote as downvote_query } from '../query';

const { upvote, downvote } = VOTE_ELEMENTS;

const styles = StyleSheet.create({
  post_container: {
    flex: 1,
  },
  full_post: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_WIDTH_PERCENT,
  },
  post_toprow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  post_content_container: {
    backgroundColor: 'purple',
    minHeight: '30%',
    padding: PADDING_WIDTH_PERCENT,
  },
  post_content_text: {
    color: 'white',
    fontSize: 15,
  },
  post_scroll_container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'orange',
  },
  replies_container: {
    backgroundColor: 'aliceblue',
    flex: 1,
    minHeight: '100%',
  },
});

const headerTitle = (
  <Observer>
    {() => {
      const with_votes_title = store =>
        `${store.currently_viewing_post.upvotes} ${lang_store.locale.up} ${
          store.currently_viewing_post.downvotes
        } down`;

      return <Text style={styles.current_post_title}>{with_votes_title(user_store)}</Text>;
    }}
  </Observer>
);

const upvote_action = post_id => async () => await upvote_query(user_store.user_fb_id, post_id);
const downvote_action = post_id => async () => await downvote_query(user_store.user_fb_id, post_id);

const PostTitle = ({
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
      {post_title(title, author_name)}
    </View>
  );
};

const PostContent = ({ content, post_id }) => (
  <View style={styles.post_content_container}>
    <Text style={styles.post_content_text}>{content}</Text>
  </View>
);

const Replies = ({ post_id, replies }) => {
  return (
    <View style={styles.replies_container}>
      <Text>Some recursive algo</Text>
    </View>
  );
};

export default observer(
  class extends React.Component<null> {
    static navigationOptions = ({ navigation }) => ({
      headerTitle,
    });

    render() {
      return (
        <WithFBLoginModalAvailable style={styles.post_container}>
          <ScrollView style={styles.post_scroll_container}>
            <PostTitle {...user_store.currently_viewing_post} />
            <PostContent {...user_store.currently_viewing_post} />
            <Replies {...user_store.currently_viewing_post} />
          </ScrollView>
        </WithFBLoginModalAvailable>
      );
    }
  }
);
