import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { observer } from 'mobx-react/native';

const styles = StyleSheet.create({
  profile_container: {
    flex: 1,
    backgroundColor: 'orange',
  },
});

const profile = observer(() => (
  <View style={styles.profile_container}>
    <Text>Hello</Text>
  </View>
));

profile.navigationOptions = ({ navigation }) => ({
  // header: null,
});

export default profile;
