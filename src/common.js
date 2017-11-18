import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
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

import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from './styles';
import { FBBasedLogin } from './modals';
import {
  language_setting_store as lang_store,
  new_discussion_store,
  user_session_store as user_store,
} from './state';

const styles = StyleSheet.create({
  post_title: {
    fontSize: 18,
  },
  post_author: {
    fontSize: 11,
  },
  new_post_container: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
    backgroundColor: 'aliceblue',
  },
  post_title: {
    fontSize: 24,
  },
  title_input: {
    backgroundColor: 'purple',
  },
  post_content_input_container: {
    flex: 1,
    maxHeight: '80%',
    padding: PADDING_WIDTH_PERCENT,
    shadowColor: '#646464',
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 2 },
  },
  post_content: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
  },
  post_title_input: {
    backgroundColor: 'red',
    padding: PADDING_WIDTH_PERCENT,
  },
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
      const result = await this.props.submit_handler();
      console.log(result);
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
              disabled={user_store.logged_in}
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
