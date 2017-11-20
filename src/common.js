import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Entypo, Octicons } from '@expo/vector-icons';
import { observer, Observer } from 'mobx-react/native';
import {
  Badge,
  Divider,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
} from 'react-native-elements';

import colors from './colors';
import {
  PADDING_WIDTH_PERCENT,
  PADDING_WIDTH_PERCENT_DOUBLE,
  height as window_height,
} from './styles';
import { FBBasedLogin } from './modals';
import {
  language_setting_store as lang_store,
  new_discussion_store,
  user_session_store as user_store,
  init_configure_store as init_store,
} from './state';

const card_height = Math.floor(window_height * 0.22);

const styles = StyleSheet.create({
  post_title: { fontSize: 18 },
  post_author: { fontSize: 11 },
  new_post_container: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
    backgroundColor: 'aliceblue',
  },
  title_input: { backgroundColor: 'purple' },
  post_content_input_container: {
    flex: 1,
    maxHeight: '80%',
    padding: PADDING_WIDTH_PERCENT,
    shadowColor: '#646464',
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 2 },
  },
  post_content: { flex: 1, padding: PADDING_WIDTH_PERCENT },
  post_title_input: { padding: PADDING_WIDTH_PERCENT },
  post_content_prompt: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '200',
  },
  post_content_block: {
    justifyContent: 'space-between',
    flex: 1,
  },
  listing_row: {
    shadowColor: '#646464',
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 2 },
  },
  code_icon: { color: colors.palette.darkest, opacity: 0.9 },
  card_title_block: {
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '100%',
    paddingLeft: PADDING_WIDTH_PERCENT,
    paddingTop: PADDING_WIDTH_PERCENT,
  },

  flex_start: { alignItems: 'flex-start' },
  person_column: { paddingLeft: PADDING_WIDTH_PERCENT_DOUBLE },
  card_title: { fontSize: 20 },
  badge_row: { flexDirection: 'row', minWidth: '70%' },
  badge: { backgroundColor: colors.palette.base },
  card_author: { fontSize: 14, color: 'white', textAlign: 'center' },
  card_content: {
    width: '100%',
    padding: PADDING_WIDTH_PERCENT_DOUBLE,
  },
  card_container: {
    height: card_height,
    backgroundColor: 'white',
    shadowColor: '#646464',
    shadowOpacity: 0.5,
    shadowOffset: { width: 3, height: 3 },
    alignItems: 'center',
  },
});

export const DrawerIconOpener = ({ navigate }) => (
  <TouchableOpacity onPress={() => navigate('DrawerOpen')}>
    <Entypo style={styles.code_icon} name={'code'} size={24} />
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
  upvote: <Entypo name={'thumbs-up'} size={24} />,
  downvote: <Entypo name={'thumbs-down'} size={24} />,
};

export const vote_with_action = (up_arrow, styles = {}, action = null) => (
  <TouchableOpacity onPress={action}>
    {React.cloneElement(up_arrow ? VOTE_ELEMENTS.upvote : VOTE_ELEMENTS.downvote, {
      style: { ...styles, backgroundColor: 'transparent', color: colors.palette.darkest },
    })}
  </TouchableOpacity>
);

export const post_title = (title, author_name) => (
  <View style={styles.listing_row}>
    <Text style={styles.post_title}>{title}</Text>
    <Badge textStyle={styles.post_author} value={author_name} />
  </View>
);

const post_prompt = (
  <Observer>
    {() => (
      <Text style={styles.post_content_prompt}>{lang_store.locale.be_kind_in_what_you_say}</Text>
    )}
  </Observer>
);

export const NewPost = observer(
  class extends React.Component {
    state = { error_msg: null };

    // static propTypes = {
    // }

    try_submit = async () => {
      await this.props.submit_handler();
    };

    render() {
      const { new_post_title, store } = this.props;
      return (
        <WithFBLoginModalAvailable style={styles.new_post_container}>
          <FormLabel>{new_post_title}</FormLabel>
          <FormInput
            maxLength={140}
            value={store.title}
            onChangeText={store.set_title}
            style={styles.post_title_input}
          />
          <FormValidationMessage>{this.state.error_msg}</FormValidationMessage>
          <View style={styles.post_content_block}>
            {post_prompt}
            <InputWithEffect store={store} />
            <Button
              disabled={!user_store.logged_in}
              onPress={this.try_submit}
              raised={true}
              title={'Submit'}
            />
          </View>
        </WithFBLoginModalAvailable>
      );
    }
  }
);

const InputWithEffect = observer(
  class extends React.Component {
    render() {
      const { store } = this.props;
      return (
        <Animated.View style={styles.post_content_input_container}>
          <TextInput
            multiline={true}
            onChangeText={store.set_body}
            style={[styles.post_content]}
            value={store.body}
          />
        </Animated.View>
      );
    }
  }
);

export const FontText = observer(({ content, font = 'lato_regular', style = {}, rest = {} }) => (
  <Text style={[style, { fontFamily: init_store.font_loaded ? font : 'Arial' }]} {...rest}>
    {content}
  </Text>
));

export const five_between = <View style={{ width: 5 }} />;

const sep = React.cloneElement(row_separator, {
  style: {
    backgroundColor: colors.drawer_component.start,
    minWidth: '95%',
    height: 2,
    opacity: 0.6,
  },
});

export class Card extends React.Component {
  // state = { card_expanded: false };

  static CARD_TEXT_LIMIT = 150;
  static PRESS_EXPAND_DELAY = 500;

  initial_height = new Animated.Value(50);

  componentDidUpdate() {
    // state changed
  }

  on_long_press_toggle = () => {
    //
  };

  render() {
    const { on_short_press, title, author, navigate, content = '', reply_count = 0 } = this.props;
    let clipped_content = null;
    if (content.length <= Card.CARD_TEXT_LIMIT) {
      clipped_content = content;
    } else {
      clipped_content = `${content.substring(0, Card.CARD_TEXT_LIMIT)}...`;
    }
    const vote_column = (
      <View style={styles.flex_start}>
        {vote_with_action(true)}
        {vote_with_action(false)}
      </View>
    );
    const comment_count = `${reply_count} ${lang_store.locale.replies}`;
    const person_column = (
      <View style={[styles.flex_start, styles.person_column]}>
        <FontText font={'lato_light'} content={title} style={styles.card_title} />
        <View style={styles.badge_row}>
          <Badge containerStyle={styles.badge}>
            <FontText font={'lato_light'} content={author} style={styles.card_author} />
          </Badge>
          {five_between}
          <Badge containerStyle={styles.badge}>
            <FontText font={'lato_light'} content={comment_count} style={styles.card_author} />
          </Badge>
        </View>
      </View>
    );

    return (
      <View style={styles.card_container}>
        <View style={[styles.card_title_block, styles.flex_start]}>
          {vote_column}
          {person_column}
        </View>
        {sep}
        {/* This is the animation that needs to expand, come back to*/}
        <TouchableWithoutFeedback
          delayLongPress={Card.PRESS_EXPAND_DELAY}
          onLongPress={undefined}
          onPress={on_short_press}>
          <Animated.View style={[styles.card_content, { height: this.initial_height }]}>
            <FontText
              font={'lato_light'}
              content={clipped_content}
              style={styles.card_post_content}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export const REPLY_ARROW_ICON = <Entypo name={'level-down'} size={24} />;
