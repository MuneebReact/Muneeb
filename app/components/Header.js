import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  I18nManager,
} from 'react-native';

import sizeHelper from '../helpers/sizeHelper';
import AppColor from '../constant/AppColor';
import FXCLogo from '../assets/svg/FXCLogo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import RebootTerminalIcon from '../assets/svg/rebootTerminalIcon';
const Header = ({props}) => {
  const [disable, setDisable] = useState(false);

  // useEffect(() => {
  //   const unsubscri = props.navigation.addListener('focus', async () => {
  //     handlePress();
  //   });
  //   return () => {
  //     unsubscri;
  //   };
  // }, [props.navigation]);

  // useEffect(() => {
  //   if (props.enableTBut) {
  //     setDisable(false);
  //   }
  // });

  const onPressHome = () => {
    props.navigation.navigate('home');
  };

  const handlePress = async () => {
    try {
      let table = await AsyncStorage.getItem('SELECTED_TABLE');
      console.log('table variable', table);
      if (table) {
        let parse = JSON.parse(table);
        console.log('parse', parse);
        if (!parse) {
          setDisable(false);
        } else {
          props.setOrderType === 1;
          setDisable(true);
        }
      } else {
        props.setOrderType === 1;
        setDisable(false);
      }
    } catch (e) {
      console.log('async error', e);
    }
  };

  const verticalDotsArray = [
    {
      id: 'pairPrinter',
      title: 'Pair Printer',
      icon: (
        <Icon
          name={'print'}
          size={
            sizeHelper.screenWidth > 450
              ? sizeHelper.calWp(30)
              : sizeHelper.calWp(35)
          }
          color={'#7e9a49'}
        />
      ),
      color: '#7e9a49',
    },

    {
      id: 'terminal',
      title: 'Reboot Terminal',
      icon: <RebootTerminalIcon />,
      color: '#fb865a',
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: <Icon name="power-off" size={20} color={AppColor.red} />,
      color: AppColor.red,
    },
  ];

  const renderTouchable = () => <TouchableOpacity></TouchableOpacity>;

  return (
    <>
      <View style={styles.mainContainer}>
        <View
          style={{
            justifyContent: 'flex-start',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* {props.orderType === 1 && ( */}
          <>
            <TouchableOpacity
              disabled={disable}
              onPress={() => props.navigation.navigate('TableBook')}
              style={styles.iconView}>
              <Image
                style={styles.icon}
                source={require('../assets/images/table.png')}
              />
            </TouchableOpacity>
          </>
          {/* )} */}

          <TouchableOpacity onPress={onPressHome}>
            <Image
              style={styles.icon}
              source={require('../assets/images/boxcat.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity>
            <FXCLogo
              // backgroundColor={'green'}
              width={sizeHelper.calWp(200)}
              height={sizeHelper.calHp(40)}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          {/* <TouchableOpacity
            style={{marginHorizontal: 15}}
            //  onPress={() => props.navigation.navigate('TableBook')}
          >
            <Image
              style={styles.icon}
              source={require('../assets/images/setting.png')}
            />
          </TouchableOpacity> */}

          <Menu
            style={{justifyContent: 'center', alignItems: 'center'}}
            onSelect={type => props.onClickMenuFunction(type)}>
            <MenuTrigger renderTouchable={renderTouchable}>
              <View
                style={{
                  right: sizeHelper.calWp(-10),
                  marginTop: sizeHelper.calHp(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon2
                  name="dots-three-vertical"
                  size={20}
                  color={AppColor.white}
                />
              </View>
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                width: 'auto',

                backgroundColor: AppColor.white,
                marginTop: I18nManager.isRTL
                  ? sizeHelper.calWp(40)
                  : sizeHelper.calWp(32),
                // borderRadius: sizeHelper.calWp(2),
                elevation: 50,
                // alignSelf: 'center',
                marginEnd: I18nManager.isRTL
                  ? sizeHelper.calWp(10)
                  : sizeHelper.calWp(0),
                // paddingHorizontal: sizeHelper.calWp(10),
                // alignSelf: 'right',
              }}>
              {verticalDotsArray.map((item, index) => (
                <MenuOption
                  renderTouchable={renderTouchable}
                  key={item.id}
                  value={item.id}>
                  {index !== 0 && <View />}
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginVertical: sizeHelper.calHp(5),
                      borderColor: 'red',
                    }}>
                    {item.icon}
                    <Text style={[styles.title1, {color: item.color}]}>
                      {item.title}
                    </Text>
                  </View>
                </MenuOption>
              ))}
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColor.blue1,
    // flex: 1,
    flexDirection: 'row',
    //height:sizeHelper.calHp(142),
    paddingTop: sizeHelper.calHp(14),
    paddingHorizontal: sizeHelper.calWp(25),
    width: sizeHelper.screenWidth,
    paddingBottom: sizeHelper.calHp(20),
  },
  topView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  terminalIdText: {
    fontSize: sizeHelper.calHp(22),
    color: AppColor.white,
    fontFamily: 'Proxima Nova Bold',
    // fontWeight: "bold"
  },
  title: {
    fontSize: sizeHelper.calHp(20),
    color: AppColor.white,
    fontFamily: 'Proxima Nova Bold',
    width: sizeHelper.calWp(80),
    backgroundColor: 'green',
    alignSelf: 'center',
    textAlign: 'center',
  },

  title1: {
    fontSize: sizeHelper.calHp(20),
    marginStart: sizeHelper.calWp(5),
    fontFamily: 'Proxima Nova Bold',
    alignSelf: 'center',
    textAlign: 'center',
  },

  bottomView: {
    marginTop: sizeHelper.calHp(35),
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    // backgroundColor: "green"
  },
  searchContainer: {
    width: sizeHelper.calWp(450),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(25),
    paddingStart: sizeHelper.calWp(11),
    alignItems: 'center',
    flexDirection: 'row',
  },

  search: {
    textAlignVertical: 'center',
    padding: 0,
    paddingStart: sizeHelper.calWp(6),
    width: sizeHelper.calWp(350),
    borderRadius: sizeHelper.calHp(18),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.white,
    fontSize: sizeHelper.calHp(18),
    fontFamily: 'ProximaNova-Regular',
  },
  invoiceContainer: {
    width: sizeHelper.calWp(160),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.yellowColor,
    borderRadius: sizeHelper.calHp(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: sizeHelper.calWp(14),
  },
  cameraContainer: {
    width: sizeHelper.calHp(50),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizeHelper.calWp(50) / 2,
    paddingEnd: sizeHelper.calWp(5),
    paddingBottom: sizeHelper.calWp(5),
  },
  cameraContainer2: {
    width: sizeHelper.calHp(50),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizeHelper.calWp(50) / 2,
    marginStart: sizeHelper.calWp(14),
    // paddingEnd: sizeHelper.calWp(5),
    //paddingBottom: sizeHelper.calWp(5)
  },
  icon: {
    marginTop: 5,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  iconView: {
    marginRight: 25,
  },
});

export default Header;
