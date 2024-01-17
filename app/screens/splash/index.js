import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  View,
  Alert,
  StatusBar,
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {SaveAllData, ServerCall} from '../../redux/actions/asynchronousAction';
import NetInfo from '@react-native-community/netinfo';

import {createStackNavigator} from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  CreateTable,
  DeleteDatatbase,
  DeleteTable,
  getData,
  InsertData,
} from '../../sqliteHelper';

import {
  StringsListTable,
  StringsListCoulumns,
} from '../../sqliteTables/StringsList';

const Stack = createStackNavigator();
import Design from './design';
import sizeHelper from '../../helpers/sizeHelper';
import styles from './style';
import AppColor from '../../constant/AppColor';

const mapStateToProps = state => {
  return {
    UserLogin: state.user.SaveAllData.UserLogin,
    stringsListEnglish: state.user.SaveAllData.stringsListEnglish,
    stringsListArabic: state.user.SaveAllData.stringsListArabic,
    StringsList: state.user.SaveAllData.StringsList,
  };
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const SplashScreen = props => {
  const [count, setCount] = useState(0);
  const {navigation} = props;
  const [loading, setloading] = useState(true);
  const [showRealApp, setRealApp] = useState(false);
  const viewref = useRef(null);

  const slides = [
    {
      key: 1,
      title: '',
      text: '',
      image: require('../../assets/images/startup01.png'),
      backgroundColor: 'transparent',
    },

    {
      key: 2,
      title: '',
      text: '',
      image: require('../../assets/images/startup02.png'),
      backgroundColor: 'transparent',
    },
    {
      key: 3,
      title: '',
      text: '',
      image: require('../../assets/images/startup03.png'),
      backgroundColor: 'transparent',
    },
  ];

  // const renderItem = ({item}) => {
  //   return (
  //     <View style={{flex: 1, backgroundColor: item.backgroundColor}}>
  //       <Image
  //         source={item.image}
  //         // resizeMode="contain"
  //         style={{width: '100%', height: '100%'}}
  //       />
  //       <Text style={styles.text}>{item.text}</Text>
  //       <TouchableOpacity
  //         style={{
  //           width: 60,
  //           height: 40,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           position: 'absolute',
  //           bottom: 30,
  //           start: 30,
  //         }}
  //         onPress={() => onDone()}>
  //         <Text
  //           style={{
  //             fontFamily: 'ProximaNova-Regular',
  //             color: AppColor.white,
  //             fontSize: sizeHelper.calHp(30),
  //           }}>
  //           Skip
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  const onDone = () => {
    console.log('On Done function all');
    setRealApp(true);
    AsyncStorage.setItem('MY_REAL_APP', 'true', err => {
      if (err) {
        console.log('an error');
        throw err;
      }
      console.log('success');
    }).catch(err => {
      console.log('error is: ' + err);
    });
  };

  useEffect(() => {
    showRealAppFun();
  }, [showRealApp]);

  const getAppInfo = async () => {
    var val = await AsyncStorage.getItem("MY_REAL_APP").then((v) => {
      console.log("app state is", v);
      if (v == 'true') {
    setRealApp(true);
    } else {
      setRealApp(false);
    }
    });
  };

  const moveToLogin = () => {
    navigation.navigate('login');
    setloading(false);
  };

  const showRealAppFun = async () => {
    try {
      getAppInfo();
      if (showRealApp) {
        let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
        // console.log('Token Access ---------------->', UserLogin);
        // DeleteDatatbase();
        // console.log('SplashScreen DeleteDatatbase1');
        await loadData(UserLogin);
      }
      // moveToLogin();
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
          color="rgba(255, 255, 255, .9)"
          size={15}
        />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={() => onDone()} style={styles.buttonCircle}>
        <Icon name="check" color="rgba(255, 255, 255, .9)" size={15} />
      </TouchableOpacity>
    );
  };

  const unsubscribe = NetInfo.addEventListener(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });

  // useEffect(async () => {
  //   // let myAsyncStorageKey = await AsyncStorage.getItem('ConnectedBluetoothInfo');
  //   // loginUserInfo = { "UserName": "Dev686", "Password": "7C222FB2927D828AF22F592134E8932480637C0D", "TerminalGUID": "ffb5ef3fe97fa342" }
  //   // console.log('access token ', myAsyncStorageKey);
  //   // const response = await props.dispatch(
  //   //   ServerCall('', 'AuthorizeUser/SignOut', loginUserInfo),
  //   // );
  //   // // console.log('user logout response.. ', response);
  //   // // http://FXCapi.FXC.com/api/AuthorizeUser/SignOut
  //   // props.navigation.replace('login');
  //   // await AsyncStorage.removeItem('ACCESS_TOKEN');

  //   // getData(ProductDetailListTable, async cb => {
  //   //   console.log('ProductListTable...', cb);
  //   // });

  //   let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
  //   console.log('Token Access ', UserLogin);
  //   // DeleteDatatbase();
  //   // console.log('SplashScreen DeleteDatatbase1');
  //   await loadData(UserLogin);
  //   // props.navigation.replace('dashboard');
  // }, []);

  const loadData = async UserLogin => {
    if (UserLogin) {
      getData(StringsListTable, async cb => {
        let stringsListEnglish = cb[0]?.StringsListOject
          ? JSON.parse(cb[0]?.StringsListOject)
          : '';
        let stringsListArabic = cb[1]?.StringsListOject
          ? JSON.parse(cb[1]?.StringsListOject)
          : '';
        console.log('StringsListTable...', stringsListEnglish);
        let data = {
          type: 'ChangeStringsList',
          data: I18nManager.isRTL ? stringsListArabic : stringsListEnglish,
        };

        let response = await props.dispatch(SaveAllData(data));
        props.navigation.replace('Main');
      });
    } else {
      console.log('props.navigation.replace');

      props.navigation.replace('Auth');
      // console.log('setTimeout else');
    }
  };

  return (
    <Design
      slides={slides}
      // renderItem={renderItem}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      onDone={onDone}
      showRealApp={showRealApp}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
