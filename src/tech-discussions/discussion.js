import React from 'react';
import { observer } from 'mobx-react/native';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import colors from '../colors';
import { WithFBLoginModalAvailable, row_separator, post_title } from '../common';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';
import dummy_data from 'silicondzor-mobile/dev/dummy-data';

const styles = StyleSheet.create({
  posting_container: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
  },
  posts_table: {
    flex: 2,
    height: 100000,
  },
  post_row: {
    padding: PADDING_WIDTH_PERCENT,
  },
  card_container: {
    backgroundColor: 'white',
    shadowColor: '#646464',
    shadowOpacity: 0.5,
    shadowOffset: { width: 3, height: 3 },
    alignItems: 'center',
  },
  card_title: {
    textAlign: 'center',
    fontSize: 18,
  },
  card_author: {
    fontSize: 14,
    textAlign: 'center',
  },
  card_title_block: {
    justifyContent: 'space-around',
  },
  card_content: {
    paddingVertical: '5%',
  },
});

const PRESS_EXPAND_DELAY = 1000;

const sep = React.cloneElement(row_separator, { style: { minWidth: '90%', height: 2 } });

class Card extends React.Component {
  state = { expanded: false };

  initial_height = new Animated.Value(50);

  on_long_press_expand = () => {
    Animated.timing(this.initial_height, {
      toValue: this.state.expanded === false ? 150 : 50,
    }).start(() => {
      this.setState(({ expanded }) => ({ expanded: !expanded }));
    });

    console.log('logn press hint');
  };

  on_short_press_navigate = () => {
    console.log('Short press');
  };

  render() {
    const { title, author, navigate, content = '' } = this.props;
    const max_content = `${content.substring(0, 100)}...`;

    return (
      <View style={styles.card_container}>
        <View style={styles.card_title_block}>
          <Text style={styles.card_title}>{title}</Text>
          <Text style={styles.card_author}>{author}</Text>
        </View>
        {sep}
        <TouchableWithoutFeedback
          delayLongPress={2000}
          onLongPress={this.on_long_press_expand}
          onPress={this.on_short_press_navigate}>
          <Animated.View style={[{ height: this.initial_height }]}>
            <Text>{max_content}</Text>
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
