import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Alert} from 'react-native';
import FloorScreen from '../screens/floors';
import {getData} from '../sqliteHelper';
import {AreaListTable} from '../sqliteTables/AreasList';
import {RestTablesTable} from '../sqliteTables/RestTables';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ServerCall} from '../redux/actions/asynchronousAction';
import Loading from './Loading';
import AppColor from '../constant/AppColor';
const BottomTabBar = props => {
  const navigation = useNavigation();
  // console.log('bottom nav', props);
  const [tableID, setTableID] = useState(null);
  const [tabFloors, setTabFloors] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [tableRecords, setTableRecord] = useState([]);
  const [screenData, setScreenData] = useState([]);
  const [shortOrderDetail, setShortOrderDetail] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const goToLogin = async type => {
    setLoading(true);
    let token = await AsyncStorage.getItem('ACCESS_TOKEN');
    let loginUserInfo = await AsyncStorage.getItem('LOGIN_USER_INFO');
    loginUserInfo = JSON.parse(loginUserInfo);
    // console.log('access token ', loginUserInfo, JSON.parse(loginUserInfo));
    const response = await props.dispatch(
      ServerCall(token, 'AuthorizeUser/SignOut', 'POST', loginUserInfo),
    );
    console.log('user logout response.. ', response);

    navigation.replace('Auth');
    await AsyncStorage.removeItem('ACCESS_TOKEN');
    await AsyncStorage.removeItem('SELECTED_AGNETS');
    const checkasync = await AsyncStorage.getItem('ACCESS_TOKEN');
    console.log('checkasync response from server checkasync', checkasync);
    if (type === 'terminal') await AsyncStorage.removeItem('LOGIN_USER_INFO');

    setLoading(false);
  };

  useEffect(() => {
    const unsubscri = props.props.addListener('focus', async () => {
      setLoading(true);
      let areaViewList = [];
      getData(AreaListTable, items => {
        // console.log('data of areas', items);
        setTabFloors(items);
        areaViewList = items;
      });
      getData(RestTablesTable, tables => {
        // console.log('data of table', tables);
        tables.forEach(element => {
          element.isSelected = false;
        });
        setTableRecord(tables);
        TableByArea(0, areaViewList[0], tables);
        // setScreenData(filterData);
        // setLoading(false);
      });
    });

    return () => {
      unsubscri;
    };
  }, [props.props]);

  const emptyAsyncTableObj = async () => {
    try {
      let table = await AsyncStorage.getItem('SELECTED_TABLE');
      console.log(JSON.stringify(table));
      await AsyncStorage.removeItem('SELECTED_TABLE');
      console.log('Table Removed');
    } catch (e) {
      console.log(e, 'error');
    }
  };

  // const changeTableStatus = async () => {
  //   console.log('tableID', tableID);
  //   let token = await AsyncStorage.getItem('ACCESS_TOKEN');
  //   setLoading(true);

  //   try {
  //     const response = await props.dispatch(
  //       ServerCall(
  //         token,
  //         `Table/ChangeTableStatus?tableCode=${tableID}
  //            &IsAvailable=1`,
  //         'GET',
  //       ),
  //     );
  //     console.log('onFreeTable', response);
  //     const newData = screenData.map(e => {
  //       if (e.TableCodeID == tableID) {
  //         return {
  //           ...e,
  //           IsAvailable: 1,
  //         };
  //       }
  //       return {
  //         ...e,
  //       };
  //     });
  //     // emptyAsyncTableObj();
  //     setScreenData(newData);
  //     // navigation.navigate('home');
  //     // setTableID(null);
  //     setLoading(false);
  //   } catch (e) {
  //     console.log(e, 'error');
  //   }
  // };

  const onSelectTable = async index => {
    let token = await AsyncStorage.getItem('ACCESS_TOKEN');

    let TBL = [...screenData];
    let tableIndex = TBL[index]?.TableCodeID;
    setTableID(tableIndex);

    // TBL.forEach((e, i) => {
    //   if (i !== index) e.isRestViewDetail = false;
    // });

    if (TBL[index].IsAvailable === 1) {
      setLoading(true);

      try {
        const response = await props.dispatch(
          ServerCall(
            token,
            `Table/ChangeTableStatus?tableCode=${TBL[index]?.TableCodeID}
             &IsAvailable=2`,
            'GET',
          ),
        );
        console.log('on Occupied Table', response);

        if (response?.message === 'Unauthorized') {
          Alert.alert('Alert', 'Your Session is Expirerd Please Login again', [
            {text: 'OK', onPress: () => goToLogin()},
          ]);
          setLoading(false);
        } else {
          const newData = screenData.map(e => {
            if (e.TableCodeID == TBL[index]?.TableCodeID) {
              return {
                ...e,
                IsAvailable: 2,
              };
            }
            return {
              ...e,
            };
          });

          setScreenData(newData);
        }
      } catch (e) {
        console.log(e, 'error');
      }
      setLoading(false);

      TBL[index].isSelected = true;
      await AsyncStorage.setItem('SELECTED_TABLE', JSON.stringify(TBL[index]));
      setScreenData(TBL);
      navigation.navigate('home');
    }
    // else {
    //   try {
    //     const response = await props.dispatch(
    //       ServerCall(
    //         token,
    //         'Order/FetchOrderByTable?tableCode=' + TBL[index]?.TableCodeID,
    //         'GET',
    //       ),
    //     );

    //     console.log('console log call fetchTable', response);
    //     setShortOrderDetail(response);
    //   } catch (e) {
    //     console.log(e, 'error');
    //   }
    // }
    // setScreenData(TBL);
  };

  const SelactTableByArea = async (index, route) => {
    setTabIndex(index);
    let filterData = tableRecords.filter(
      x => x.AreaCode === tabFloors[index].AreaCode,
    );
    try {
      let token = await AsyncStorage.getItem('ACCESS_TOKEN');
      console.log('console log call fetchTable Token---------------------->', token),
      setLoading(true);
      const response = await props.dispatch(
        
        ServerCall(
          token,
          'Table/FetchTableWithAreaCode?areaCode=' + route?.AreaCode,
          'GET',
        ),
      );
      
      console.log('console log call fetchTable on area select', response);

      if (response?.message === 'Unauthorized') {
        Alert.alert('Alert', 'Your Session is Expirerd Please Login again', [
          {text: 'OK', onPress: () => goToLogin()},
        ]);
        setLoading(false);
      } else {
        let updatedArray = [];
        for (let i = 0; i < filterData.length; i++) {
          const element = filterData[i];
          let findTable = response.find(
            e => e.TableCode === element.TableCodeID,
          );
          if (findTable) {
            element.IsAvailable = findTable.IsAvailable;
            element.TableStatus = findTable.TableStatus;
            updatedArray.push(element);
          }
        }

        setScreenData(updatedArray);
        setLoading(false);
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };

  const TableByArea = async (index, route, array) => {
    setTabIndex(index);

    // const filterData = tables.filter(
    //   x => x.AreaCode === areaViewList[0].AreaCode,
    // );

    let filterData = array.filter(x => x.AreaCode === route.AreaCode);

    try {
      let token = await AsyncStorage.getItem('ACCESS_TOKEN');
      setLoading(true);
      const response = await props.dispatch(
        ServerCall(
          token,
          'Table/FetchTableWithAreaCode?areaCode=' + route?.AreaCode,
          'GET',
        ),
      );
      console.log('console log call fetchTable on area select', response);

      if (response?.message === 'Unauthorized') {
        Alert.alert('Alert', 'Your Session is Expirerd Please Login again', [
          {text: 'OK', onPress: () => goToLogin()},
        ]);
        setLoading(false);
      } else {
        let updatedArray = [];
        for (let i = 0; i < filterData.length; i++) {
          const element = filterData[i];
          let findTable = response.find(
            e => e.TableCode === element.TableCodeID,
          );
          if (findTable) {
            element.IsAvailable = findTable.IsAvailable;
            element.TableStatus = findTable.TableStatus;
            updatedArray.push(element);
          }
        }

        setScreenData(updatedArray);
        setLoading(false);
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };

  function MyTabBar() {
    return (
      <ScrollView
        horizontal={true}
        style={{maxHeight: 45, backgroundColor: '#212b2d'}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#212b2d',
          }}>
          {tabFloors.map((route, index) => {
            const onPress = async () => {
              SelactTableByArea(index, route);
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                // accessibilityState={isFocused ? {selected: true} : {}}
                onPress={onPress}
                style={{
                  //   flex: 1,
                  borderTopColor: tabIndex === index ? '#f98939' : '#212b2d',
                  borderTopWidth: 1.5,
                  padding: 10,
                  backgroundColor: '#212b2d',
                  marginHorizontal: 10,
                  // maxWidth: 150,
                }}>
                <Text
                  style={{
                    color: tabIndex === index ? '#f98939' : '#fff',
                    textAlign: 'center',
                    fontFamily: 'ProximaNova-Semibold',
                    fontSize: 16,
                    padding: 1,
                  }}>
                  {route.Name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FloorScreen
        screenData={screenData}
        onPress={onSelectTable}
        dispatch={props.dispatch}
        navigation={navigation}
        setScreenData={setScreenData}
        emptyAsyncTableObj={emptyAsyncTableObj}
        setLoading={setLoading}
        setTableID={setTableID}
      />
      {MyTabBar()}

      {isLoading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: AppColor.popUpBackgroundColor,
            zIndex: 9999,
          }}>
          <Loading />
        </View>
      )}
    </View>
  );
};

export default BottomTabBar;
