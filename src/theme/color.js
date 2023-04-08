import {palette} from './palette';

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
import {DarkTheme} from '@react-navigation/native';

export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,

  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The screen background.
   */
  background: palette.white,
  /**
   * The main tinting color.
   */
  primary: palette.airlineBlue,
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.warmGrey,
  /**
   * The default color of text in many components.
   */
  text: palette.black,
  /**
   * Secondary information.
   */
  dim: palette.blackTwo,
  /**
   * Error messages and icons.
   */
  error: palette.red,

  increment: palette.darkMintGreen,

  decrement: palette.redTwo,
};

const darkTheme = {
  ...DarkTheme,

  transactions: {
    headerTextColor: color.palette.offWhite,
    headerBackground: 'transparent',
    headerBorderColor: '#212527',
  },

  confirmPinBackground: {
    borderColor: '#212527',
    borderWidth: 1,
    backgroundColor: color.palette.blackTwo,
  },
  buttons: {
    outlinebackground: color.palette.blackTwo,
    rippleColor: color.palette.darkColor,
  },
  textInputStyle: {
    borderColor: color.palette.textInputBorder,
  },
  colors: {
    ...DarkTheme.colors,
    offWhite: color.palette.offWhite,
    background: color.palette.blackTwo,
    primary: 'orange',
    text: color.palette.offWhite,
    paragraph: '#b5babf',

    welcomeMessageColor: color.palette.offWhite,
    authText: color.palette.white,
  },
  divider: {
    borderColor: '#212527',
  },
  dividerBg: {
    backgroundColor: '#212527',
  },
  subscriptions: {
    cardBackgroundGreenStyle: {
      backgroundColor: '#000000',
      borderColor: color.primary,
      borderWidth: 1,
      borderRadius: 10,
      shadowColor: color.palette.white,
    },
    cardBackgroundRedStyle: {
      backgroundColor: '#000000',
      borderColor: color.palette.grapefruit,
      borderWidth: 1,
      borderRadius: 10,
      shadowColor: color.palette.white,
    },
    rowTextColor: color.palette.white,
  },
};

const lightTheme = {
  transactions: {
    headerTextColor: color.palette.blackFour,
    headerBackground: '#f4f4f9',
    headerBorderColor: color.palette.lightGrey,
  },

  confirmPinBackground: {
    backgroundColor: color.palette.white,
    paddingVertical: 35,
    borderRadius: 3,
    shadowColor: color.palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.65,
    elevation: 3,
  },

  buttons: {
    outlinebackground: color.palette.white,
    rippleColor: color.palette.white,
  },
  textInputStyle: {
    borderColor: color.palette.textInputBorder,
  },
  colors: {
    // ...DarkTheme.colors,
    background: color.palette.white,
    offWhite: color.palette.black,
    primary: 'orange',
    text: color.palette.black,
    paragraph: '#434746',

    welcomeMessageColor: color.palette.blackThree,
    authText: color.palette.navy,
  },
  divider: {
    borderColor: color.palette.divider,
  },
  dividerBg: {
    backgroundColor: color.palette.divider,
  },

  subscriptions: {
    rowTextColor: color.palette.darkBlueGrey,
    cardBackgroundGreenStyle: {
      backgroundColor: color.palette.white,
      borderColor: color.palette.white,
      shadowColor: color.palette.black,
    },
    cardBackgroundRedStyle: {
      backgroundColor: color.palette.white,
      borderColor: color.palette.white,
      shadowColor: color.palette.black,
    },
  },
};

export const theme = {
  darkTheme: darkTheme,
  lightTheme: lightTheme,
};
