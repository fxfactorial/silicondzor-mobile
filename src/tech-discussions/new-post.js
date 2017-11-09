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
import { observer } from 'mobx-react/native';
import { MaterialIcons } from '@expo/vector-icons';

import { new_discussion_store } from '../state';
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
    backgroundColor: 'yellow',
  },
  post_content: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
    backgroundColor: 'green',
  },

  post_title_input: {
    backgroundColor: 'red',
    padding: PADDING_WIDTH_PERCENT,
  },
  post_content_prompt: {
    fontSize: 16,
  },
  title_banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const post_title = <Text style={styles.post_title}>Discussion Title</Text>;
const post_prompt = (
  <Text style={[styles.post_content_prompt, { textAlign: 'center' }]}>
    Be kind and respectful in what you say
  </Text>
);

export default observer(
  class extends React.Component {
    render() {
      return (
        <View style={styles.new_post_container}>
          <View style={styles.title_banner}>
            {post_title}
            <Text style={styles.post_title}>{new_discussion_store.body.length}</Text>
          </View>
          <TextInput
            value={new_discussion_store.title}
            onChangeText={new_discussion_store.set_title}
            style={styles.post_title_input}
          />
          <InputWithEffect />
        </View>
      );
    }
  }
);

const InputWithEffect = observer(
  class extends React.Component {
    render() {
      return (
        <TouchableWithoutFeedback>
          <Animated.View style={styles.post_content_input_container}>
            {post_prompt}
            <TextInput
              multiline={true}
              onChangeText={new_discussion_store.set_body}
              style={[styles.post_content]}
              value={new_discussion_store.body}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }
  }
);
