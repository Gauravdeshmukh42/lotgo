import React, { useRef, useState, useCallback, memo } from "react";
import { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Text } from "../ui";
import { color } from "../theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import isNumber from "lodash/isNumber";
import { useBackHandler } from "@react-native-community/hooks";

import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

export const SheetOptions = {
  SELECT: "SELECT",
  CUSTOM_LIST: "CUSTOM_LIST",
};

export const BottomSheetContext = React.createContext(() => {});

export const useBottomSheet = () => useContext(BottomSheetContext);
export function SelectBox({
  closeBottomSheet,
  options,
  callback,
  currentValue,
  disableIndex,
}) {
  function renderItem({ item, index }) {
    const isEnabled = disableIndex - 1 === index || !isNumber(disableIndex);
    const isSelected = currentValue === item;
    return (
      <TouchableOpacity
        rippleColor={"#F5F5F5"} // For android
        underlayColor={"#F5F5F5"} // For iOS
        key={index}
        activeOpacity={isEnabled ? 0.5 : 1}
        style={styles.itemContainer}
        onPress={() => {
          if (isEnabled) {
            closeBottomSheet();
            callback(item);
          }
        }}
      >
        <Text numberOfLines={3} style={styles.itemLabel(isSelected, isEnabled)}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  }

  function keyExtractor(_, ind) {
    return ind.toString();
  }

  return (
    <View style={styles.container} key={options[0] || `${Math.random()}`}>
      <BottomSheetFlatList
        data={options}
        keyExtractor={keyExtractor}
        initialNumToRender={15}
        windowSize={10}
        maxToRenderPerBatch={15}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

export function CUSTOM_LIST({
  options = [],
  renderItem,
  callback,
  closeBottomSheet,
}) {
  return (
    <>
      <BottomSheetScrollView style={styles.listContainer}>
        {options.map((item, index) =>
          renderItem({ item, index, callback, closeBottomSheet })
        )}
      </BottomSheetScrollView>
    </>
  );
}

export const BottomSheetProvider = memo(({ children }) => {
  const sheetRef = useRef(null);
  const onSelectCb = useRef(() => {});
  const onSelectPaypal = useRef(() => {});
  const onSortSelectCb = useRef(() => {});
  const onBlurCb = useRef(() => {});
  const currentValue = useRef(null);
  const currentSortValue = useRef(null);
  const disableInd = useRef(null);
  const sheetHeaderTitle = useRef(null);
  const renderCustomListLayout = useRef(() => null);
  const [blur, setBlur] = React.useState("restore");

  const [bottomSheetConfig, setBottomSheetConfig] = useState({
    snaps: [0, 0, 0],
    canScroll: false,
    selectOptions: [],
    sortSelectOptions: [],
  });

  const openBottomSheet = ({
    type = "SELECT",
    selectOptions = [],
    sortSelectOptions = [],
    onPressItem,
    onPaypalPressItem,
    onPressSortItem,
    values,
    sortValue,
    onBlur,
    disableIndex,
    snaps = [0, "30%"],
    canScroll = true,
    headerTitle,
    itemLayout = () => null,
  }) => {
    console.log("OPENING", sheetRef.current);
    setBottomSheetConfig({
      type,
      snaps,
      selectOptions,
      sortSelectOptions,
      canScroll,
    });
    setBlur("restore");

    sheetRef.current?.present();
    onSelectCb.current = onPressItem;
    onSelectPaypal.current = onPaypalPressItem;
    onSortSelectCb.current = onPressSortItem;
    onBlurCb.current = onBlur;
    currentValue.current = values;
    currentSortValue.current = sortValue;
    disableInd.current = disableIndex;
    sheetHeaderTitle.current = headerTitle;
    renderCustomListLayout.current = itemLayout;
  };

  const closeBottomSheet = (navigation = null) => {
    setBlur("none");
    sheetRef.current?.close();
    if (navigation) {
      navigation.goBack();
    }
  };

  const renderContent = () => {
    switch (bottomSheetConfig.type) {
      case SheetOptions.SELECT:
        return (
          <SelectBox
            {...{ closeBottomSheet, options: bottomSheetConfig.selectOptions }}
            callback={onSelectCb.current}
            currentValue={currentValue.current}
            disableIndex={disableInd.current}
          />
        );
      case SheetOptions.CUSTOM_LIST:
        return (
          <CUSTOM_LIST
            {...{
              closeBottomSheet,
              options: bottomSheetConfig.selectOptions,
              renderItem: renderCustomListLayout.current,
            }}
            callback={onSelectCb}
            currentValues={currentValue}
          />
        );
      default:
        return <View />;
    }
  };

  const renderHeader = () => {
    switch (bottomSheetConfig.type) {
      // case SheetOptions.CUSTOM_LIST:
      //   return (
      //     <HeaderDescription
      //       {...{
      //         closeBottomSheet,
      //         options: bottomSheetConfig.selectOptions,
      //       }}
      //       currentValues={currentValue}
      //     />
      //   );

      default:
        return null;
    }
  };

  // callbacks
  const handleSheetChange = (index) => {
    // if (navigationType !== 'NEXT_SCREEN' && index === -1) {
    //   RootNavigation.goBack();
    // }
    // setNavigationType('');
  };
  const renderBackdrop = useCallback((props) => {
    useBackHandler(() => {
      closeBottomSheet();
      return true;
    });
    return (
      <BottomSheetBackdrop
        {...props}
        animatedIndex={{
          value: 1,
        }}
      />
    );
  }, []);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      <GestureHandlerRootView style={styles.container}>
        {children}
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={sheetRef}
            index={1}
            snapPoints={bottomSheetConfig.snaps}
            onChange={handleSheetChange}
            // snapPoints={["45%"]}
            keyboardBehavior="interactive"
            keyboardBlurBehavior={blur}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            dis
          >
            {renderHeader()}
            {renderContent()}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </BottomSheetContext.Provider>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  contentContainerStyle: {
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 35,
  },
  itemLabel: (isSelected, isEnabled) => ({
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: isSelected
      ? color.palette.black
      : isEnabled
      ? "grey"
      : color.palette.red,
  }),
  itemContainer: {
    width: "100%",
    justifyContent: "center",
    padding: 2,
  },
  listContainer: {
    flex: 1,
  },
});
