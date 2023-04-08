import React from 'react';
import {color} from '../../theme';
import {StyleSheet, View} from 'react-native';
import {Text} from '../text';
import {ThemeContext} from '../../context';

const SOLID = {
  width: '100%',
  borderBottomWidth: StyleSheet.hairlineWidth,
  // borderColor: color.palette.divider,
};

const CONTAINER = {
  flexDirection: 'row',
  justifyContent: 'center',
  overflow: 'hidden',
  width: '100%',
};

const DASHED = {
  color: color.primary,
  letterSpacing: -1.87,
  fontSize: 18,
};

/**
 * variant -> (solid | dashed)
 */
export function Divider(props) {
  const {theme} = React.useContext(ThemeContext);

  const {variant = 'solid', style: styleOverride} = props;

  return variant === 'solid' ? (
    <View style={[SOLID, theme.divider, styleOverride]} />
  ) : (
    <View style={CONTAINER}>
      {[...Array(60)].map((_, ind) => {
        return (
          <Text key={ind} style={[DASHED, styleOverride]}>
            {' '}
            --{' '}
          </Text>
        );
      })}
    </View>
  );
}
