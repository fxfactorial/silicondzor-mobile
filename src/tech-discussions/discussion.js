import React from 'react';
import { observer } from 'mobx-react/native';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import colors from '../colors';
import { WithFBLoginModalAvailable, row_separator, post_title, FontText } from '../common';
import { height as window_height } from '../styles';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';
import dummy_data from 'silicondzor-mobile/dev/dummy-data';

const card_height = Math.floor(window_height * 0.2);
// Have 20% to play with
const card_title_block_height = Math.floor(window_height * 0.07);
const card_content_block_height = Math.floor(window_height * 0.13);

const styles = StyleSheet.create({
  posting_container: { flex: 1, padding: PADDING_WIDTH_PERCENT },
  posts_table: { flex: 2, height: 100000 },
  post_row: { padding: PADDING_WIDTH_PERCENT },
  card_container: {
    height: card_height,
    backgroundColor: 'white',
    shadowColor: '#646464',
    shadowOpacity: 0.5,
    shadowOffset: { width: 3, height: 3 },
    alignItems: 'center',
  },
  card_title: { textAlign: 'center', fontSize: 18 },
  card_title_block: { justifyContent: 'center', height: card_title_block_height },
  card_author: { fontSize: 14, textAlign: 'center' },
  card_content: {
    flex: 1,
    width: '100%',
    padding: PADDING_WIDTH_PERCENT,
  },
  card_post_content: {},
});

const PRESS_EXPAND_DELAY = 500;

// Need to find out height of a component.
// https://github.com/airamrguez/react-native-measure-text
// But requires a detach, ask in expo chat
const sep = React.cloneElement(row_separator, { style: { minWidth: '90%', height: 2 } });
const CARD_TEXT_LIMIT = 200;

class Card extends React.Component {
  // state = { card_expanded: false };

  initial_height = new Animated.Value(50);

  componentDidUpdate() {
    // state changed
  }

  on_long_press_toggle = () => {
    //
  };

  on_short_press_navigate = () => {
    const { navigate } = this.props;
    navigate('post_discussion');
  };

  render() {
    const { title, author, navigate, content = '' } = this.props;
    let clipped_content = null;
    if (content.length <= CARD_TEXT_LIMIT) {
      clipped_content = content;
    } else {
      clipped_content = `${content.substring(0, CARD_TEXT_LIMIT)}...`;
    }
    // let clipped_content = null;
    // if (this.state.text_expanded) clipped_content = `${content.substring(0, 200)}...`;
    // else clipped_content = `${content.substring(0, 100)}...`;
    // const max_content = this.state.expanded ? content : `${content.substring(0, 100)}...`;

    return (
      <View style={styles.card_container}>
        <View style={styles.card_title_block}>
          <FontText content={title} style={styles.card_title} />
          <FontText content={author} style={styles.card_author} />
        </View>
        {sep}
        {/* This is the animation that needs to expand, come back to*/}
        <TouchableWithoutFeedback
          delayLongPress={PRESS_EXPAND_DELAY}
          onLongPress={this.on_long_press_toggle}
          onPress={this.on_short_press_navigate}>
          <Animated.View style={[styles.card_content, { height: this.initial_height }]}>
            <FontText content={clipped_content} style={styles.card_post_content} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

// class PostingRow extends React.Component {
//   on_long_press_expand() {
//     console.log('Long press animation expand');
//     // Implement animation that expand the row with a bounce
//   }

//   on_short_press_navigate = () => {
//     console.log('short press');
//     const { navigate } = this.props;
//     // Give the ID as parameter so story can be queryied for, not
//     // necessary to be logged in
//     navigate('post_discussion');
//   };

// render() {
//   return (
//     <TouchableWithoutFeedback
//       delayLongPress={2000}
//       onLongPress={this.on_long_press_expand}
//       onPress={this.on_short_press_navigate}>
//       </TouchableWithoutFeedback>
//     );
//   }
// }

const render_row = (navigate, { item }) => {
  // console.log(JSON.stringify(item));
  return <Card {...item} navigate={navigate} />;
};

const white_space = <View style={{ height: 15 }} />;

export default observer(
  class extends React.Component {
    render() {
      const { navigate } = this.props.navigation;

      return (
        <WithFBLoginModalAvailable style={styles.posting_container}>
          <FlatList
            style={styles.posts_table}
            ItemSeparatorComponent={() => white_space}
            data={dummy_data}
            renderItem={render_row.bind(null, navigate)}
            keyExtractor={({ id }) => id}
          />
        </WithFBLoginModalAvailable>
      );
    }
  }
);
