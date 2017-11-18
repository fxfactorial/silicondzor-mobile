import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Animated,
} from 'react-native';
import { observer, Observer } from 'mobx-react/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import { WithFBLoginModalAvailable } from '../common';
import {
  new_discussion_store,
  language_setting_store as lang_store,
  user_session_store as user_store,
} from '../state';
import { PADDING_WIDTH_PERCENT } from '../styles';

const styles = StyleSheet.create({
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
    // backgroundColor: 'red',
    flex: 1,
  },
});

const post_prompt = (
  <Observer>
    {() => (
      <Text style={styles.post_content_prompt}>{lang_store.locale.be_kind_in_what_you_say}</Text>
    )}
  </Observer>
);

export default observer(
  class extends React.Component {
    state = { error_msg: null };

    try_submit = async () => {
      const result = await this.props.submit_handler();
      console.log(result);
    };

    render() {
      const { new_post_title } = this.props;
      return (
        <WithFBLoginModalAvailable style={styles.new_post_container}>
          <FormLabel>{new_post_title}</FormLabel>
          <FormInput
            maxLength={140}
            value={new_discussion_store.title}
            onChangeText={new_discussion_store.set_title}
            style={styles.post_title_input}
          />
          <FormValidationMessage>{this.state.error_msg}</FormValidationMessage>
          <View style={styles.post_content_block}>
            {post_prompt}
            <InputWithEffect />
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
      return (
        <Animated.View style={styles.post_content_input_container}>
          <TextInput
            multiline={true}
            onChangeText={new_discussion_store.set_body}
            style={[styles.post_content]}
            value={new_discussion_store.body}
          />
        </Animated.View>
      );
    }
  }
);
