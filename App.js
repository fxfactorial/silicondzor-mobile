import { StackNavigator } from 'react-navigation';

import launch_drawer from './src/launch.js';

export default StackNavigator({
  home: { screen: launch_drawer },
});
