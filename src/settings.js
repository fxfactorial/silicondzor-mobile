import React from 'react';
import { observer, Observer } from 'mobx-react/native';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Entypo } from '@expo/vector-icons';

import { WithFBLoginModalAvailable } from './common';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';
import { user_session_store, language_setting_store as lang_store } from './state';
import { DrawerIconOpener } from './common';
import language_set from './language-set';
// <Text>Settings page, use a button to open modal to login</Text>
// <Text>{lang_store.locale.emoji_flag}</Text>
// <Text>Current language {lang_store.current_language_name}</Text>
// <Text onPress={lang_store.cycle_localization}>Toggle Language</Text>

const styles = StyleSheet.create({
  settings_container: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
  },
  block_with_photo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '130%',
  },
  rounded_profile: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  profile_img: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  photo_with_text: {
    height: '75%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  name_text: {
    color: 'white',
    fontSize: 24,
  },
});

const title = (
  <Observer>{() => <Text style={styles.title}>{lang_store.locale.settings}</Text>}</Observer>
);

const clr_range = ['#4c669f', '#3b5998', '#192f6a'];

// Using class because might want to use animations
export default observer(
  class extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      headerTitle: title,
      headerLeft: DrawerIconOpener(navigation),
      headerStyle: { paddingHorizontal: PADDING_WIDTH_PERCENT },
    });

    signed_in_view() {
      return (
        <Image
          style={styles.profile_img}
          resizeMode={'cover'}
          source={{ url: user_session_store.user_fb_profile_picture_url }}
        />
      );
    }

    user_name() {
      const message = user_session_store.logged_in ? user_session_store.name : ' ';
      return <Text style={styles.name_text}>{message}</Text>;
    }

    signed_out_view() {
      return <Text>Signed out</Text>;
    }

    render() {
      const circle_view = user_session_store.logged_in
        ? this.signed_in_view()
        : this.signed_out_view();
      const user_text = this.user_name();
      return (
        <WithFBLoginModalAvailable style={styles.settings_container}>
          <ScrollView>
            <LinearGradient style={styles.block_with_photo} colors={clr_range}>
              <View style={styles.photo_with_text}>
                <View style={styles.rounded_profile}>{circle_view}</View>
                {user_text}
              </View>
            </LinearGradient>
            <Text>More</Text>
          </ScrollView>
        </WithFBLoginModalAvailable>
      );
    }
  }
);
