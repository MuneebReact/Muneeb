import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  I18nManager,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

import sizeHelper from '../helpers/sizeHelper';
import AppColor from '../constant/AppColor';
import IncrementButton from '../assets/svg/incrementButton';
import DecrementButton from '../assets/svg/decrementButton';
import DecrementButtonDisable from '../assets/svg/decrementButtonDisable';
import AddIcon from '../assets/svg/AddIcon';
import SettingIcon from '../assets/svg/settingIcon';
import CloseAddonIcon from '../assets/svg/closeAddonIcon';

const PlacedOrderSelectedProductListItem = ({
  item,
  onPressIncrementDecrement,
  index,
  onChangeText,
  AgentList,
  onEndEditing,
  manuallyCount,
  setmanuallyCount,
  setLoading,
  getAddOnProducts,
  onManuallyChangePrice,
  TerminalConfiguration,
  StringsList,
  noOfProducts,
  disabled,
  getProductsIngredients,
  userConfiguration,
  productAssignSaleAgent,
  onClickIn,
  setAddProductLoader,
  props,
}) => {
  const [isMore, setMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(AgentList);
  const [isFocus, setFocus] = useState(false);
  const [isFocusDA, setFocusDA] = useState(false);
  const [isFocusPDA, setFocusPDA] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isFocusPrice, setFocusPrice] = useState(false);

  const zIndex = 5000 - 1000 * index;
  const zIndexInverse = 1000 + 1000 * index;

  return (
    <View
      style={[
        styles.container,
        open ? {height: sizeHelper.calHp(450)} : {height: 'auto'},
      ]}>
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: item?.IsParentAddOn
              ? AppColor.white
              : AppColor.gray2,
            height: item?.IsParentAddOn
              ? sizeHelper.calHp(100)
              : sizeHelper.calHp(100),
          },
        ]}>
        <View
          style={{
            height: sizeHelper.calHp(100),
            width: sizeHelper.calWp(45),
            backgroundColor: item?.IsParentAddOn
              ? AppColor.blue2
              : AppColor.gray2,
            borderTopLeftRadius: sizeHelper.calHp(10),
            borderBottomLeftRadius: sizeHelper.calHp(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item?.IsParentAddOn && (
            <Text
              style={[
                styles.productName,
                {
                  marginTop: sizeHelper.calHp(0),
                  color: AppColor.white,
                  fontSize: sizeHelper.calHp(30),
                },
              ]}>
              {noOfProducts}
            </Text>
          )}
        </View>
        <View style={{marginStart: sizeHelper.calWp(10)}}>
          <View style={{marginTop: sizeHelper.calHp(5)}}>
            <View
              style={{
                width: sizeHelper.calWp(600),
                alignItems: 'center',
                //backgroundColor: 'green',
                flexDirection: 'row',
              }}>
              <Text numberOfLines={1} style={styles.productName1}>
                {I18nManager.isRTL ? item?.ProductName2 : item?.ProductName}
              </Text>

              {item?.UOMFragment !== 0 && (
                <Text style={styles.productBox1}>
                  {I18nManager.isRTL
                    ? '  -' + item?.UOMName2
                    : '  -' + item?.UOMName}
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: sizeHelper.calHp(5),
              alignItems: 'center',
            }}>
            <View
              style={{
                width: sizeHelper.calWp(80),
                height: sizeHelper.calHp(40),
                justifyContent: 'center',
                // alignItems: 'center',
                // backgroundColor: 'green',
              }}>
              <TextInput
                editable={item?.IsParentAddOn === true}
                keyboardType="numeric"
                onChangeText={text => onChangeText('changePrice', text, item)}
                onEndEditing={text => {
                  onEndEditing('changePrice', item), setFocusPrice(false);
                }}
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[
                  styles.inputField,
                  {
                    color: AppColor.black,
                    fontFamily: 'Proxima Nova Bold',
                    fontSize: sizeHelper.calHp(24),
                    //backgroundColor: "green",
                    // textAlign: "left"
                  },
                ]}
                onFocus={() => {
                  setFocusPrice(true);
                  setmanuallyCount(item?.Price ? item?.Price : 0);
                }}
                value={
                  isFocusPrice
                    ? manuallyCount
                    : item?.Price
                    ? String(item?.Price)
                    : undefined
                }
                placeholder="0.00"
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {item?.IsParentAddOn ? (
                <TouchableOpacity
                  disabled={item?.Quantity <= 1}
                  onPressIn={async () => {}}
                  onPress={async () => {
                    onClickIn();
                    setLoading(true);
                    setAddProductLoader(true);
                    await onPressIncrementDecrement(item, 'decrement');
                    setTimeout(() => {
                      setAddProductLoader(false), setDisabled(false);
                    }, 0);
                  }}>
                  {item?.Quantity <= 1 ? (
                    <DecrementButtonDisable />
                  ) : (
                    <DecrementButton />
                  )}
                </TouchableOpacity>
              ) : (
                <View style={{width: 26, height: 26}} />
              )}
              <View
                style={{
                  width: sizeHelper.calWp(100),
                  height: sizeHelper.calHp(40),
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'green',
                }}>
                <TextInput
                  editable={item?.IsParentAddOn === true}
                  keyboardType="numeric"
                  onChangeText={text =>
                    onChangeText('manuallyCount', text, item)
                  }
                  onEndEditing={text => {
                    onEndEditing('manuallyCount', item), setFocus(false);
                  }}
                  style={[
                    styles.inputField,
                    {textAlign: 'center', width: sizeHelper.calWp(80)},
                  ]}
                  onFocus={() => {
                    setFocus(true);
                    setmanuallyCount(item?.Quantity);
                  }}
                  value={
                    isFocus
                      ? manuallyCount
                      : item?.IsParentAddOn
                      ? String(item?.Quantity)
                      : String(item?.Quantity * item?.Quantity)
                  }
                  placeholder="0.00"
                />
              </View>

              {item?.IsParentAddOn ? (
                <TouchableOpacity
                  disabled={isDisabled}
                  onPress={async () => {
                    setDisabled(true);
                    onClickIn();

                    setLoading(true);
                    setAddProductLoader(true);
                    await onPressIncrementDecrement(item, 'increment');
                    setTimeout(() => {
                      setDisabled(false);
                      setAddProductLoader(false);
                    }, 0);
                  }}>
                  <IncrementButton />
                </TouchableOpacity>
              ) : (
                <View style={{width: 26, height: 26}} />
              )}
            </View>

            <View
              style={{
                backgroundColor: AppColor.yellowColor,
                width: sizeHelper.calWp(120),
                marginHorizontal: sizeHelper.calWp(20),
                height: sizeHelper.calHp(40),
                justifyContent: 'center',
                borderRadius: sizeHelper.calWp(5),
              }}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.amount}>
                {/* {item?.SellingPrice * item?.Quantity +
                item?.tax * item?.Quantity -
                (item?.DiscountAmount ? item?.DiscountAmount : 0)} */}
                {item?.Price ? item?.Price : 'N/A'}
              </Text>
            </View>

            <TouchableOpacity
              style={{marginEnd: sizeHelper.calWp(10)}}
              disabled={disabled}
              onPress={() => {
                getProductsIngredients(item);
              }}>
              <View
                style={{
                  backgroundColor: AppColor.yellow1,
                  width: 33,
                  height: 33,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 33 / 2,
                }}>
                <Icon name="life-saver" size={20} color={AppColor.green} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginEnd: sizeHelper.calWp(10)}}
              disabled={
                !item?.IsParentAddOn || item?.AddOnGroupCode === '' || disabled
              }
              onPress={() => {
                getAddOnProducts(item, index);
              }}>
              {!item?.IsParentAddOn ? (
                <View style={{height: 33, width: 33}} />
              ) : item?.AddOnGroupCode === '' ? (
                <View style={{height: 33, width: 33}} />
              ) : (
                <View
                  style={{
                    backgroundColor: AppColor.green,
                    width: 33,
                    height: 33,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 33 / 2,
                  }}>
                  <Icon name="life-saver" size={20} color={AppColor.yellow1} />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMore(!isMore);
                if (isMore) {
                  setOpen(false);
                }
              }}>
              {isMore ? <CloseAddonIcon /> : <AddIcon />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isMore && (
        <View
          style={[
            styles.innerContainer,
            {
              backgroundColor: AppColor.white1,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: sizeHelper.calWp(20),
              paddingVertical:
                sizeHelper.screenWidth > 450
                  ? sizeHelper.calHp(25)
                  : sizeHelper.calHp(25),
            },
          ]}>
          <View>
            <Text style={styles.productName}>{StringsList._13}</Text>
            <Text style={styles.productBox}>{item?.tax}</Text>
          </View>
          <View>
            <Text style={styles.productName}>{StringsList._7}</Text>
            <TextInput
              editable={
                item?.IsParentAddOn === true ||
                (1 && TerminalConfiguration.IsDiscountOnSalesProduct !== 'true')
                  ? false
                  : item?.IsParentAddOn === true &&
                    userConfiguration.DiscountAllowed === 1
                  ? true
                  : false
              }
              keyboardType="numeric"
              adjustsFontSizeToFit
              numberOfLines={1}
              onChangeText={text => onChangeText('DiscountRate', text, item)}
              onEndEditing={text => {
                onEndEditing('DiscountRate', item), setFocusPDA(false);
              }}
              style={styles.inputField}
              onFocus={() => {
                setFocusPDA(true);
                setmanuallyCount(item?.DiscountRate ? item?.DiscountRate : 0);
              }}
              value={
                isFocusPDA
                  ? manuallyCount
                  : item?.DiscountRate
                  ? String(item?.DiscountRate)
                  : undefined
              }
              placeholder="0.00"
            />
            <View style={[styles.dashedLine]}>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  height: 1,
                  backgroundColor: AppColor.white1,
                  zIndex: 1,
                }}
              />
            </View>
          </View>
          <View>
            <Text style={styles.productName}>{StringsList._8}</Text>
            <TextInput
              editable={
                item?.IsParentAddOn === 1 &&
                (item?.DiscountRate > 0 ||
                  TerminalConfiguration.IsDiscountOnSalesProduct !== 'true')
                  ? false
                  : item?.IsParentAddOn === 1 &&
                    userConfiguration.DiscountAllowed === 1
                  ? true
                  : false
              }
              keyboardType="numeric"
              adjustsFontSizeToFit
              numberOfLines={1}
              onChangeText={text => onChangeText('DiscountAmount', text, item)}
              onEndEditing={text => {
                onEndEditing('DiscountAmount', item), setFocusDA(false);
              }}
              style={styles.inputField}
              onFocus={() => {
                setFocusDA(true);
                setmanuallyCount(
                  item?.DiscountAmount ? item?.DiscountAmount : 0,
                );
              }}
              value={
                isFocusDA
                  ? manuallyCount
                  : item?.DiscountAmount
                  ? String(item?.DiscountAmount)
                  : item?.DiscountRate
                  ? String(item?.DiscountRate * item?.Quantity)
                  : undefined
              }
              placeholder="0.00"
            />

            <View style={[styles.dashedLine]}>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  height: 1,
                  backgroundColor: AppColor.white1,
                  zIndex: 1,
                }}
              />
            </View>
          </View>
          {props.userConfiguration?.AssignSalesAgentAgainstServices === 1 && (
            <View
              style={{
                height: sizeHelper.calHp(80),
                marginEnd: sizeHelper.calWp(120),
                //backgroundColor: 'green',
              }}>
              <Text style={styles.productName}>{StringsList._171}</Text>
            </View>
          )}
        </View>
      )}
      {isMore &&
        props.userConfiguration?.AssignSalesAgentAgainstServices === 1 && (
          <View
            style={[
              styles.dropDownStyle,
              {bottom: open ? sizeHelper.calHp(270) : sizeHelper.calHp(35)},
            ]}>
            <DropDownPicker
              listMode="SCROLLVIEW"
              disabled={!item?.IsParentAddOn || disabled}
              nestedScrollEnabled={true}
              open={open}
              value={item?.value ? item?.value : value}
              items={items}
              onChangeValue={value => {
                productAssignSaleAgent(items, value, item);
              }}
              style={{
                width:
                  sizeHelper.screenWidth > 450
                    ? sizeHelper.calWp(200)
                    : sizeHelper.calWp(250),
                paddingEnd: 0,
                margin: 0,
                borderRadius: 0,
                borderWidth: 0,
                borderRadius: sizeHelper.calWp(25),
                height: sizeHelper.calHp(40),
                marginTop: sizeHelper.calHp(10),
              }}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder={`${StringsList._368}`}
              //style={styles.dropDownStyle}
              placeholderStyle={{
                color: AppColor.gray1,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginStart: sizeHelper.calWp(10),
              }}
              dropDownMaxHeight={sizeHelper.calHp(100)}
              dropDownContainerStyle={{
                width:
                  sizeHelper.screenWidth > 450
                    ? sizeHelper.calWp(200)
                    : sizeHelper.calWp(250),
                marginTop: sizeHelper.calHp(15),
                borderWidth: 0,
                height: sizeHelper.calHp(250),
              }}
              arrowIconContainerStyle={{
                height: sizeHelper.calHp(40),
                width: sizeHelper.calWp(35),
                borderTopEndRadius: sizeHelper.calWp(15),
                borderBottomRightRadius: sizeHelper.calWp(15),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: AppColor.blue1,
                marginEnd: 0,
              }}
              arrowIconStyle={{
                width: sizeHelper.calWp(20),
                height: sizeHelper.calHp(20),
                tintColor: AppColor.white,
              }}
              listItemContainerStyle={
                {
                  //paddingStart: sizeHelper.calWp(20),
                  //height: sizeHelper.calHp(100),
                }
              }
              containerStyle={{
                height: sizeHelper.calHp(40),
                borderRadius: sizeHelper.calWp(15),
                padding: 0,
                margin: 0,
                width:
                  sizeHelper.screenWidth > 450
                    ? sizeHelper.calWp(200)
                    : sizeHelper.calWp(250),
              }}
              tickIconStyle={{
                width: sizeHelper.calWp(20),
                height: sizeHelper.calHp(20),
                tintColor: AppColor.white,
              }}
            />
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    borderRadius: sizeHelper.calHp(10),
    flexDirection: 'row',
    backgroundColor: AppColor.white,

    paddingRight: sizeHelper.calWp(24),
    // paddingHorizontal: sizeHelper.calWp(20),
    paddingVertical:
      sizeHelper.screenWidth > 450 ? sizeHelper.calHp(0) : sizeHelper.calHp(25),
  },
  productName1: {
    // width: "85%",
    //marginTop: sizeHelper.calHp(8),
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    fontFamily: 'ProximaNova-Semibold',
    fontWeight: 'bold',
    // backgroundColor: "green",
  },
  productName: {
    // width: "85%",
    marginTop: sizeHelper.calHp(8),
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    fontFamily: 'ProximaNova-Semibold',
    fontWeight: 'bold',
    // backgroundColor: "green",
  },
  productBox1: {
    // height: sizeHelper.calHp(28),
    // marginTop: sizeHelper.calHp(15),
    fontSize: sizeHelper.calHp(16),
    color: AppColor.blue1,
    fontFamily: 'Proxima Nova Bold',
  },
  productBox: {
    height: sizeHelper.calHp(28),
    marginTop: sizeHelper.calHp(15),
    fontSize: sizeHelper.calHp(16),
    color: AppColor.gray1,
    fontFamily: 'ProximaNova-Regular',
  },
  amount: {
    textAlign: 'center',
    // backgroundColor: 'green',
    // width: sizeHelper.calWp(120),
    fontSize: sizeHelper.calHp(24),
    color: AppColor.black,
    fontFamily: 'Proxima Nova Bold',

    marginEnd: sizeHelper.calWp(2),
    marginStart: sizeHelper.calWp(2),
  },
  quantity: {
    fontSize: sizeHelper.calHp(16),
    color: AppColor.black,
    fontFamily: 'ProximaNova-Regular',

    //marginHorizontal: sizeHelper.calWp(17),
  },
  inputField: {
    textAlignVertical: 'center',
    padding: 0,
    paddingStart: sizeHelper.calWp(1),
    width: sizeHelper.calWp(100),
    height: sizeHelper.calHp(40),
    // backgroundColor: 'green',

    fontFamily: 'ProximaNova-Regular',
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  dashedLine: {
    width: sizeHelper.calWp(100),
    borderColor: AppColor.gray1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  dropDownStyle: {
    position: 'absolute',
    right: sizeHelper.calWp(24),
  },
});

export default PlacedOrderSelectedProductListItem;
