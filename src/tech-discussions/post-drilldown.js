// @flow

import React from 'react';
import { toJS } from 'mobx';
import { observer, Observer } from 'mobx-react/native';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Badge } from 'react-native-elements';
import { LinearGradient } from 'expo';

import { Reply } from '../modals';
import {
  user_session_store as user_store,
  new_reply_store as reply_store,
  language_setting_store as lang_store,
} from '../state';
import {
  VOTE_ELEMENTS,
  WithFBLoginModalAvailable,
  vote_with_action,
  post_title,
  FontText,
  REPLY_ARROW_ICON,
} from '../common';
import { PADDING_WIDTH_PERCENT, height as window_height } from '../styles';
import { upvote as upvote_query, downvote as downvote_query } from '../query';
import colors from '../colors';

const reply_button_height = Math.floor(window_height * 0.07);

const FULL_POST_VIEW_HEIGHT = Math.floor(window_height * 0.35);

const styles = StyleSheet.create({
  post_container: {
    flex: 1,
  },
  post_toprow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  post_content_container: {
    backgroundColor: colors.palette.base,
    minHeight: FULL_POST_VIEW_HEIGHT,
    padding: PADDING_WIDTH_PERCENT,
  },
  post_content_text: {
    color: 'white',
    fontSize: 15,
  },
  post_scroll_container: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.palette.brighter,
  },
  replies_container: {
    backgroundColor: 'aliceblue',
    flex: 1,
    minHeight: '100%',
  },
  title: {
    color: 'white',
    fontSize: 20,
    paddingVertical: PADDING_WIDTH_PERCENT,
    textAlign: 'center',
  },
  hovering_reply_button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    height: reply_button_height,
    shadowColor: '#646464',
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 2 },
  },
  reply_button_text: { fontSize: 24, color: 'white', backgroundColor: 'transparent' },
  reply_row: {
    padding: PADDING_WIDTH_PERCENT,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
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

// const upvote_action = post_id => async () => await upvote_query(user_store.user_fb_id, post_id);
// const downvote_action = post_id => async () => await downvote_query(user_store.user_fb_id, post_id);

const PostTitle = ({ title }) => {
  return <FontText font={'lato_bold'} style={styles.title} content={title} />;
};

const PostContent = ({ post_id, content }) => (
  <ScrollView style={styles.post_content_container}>
    <FontText content={content} style={styles.post_content_text} />
  </ScrollView>
);

const Replies = ({ post_id, replies }) => {
  console.log(replies);
  const replies_render = replies.map(x => {
    return (
      <View style={styles.reply_row}>
        {REPLY_ARROW_ICON}
        <FontText key={x.reply} content={x.reply} />
      </View>
    );
  });
  return <View style={styles.replies_container}>{replies_render}</View>;
};

const ReplyButton = observer(({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      style={styles.hovering_reply_button}
      colors={[colors.palette.base, colors.palette.greyed]}>
      <FontText
        style={styles.reply_button_text}
        font={'lato_light'}
        content={lang_store.locale.reply_button_text}
      />
    </LinearGradient>
  </TouchableOpacity>
));

export default observer(
  class extends React.Component<null> {
    static navigationOptions = ({ navigation }) => ({
      headerTitle,
    });

    render() {
      console.log(JSON.stringify(toJS(user_store.currently_viewing_post)));

      return (
        <WithFBLoginModalAvailable style={styles.post_container}>
          <Reply />
          <ScrollView style={styles.post_scroll_container}>
            <PostTitle {...user_store.currently_viewing_post} />
            <PostContent {...user_store.currently_viewing_post} />
            <Replies {...user_store.currently_viewing_post} />
          </ScrollView>
          <ReplyButton onPress={reply_store.toggle_modal} />
        </WithFBLoginModalAvailable>
      );
    }
  }
);
