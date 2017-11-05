import React from 'react';
import { observer } from 'mobx-react/native';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons';

import { FBLogin } from '../modals';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';
import { login_modal_store } from '../stores';
import dummy_data from 'silicondzor-mobile/dev/dummy-data';

const row_separator = <View style={{ height: PADDING_WIDTH_PERCENT_DOUBLE }} />;

const styles = StyleSheet.create({
  post_row: {
    //
    backgroundColor: 'red',
  },
});

class PostingRow extends React.Component {
  render() {
    const { title, upvotes, downvotes, id, navigate } = this.props;
    return (
      <View style={styles.post_row}>
        <Text>
          {title}
          {upvotes}
          {downvotes}
          {id}
        </Text>
      </View>
    );
  }
}

const render_row = (navigate, { item }) => {
  console.warn(item);
  return <PostingRow {...item} navigate={navigate} />;
};

export default observer(
  class extends React.Component {
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <Modal isVisible={login_modal_store.show}>
            <FBLogin toggle_enclosing_modal={login_modal_store.toggle_show} />
          </Modal>
          <FlatList
            data={dummy_data}
            ItemSeparatorComponent={() => row_separator}
            renderItem={render_row.bind(null, navigate)}
            keyExtractor={({ id }) => id}
          />
          <Text onPress={() => navigate('DrawerOpen')}>Hello World</Text>
        </View>
      );
    }
  }
);
