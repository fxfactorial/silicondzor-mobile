import { TabNavigator } from 'react-navigation';

import events_table from './events';
import { POST_TAB_ICON, EVENTS_TAB_ICON } from '../common-components';

export default TabNavigator({
  Events: {
    screen: events_table,
    navigationOptions: {
      tabBarIcon: EVENTS_TAB_ICON,
    },
  },

  Post: {
    screen: events_table,
    navigationOptions: {
      tabBarIcon: POST_TAB_ICON,
    },
  },
});
