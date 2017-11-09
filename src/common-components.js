import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo, Octicons } from '@expo/vector-icons';
import { PADDING_WIDTH_PERCENT, PADDING_WIDTH_PERCENT_DOUBLE } from './styles';
import { FBBasedLogin } from './modals';

export const DrawerIconOpener = ({ navigate }) => (
  <TouchableOpacity onPress={() => navigate('DrawerOpen')}>
    <Entypo name={'code'} size={24} />
  </TouchableOpacity>
);

export const NEWS_TAB_ICON = <Entypo name={'news'} size={24} />;

export const POST_TAB_ICON = <Entypo name={'new-message'} size={24} />;

export const SEARCH_TAB_ICON = (
  <Octicons name={'search'} style={{ marginTop: PADDING_WIDTH_PERCENT }} size={24} />
);

export const EVENTS_TAB_ICON = <Entypo name={'calendar'} size={24} />;

export const WithFBLoginModalAvailable = p => (
  <View {...p}>
    <FBBasedLogin />
    {p.children}
  </View>
);
