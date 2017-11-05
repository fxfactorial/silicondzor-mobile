import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

import credentials from './credentials.json';

import launch_drawer from './src/launch.js';

console.disableYellowBox = true;

export default StackNavigator({
  home: { screen: launch_drawer },
});
