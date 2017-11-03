import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react/native';
import Modal from 'react-native-modal';

import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from './styles';
import { FBLogin } from './modals';
import dummy_data from 'silicondzor-mobile/dev/dummy-data';

const login_modal_store = new function() {
  extendObservable(this, {
    show: false,
  });

  this.toggle_show = () => (this.show = !this.show);
}();

const OpenRight = (
  <TouchableOpacity onPress={login_modal_store.toggle_show}>
    <Entypo name={'login'} size={24} />
  </TouchableOpacity>
);

const DrawerIconOpener = ({ navigate }) => (
  <TouchableOpacity onPress={() => navigate('DrawerOpen')}>
    <Entypo name={'code'} size={24} />
  </TouchableOpacity>
);

const row_separator = <View style={{ height: PADDING_WIDTH_PERCENT_DOUBLE }} />;

class PostingRow extends React.Component {
  render() {
    const { title, upvotes, downvotes, id, navigate } = this.props;
    return (
      <View>
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

const T = observer(
  class T extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      tabBarLabel: 'Words',
      headerTitle: 'Silicondzor',
      headerRight: OpenRight,
      headerLeft: DrawerIconOpener(navigation),
      headerStyle: { paddingHorizontal: PADDING_WIDTH_PERCENT },
    });

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

const tabs = TabNavigator({
  root: { screen: T },
});

// This are our core functionalities, then each one could be its own
// setup, most likely a tab navigator in each
export default DrawerNavigator({
  tech_discussions: { screen: tabs },
  tech_events: { screen: T },
  bug_bounty_board: { screen: T },
  jobs_board: { screen: T },
});
