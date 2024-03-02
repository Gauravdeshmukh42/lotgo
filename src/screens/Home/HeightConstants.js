import {Dimensions} from 'react-native';
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

export const OFFSET = 20;
export const CARD_IMAGE_HEIGHT = SCREEN_HEIGHT * 0.4;
export const CARD_HEIGHT = SCREEN_HEIGHT - OFFSET;
export const MAX_HEIGHT_CONTENT = SCREEN_HEIGHT - CARD_IMAGE_HEIGHT;
