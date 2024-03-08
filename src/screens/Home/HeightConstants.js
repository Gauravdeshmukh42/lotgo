import {Dimensions, StatusBar} from 'react-native';
export const {width: SCREEN_WIDTH, height} = Dimensions.get('window');
export const SCREEN_HEIGHT = height;
export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const OFFSET = 20; // originally 20
export const CARD_IMAGE_HEIGHT = SCREEN_HEIGHT * 0.3;
export const CARD_OTHER_ELEMENTS_HEIGHT = 58;
export const CONTENT_OTHER_ELEMENTS_HEIGHT = 30;
export const CARD_HEIGHT = SCREEN_HEIGHT - OFFSET - CARD_OTHER_ELEMENTS_HEIGHT;
export const MAX_HEIGHT_CONTENT =
  SCREEN_HEIGHT - CARD_IMAGE_HEIGHT - CONTENT_OTHER_ELEMENTS_HEIGHT;
