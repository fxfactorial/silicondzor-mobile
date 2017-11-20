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
import { Badge } from 'react-native-elements';

import colors from '../colors';
import {
  WithFBLoginModalAvailable,
  row_separator,
  vote_with_action,
  post_title,
  FontText,
  VOTE_ELEMENTS,
} from '../common';
import { height as window_height } from '../styles';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';
import dummy_data from 'silicondzor-mobile/dev/dummy-data';

const card_height = Math.floor(window_height * 0.22);

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
  card_title: { fontSize: 20 },
  card_title_block: {
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '100%',
    paddingLeft: PADDING_WIDTH_PERCENT,
    paddingTop: PADDING_WIDTH_PERCENT,
  },
  card_author: { fontSize: 14, color: 'white', textAlign: 'center' },
  card_content: {
    width: '100%',
    padding: PADDING_WIDTH_PERCENT_DOUBLE,
  },
  flex_start: { alignItems: 'flex-start' },
  person_column: { paddingLeft: PADDING_WIDTH_PERCENT_DOUBLE },
  badge: { backgroundColor: colors.palette.base },
});

const PRESS_EXPAND_DELAY = 500;

// Need to find out height of a component.
// https://github.com/airamrguez/react-native-measure-text
// But requires a detach, ask in expo chat
const sep = React.cloneElement(row_separator, {
  style: {
    backgroundColor: colors.drawer_component.start,
    minWidth: '95%',
    height: 2,
    opacity: 0.6,
  },
});
const CARD_TEXT_LIMIT = 150;

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
    const vote_column = (
      <View style={styles.flex_start}>
        {vote_with_action(true)}
        {vote_with_action(false)}
      </View>
    );
    const person_column = (
      <View style={[styles.flex_start, styles.person_column]}>
        <FontText font={'lato_light'} content={title} style={styles.card_title} />
        <Badge containerStyle={styles.badge}>
          <FontText font={'lato_light'} content={author} style={styles.card_author} />
        </Badge>
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
          delayLongPress={PRESS_EXPAND_DELAY}
          onLongPress={this.on_long_press_toggle}
          onPress={this.on_short_press_navigate}>
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
