import React, {useRef, useState, useCallback, memo, useDebugValue} from 'react';
import {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {Button, Text} from '../ui';
import {color} from '../theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import isNumber from 'lodash/isNumber';
import {useBackHandler} from '@react-native-community/hooks';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {set} from 'ramda';
import {defaultValues} from '../constants/defaultValues';
import Routes from '../navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {addCollection} from '../redux/slices';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';

export const SheetOptions = {
  SELECT: 'SELECT',
  CUSTOM_LIST: 'CUSTOM_LIST',
  CREATE_COLLECTION: 'CREATE_COLLECTION',
  MANIPULATE_COLLECTION: 'MANIPULATE_COLLECTION',
  RENAME_COLLECTION: 'RENAME_COLLECTION',
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
  function renderItem({item, index}) {
    const isEnabled = disableIndex - 1 === index || !isNumber(disableIndex);
    const isSelected = currentValue === item;
    return (
      <TouchableOpacity
        rippleColor={'#F5F5F5'} // For android
        underlayColor={'#F5F5F5'} // For iOS
        key={index}
        activeOpacity={isEnabled ? 0.5 : 1}
        style={styles.itemContainer}
        onPress={() => {
          if (isEnabled) {
            closeBottomSheet();
            callback(item);
          }
        }}>
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
  const {openBottomSheet} = useBottomSheet();
  const {collection} = useSelector(state => state.bookmark);
  const dispatch = useDispatch();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 10,
          borderBottomColor: 'black',
          borderBottomWidth: 2,
        }}>
        <Text style={styles.header}>Collections</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              openBottomSheet({
                type: SheetOptions.CREATE_COLLECTION,
                snaps: ['50%', '50%'],
                onPressItem: option => {
                  const newCollection = {
                    id: collection.length + 1,
                    name: option,
                    bookmarks: [],
                  };
                  dispatch(addCollection(newCollection));
                },
              });
            }}>
            <Text style={styles.collectionHeader}>
              {defaultValues.newCollectionText}
            </Text>
            <AntDesign name={'plus'} color={color.text} size={15} />
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheetScrollView style={styles.listContainer}>
        {options.map((item, index) =>
          renderItem({item, index, callback, closeBottomSheet}),
        )}
      </BottomSheetScrollView>
    </>
  );
}
export function RENAME_COLLECTION({callback, closeBottomSheet}) {
  const [newCollectionName, setNewCollectionName] = useState('');
  return (
    <>
      <Text style={styles.header}>Rename Collection</Text>
      <BottomSheetTextInput
        placeholder="Rename the collection name"
        accessibilityComponentType
        accessibilityTraits
        value={newCollectionName}
        onChangeText={e => {
          newCollectionName(e);
        }}
        style={styles.input}
      />
      <Button
        style={styles.button}
        onPress={() => {
          // callback.current(newCollectionName);
          // closeBottomSheet();
          console.log('Collection rename window');
        }}>
        <Text>{defaultValues.createButtonText}</Text>
      </Button>
    </>
  );
}
export function CREATE_COLLECTION({callback, closeBottomSheet}) {
  const [collectionName, setCollectionName] = useState('');

  return (
    <>
      <Text style={styles.header}>{defaultValues.createNewCollectionText}</Text>
      <BottomSheetTextInput
        placeholder="Enter collection name"
        accessibilityComponentType
        accessibilityTraits
        value={collectionName}
        onChangeText={e => {
          setCollectionName(e);
        }}
        style={styles.input}
      />
      <Button
        style={styles.button}
        onPress={() => {
          callback.current(collectionName);
          closeBottomSheet();
        }}>
        <Text>{defaultValues.createButtonText}</Text>
      </Button>
    </>
  );
}
export function MANIPULATE_COLLECTION({
  callback,
  closeBottomSheet,
  currentCollectionID,
  onPressRename,
  collectionName,
}) {
  const [renameWindow, setRenameWindow] = useState(false);
  const [renameInput, setRenameInput] = useState(collectionName);
  // console.log('Already name ', collectionName);
  return (
    <>
      <View style={{flex: 1, padding: 20}}>
        {renameWindow ? (
          <View>
            <Text style={styles.header}>{defaultValues.renameHeaderText}</Text>
            <BottomSheetTextInput
              placeholder="Enter collection name"
              accessibilityComponentType
              accessibilityTraits
              value={renameInput}
              onChangeText={e => {
                setRenameInput(e);
              }}
              style={styles.input}
            />
            <Button
              style={styles.button}
              onPress={() => {
                onPressRename(renameInput);
                closeBottomSheet();
              }}>
              <Text>{defaultValues.renameButtonText1}</Text>
            </Button>
          </View>
        ) : (
          <>
            <Button
              style={{margin: 10}}
              onPress={() => {
                console.log('Opening Rename window');
                setRenameWindow(true);
              }}>
              <Text style={styles.header}>
                {defaultValues.renameButtonText}
              </Text>
            </Button>
            <Button
              style={{margin: 10}}
              onPress={() => {
                callback.current(currentCollectionID);
                closeBottomSheet();
              }}>
              <Text style={styles.header}>
                {defaultValues.deleteButtonText}
              </Text>
            </Button>
          </>
        )}
      </View>
    </>
  );
}

export const BottomSheetProvider = memo(({children}) => {
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
  const [blur, setBlur] = React.useState('restore');

  const [bottomSheetConfig, setBottomSheetConfig] = useState({
    snaps: [0, 0, 0],
    canScroll: false,
    selectOptions: [],
    sortSelectOptions: [],
  });

  const openBottomSheet = ({
    type = 'SELECT',
    selectOptions = [],
    sortSelectOptions = [],
    onPressItem,
    onPressRename,
    onPaypalPressItem,
    onPressSortItem,
    values,
    sortValue,
    onBlur,
    disableIndex,
    snaps = [0, '30%'],
    canScroll = true,
    headerTitle,
    itemLayout = () => null,
    currentCollectionID,
    collectionName,
  }) => {
    // console.log('OPENING', sheetRef.current);
    setBottomSheetConfig({
      type,
      snaps,
      selectOptions,
      sortSelectOptions,
      canScroll,
      currentCollectionID,
      onPressRename,
      collectionName,
    });
    setBlur('restore');

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
    setBlur('none');
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
            {...{closeBottomSheet, options: bottomSheetConfig.selectOptions}}
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
      case SheetOptions.CREATE_COLLECTION:
        return (
          <CREATE_COLLECTION
            {...{
              closeBottomSheet,
            }}
            callback={onSelectCb}
          />
        );
      case SheetOptions.MANIPULATE_COLLECTION:
        return (
          <MANIPULATE_COLLECTION
            {...{
              closeBottomSheet,
              currentCollectionID: bottomSheetConfig.currentCollectionID,
              onPressRename: bottomSheetConfig.onPressRename,
              collectionName: bottomSheetConfig.collectionName,
            }}
            callback={onSelectCb}
          />
        );
      case SheetOptions.RENAME_COLLECTION:
        return (
          <RENAME_COLLECTION
            {...{
              closeBottomSheet,
              currentCollectionID: bottomSheetConfig.currentCollectionID,
            }}
            callback={onSelectCb}
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
  const handleSheetChange = index => {
    // if (navigationType !== 'NEXT_SCREEN' && index === -1) {
    //   RootNavigation.goBack();
    // }
    // setNavigationType('');
  };
  const renderBackdrop = useCallback(props => {
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
    <BottomSheetContext.Provider value={{openBottomSheet, closeBottomSheet}}>
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
            dis>
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
    backgroundColor: '#fff',
    height: '100%',
  },
  contentContainerStyle: {
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 35,
  },
  itemLabel: (isSelected, isEnabled) => ({
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: isSelected
      ? color.palette.black
      : isEnabled
        ? 'grey'
        : color.palette.red,
  }),
  itemContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 2,
  },
  listContainer: {
    flex: 1,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    margin: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  button: {
    width: '50%',
    alignSelf: 'center',
  },
  collectionHeader: {
    fontSize: 15,
    color: 'black',
    paddingRight: 5,
  },
});
