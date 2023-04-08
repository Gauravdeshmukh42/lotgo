import * as React from "react";
import { Pressable, ActivityIndicator } from "react-native";
import { Text } from "../text";
import { mergeAll, flatten } from "ramda";
import { color, spacing, typography } from "../../theme";

const BASE_VIEW = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
};

const BASE_TEXT = {
  fontSize: 14,
  paddingHorizontal: spacing[3],
  //   fontFamily: typography.secondary,
};
/**
 * variant / type / preset -> All these are same thing
 */
const viewVariants = {
  solid: { ...BASE_VIEW, backgroundColor: color.primary },
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  },
  outline: {
    ...BASE_VIEW,
    borderWidth: 2,
    borderColor: color.primary,
    backgroundColor: "white",
  },
};

const textVariants = {
  solid: {
    ...BASE_TEXT,
    color: color.palette.white,
    textAlign: "center",
    letterSpacing: 0,
  },
  link: {
    ...BASE_TEXT,
    color: color.palette.brownishGrey,
    paddingHorizontal: 0,
    paddingVertical: 0,
    textDecorationLine: "underline",
  },
  outline: {
    ...BASE_TEXT,
    color: color.primary,
    textAlign: "center",
  },
};

/**
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props) {
  const {
    variant = "solid",
    title,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    disabled,
    loading,
    ...rest
  } = props;

  const viewStyle = mergeAll(
    flatten([viewVariants[variant] || viewVariants.solid, styleOverride])
  );
  const textStyle = mergeAll(
    flatten([textVariants[variant] || textVariants.solid, textStyleOverride])
  );

  const content = children || <Text text={title} style={textStyle} />;

  const disableStyle =
    variant === "link"
      ? { backgroundColor: color.palette.white }
      : { backgroundColor: color.palette.silverTwo };

  return (
    <Pressable
      style={[viewStyle, disabled && disableStyle]}
      {...{ disabled }}
      {...rest}
      android_ripple={{ color: color.palette.white }}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "link" || variant === "outline"
              ? color.primary
              : color.palette.white
          }
        />
      ) : (
        content
      )}
    </Pressable>
  );
}
