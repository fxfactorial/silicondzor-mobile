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
import { Hideo, Akira } from 'react-native-textinput-effects';
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
    // textAlign: 'center',
    //
  },
  post_content: {
    height: 300,
  },
  title_input: {
    //
    height: 10,
    backgroundColor: 'purple',
  },
});

const post_title = <Text style={styles.post_title}>Discussion Title</Text>;

const InputWithEffect = observer(
  class extends React.Component {
    componentDidMount() {
      console.warn(this._text_input);
    }

    render() {
      return (
        <TouchableWithoutFeedback>
          <Animated.View>
            <Text>Be kind and respectful in what you say</Text>
            <TextInput
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

export default observer(
  class extends React.Component {
    render() {
      return (
        <View style={styles.new_post_container}>
          {post_title}
          <Hideo
            value={new_discussion_store.title}
            onChangeText={new_discussion_store.set_title}
            iconClass={MaterialIcons}
            iconName={'subtitles'}
            iconColor={'white'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#f2a59d'}
            inputStyle={{ color: '#464949' }}
          />
          <InputWithEffect />
        </View>
      );
    }
  }
);
