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
  Platform,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Entypo } from '@expo/vector-icons';

import { WithFBLoginModalAvailable } from './common';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from 'silicondzor-mobile/src/styles';
import { user_session_store, language_setting_store as lang_store } from './state';
import { DrawerIconOpener } from './common';
import language_set from './language-set';

const styles = StyleSheet.create({
  settings_container: {
    flex: 1,
    padding: PADDING_WIDTH_PERCENT,
  },
  scroll_container: {
    //
  },
  block_with_photo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
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
  with_shadow:
    Platform.OS === 'ios'
      ? {
          height: '300%',
          paddingHorizontal: PADDING_WIDTH_PERCENT,
          backgroundColor: 'white',
          shadowColor: '#646464',
          shadowOpacity: 0.5,
          shadowOffset: { width: 2, height: 2 },
        }
      : {},
  pref_banner: {
    paddingVertical: PADDING_WIDTH_PERCENT,
  },
  pref_banner_text: {
    fontSize: 22,
    fontWeight: '200',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_WIDTH_PERCENT_DOUBLE,
  },
  language_row_prompt: {
    fontSize: 14,
    height: 40,
  },
  emoji_text: {
    fontSize: 20,
  },
});

const title = (
  <Observer>{() => <Text style={styles.title}>{lang_store.locale.settings}</Text>}</Observer>
);

const clr_range = ['#4c669f', '#3b5998', '#192f6a'];

const preferences_banner = (
  <View style={styles.pref_banner}>
    <Text style={styles.pref_banner_text}>Preferences save on change</Text>
  </View>
);

const preference_row = (action, left, right) =>
  action !== null ? (
    <TouchableOpacity onPress={action}>
      <View style={styles.row}>
        {left}
        {right}
      </View>
    </TouchableOpacity>
  ) : (
    <View style={styles.row}>
      {left}
      {right}
    </View>
  );

const language_change_row = preference_row(
  lang_store.cycle_localization,
  <Observer>
    {() => <Text style={styles.language_row_prompt}>{lang_store.locale.language}</Text>}
  </Observer>,
  <Observer>{() => <Text style={styles.emoji_text}>{lang_store.locale.emoji_flag}</Text>}</Observer>
);

const push_notifications_row = preference_row(
  null,
  <Observer>
    {() => <Text style={styles.language_row_prompt}>{lang_store.locale.push_notification}</Text>}
  </Observer>,
  <Observer>
    {() => (
      <Switch
        onValueChange={user_session_store.toggle_push_notif}
        value={user_session_store.push_notifications_enabled}
      />
    )}
  </Observer>
);

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
      // Must keep at least empty string to keep height correct.
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
          <ScrollView style={styles.scroll_container}>
            <LinearGradient style={styles.block_with_photo} colors={clr_range}>
              <View style={styles.photo_with_text}>
                <View style={styles.rounded_profile}>{circle_view}</View>
                {user_text}
              </View>
            </LinearGradient>
            <View style={styles.with_shadow}>
              {preferences_banner}
              {language_change_row}
              {push_notifications_row}
            </View>
          </ScrollView>
        </WithFBLoginModalAvailable>
      );
    }
  }
);
