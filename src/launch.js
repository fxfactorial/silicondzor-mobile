import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react/native';
import Modal from 'react-native-modal';

import { PADDING_WIDTH_PERCENT } from './styles';
import { FBLogin } from './modals';

const login_modal_store = new function() {
  extendObservable(this, {
    show: false,
  });
}();

const toggle_login_modal = () =>
  (login_modal_store.show = !login_modal_store.show);

const OpenRight = (
  <TouchableOpacity onPress={toggle_login_modal}>
    <Entypo name={'login'} size={24} />
  </TouchableOpacity>
);

const DrawerIconOpener = ({ navigate }) => (
  <TouchableOpacity onPress={() => navigate('DrawerOpen')}>
    <Entypo name={'code'} size={24} />
  </TouchableOpacity>
);

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
      return (
        <View>
          <Modal isVisible={login_modal_store.show}>
            <FBLogin toggle_enclosing_modal={toggle_login_modal} />
          </Modal>

          <Text onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            Hello World
          </Text>
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
