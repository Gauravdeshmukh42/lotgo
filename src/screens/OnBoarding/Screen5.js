import React, { useEffect } from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import { Button, Screen, Text } from "../../ui";
import { BottomMessage } from "./BottomMessage";
import { Footer } from "./Footer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../navigation/routes";
import { defaultValues } from "../../constants/defaultValues";
import { ONBOARDING_SCREEN } from "../../constants/keys";
import { save } from "../../utils";

const { width, height } = Dimensions.get("window");

export const Screen5 = ({ goToPreviousSlide }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { width, position: "relative" }]}>
      <View style={styles.skipBtn}>
        <Button
          title={defaultValues.backButtonText}
          style={[
            {
              width: "35%",
              borderRadius: 5,
              // backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              // borderColor: color.palette.white,
            },
          ]}
          variant="outline"
          onPress={goToPreviousSlide}
          textStyle={{
            fontWeight: "bold",
            fontSize: 15,
            color: color.palette.black,
          }}
        />
        <Button
          title={defaultValues.skipButtonText}
          style={[
            {
              width: "25%",
              borderRadius: 5,
              // backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderColor: color.palette.white,
            },
          ]}
          onPress={() => {
            // save(ONBOARDING_SCREEN, true);
            navigation.replace(Routes.INSIDE_STACK);
            // navigation.replace(Routes.MAIN_STACK)
          }}
          textStyle={{
            fontWeight: "bold",
            fontSize: 15,
            color: color.palette.white,
          }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.header}>{defaultValues.onBoardScreen5Title}</Text>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        {/* Render buttons */}
        <View>
          <View style={{ height: 50, marginBottom: 20 }}>
            <TouchableOpacity
              style={[styles.btn, { flexDirection: "row" }]}
              onPress={() => {}}
            >
              <Ionicons
                name="logo-google"
                color={color.palette.white}
                size={18}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: color.palette.white,
                  fontSize: 18,
                  marginLeft: 5,
                }}
              >
                Continue With Google
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                height: 48,
                marginTop: 10,
                flex: 0.18,
              }}
            >
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace(Routes.INSIDE_STACK)}
              >
                <Ionicons
                  name="ios-logo-facebook"
                  color={color.palette.white}
                  size={35}
                />
              </TouchableOpacity>
            </View>
            <View style={{ height: 48, marginTop: 10, flex: 0.18 }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace(Routes.MAIN_STACK)}
              >
                <Ionicons name="mail" color={color.palette.white} size={35} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <BottomMessage />
          </View>
        </View>
      </View>
      {/* <Footer
        currentSlideIndex={currentSlideIndex}
        skip={skip}
        goToNextSlide={goToNextSlide}
        currentIndex={currentIndex}
        slides={slides}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    color: color.palette.black,
    textAlign: "center",
    fontSize: 24,
    marginLeft: 15,
    marginTop: 50,
    textTransform: "capitalize",
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: color.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  skipBtn: {
    // alignSelf: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    // marginRight: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "capitalize",
    color: color.palette.white,
  },
});
