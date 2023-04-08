import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { defaultValues } from "../../constants/defaultValues";
import { color } from "../../theme";
import { Button, Text } from "../../ui";
const { width, height } = Dimensions.get("window");

export const Footer = ({
  goToPreviousSlide,
  goToNextSlide,
  currentIndex,
  slides,
  disabled,
}) => {
  return (
    <View
      style={{
        // height: height * 0.25,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginleft: 10,
        marginRight: 10,
      }}
    >
      {/* Indicator container */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {/* Render indicator */}
        {slides?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex == index && {
                backgroundColor: color.palette.white,
                width: 25,
              },
            ]}
          />
        ))}
      </View>

      {/* Render buttons */}
      {currentIndex !== 0 && (
        <View style={{ marginBottom: 5 }}>
          {currentIndex == slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace(Routes.MAIN_STACK)}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Button
                title={defaultValues.backButtonText}
                style={[
                  {
                    width: "50%",
                    height: 50,
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
              {/* <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: color.pallete.white,
                    borderWidth: 1,
                    backgroundColor: "transparent",
                  },
                ]}
                onPress={goToPreviousSlide}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color:  color.pallete.white,
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity> */}
              <View style={{ width: 15 }} />
              <Button
                title={defaultValues.nextButtonText}
                style={[
                  {
                    width: "50%",
                    height: 50,
                    borderRadius: 5,
                    // backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: color.palette.white,
                    opacity: disabled ? 0.5 : 1,
                  },
                ]}
                onPress={goToNextSlide}
                textStyle={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: color.palette.white,
                }}
                disabled={disabled}
              />
              {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={[styles.btn, { opacity: disabled ? 0.5 : 1 }]}
                disabled={disabled}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  NEXT
                </Text>
              </TouchableOpacity> */}
            </View>
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  indicator: {
    // height: 2.5,
    // width: 10,
    // backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
