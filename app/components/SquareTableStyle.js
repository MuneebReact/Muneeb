import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  I18nManager,
  Alert,
} from 'react-native';

import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ServerCall} from '../redux/actions/asynchronousAction';
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import Icon2 from 'react-native-vector-icons/Entypo';

const SquareTableStyle = props => {
  const [opened, setOpend] = useState(false);
  const getDetailScreen = () => {
    let orderID = shortOrderDetail?.OrderCode;

    props.navigation.navigate('home', {id: orderID});
  };
  const [shortOrderDetail, setShortOrderDetail] = useState([]);
  const onShortOrderDetail = async () => {
    let token = await AsyncStorage.getItem('ACCESS_TOKEN');

    try {
      const response = await props.dispatch(
        ServerCall(
          token,
          'Order/FetchOrderByTable?tableCode=' + props.item?.TableCodeID,
          'GET',
        ),
      );

      console.log('Short Order Detail Responce ======>', response);

      if (response?.message === 'Unauthorized') {
        Alert.alert('Alert', 'Your Session is Expirerd Please Login again', [
          {text: 'OK', onPress: () => props.navigation.navigate('Auth')},
        ]);
        props.setLoading(false);
      } else {
        setShortOrderDetail(response);
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };

  const changeTableStatus = async () => {
    let token = await AsyncStorage.getItem('ACCESS_TOKEN');
    props.setLoading(true);

    try {
      const response = await props.dispatch(
        ServerCall(
          token,
          `Table/ChangeTableStatus?tableCode=${props.item?.TableCodeID}
             &IsAvailable=1`,
          'GET',
        ),
      );
      console.log('onFreeTable', response);

      if (response?.message === 'Unauthorized') {
        Alert.alert('Alert', 'Your Session is Expirerd Please Login again', [
          {text: 'OK', onPress: () => props.navigation.replace('Auth')},
        ]);
      } else {
        const newData = props.screenData.map(e => {
          if (e.TableCodeID === props.item?.TableCodeID) {
            return {
              ...e,
              IsAvailable: 1,
            };
          }
          return {
            ...e,
          };
        });
        props.emptyAsyncTableObj();
        props.setScreenData(newData);
        props.navigation.navigate('home');
        props.setTableID(null);
        props.setLoading(false);
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };
  const optionsArray = [
    {
      id: 'viewDetail',
      title: 'View Detail',

      color: AppColor.white,
      backgroundColor: AppColor.red,
    },

    {
      id: 'free',
      title: 'Free',

      color: AppColor.white,
      backgroundColor: AppColor.green,
    },
  ];
  const selectOption = async type => {
    //console.log(' onClickSetting ', type);
    switch (type) {
      case 'viewDetail':
        getDetailScreen();
        break;

      case 'free':
        changeTableStatus();
        break;

      default:
        break;
    }
  };
  const renderTouchable = () => <TouchableOpacity></TouchableOpacity>;

  return (
    <>
      {props.item?.IsAvailable !== 1 ? (
        <TouchableOpacity
          onPress={() => {
            setOpend(true);
            onShortOrderDetail();
          }}>
          <Menu
            opened={opened}
            onSelect={type => {
              selectOption(type);
            }}>
            <MenuTrigger>
              <View
                style={{
                  justifyContent: 'flex-end',
                  width: sizeHelper.calWp(60),
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                }}>
                {/* <Icon2
                        name="menu"
                        // name="dots-three-horizontal"
                        size={20}
                        color={AppColor.white}
                      /> */}
              </View>
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                width: 'auto',
                backgroundColor: AppColor.white,
                marginTop: sizeHelper.calWp(80),
                elevation: 50,
                paddingHorizontal: sizeHelper.calWp(8),
              }}>
              <MenuOption>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{alignItems: 'center', alignSelf: 'center'}}>
                    <Icon2 name="cross" size={20} color={'transparent'} />
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          alignSelf: 'center',
                          marginTop: sizeHelper.calHp(15),
                          fontSize: sizeHelper.calHp(20),
                        },
                      ]}>
                      {' '}
                      {props?.item?.TableCodeID}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setOpend(false);
                    }}
                    style={{
                      backgroundColor: 'red',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Icon2 name="cross" size={20} color={AppColor.white} />
                  </TouchableOpacity>
                </View>
                <View>
                  {/* <Text
                      style={[
                        styles.textStyle,
                        {
                          alignSelf: 'center',
                          marginTop: sizeHelper.calHp(15),
                          fontSize: sizeHelper.calHp(20),
                        },
                      ]}>
                      {' '}
                      {props?.item?.TableCodeID}
                    </Text> */}
                  <View
                    style={{
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                    }}>
                    <View>
                      <Text style={styles.titleStyle}>Order Taker</Text>
                      <Text style={styles.textStyle}>
                        {shortOrderDetail?.OrderTaker
                          ? shortOrderDetail?.OrderTaker
                          : 'N/A'}
                      </Text>
                      <Text style={styles.titleStyle}>Time Required</Text>
                      <Text style={styles.textStyle}>
                        {shortOrderDetail?.TimeRequired
                          ? shortOrderDetail?.TimeRequired
                          : 'N/A'}
                      </Text>
                      <Text style={styles.titleStyle}>Order Code</Text>
                      <Text style={styles.textStyle}>
                        {shortOrderDetail?.OrderCode
                          ? shortOrderDetail?.OrderCode
                          : 'N/A'}
                      </Text>
                      {/* <Text style={styles.titleStyle}></Text>
                      <Text style={styles.textStyle}></Text> */}
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                      <Text style={styles.titleStyle}>Order Status</Text>
                      <Text style={styles.textStyle}>
                        {shortOrderDetail?.StatusName
                          ? shortOrderDetail?.StatusName
                          : 'N/A'}
                      </Text>
                      <Text style={styles.titleStyle}>Status #</Text>
                      <Text style={styles.textStyle}>
                        {shortOrderDetail?.Status
                          ? shortOrderDetail?.Status
                          : 'N/A'}
                      </Text>
                      <Text style={styles.titleStyle}>Order Time</Text>
                      <Text style={styles.textStyle}>
                        {shortOrderDetail?.OrderTime
                          ? shortOrderDetail?.OrderTime
                          : 'N/A'}
                      </Text>
                      {/* <Text style={styles.titleStyle}></Text>
                      <Text style={styles.textStyle}></Text> */}
                    </View>
                  </View>
                  {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: sizeHelper.calHp(50),
                        marginBottom: sizeHelper.calHp(10),
                      }}>
                      <TouchableOpacity
                        style={{
                          width: '60%',
                          height: sizeHelper.calHp(36),
                          backgroundColor: AppColor.brickRed,
                          justifyContent: 'center',
                          alignSelf: 'center',
                          alignItems: 'center',
                          // position: 'absolute',
                          // bottom: 10,
                          borderRadius: sizeHelper.calHp(5),
                          zIndex: 999,
                        }}
                        onPress={getDetailScreen}>
                        <Text
                          style={{
                            color: AppColor.white,
                            fontSize: sizeHelper.calHp(13),
                          }}>
                          View Order
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={props.changeTableStatus}
                        style={{
                          width: '35%',
                          height: sizeHelper.calHp(36),
                          backgroundColor: AppColor.green,
                          justifyContent: 'center',
                          alignSelf: 'center',
                          alignItems: 'center',
                          // position: 'absolute',
                          // bottom: 10,
                          borderRadius: sizeHelper.calHp(5),
                          zIndex: 999,
                        }}>
                        <Text
                          style={{
                            color: AppColor.white,
                            fontSize: sizeHelper.calHp(13),
                          }}>
                          Free
                        </Text>
                      </TouchableOpacity>
                    </View> */}
                </View>

                {optionsArray.map((item, index) => (
                  <MenuOption
                    renderTouchable={renderTouchable}
                    key={item?.id}
                    value={item?.id}>
                    {index !== 0 && <View />}

                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'column-reverse',
                        marginVertical: sizeHelper.calHp(5),
                        borderRadius: 3,
                        backgroundColor: item?.backgroundColor,
                      }}>
                      <Text style={[styles.title1, {color: item?.color}]}>
                        {item?.title}
                      </Text>
                    </View>
                  </MenuOption>
                ))}
              </MenuOption>
            </MenuOptions>
            <View>
              <View
                style={[
                  styles.container,

                  {
                    opacity: 1,
                    zIndex: 0,
                  },
                  // {top: -5},
                ]}>
                <View
                  style={[
                    styles.leftRightContainer,
                    {
                      backgroundColor:
                        props.item?.IsAvailable === 1
                          ? AppColor.white
                          : props.item?.IsAvailable === 2
                          ? AppColor.brickRedLight
                          : props.item?.IsAvailable === 3
                          ? AppColor.yellowTable
                          : console.log('error'),
                    },
                  ]}></View>

                <View
                  style={[
                    styles.centerContainer,
                    {
                      backgroundColor:
                        props.item?.IsAvailable === 1
                          ? AppColor.white
                          : props.item?.IsAvailable === 2
                          ? AppColor.brickRedLight
                          : props.item?.IsAvailable === 3
                          ? AppColor.yellowTable
                          : console.log('error'),
                    },
                  ]}>
                  <Text style={{fontSize: sizeHelper.calHp(22)}}>
                    {' '}
                    {props.item?.TableCodeID}
                  </Text>

                  <View
                    style={[
                      styles.sequreTable,
                      {
                        backgroundColor:
                          props.item?.IsAvailable === 1
                            ? AppColor.white
                            : props.item?.IsAvailable === 2
                            ? AppColor.brickRedLight
                            : props.item?.IsAvailable === 3
                            ? AppColor.yellowTable
                            : console.log('error'),
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: sizeHelper.calHp(13),
                        fontFamily: 'ProximaNova-Regular',
                      }}>
                      {props.item?.IsAvailable === 1
                        ? I18nManager.isRTL
                          ? 'متاح'
                          : 'Free'
                        : props.item?.IsAvailable === 2
                        ? I18nManager.isRTL
                          ? 'غير متاح'
                          : 'Occupied'
                        : props.item?.IsAvailable === I18nManager.isRTL
                        ? 'انتهى الوقت '
                        : 'Time Completed'}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.leftRightContainer,
                    {
                      backgroundColor:
                        props.item?.IsAvailable === 1
                          ? AppColor.white
                          : props.item?.IsAvailable === 2
                          ? AppColor.brickRedLight
                          : props.item?.IsAvailable === 3
                          ? AppColor.yellowTable
                          : console.log('error'),
                    },
                  ]}></View>
              </View>
            </View>
          </Menu>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => {
              props.Pprop.onSelectTable(props.index);
            }}
            style={[
              styles.container,

              {
                opacity: 1,
                zIndex: 0,
              },
            ]}>
            <View
              style={[
                styles.leftRightContainer,
                {
                  backgroundColor:
                    props.item?.IsAvailable === 1
                      ? AppColor.white
                      : props.item?.IsAvailable === 2
                      ? AppColor.brickRedLight
                      : props.item?.IsAvailable === 3
                      ? AppColor.yellowTable
                      : console.log('error'),
                },
              ]}></View>

            <View
              style={[
                styles.centerContainer,
                {
                  backgroundColor:
                    props.item?.IsAvailable === 1
                      ? AppColor.white
                      : props.item?.IsAvailable === 2
                      ? AppColor.brickRedLight
                      : props.item?.IsAvailable === 3
                      ? AppColor.yellowTable
                      : console.log('error'),
                },
              ]}>
              <Text style={{fontSize: sizeHelper.calHp(22)}}>
                {' '}
                {props.item?.TableCodeID}
              </Text>

              <View
                style={[
                  styles.sequreTable,
                  {
                    backgroundColor:
                      props.item?.IsAvailable === 1
                        ? AppColor.white
                        : props.item?.IsAvailable === 2
                        ? AppColor.brickRedLight
                        : props.item?.IsAvailable === 3
                        ? AppColor.yellowTable
                        : console.log('error'),
                  },
                ]}>
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(13),
                    fontFamily: 'ProximaNova-Regular',
                  }}>
                  {props.item?.IsAvailable === 1
                    ? I18nManager.isRTL
                      ? 'متاح'
                      : 'Free'
                    : props.item?.IsAvailable === 2
                    ? I18nManager.isRTL
                      ? 'غير متاح'
                      : 'Occupied'
                    : props.item?.IsAvailable === I18nManager.isRTL
                    ? 'انتهى الوقت '
                    : 'Time Completed'}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.leftRightContainer,
                {
                  backgroundColor:
                    props.item?.IsAvailable === 1
                      ? AppColor.white
                      : props.item?.IsAvailable === 2
                      ? AppColor.brickRedLight
                      : props.item?.IsAvailable === 3
                      ? AppColor.yellowTable
                      : console.log('error'),
                },
              ]}></View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    //  borderRadius: sizeHelper.calWp(5),
    alignItems: 'center',
    //zIndex: 1,

    //backgroundColor: AppColor.white,
  },
  leftRightContainer: {
    height: sizeHelper.calHp(91),
    width: sizeHelper.calWp(6),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calWp(6) / 2,
  },
  centerContainer: {
    height: sizeHelper.calHp(141),
    width: sizeHelper.calWp(183),
    marginHorizontal: sizeHelper.calWp(8),
    backgroundColor: AppColor.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calHp(5),
    zIndex: 0,
  },
  viewDetailContainer: {
    position: 'absolute',
    height: sizeHelper.calHp(165),
    width: sizeHelper.calWp(183),
    marginHorizontal: sizeHelper.calWp(8),
    backgroundColor: AppColor.white,
    left: -130,
    borderRadius: sizeHelper.calHp(5),
    zIndex: 9999,
    transform: [{translateY: 10}],
  },
  viewDetailContainer2: {
    position: 'absolute',
    height: sizeHelper.calHp(165),
    width: sizeHelper.calWp(183),
    marginHorizontal: sizeHelper.calWp(8),
    backgroundColor: AppColor.white,
    right: -130,
    borderRadius: sizeHelper.calHp(5),
    // zIndex: 9999,
    top: sizeHelper.calHp(15),
  },
  talkBubble: {
    backgroundColor: 'transparent',
  },
  talkBubbleSquare: {
    position: 'absolute',
    height: sizeHelper.calHp(370),
    width: sizeHelper.calWp(200),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(10),

    zIndex: 999,
    padding: sizeHelper.calHp(10),
  },
  talkBubbleTriangle: {
    position: 'absolute',
    right: sizeHelper.calHp(-38),
    top: sizeHelper.calHp(0),
    width: 0,
    height: 0,
    transform: [{rotate: '180deg'}],
    borderTopColor: 'transparent',
    borderTopWidth: sizeHelper.calHp(15),
    borderRightWidth: sizeHelper.calHp(20),
    borderRightColor: AppColor.white,
    borderBottomWidth: sizeHelper.calHp(15),
    borderBottomColor: 'transparent',
    elevation: sizeHelper.calHp(15),
  },
  talkBubbleTriangle2: {
    position: 'absolute',
    left: sizeHelper.calHp(-20),
    top: sizeHelper.calHp(0),
    width: 0,
    height: 0,
    // transform: [{ rotate: "180deg" }],
    borderTopColor: 'transparent',
    borderTopWidth: sizeHelper.calHp(15),
    borderRightWidth: sizeHelper.calHp(20),
    borderRightColor: AppColor.white,
    borderBottomWidth: sizeHelper.calHp(15),
    borderBottomColor: 'transparent',
    elevation: sizeHelper.calHp(15),
  },
  titleStyle: {
    fontSize: sizeHelper.calHp(15),
    color: AppColor.gray1,
    fontFamily: 'ProximaNova-Regular',
    marginTop: sizeHelper.calHp(10),
  },
  textStyle: {
    fontSize: sizeHelper.calHp(15),
    color: AppColor.black,
    fontFamily: 'Proxima Nova Bold',
  },
  sequreTable: {
    position: 'absolute',
    bottom: 0,
    height: sizeHelper.calHp(36),
    width: '100%',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomStartRadius: sizeHelper.calHp(5),
    borderBottomEndRadius: sizeHelper.calHp(5),
  },
});

export default React.memo(SquareTableStyle);
