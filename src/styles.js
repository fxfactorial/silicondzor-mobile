import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export const { width, height } = Dimensions.get('window');

export const PADDING_WIDTH_PERCENT = '2%';
export const PADDING_WIDTH = Math.floor(0.02 * width);

export const styles = EStyleSheet.create({
  //
});
