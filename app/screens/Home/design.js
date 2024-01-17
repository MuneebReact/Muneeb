import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  I18nManager,
  Dimensions,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import CustomModal from '../../components/CustomModal';
import SwipeButton from '../../components/SwipeButton';
import BottomSheet from '../../components/Bottomsheet';
import {SwipeListView} from 'react-native-swipe-list-view';
import ViewShot, {captureScreen} from 'react-native-view-shot';
import moment from 'moment';
import Barcode from '@kichiyaki/react-native-barcode-generator';

import sizeHelper from '../../helpers/sizeHelper';
import AppColor from '../../constant/AppColor';
import FXCLogo from '../../assets/svg/FXCLogo.svg';
import styles from './style';
import Header from '../../components/Header';
import CategoryItem from '../../components/CategoryItem';
import ProductItem from '../../components/ProductItem';
import AllCategories from '../../components/AllCategories';
import SelectedProductListItem from '../../components/SelectedProductListItem';
import CustomButton from '../../components/CustomButton';

import CustomPicker from '../../components/CustomPicker';
import CustomDropDown from '../../components/CustomDropDown';
import DrawerPopUp from '../../components/DrawerPopUP';
import CreditInfoPopUP from '../../components/CreditInfoPopUp';
import TerminalSetup from '../../components/TerminalSetup';
import PairPrinterFamily from '../../components/PairPrinterFamily';
import Loading from '../../components/Loading';
import AlertModel from '../../components/AlertModel';
import HoldInvoices from '../../components/HoldInvoices';
import QRCodeScannerScreen from '../../components/BarCodeScanner';
import ReturnInvoice from '../../components/ReturnInvoice';
import AddSearchBuyer from '../../components/AddSearchBuyer';
import LoyaltyCard from '../../components/LoyaltyCard';
import GlobalTaxList from '../../components/GlobalTaxList';
import AddonsList from '../../components/AddonsList';
import IngredientsList from '../../components/IngredientsList';
import SelectedProductListItemMobile from '../../components/SelectedProductListItemMobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlacedOrderSelectedProductListItemMobile from '../../components/PlacedOrderSelectedProductListItemMobile';
import PlacedOrderSelectedProductListItem from '../../components/PlacedOrderSelectedProductListItem';

const Design = props => {
  const [isCashPaidFocus, setisCashPaidFocus] = useState(false);
  const [globleDiscountFocus, setGlobleDiscountFocus] = useState(false);
  const [globleDiscountPFocus, setGlobleDiscountPFocus] = useState(false);
  const [noOfProducts, setNoOfProducts] = useState(0);

  const renderProductItem = ({item, index}) => {
    return (
      <View style={styles.productItemContainer}>
        <ProductItem
          item={item}
          onSelectProduct={props.onSelectProduct}
          TerminalConfiguration={props.TerminalConfiguration}
          index={index}
        />
      </View>
    );
  };

  const renderTables = (item, index) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginHorizontal: sizeHelper.calWp(5),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'ProximaNova-Regular',
                fontSize: 14,
                color: AppColor.black,
              }}>
              {item?.TableCodeID ? item?.TableCodeID : ''}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: sizeHelper.calWp(10),
            }}>
            <Text
              style={{
                fontFamily: 'ProximaNova-Regular',
                fontSize: 14,
                color: AppColor.black,
              }}></Text>
          </View>
          <View
            style={{
              marginHorizontal: sizeHelper.calWp(10),
            }}>
            <Text
              style={{
                fontFamily: 'ProximaNova-Regular',
                fontSize: 14,
                color: AppColor.black,
              }}>
              ({item?.TotalCapacity ? item?.TotalCapacity : ''} Chairs)
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: sizeHelper.calWp(10),
            }}>
            <Text
              style={{
                fontFamily: 'ProximaNova-Regular',
                fontSize: 14,
                color: AppColor.black,
              }}>
              ---
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: sizeHelper.calWp(10),
            }}>
            <Text
              style={{
                fontFamily: 'ProximaNova-Regular',
                fontSize: 14,
                color: AppColor.black,
              }}>
              Free
            </Text>
          </View>
        </View>
      </>
    );
  };

  const renderSelectProduct = ({item, index}) => {
    return sizeHelper.screenWidth > 450 ? (
      <View
        style={{
          margin: sizeHelper.calWp(5),
          // backgroundColor: '#000',
        }}>
        <SelectedProductListItem
          item={item}
          TerminalConfiguration={props.TerminalConfiguration}
          onPressIncrementDecrement={props.addProductToList}
          onChangeText={props.onChangeText}
          manuallyCount={props.manuallyCount}
          onEndEditing={props.onEndEditing}
          AgentList={props.AgentList}
          setmanuallyCount={props.setmanuallyCount}
          setLoading={props.setLoading}
          index={index}
          userConfiguration={props.userConfiguration}
          noOfProducts={item.srNo}
          getAddOnProducts={props.getAddOnProducts}
          onManuallyChangePrice={props.onManuallyChangePrice}
          StringsList={props.StringsList}
          disabled={props.returnInvoiceNumber ? true : false}
          getProductsIngredients={props.getProductsIngredients}
          productAssignSaleAgent={props.productAssignSaleAgent}
          onClickIn={props.onClickIn}
          setAddProductLoader={props.setAddProductLoader}
          props={props}
        />
      </View>
    ) : (
      <View
        style={{
          margin: sizeHelper.calWp(4),
          // backgroundColor: 'green',
        }}>
        <SelectedProductListItemMobile
          item={item}
          TerminalConfiguration={props.TerminalConfiguration}
          onPressIncrementDecrement={props.addProductToList}
          onChangeText={props.onChangeText}
          manuallyCount={props.manuallyCount}
          onEndEditing={props.onEndEditing}
          AgentList={props.AgentList}
          setmanuallyCount={props.setmanuallyCount}
          setLoading={props.setLoading}
          index={index}
          userConfiguration={props.userConfiguration}
          noOfProducts={item.srNo}
          getAddOnProducts={props.getAddOnProducts}
          onManuallyChangePrice={props.onManuallyChangePrice}
          StringsList={props.StringsList}
          disabled={props.returnInvoiceNumber ? true : false}
          getProductsIngredients={props.getProductsIngredients}
          productAssignSaleAgent={props.productAssignSaleAgent}
          onClickIn={props.onClickIn}
          setAddProductLoader={props.setAddProductLoader}
          props={props}
        />
      </View>
    );
  };

  const renderSelectedOrder = ({item, index}) => {
    return sizeHelper.screenWidth > 450 ? (
      <View
        style={{
          margin: sizeHelper.calWp(5),
          // backgroundColor: '#000',
        }}>
        <PlacedOrderSelectedProductListItem
          item={item}
          TerminalConfiguration={props.TerminalConfiguration}
          onPressIncrementDecrement={props.addProductToList}
          onChangeText={props.onChangeText}
          manuallyCount={props.manuallyCount}
          onEndEditing={props.onEndEditing}
          AgentList={props.AgentList}
          setmanuallyCount={props.setmanuallyCount}
          setLoading={props.setLoading}
          index={index}
          userConfiguration={props.userConfiguration}
          noOfProducts={item.SerialNumber}
          getAddOnProducts={props.getAddOnProducts}
          onManuallyChangePrice={props.onManuallyChangePrice}
          StringsList={props.StringsList}
          disabled={props.returnInvoiceNumber ? true : false}
          getProductsIngredients={props.getProductsIngredients}
          productAssignSaleAgent={props.productAssignSaleAgent}
          onClickIn={props.onClickIn}
          setAddProductLoader={props.setAddProductLoader}
          props={props}
        />
      </View>
    ) : (
      <View
        style={{
          margin: sizeHelper.calWp(4),
          // backgroundColor: 'green',
        }}>
        <PlacedOrderSelectedProductListItemMobile
          item={item}
          TerminalConfiguration={props.TerminalConfiguration}
          onPressIncrementDecrement={props.addProductToList}
          onChangeText={props.onChangeText}
          manuallyCount={props.manuallyCount}
          onEndEditing={props.onEndEditing}
          AgentList={props.AgentList}
          setmanuallyCount={props.setmanuallyCount}
          setLoading={props.setLoading}
          index={index}
          userConfiguration={props.userConfiguration}
          noOfProducts={item.SerialNumber}
          getAddOnProducts={props.getAddOnProducts}
          onManuallyChangePrice={props.onManuallyChangePrice}
          StringsList={props.StringsList}
          disabled={props.returnInvoiceNumber ? true : false}
          getProductsIngredients={props.getProductsIngredients}
          productAssignSaleAgent={props.productAssignSaleAgent}
          onClickIn={props.onClickIn}
          setAddProductLoader={props.setAddProductLoader}
          props={props}
        />
      </View>
    );
  };

  const amountDetails = [
    {id: 'subTotal:', title: `${props.StringsList._19}:`, value: '0'},
    {id: 'VAT:', title: `${props.StringsList._180}:`, value: '0'},
    {id: 'discountP:', title: `${props.StringsList._7}:`, value: '0'},
    {id: 'discount:', title: `${props.StringsList._20}:`, value: '0'},

    {id: 'total:', title: `${props.StringsList._23}:`, value: '0'},
    {id: 'paidAmount:', title: `${props.StringsList._15}:`, value: '0'},
    // { id: 'due:', title: 'Due:', value: '0' },
  ];

  const taxDetails = [
    {id: 'productTax', title: `${props.StringsList._311}:`, value: '0'},
    {id: 'invoiceTax', title: `${props.StringsList._312}:`, value: '0'},
    {id: 'totalTax', title: `${props.StringsList._313}:`, value: '0'},
    {id: 'numberOfItems', title: `${props.StringsList._22}:`, value: '0'},

    {id: 'buyerName', title: `${props.StringsList._203}:`, value: 0},
    {id: 'buyerCode', title: `${props.StringsList._72}:`, value: 0},
    // { id: 'due:', title: 'Due:', value: '0' },
  ];

  const InoviceAmountDetails = [
    {
      id: 'subTotal',
      title: `${props.StringsList._19}:`,
      value: (
        props.subPrice -
        props.sumOfProductDiscount -
        props.sumOfProductTax
      ).toFixed(props.TerminalConfiguration.DecimalsInAmount),
    },
    {
      id: 'Tax',
      title: `${props.StringsList._13}:`,
      value: (props.globalTax + props.sumOfProductTax).toFixed(
        props.TerminalConfiguration.DecimalsInAmount,
      ),
    },
    {
      id: 'Discount',
      title: `${props.StringsList._20}:`,
      value: (props.globalDiscountAmount + props.sumOfProductDiscount).toFixed(
        props.TerminalConfiguration.DecimalsInAmount,
      ),
    },
    {
      id: 'Total',
      title: `${props.StringsList._23}:`,
      value: props.totalPrice.toFixed(
        props.TerminalConfiguration.DecimalsInAmount,
      ),
    },
  ];

  const renderHiddenItem = ({item, index}) =>
    !props.returnInvoiceNumber ? (
      <View
        style={[
          styles.hiddenItemContainer,
          {
            height: item.IsParentAddOn
              ? sizeHelper.calHp(100)
              : sizeHelper.calHp(80),
            marginHorizontal: 10,
          },
        ]}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => props.deleteItem(item, index)}>
          <Icon name="trash-o" size={20} color={AppColor.white} />
        </TouchableOpacity>
      </View>
    ) : item.IsParentAddOn && props.returnInvoiceNumber ? (
      <View
        style={[
          styles.hiddenItemContainer,
          {
            height: item.IsParentAddOn
              ? sizeHelper.calHp(100)
              : sizeHelper.calHp(80),
          },
        ]}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => props.deleteItem(item, index)}>
          <Icon name="trash-o" size={24} color={AppColor.white} />
        </TouchableOpacity>
      </View>
    ) : null;

  const amountDetailsFun = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* {taxDetails.map(item => {

            return (
              <View key={item.title} style={styles.titleValueContainer}>
                <Text
                  style={[
                    styles.titleValueStyle,

                  ]}>
                  {(item.id === 'buyerName' || item.id === 'buyerCode') && !props.buyerInfo ?
                    ""
                    : item.title}
                </Text>
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', }}>

                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center", }}

                    disabled={true}
                    onPress={() => { props.setIsGlobalTax(true) }}
                  >

                    <Text
                      style={[
                        styles.titleValueStyle,

                        {
                          //backgroundColor: "green",
                          // numberOfLines: 1,
                          // adjustsFontSizeToFit: true,

                          color:
                            ((item.id === 'buyerCode' || item.id === 'buyerName') && !props.buyerInfo)
                              ? AppColor.gray3
                              : item.id === 'paidAmount:'
                                ? AppColor.blue2
                                : AppColor.black,

                        }
                      ]}>
                      {item.id === 'productTax'
                        ? props.sumOfProductTax?.toFixed(props.TerminalConfiguration.DecimalsInAmount)
                        : item.id === 'invoiceTax'
                          ? props.globalTax?.toFixed(props.TerminalConfiguration.DecimalsInAmount)
                          : item.id === 'totalTax'
                            ? (props.globalTax + props.sumOfProductTax).toFixed(props.TerminalConfiguration.DecimalsInAmount)
                            : item.id === 'numberOfItems'
                              ? props.numberOfItems
                              : (item.id === 'buyerName' && props.buyerInfo?.BuyerName)
                                ? props.buyerInfo?.BuyerName
                                : (item.id === 'buyerCode' && props.buyerInfo?.BuyerCode)
                                  ? props.buyerInfo?.BuyerCode
                                  : item.value}
                    </Text>
                  </TouchableOpacity>


                </View>
              </View>
            );
          })} */}

        <View
          style={{
            flex: 1,
            paddingStart: sizeHelper.calWp(5),
            paddingHorizontal: sizeHelper.calWp(22),
            paddingVertical: sizeHelper.calWp(15),
            backgroundColor: AppColor.grey4,
            borderRadius: sizeHelper.calWp(15),
          }}>
          {amountDetails.map(item => {
            return (
              <View key={item.title} style={styles.titleValueContainer}>
                <Text
                  style={[
                    styles.titleValueStyle,
                    {
                      color:
                        item.id === 'discount:' || item.id === 'discountP:'
                          ? AppColor.red
                          : item.id === 'paidAmount:'
                          ? AppColor.blue2
                          : AppColor.black,
                    },
                  ]}>
                  {item.title}
                </Text>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  {item.id === 'discount:' || item.id === 'discountP:' ? (
                    <TextInput
                      keyboardType="decimal-pad"
                      onChangeText={text =>
                        props.onChangeText('globalDiscount', text, item)
                      }
                      onEndEditing={text => {
                        if (item.id === 'discount:') {
                          setGlobleDiscountFocus(false);
                          props.onEndEditing('globalDiscount', item);
                        } else if (item.id === 'discountP:') {
                          setGlobleDiscountPFocus(false);
                          props.onEndEditing('globalDiscountP', item);
                        } else {
                          setisCashPaidFocus(false);
                          props.onEndEditing('cashPaid', item);
                        }
                      }}
                      editable={
                        (item.id === 'discount:' || item.id === 'discountP:') &&
                        props?.TerminalConfiguration
                          ?.IsDiscountOnSalesInvoice === 'true' &&
                        props.selectedProducts.length > 0 &&
                        !props.isInvoice &&
                        !props.returnInvoiceNumber &&
                        props?.userConfiguration?.DiscountAllowed === 1
                      }
                      placeholderTextColor={
                        item.id === 'discount:' || item.id === 'discountP:'
                          ? AppColor.red
                          : item.id === 'paidAmount:'
                          ? AppColor.blue2
                          : AppColor.black
                      }
                      style={[
                        styles.inputField,
                        {
                          color: globleDiscountFocus
                            ? AppColor.black
                            : item.id === 'discount:' ||
                              item.id === 'discountP:'
                            ? AppColor.red
                            : item.id === 'paidAmount:'
                            ? AppColor.blue2
                            : AppColor.black,
                        },
                      ]}
                      onFocus={() => {
                        if (item.id === 'discount:') {
                          setGlobleDiscountFocus(true);
                          props.setmanuallyCount(props.globalDiscountAmount);
                        } else if (item.id === 'discountP:') {
                          setGlobleDiscountPFocus(true);
                          props.setmanuallyCount(props.globalDiscountRate);
                        } else {
                          setisCashPaidFocus(true);
                          props.setmanuallyCount(props.advancePaidInCash);
                        }
                      }}
                      value={
                        globleDiscountFocus && item.id === 'discount:'
                          ? undefined
                          : globleDiscountPFocus && item.id === 'discountP:'
                          ? undefined
                          : isCashPaidFocus && item.id === 'paidAmount:'
                          ? undefined
                          : item.id === 'discount:'
                          ? String(
                              props.globalDiscountAmount?.toFixed(
                                props.TerminalConfiguration.DecimalsInAmount,
                              ),
                            )
                          : item.id === 'discountP:'
                          ? String(
                              props.globalDiscountRate?.toFixed(
                                props.TerminalConfiguration.DecimalsInAmount,
                              ),
                            )
                          : props.advancePaidInCash
                          ? String(
                              props.advancePaidInCash?.toFixed(
                                props.TerminalConfiguration.DecimalsInAmount,
                              ),
                            )
                          : String(
                              props.totalPrice?.toFixed(
                                props.TerminalConfiguration.DecimalsInAmount,
                              ),
                            )
                      }
                      placeholder="0.00"
                    />
                  ) : (
                    <TouchableOpacity
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      disabled={
                        props.selectedProducts?.length === 0 ||
                        item.id !== 'VAT:' ||
                        props.TerminalConfiguration?.IsTaxOnSalesInvoice !==
                          'true' ||
                        props.isInvoice ||
                        props.returnInvoiceNumber
                      }
                      onPress={() => {
                        props.setIsGlobalTax(true);
                      }}>
                      {item.id === 'VAT:' && (
                        <Icon
                          name={'angle-down'}
                          size={sizeHelper.calWp(25)}
                          color={AppColor.black}
                          style={{marginEnd: sizeHelper.calWp(10)}}
                        />
                      )}
                      <Text
                        style={[
                          styles.titleValueStyle2,
                          {
                            color:
                              item.id === 'discount:' ||
                              item.id === 'discountP:'
                                ? AppColor.red
                                : item.id === 'paidAmount:'
                                ? AppColor.blue2
                                : AppColor.black,
                          },
                        ]}>
                        {item.id === 'subTotal:'
                          ? props.subPrice?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount,
                            )
                          : item.id === 'discount:'
                          ? props.globalDiscountAmount?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount,
                            )
                          : item.id === 'discountP:'
                          ? props.globalDiscountAmount?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount,
                            )
                          : item.id === 'total:'
                          ? props.totalPrice?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount,
                            )
                          : item.id === 'paidAmount:'
                          ? props.advancePaidInCash
                            ? String(
                                props.advancePaidInCash?.toFixed(
                                  props.TerminalConfiguration.DecimalsInAmount,
                                ),
                              )
                            : String(
                                props.totalPrice?.toFixed(
                                  props.TerminalConfiguration.DecimalsInAmount,
                                ),
                              )
                          : item.id === 'due:'
                          ? props.dueAmount?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount,
                            )
                          : item.id === 'VAT:'
                          ? props.globalTax?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount,
                            )
                          : item?.value}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {(item.id === 'discount:' || item.id === 'paidAmount:') && (
                    <View
                      style={[
                        styles.dashedLine,
                        {
                          borderColor:
                            item.id === 'discount:'
                              ? AppColor.red
                              : item.id === 'paidAmount:'
                              ? AppColor.blue2
                              : AppColor.black,
                        },
                      ]}>
                      <View
                        style={{
                          position: 'absolute',
                          left: 0,
                          bottom: 0,
                          width: '100%',
                          height: 1,
                          backgroundColor: AppColor.white,
                          zIndex: 1,
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  let currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
  return props.orderCode === true ? (
    <>
      <TouchableWithoutFeedback>
        <View style={styles.mainContainer}>
          <View style={{position: 'absolute', top: -400}}>{<props.QR />}</View>

          <StatusBar hidden={true} />

          <Header props={props} isSearch={false} />

          {!props.isToggle ? (
            <View>
              {props.noFamilyFound ? null : !props.isToggle ? (
                <AllCategories
                  data={props.allCategoreis}
                  focus={props.focus}
                  disabled={props.returnInvoiceNumber ? true : false}
                  onPressItem={props.getSelectedCategoryProducts}
                  flatListRef={props.flatListRef}
                  onInvoiceClick={props.onInvoiceClick}
                  invoiceNumber={
                    props.returnInvoiceNumber
                      ? props.returnInvoiceNumber
                      : props.invoiceNumber
                  }
                  children={
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        
                        <Text
                          style={{
                            fontSize: sizeHelper.calWp(20),
                            fontFamily: 'ProximaNova-Regular',
                            color: AppColor.white,
                          }}>
                          {'Table # '}
                          {props.storageItems?.TableCodeID
                            ? props.storageItems?.TableCodeID
                            : ''}
                        </Text>
                      </View>
                    </>
                  }
                />
              ) : null}

              <View style={{paddingHorizontal: sizeHelper.calWp(24)}}>
                <View
                  style={{width: '100%', height: '85%'}}
                  // style={[
                  //   styles.productListContainer,
                  //   // {
                  //   //   height:
                  //   //     sizeHelper.screenWidth < 450 && props.noFamilyFound
                  //   //       ? sizeHelper.calHp(620)
                  //   //       : sizeHelper.screenWidth < 450
                  //   //       ? sizeHelper.calHp(450)
                  //   //       : props.noFamilyFound
                  //   //       ? sizeHelper.calHp(740)
                  //   //       : sizeHelper.calHp(480),
                  //   // },
                  // ]}
                >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{
                      width: '100%',
                      height: '85%',
                      // marginBottom: 70,
                    }}
                    numColumns={sizeHelper.screenWidth > 450 ? 4 : 3}
                    nestedScrollEnabled
                    contentContainerStyle={{
                      paddingBottom: 20,
                      // marginStart: sizeHelper.calWp(-4),
                      // marginEnd: sizeHelper.calWp(-4)
                    }}
                    data={props.categoryProducts}
                    extraData={props.categoryProducts}
                    renderItem={renderProductItem}
                    keyExtractor={item => '_' + item.ProductBarCode}
                    // key={'_'}
                  />
                </View>
                {/* ) : ( */}
              </View>
            </View>
          ) : (
            <View style={{flex: 1, marginHorizontal: sizeHelper.calWp(20)}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: sizeHelper.calWp(10),
                  // paddingHorizontal: sizeHelper.calWp(40),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: sizeHelper.calHp(10),
                    alignItems: 'center',
                    // paddingHorizontal: sizeHelper.calWp(40),
                  }}>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: sizeHelper.calWp(10),
                      borderRadius: sizeHelper.calWp(5),
                      paddingVertical: sizeHelper.calWp(3),
                      backgroundColor: AppColor.blue,
                      paddingHorizontal: sizeHelper.calWp(10),
                    }}
                    onPress={() => props.toggleFun()}>
                    <Icon
                      name="angle-left"
                      size={sizeHelper.calWp(26)}
                      color="white"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled={props.orderType === 1 ? false : true}
                    style={{
                      flexDirection: 'row',

                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                    onPress={() => {
                      props.setOpenModal(true);
                    }}>
                    <Text
                      style={{
                        fontSize: sizeHelper.calWp(22),
                        fontFamily: 'ProximaNova-Regular',
                        color:
                          props.orderType === 1
                            ? AppColor.black3
                            : AppColor.backColor,
                      }}>
                      {'Table'}
                    </Text>

                    <Text
                      style={{
                        marginHorizontal: sizeHelper.calHp(10),
                        fontSize: sizeHelper.calWp(18),
                        fontFamily: 'ProximaNova-Regular',
                        color:
                          props.orderType === 1
                            ? AppColor.white
                            : AppColor.backColor,
                        backgroundColor:
                          props.orderType === 1
                            ? AppColor.green
                            : AppColor.backColor,
                        padding: sizeHelper.calHp(5),
                        paddingHorizontal: sizeHelper.calHp(10),
                        borderRadius: sizeHelper.calHp(5),
                      }}>
                      {/* {I18nManager.isRTL ? 'التصنيفات' : 'Categories'} */}
                      {props.storageItems?.TableCodeID
                        ? '#' + props.storageItems?.TableCodeID
                        : ''}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* {invoiceNumber && ( */}
                <TouchableOpacity
                  // disabled={!invoiceNumber}
                  // onPress={onInvoiceClick}
                  style={{
                    // padding: sizeHelper.calHp(10),
                    // paddingHorizontal: sizeHelper.calHp(10),
                    marginTop: sizeHelper.calHp(10),
                    alignItems: 'center',
                    marginLeft: -sizeHelper.calWp(40),
                  }}>
                  <Text
                    style={{
                      fontSize: sizeHelper.calWp(22),
                      fontFamily: 'Proxima Nova Bold',
                      color: AppColor.black,
                    }}>
                    {/* {invoiceNumber} */}
                    Order # {props.invoiceNumber}
                  </Text>
                </TouchableOpacity>
                {/* )} */}
                {/* {invoiceNumber && ( */}
                <TouchableOpacity
                  disabled={true}
                  // onPress={onInvoiceClick}
                  style={{
                    flexDirection: 'row',
                    // padding: sizeHelper.calHp(10),
                    // paddingHorizontal: sizeHelper.calHp(10),
                    alignItems: 'center',
                    marginTop: sizeHelper.calHp(10),
                  }}>
                  <Icon
                    name="user-o"
                    size={sizeHelper.calHp(25)}
                    color={
                      props.orderType === 1
                        ? AppColor.green
                        : AppColor.backColor
                    }
                  />
                  <Text
                    style={{
                      paddingTop: sizeHelper.calHp(3),
                      color:
                        props.orderType === 1
                          ? AppColor.black3
                          : AppColor.backColor,
                      paddingLeft: sizeHelper.calHp(5),
                      fontSize: sizeHelper.calWp(22),
                      fontFamily: 'ProximaNova-Regular',
                    }}>
                    {props.storageItems?.TotalCapacity
                      ? props.storageItems?.TotalCapacity
                      : ''}
                  </Text>
                </TouchableOpacity>
                {/* )} */}
              </View>
              <View
                style={[
                  styles.selectedProductListContainer,
                  {
                    flex: 4,
                  },
                ]}>
                <SwipeListView
                  showsVerticalScrollIndicator={false}
                  disableRightSwipe={I18nManager.isRTL ? false : true}
                  disableLeftSwipe={I18nManager.isRTL ? true : false}
                  data={props.selectedProducts}
                  extraData={props.selectedProducts}
                  renderItem={renderSelectProduct}
                  renderHiddenItem={(data, index, rowMap) =>
                    renderHiddenItem(data, index)
                  }
                  rightOpenValue={sizeHelper.calWp(-100)}
                  leftOpenValue={sizeHelper.calWp(100)}
                  keyExtractor={item => item.SalesBillDetailsID}
                />
              </View>
              <KeyboardAvoidingView
                behavior={
                  globleDiscountFocus || globleDiscountPFocus
                    ? 'position'
                    : 'padding'
                }
                style={styles.amountDetailsContianer}>
                {amountDetailsFun()}
              </KeyboardAvoidingView>
              {/* <KeyboardAvoidingView
              behavior={
                globleDiscountFocus || globleDiscountPFocus
                  ? 'position'
                  : 'padding'
              }> */}

              <View
                style={{
                  marginTop: sizeHelper.calWp(22),
                  paddingStart: sizeHelper.calWp(5),
                  paddingHorizontal: sizeHelper.calWp(22),
                  paddingVertical: sizeHelper.calWp(15),
                  backgroundColor: AppColor.gray,
                  borderRadius: sizeHelper.calWp(15),
                  borderWidth: 1,
                  borderColor: AppColor.gray2,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // height: sizeHelper.calHp(100),
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    <Text
                      style={{
                        // paddingTop: sizeHelper.calHp(3),
                        color: AppColor.black3,
                        paddingLeft: sizeHelper.calHp(5),
                        fontFamily: 'Proxima Nova Bold',
                        fontSize:
                          sizeHelper.screenWidth > 450
                            ? sizeHelper.calHp(22)
                            : sizeHelper.calHp(18),
                      }}>
                      Order Taker
                    </Text>
                  </View>

                  <View style={{marginLeft: 5}}>
                    <CustomPicker
                      data={props.orderTaker}
                      onSelect={(selectedItem, index) => {
                        props.setOrderTakerType(selectedItem?.SalesAgentCode);
                      }}
                      defaultButtonText={'Select Name'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem?.OrderTakerName;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item?.OrderTakerName;
                      }}
                      buttonStyle={styles.dropdownSmall}
                      buttonTextStyle={styles.dropdownBtnTxtSmall}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Icon
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={isOpened ? AppColor.black : AppColor.gray1}
                            size={sizeHelper.screenWidth > 450 ? 18 : 15}
                          />
                        );
                      }}
                      dropdownIconPosition={
                        I18nManager.isRTL ? 'left' : 'right'
                      }
                      dropdownStyle={styles.dropdownDropdownStyleSmall}
                      rowStyle={styles.dropdownRowStyleSmall}
                      rowTextStyle={styles.dropdownRowTxtStyleSmall}
                      selectedRowStyle={styles.dropdownSelectedRowStyleSmall}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    <Text
                      style={{
                        // paddingTop: sizeHelper.calHp(3),
                        color: AppColor.black3,
                        paddingLeft: sizeHelper.calHp(5),
                        fontFamily: 'Proxima Nova Bold',
                        fontSize:
                          sizeHelper.screenWidth > 450
                            ? sizeHelper.calHp(22)
                            : sizeHelper.calHp(18),
                      }}>
                      Order Type
                    </Text>
                  </View>
                  <View style={{marginLeft: 5}}>
                    <CustomPicker
                      data={props.orderItems}
                      onSelect={(selectedItem, index) => {
                        console.log(
                          'order Type is : ',
                          selectedItem.value,
                          ' && index is : ',
                          index,
                        );
                        props.setOrderType(selectedItem?.id);
                        return selectedItem?.value;
                      }}
                      defaultButtonText={'Select Type'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.value;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.value;
                      }}
                      buttonStyle={styles.dropdownSmall}
                      buttonTextStyle={styles.dropdownBtnTxtSmall}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Icon
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={isOpened ? AppColor.black : AppColor.gray1}
                            size={18}
                          />
                        );
                      }}
                      dropdownIconPosition={
                        I18nManager.isRTL ? 'left' : 'right'
                      }
                      dropdownStyle={styles.dropdownDropdownStyleSmall}
                      rowStyle={styles.dropdownRowStyleSmall}
                      rowTextStyle={styles.dropdownRowTxtStyleSmall}
                      selectedRowStyle={styles.dropdownSelectedRowStyleSmall}
                    />
                  </View>
                </View>
              </View>
              {/* </KeyboardAvoidingView> */}
              {props.orderType !== 1 ? (
                <>
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                      }}>
                      <View style={styles.swipeContainer}>
                        <SwipeButton
                          containerStyles={styles.swipeButtonContainer}
                          disableResetOnTap
                          width={'100%'}
                          height={sizeHelper.calHp(60)}
                          // disabled={}
                          disabledRailBackgroundColor={AppColor.gray2}
                          disabledThumbIconBackgroundColor={'#fff'}
                          disabledThumbIconBorderColor={AppColor.gray2}
                          railBackgroundColor={AppColor.blue1}
                          railFillBackgroundColor={AppColor.blue1}
                          railBorderColor={AppColor.blue1}
                          thumbIconStyles={{
                            borderRadius: 5,
                            borderColor: AppColor.blue1,
                          }}
                          enableReverseSwipe={false}
                          railFillBorderColor={AppColor.white}
                          railStyles={{
                            borderRadius: 5,
                            borderColor: AppColor.blue1,
                          }}
                          // resetAfterSuccessAnimDelay={300}
                          // resetAfterSuccessAnimDuration={300}
                          shouldResetAfterSuccess={false}
                          thumbIconBackgroundColor={AppColor.blue1}
                          thumbIconBorderColor={AppColor.blue1}
                          thumbIconComponent={props.TakeAwayOrder}
                          titleFontSize={12}
                          thumbIconWidth={sizeHelper.calWp(170)}
                          onSwipeSuccess={()=>{props.setPaymentView(true);console.log("setPaymentView 1");
                          }}
                          onSwipeFail={() => console.log('Swipe fail')}
                          onSwipeStart={() => console.log('Swipe start---1')}
                          swipeSuccessThreshold={100}
                        />
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                      }}>
                      <View style={styles.swipeContainer}>
                        <SwipeButton
                          containerStyles={styles.swipeButtonContainer}
                          disableResetOnTap
                          width={'100%'}
                          height={sizeHelper.calHp(60)}
                          disabled={
                            props.storageItems?.TableCodeID === undefined
                              ? true
                              : false
                          }
                          disabledRailBackgroundColor={AppColor.gray2}
                          disabledThumbIconBackgroundColor={'#fff'}
                          disabledThumbIconBorderColor={AppColor.gray2}
                          railBackgroundColor={AppColor.blue1}
                          railFillBackgroundColor={AppColor.blue1}
                          railBorderColor={
                            props.storageItems?.TableCodeID === undefined
                              ? AppColor.gray2
                              : AppColor.blue1
                          }
                          thumbIconStyles={{
                            borderRadius: 5,
                            borderColor: AppColor.blue1,
                          }}
                          enableReverseSwipe={false}
                          railFillBorderColor={AppColor.white}
                          railStyles={{
                            borderRadius: 5,
                            borderColor: AppColor.blue1,
                          }}
                          // resetAfterSuccessAnimDelay={300}
                          // resetAfterSuccessAnimDuration={300}
                          shouldResetAfterSuccess={false}
                          thumbIconBackgroundColor={
                            props.isdisabled === false
                              ? AppColor.blue1
                              : AppColor.gray
                          }
                          thumbIconBorderColor={
                            props.isdisabled === false
                              ? AppColor.blue1
                              : AppColor.gray
                          }
                          thumbIconComponent={props.DineInOrder}
                          titleFontSize={12}
                          thumbIconWidth={sizeHelper.calWp(170)}
                          onSwipeSuccess={() => props.setPaymentView(true)}
                          onSwipeFail={() => console.log('Swipe fail')}
                          onSwipeStart={() => console.log('Swipe start---2')}
                          swipeSuccessThreshold={100}
                        />
                      </View>
                    </View>
                  </View>
                </>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginBottom: sizeHelper.calHp(20),
                  marginHorizontal:
                    sizeHelper.screenWidth > 450
                      ? sizeHelper.calWp(10)
                      : sizeHelper.calWp(10),
                }}>
                <View style={{zIndex: 0, alignItems: 'center'}}>
                  <CustomButton
                    containerStyle={[
                      styles.buttonStyle,
                      {backgroundColor: AppColor.blue1},
                    ]}
                    title={'Notes'}
                    backgroundColor={
                      props.invoiceNumber ? AppColor.blue : AppColor.blue2
                    }
                    onPressButton={props.onOpenModal}
                    leftIcon={
                      <Icon
                        name="clipboard"
                        size={sizeHelper.calHp(30)}
                        color={AppColor.white}
                      />
                    }
                  />
                </View>

                <View style={{zIndex: 0, alignItems: 'center'}}>
                  <CustomButton
                    containerStyle={[
                      styles.buttonStyle,
                      {backgroundColor: AppColor.red1},
                    ]}
                    title={'Hold'}
                    backgroundColor={
                      props.invoiceNumber
                        ? AppColor.yellowColor
                        : AppColor.blue2
                    }
                    onPressButton={() => props.setisHoldInvoices(true)}
                  />
                </View>

                <View style={{zIndex: 0, alignItems: 'center'}}>
                  <CustomButton
                    containerStyle={[
                      styles.buttonStyle,
                      {backgroundColor: AppColor.red1},
                    ]}
                    title={'Cancel'}
                    backgroundColor={
                      props.invoiceNumber ? AppColor.red1 : AppColor.blue2
                    }
                    onPressButton={props.onClickCancel}
                  />
                </View>
              </View>
              {sizeHelper.screenWidth > 450 ? (
              <View style={styles.buttonsContainer}>
                <View style={{zIndex: 0,}}>
                  <CustomButton
                    containerStyle={styles.buttonStyle} //new
                    title={props.StringsList._4}
                    onPressButton={props.onNewInvoice}
                    isDisabled={props.invoiceNumber}
                    backgroundColor={AppColor.blue2}
                  />
                </View>
                <CustomDropDown
                  dropDownWidth={sizeHelper.calWp(166.66)} //option
                  dropDownHeight={sizeHelper.calWp(20)}
                  items={props.options}
                  setItems={props.setOptions}
                  placeholderTitle={props.StringsList._309}
                  setValue={props.setOptionsValue}
                  value={props.optionsValue}
                  disabled={props.returnInvoiceNumber}
                  onChangeValue={props.onChangeText}
                  open={props.optionsOpen}
                  setOpen={props.setoptionsOpen}
                />
                {props.returnInvoiceNumber ? (
                  <View style={{zIndex: 0}}>
                    <CustomButton
                      containerStyle={[
                        styles.buttonStyle,
                        {backgroundColor: AppColor.red1},
                      ]}
                      title={props.StringsList._153}
                      backgroundColor={AppColor.blue2}
                      onPressButton={() => {
                        props.setPaymentsValue('1');
                      }}
                    />
                  </View>
                ) : (
                  <CustomDropDown
                    dropDownWidth={sizeHelper.calWp(166.66)} //payments
                    dropDownHeight={sizeHelper.calWp(46)}
                    items={props.payments}
                    setItems={props.setPayments}
                    placeholderTitle={props.StringsList._435}
                    setValue={props.setPaymentsValue}
                    value={props.paymentsValue}
                    disabled={true
                      // props.selectedProducts.length < 1
                    }
                    open={props.paymentsOpen}
                    setOpen={props.setPaymentsOpen}
                  />
                )}
                {/* <View style={{zIndex: 0}}>
                  <CustomButton
                    containerStyle={[
                      styles.buttonStyle,
                      {backgroundColor: AppColor.red1},
                    ]}
                    title={
                      props.invoiceNumber
                        ? props.StringsList._2
                        : props.StringsList._438
                    }
                    backgroundColor={
                      props.invoiceNumber ? AppColor.red1 : AppColor.blue2
                    }
                    onPressButton={props.onClickCancel}
                  />
                </View> */}
              </View>
            ) : (
              <View style={styles.buttonsContainerV2}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft:sizeHelper.calWp(30)
                  }}>
                  <CustomDropDown
                    dropDownWidth={sizeHelper.calWp(310)} //option
                    dropDownHeight={sizeHelper.calWp(100)}
                    items={props.options}
                    setItems={props.setOptions}
                    placeholderTitle={props.StringsList._309}
                    setValue={props.setOptionsValue}
                    value={props.optionsValue}
                    disabled={props.returnInvoiceNumber}
                    onChangeValue={props.onChangeText}
                    open={props.optionsOpen}
                    setOpen={props.setoptionsOpen}
                  />
                  <View style={{zIndex: 0}}>
                    <CustomButton
                      containerStyle={[
                        styles.buttonStyle,
                        {
                          width: sizeHelper.calWp(310),
                          marginTop: sizeHelper.calHp(10),
                        },
                      ]} //new
                      title={props.StringsList._4}
                      onPressButton={props.onNewInvoice}
                      isDisabled={props.invoiceNumber}
                      backgroundColor={AppColor.blue2}
                    />
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft:sizeHelper.calWp(30)
                  }}>
                  {props.returnInvoiceNumber ? (
                    <View style={{zIndex: 0}}>
                      <CustomButton
                        containerStyle={[
                          styles.buttonStyle,
                          {
                            backgroundColor: AppColor.red1,
                            width: sizeHelper.calWp(310),
                          },
                        ]}
                        title={props.StringsList._153}
                        backgroundColor={AppColor.blue2}
                        onPressButton={() => {
                          props.setPaymentsValue('1');
                        }}
                      />
                    </View>
                  ) : (
                    <CustomDropDown
                      dropDownWidth={sizeHelper.calWp(310)} //payments
                      dropDownHeight={sizeHelper.calHp(75)}
                      items={props.payments}
                      setItems={props.setPayments}
                      placeholderTitle={props.StringsList._435}
                      setValue={props.setPaymentsValue}
                      value={props.paymentsValue}
                      disabled={//props.selectedProducts.length < 1
                      
                      true}
                      open={props.paymentsOpen}
                      setOpen={props.setPaymentsOpen}
                    />
                  )}

                  <View style={{zIndex: 0}}>
                    <CustomButton //cancel
                      containerStyle={[
                        styles.buttonStyle,
                        {
                          backgroundColor: AppColor.red1,
                          width: sizeHelper.calWp(310),
                          marginTop: sizeHelper.calHp(20),
                          
                        },
                      ]}
                      title={
                        props.invoiceNumber
                          ? props.StringsList._2
                          : props.StringsList._438
                      }
                      backgroundColor={
                        props.invoiceNumber ? AppColor.red1 : AppColor.blue2
                      }
                      onPressButton={props.onClickCancel}
                    />
                  </View>
                </View>
              </View>
            )}
            </View>
          )}
          {props.isDrawar && (
            <View style={styles.popupContainer}>
              <DrawerPopUp
                StringsList={props.StringsList}
                userConfiguration={props.userConfiguration}
                TerminalConfiguration={props.TerminalConfiguration}
                cancel={() => {
                  props.drawerRef.current?.fadeOutRight().then(() => {
                    props.setIsDrawar(!props.isDrawar);
                    props.getDrawerSetting();
                  });
                }}
                viewref={props.drawerRef}
              />
            </View>
          )}
          {props.isIngredient && (
            <View style={[styles.popupContainer]}>
              <IngredientsList
                onPressCancel={() => props.setIsIngredient(false)}
                reacallFunc={props.onSelectIngredintes}
                data={
                  props.isIngredientSearch
                    ? props.searchIngredient
                    : props.ingredientsData
                }
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                onPressAddIntgredient={props.onPressAddIntgredient}
                onChangeText={props.searchIngredientFun}
                isGlobal
              />
            </View>
          )}

          {props.isPopup && (
            <View style={styles.popupContainer}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <CreditInfoPopUP
                  StringsList={props.StringsList}
                  cancel={props.paymentMethodSelect}
                  viewref={props.viewref}
                  totalPrice={props.totalPrice}
                  isCredit={props.paymentsValue === '2'}
                  cashPaidAmountFun={props.cashPaidAmountFun}
                  buyerInfo={props.buyerInfo}
                />
              </KeyboardAvoidingView>
            </View>
          )}
          {props.isBuyer && (
            <View style={styles.popupContainer}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <AddSearchBuyer
                StringsList={props.StringsList}
                cancel={props.otherOptions}
                buyerViewRef={props.buyerViewRef}
                loyaltyList={props.loyaltyList}
                setBuyerInfo={props.setBuyerInfo}
                buyerInfo={props.buyerInfo}
                TerminalConfiguration={props.TerminalConfiguration}
                props={props}
              />
                
              </KeyboardAvoidingView>
            </View>
            
          )}{console.log("Props is 1----->",props)}
          {props.isLoyaltyCard && (
            <View style={styles.popupContainer}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <LoyaltyCard
                  StringsList={props.StringsList}
                  cancel={props.otherOptions}
                  loyaltyCardViewRef={props.loyaltyCardViewRef}
                  setRedeemPoints={props.setRedeemPoints}
                  redeemPoints={props.redeemPoints}
                  buyerInfo={props.buyerInfo}
                />
              </KeyboardAvoidingView>
            </View>
          )}
          
          {props.isInvoice && (
            <View style={styles.popupContainer}>
              <View style={styles.invoiceContainer}>
                <SafeAreaView style={{flex: 1}}>
                  <ScrollView
                    overScrollMode={'never'}
                    contentContainerStyle={{flexGrow: 1, zIndex: 9999999}}
                    style={{
                      flexGrow: 1,

                      paddingVertical: 2,
                    }}
                    showsVerticalScrollIndicator={false}>
                    <View style={{flex: 1}}>
                      <ViewShot
                        style={styles.viewShotStyle}
                        ref={props.qrRef2}
                        onCapture={props.onQRImage}
                        // ref={props.viewShotRef}
                        // onCapture={props.onCapture}

                        captureMode="mount">
                        <View>
                          {!!props?.TerminalConfiguration?.CompanyLogo && (
                            <Image
                              source={{
                                uri:
                                  props?.TerminalConfiguration
                                    ?.CompanyLogoType +
                                  ',' +
                                  props?.TerminalConfiguration?.CompanyLogo,
                              }}
                              style={{
                                //   backgroundColor: "green",
                                height: sizeHelper.calHp(150),
                                width: sizeHelper.calWp(155),
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                alignItems: 'center',
                              }}
                            />
                          )}
                          {!props.companyVATRegistor ? (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(35),
                                  alignSelf: 'center',
                                },
                              ]}>
                               Ordinary sales invoice
                            </Text>
                          ) : props.totalPrice < 1000 ? (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(35),
                                  alignSelf: 'center',
                                },
                              ]}>
                              Simplified tax invoice
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(35),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {I18nManager.isRTL
                                ? 'فاتورة ضريبية'
                                : 'Tax invoice'}
                            </Text>
                          )}

                          {!!props.TerminalConfiguration?.Heading1 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.TerminalConfiguration.Heading1}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Heading2 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.TerminalConfiguration.Heading2}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Heading3 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.TerminalConfiguration.Heading3}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Heading4 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.TerminalConfiguration.Heading4}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.CompanyName && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 10,
                                  fontSize: sizeHelper.calHp(35),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.TerminalConfiguration.CompanyName}
                            </Text>
                          )}

                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                letterSpacing: 2,
                                fontSize: sizeHelper.calHp(35),
                                alignSelf: 'center',
                              },
                            ]}>
                            {currentDate}
                          </Text>

                          <View style={styles.divider} />
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: sizeHelper.calHp(5),
                                alignSelf: 'flex-start',
                              },
                            ]}>
                            {props.terminalSetup?.StartFrom}
                          </Text>

                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                alignSelf: 'center',
                                fontSize: sizeHelper.calHp(35),
                              },
                            ]}>
                            {props.StringsList._180}
                            {' : '}
                            {props.TerminalConfiguration?.ValueAddedTaxNumber}
                          </Text>

                          <Barcode
                          format="CODE128"
                          value={props.returnInvoiceNumber ? props.returnInvoiceNumber : props.invoiceNumber}
                          text={props.returnInvoiceNumber ? props.returnInvoiceNumber : props.invoiceNumber}
                          style={{ marginBottom: 20 }}
                          maxWidth={Dimensions.get('window').width / 2}
                          height={50}
                          textStyle={[styles.invoiceHeaderText, { letterSpacing: 18, fontSize: sizeHelper.calHp(20), alignSelf: "center" }]}

                        />
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 20,
                                letterSpacing: 8,
                                fontSize: sizeHelper.calHp(40),
                                alignSelf: 'center',
                              },
                            ]}>
                            {props.returnInvoiceNumber
                              ? props.returnInvoiceNumber
                              : props.invoiceNumber}
                          </Text>
                          {props.returnInvoiceNumber && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 20,
                                  letterSpacing: 8,
                                  fontSize: sizeHelper.calHp(40),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.invoiceNumber}
                            </Text>
                          )}
                          {props.TerminalConfiguration.DefaultPrintStyle ==
                            2 && (
                            <View style={styles.invoiceHeader}>
                              <View style={{width: '40%'}}>
                                <Text style={styles.invoiceHeaderText}>
                                  {props.StringsList._76}
                                </Text>
                              </View>
                              <View style={{width: '20%'}}>
                                <Text
                                  style={[
                                    styles.invoiceHeaderText,
                                    {alignSelf: 'flex-start'},
                                  ]}>
                                  {props.StringsList._98}
                                </Text>
                              </View>
                              <View style={{width: '15%'}}>
                                <Text
                                  style={[
                                    styles.invoiceHeaderText,
                                    {alignSelf: 'center'},
                                  ]}>
                                  {I18nManager.isRTL
                                    ? props.StringsList._177
                                    : 'QTY'}
                                </Text>
                              </View>
                              <View style={{width: '25%'}}>
                                <Text
                                  style={[
                                    styles.invoiceHeaderText,
                                    {alignSelf: 'flex-end'},
                                  ]}>
                                  {props.StringsList._366}
                                </Text>
                              </View>
                            </View>
                          )}
                          <View
                            style={[
                              styles.divider,
                              {marginBottom: sizeHelper.calHp(15)},
                            ]}
                          />
                          {props.selectedProducts.map((item, index) => {
                            return props.TerminalConfiguration
                              .DefaultPrintStyle != 2 ? (
                              <View
                                id={index + item}
                                style={styles.invoiceListContainer}>
                                <View style={{width: '40%'}}>
                                  <Text style={[styles.titleValueStyle]}>
                                    {I18nManager.isRTL
                                      ? item.ProductName2
                                      : item.ProductName}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {fontSize: sizeHelper.calHp(20)},
                                    ]}>
                                    {item.IngredientNames}
                                  </Text>
                                </View>
                                <View style={{width: '20%'}}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {alignSelf: 'flex-start'},
                                    ]}>
                                    {item.PriceWithOutTax}
                                  </Text>
                                </View>
                                <View style={{width: '15%'}}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {alignSelf: 'center'},
                                    ]}>
                                    {item.IsParentAddOn
                                      ? item.Quantity
                                      : item.Quantity * item.OrignalQuantity}
                                  </Text>
                                </View>
                                <View style={{width: '25%'}}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {alignSelf: 'flex-end'},
                                    ]}>
                                    {item.FreeProduct
                                      ? '0.00'
                                      : item.PriceOriginal.toFixed(
                                          props.TerminalConfiguration
                                            .DecimalsInAmount,
                                        )}
                                  </Text>
                                </View>
                              </View>
                            ) : (
                              <View
                                id={index + item}
                                style={styles.invoiceListContainer}>
                                <View style={{width: '65%'}}>
                                  <Text style={[styles.titleValueStyle]}>
                                    {I18nManager.isRTL
                                      ? item.ProductName2
                                      : item.ProductName}
                                    {item?.UOMFragment !== 0 &&
                                      (I18nManager.isRTL
                                        ? ' - ' + item.UOMName2
                                        : ' - ' + item.UOMName)}
                                  </Text>
                                  <Text style={styles.titleValueStyle}>
                                    {'@ ' + item.PriceWithOutTax + ' X '}
                                    {item.IsParentAddOn
                                      ? item.Quantity
                                      : item.Quantity * item.OrignalQuantity}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {fontSize: sizeHelper.calHp(20)},
                                    ]}>
                                    {item.IngredientNames}
                                  </Text>
                                </View>

                                <View style={{width: '35%'}}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {alignSelf: 'flex-end'},
                                    ]}>
                                    {item.FreeProduct
                                      ? '0.00'
                                      : item.PriceOriginal.toFixed(
                                          props.TerminalConfiguration
                                            .DecimalsInAmount,
                                        )}
                                  </Text>
                                </View>
                              </View>
                            );
                          })}
                          <View style={styles.divider} />

                          {InoviceAmountDetails.map((item, index) => {
                            return (
                              <View
                                style={{
                                  width: '100%',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={
                                    item.id === 'Total'
                                      ? styles.invoiceHeaderText
                                      : styles.titleValueStyle
                                  }>
                                  {item.title}
                                </Text>
                                <Text
                                  style={
                                    item.id === 'Total'
                                      ? styles.invoiceHeaderText
                                      : styles.titleValueStyle
                                  }>
                                  {item.value}
                                </Text>
                              </View>
                            );
                          })}
                          <View style={styles.divider} />
                          <View style={styles.invoiceHeader}>
                            <View>
                              <Text style={styles.invoiceHeaderText}>
                                {props.StringsList._174}
                              </Text>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {fontFamily: 'Proxima Nova Regular'},
                                ]}>
                                {I18nManager.isRTL
                                  ? props.selectedPyamentMethod
                                      ?.PaymentTypeName2
                                  : props.selectedPyamentMethod
                                      ?.PaymentTypeName}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {alignSelf: 'center'},
                                ]}>
                                {props.StringsList._171}
                              </Text>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {
                                    alignSelf: 'center',
                                    fontFamily: 'Proxima Nova Regular',
                                  },
                                ]}>
                                {props.selectedAgent?.SalesAgentName
                                  ? props.selectedAgent?.SalesAgentName
                                  : props.TerminalConfiguration?.SalesAgentName}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {alignSelf: 'center'},
                                ]}>
                                {props.StringsList._172}
                              </Text>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {
                                    alignSelf: 'center',
                                    fontFamily: 'Proxima Nova Regular',
                                  },
                                ]}>
                                {props.TerminalConfiguration?.TerminalCode}
                              </Text>
                            </View>
                          </View>
                          {!!props.buyerInfo && (
                            <View>
                              <View style={styles.divider} />
                              <Text style={styles.invoiceHeaderText}>
                                {props.StringsList._77 + ':-'}
                              </Text>
                              <View style={styles.invoiceHeader}>
                                {!!props.buyerInfo?.BuyerName && (
                                  <View>
                                    <Text style={styles.invoiceHeaderText}>
                                      {props.StringsList._76}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.invoiceHeaderText,
                                        {fontFamily: 'Proxima Nova Regular'},
                                      ]}>
                                      {props.buyerInfo?.BuyerName}
                                    </Text>
                                  </View>
                                )}
                                {!!props.buyerInfo?.BuyerCode && (
                                  <View>
                                    <Text style={[styles.invoiceHeaderText]}>
                                      {props.StringsList._141}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.invoiceHeaderText,
                                        {fontFamily: 'Proxima Nova Regular'},
                                      ]}>
                                      {props.buyerInfo?.BuyerCode}
                                    </Text>
                                  </View>
                                )}
                                {!!props.buyerInfo?.PrimaryPhone && (
                                  <View>
                                    <Text style={[styles.invoiceHeaderText]}>
                                      {props.StringsList._138}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.invoiceHeaderText,
                                        {fontFamily: 'Proxima Nova Regular'},
                                      ]}>
                                      {props.buyerInfo?.PrimaryPhone}
                                    </Text>
                                  </View>
                                )}
                              </View>

                              <View style={styles.invoiceHeader}>
                                {!!props.buyerInfo?.ValueAddedTaxNumber && (
                                  <View style={{width: '41%'}}>
                                    <Text style={styles.invoiceHeaderText}>
                                      {props.StringsList._140}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.invoiceHeaderText,
                                        {fontFamily: 'Proxima Nova Regular'},
                                      ]}>
                                      {props.buyerInfo?.ValueAddedTaxNumber}
                                    </Text>
                                  </View>
                                )}
                                {!!props.buyerInfo?.CCRNumber && (
                                  <View style={{width: '72%'}}>
                                    <Text style={[styles.invoiceHeaderText]}>
                                      {props.StringsList._139}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.invoiceHeaderText,
                                        {fontFamily: 'Proxima Nova Regular'},
                                      ]}>
                                      {props.buyerInfo?.CCRNumber}
                                    </Text>
                                  </View>
                                )}
                              </View>
                              {!!props.buyerInfo?.BuyerAddress && (
                                <View>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.StringsList._383}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.invoiceHeaderText,
                                      {fontFamily: 'Proxima Nova Regular'},
                                    ]}>
                                    {props.buyerInfo?.BuyerAddress}
                                  </Text>
                                </View>
                              )}
                            </View>
                          )}

                          <View style={styles.divider} />
                          {!!props.TerminalConfiguration?.Footer1 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                },
                              ]}>
                              {props.TerminalConfiguration.Footer1}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Footer2 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                },
                              ]}>
                              {props.TerminalConfiguration.Footer2}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Footer3 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                },
                              ]}>
                              {props.TerminalConfiguration.Footer3}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Footer4 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                },
                              ]}>
                              {props.TerminalConfiguration.Footer4}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.CompanyAddress && (
                            <Text style={styles.invoiceHeaderText}>
                              {props.TerminalConfiguration.CompanyAddress}
                            </Text>
                          )}
                        </View>
                        <View
                          style={{
                            alignSelf: 'center',
                            marginVertical: sizeHelper.calHp(30),
                            marginBottom: sizeHelper.calHp(50),
                          }}>
                          {<props.QR />}
                        </View>
                      </ViewShot>
                    </View>
                  </ScrollView>
                </SafeAreaView>
                <View style={styles.invoiceButtonContainer}>
                  <CustomButton
                    containerStyle={styles.invoiceButtonStyle}
                    title={I18nManager.isRTL ? 'لقطة شاشة' : 'Screenshot'}
                    backgroundColor={AppColor.blue2}
                    onPressButton={() => props.onSaveInvoice('save')}
                  />
                  <CustomButton
                    containerStyle={[
                      styles.invoiceButtonStyle,
                      {
                        marginEnd: sizeHelper.calHp(0),
                        backgroundColor: AppColor.red1,
                      },
                    ]}
                    title={props.StringsList._2}
                    backgroundColor={AppColor.red1}
                    onPressButton={props.onSaveInvoice}
                  />
                </View>
              </View>
            </View>
          )}

          {props.isTerminalSetup && (
            <View style={styles.popupContainer}>
              <TerminalSetup
                onPressCancel={() => props.setTerminalSetup(false)}
              />
            </View>
          )}
          {props.isPairPrinterFamily && (
            <View style={styles.popupContainer}>
              <PairPrinterFamily
                onPressCancel={() => props.setPairPrinterFamily(false)}
              />
            </View>
          )}

          {props.isHoldInvoices && (
            <View style={styles.popupContainer}>
              <HoldInvoices
                onPressCancel={() => props.setisHoldInvoices(false)}
                reacallFunc={props.getHoldInvoiveFun}
                deleteHoldedInvoice={props.deleteHoldedInvoice}
              />
            </View>
          )}

          <AlertModel
            displayAlert={props.displayAlert}
            onAlertShow={props.setDisplayAlert}
            setisPromptAlert={props.setisPromptAlert}
            isPromptAlert={props.isPromptAlert}
            message={props.message}
            value={props.alertValue}
            onChangeText={props.onChangeText}
            reacallFunc={props.reacallFunc}
            placeholderText={props.message}
            type={props.alertType}
          />
          {props.isScanner && (
            <View style={styles.popupContainer}>
              <QRCodeScannerScreen
                closeScanner={() => {
                  props.setScanner(false);
                }}
                onSuccess={props.onSuccessScan}
              />
            </View>
          )}
          {props.isReturnInvoice && (
            <View style={[styles.popupContainer]}>
              <ReturnInvoice
                onPressCancel={() => props.setisReturnInvoice(false)}
                reacallFunc={props.checkReturnProductAddons}
                data={props.retunProducts}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                selectedAllProducts={props.selectedAllProducts}
              />
            </View>
          )}
          {props.isAddon && (
            <View style={[styles.popupContainer]}>
              <AddonsList
                onPressCancel={() => props.setisAddon(false)}
                reacallFunc={props.addProductToList}
                data={props.retunProducts}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                isAddon
              />
            </View>
          )}
          {props.isGlobalTax && (
            <View style={[styles.popupContainer]}>
              <GlobalTaxList
                onPressCancel={() => props.setIsGlobalTax(false)}
                reacallFunc={props.globalTaxFun}
                data={props.globalTaxList}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                isGlobal
              />
            </View>
          )}
          <>
            <CustomModal
              title={I18nManager.isRTL ? 'طلب جديد' : 'New order'}
              displayModal={props.openModal}
              onModalShow={props.setOpenModal}
              setisPromptModal={() => {}}
              isPromptModal={false}
              // value={''}
              // onChangeText={() => {}}
              // reacallFunc={() => {}}
              // type={''}
              children={
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Proxima Nova Bold',
                          fontSize:
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calHp(22)
                              : sizeHelper.calHp(14),
                          paddingBottom: sizeHelper.calHp(5),
                          color: AppColor.black,
                          textAlign: 'left',
                        }}>
                        {I18nManager.isRTL ? 'زائر' : 'Guests'}
                      </Text>
                      <View
                        style={{
                          alignItems: 'center',
                          marginRight: sizeHelper.calHp(5),
                        }}>
                        <CustomPicker // Guest Picker
                          disableAutoScroll={true}
                          data={props.guestItem}
                          onSelect={(selectedItem, index) => {
                            console.log(index, selectedItem);
                          }}
                          defaultButtonText={
                            I18nManager.isRTL ? 'حدد الضيوف' : 'Select Guests'
                          }
                          buttonTextAfterSelection={(selectedItem, index) => {
                            props.setSelectedGuest(selectedItem);

                            return selectedItem;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                          buttonStyle={styles.dropdown1BtnStyle}
                          buttonTextStyle={styles.dropdown1BtnTxtStyle}
                          renderDropdownIcon={isOpened => {
                            return (
                              <Icon
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={
                                  isOpened ? AppColor.black : AppColor.gray1
                                }
                                size={18}
                              />
                            );
                          }}
                          dropdownIconPosition={
                            I18nManager.isRTL ? 'left' : 'right'
                          }
                          dropdownStyle={styles.dropdown1DropdownStyle}
                          rowStyle={styles.dropdown1RowStyle}
                          rowTextStyle={styles.dropdown1RowTxtStyle}
                          selectedRowStyle={styles.dropdown1SelectedRowStyle}
                        />
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          paddingBottom: sizeHelper.calHp(5),
                          fontFamily: 'Proxima Nova Bold',
                          fontSize:
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calHp(22)
                              : sizeHelper.calHp(14),
                          color: AppColor.black,
                        }}>
                        {I18nManager.isRTL ? 'منطقة' : 'Area'}
                      </Text>
                      <View
                        style={{
                          alignItems: 'center',
                        }}>
                        <CustomPicker // Area Picker
                          disableAutoScroll={true}
                          data={props.areaItem}
                          onSelect={props.onSelect}
                          defaultButtonText={
                            I18nManager.isRTL ? 'حدد المنطقة' : 'Select Area'
                          }
                          buttonTextAfterSelection={(selectedItem, index) => {
                            props.setSelectedArea(selectedItem);
                            console.log('selectedArea', props.selectedArea);

                            return selectedItem;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                          buttonStyle={styles.dropdown2BtnStyle}
                          buttonTextStyle={styles.dropdown2BtnTxtStyle}
                          renderDropdownIcon={isOpened => {
                            return (
                              <Icon
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={
                                  isOpened ? AppColor.black : AppColor.gray1
                                }
                                size={18}
                              />
                            );
                          }}
                          dropdownIconPosition={
                            I18nManager.isRTL ? 'left' : 'right'
                          }
                          dropdownStyle={styles.dropdown2DropdownStyle}
                          rowStyle={styles.dropdown2RowStyle}
                          rowTextStyle={styles.dropdown2RowTxtStyle}
                          selectedRowStyle={styles.dropdown2SelectedRowStyle}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{marginVertical: sizeHelper.calHp(15)}}>
                    {props.tableItem.length > 0 ? (
                      <CustomPicker // Tables Picker
                        disableAutoScroll={true}
                        data={props.tableItem}
                        onSelect={props.onSelectTable}
                        defaultButtonText={
                          I18nManager.isRTL ? 'حدد الجدول' : 'Select Table'
                        }
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return (
                            <>
                              <View style={{flexDirection: 'row'}}>
                                <View>
                                  <Text
                                    style={{
                                      fontFamily: 'Proxima Nova Bold',
                                      fontSize: sizeHelper.calHp(16),
                                      color: AppColor.black,
                                    }}>
                                    {I18nManager.isRTL
                                      ? 'معرف الجدول المحدد'
                                      : 'Selected Table ID'}{' '}
                                    :{' '}
                                  </Text>
                                </View>
                                <View>
                                  <Text
                                    style={{
                                      fontFamily: 'Proxima Nova Bold',
                                      fontSize: sizeHelper.calHp(16),
                                      color: AppColor.black,
                                    }}>
                                    {selectedItem.TableCodeID
                                      ? selectedItem.TableCodeID
                                      : ''}{' '}
                                  </Text>
                                </View>
                                <View>
                                  <Text
                                    style={{
                                      fontFamily: 'Proxima Nova Bold',
                                      fontSize: sizeHelper.calHp(16),
                                      color: AppColor.black,
                                    }}>
                                    {I18nManager.isRTL
                                      ? 'سعة الجلوس'
                                      : 'Sitting Capicity'}
                                    :{' '}
                                    {selectedItem.TotalCapacity
                                      ? selectedItem.TotalCapacity
                                      : ''}
                                  </Text>
                                </View>
                              </View>
                            </>
                          );
                        }}
                        rowTextForSelection={renderTables}
                        buttonStyle={styles.dropdown3BtnStyle}
                        buttonTextStyle={styles.dropdown3BtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                          return (
                            <Icon
                              name={isOpened ? 'chevron-up' : 'chevron-down'}
                              color={isOpened ? AppColor.black : AppColor.gray1}
                              size={18}
                            />
                          );
                        }}
                        dropdownIconPosition={
                          I18nManager.isRTL ? 'left' : 'right'
                        }
                        dropdownStyle={styles.dropdown3DropdownStyle}
                        rowStyle={styles.dropdown3RowStyle}
                        rowTextStyle={styles.dropdown3RowTxtStyle}
                        selectedRowStyle={styles.dropdown3SelectedRowStyle}
                      />
                    ) : (
                      <View
                        style={[
                          styles.dropdown3BtnStyle,
                          {alignItems: 'center', justifyContent: 'center'},
                        ]}>
                        <Text style={{textAlign: 'center'}}>
                          No Data Available
                        </Text>
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      width: '100%',
                      alignItems: 'center',
                      // height: 40,
                      paddingVertical: 5,
                      backgroundColor: AppColor.backColor,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 8,
                      }}>
                      <CustomButton
                        containerStyle={{
                          height: sizeHelper.calWp(45),
                          width: sizeHelper.calWp(120),
                          //   marginTop: sizeHelper.calHp(25),
                        }}
                        // isDisabled={isPromptModal && !value}
                        title={I18nManager.isRTL ? 'موافق' : 'Cancel'}
                        backgroundColor={AppColor.red}
                        titleColor={AppColor.white}
                        onPressButton={() => {
                          props.setOpenModal(false);
                        }}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 5,
                      }}>
                      <CustomButton
                        containerStyle={{
                          height: sizeHelper.calWp(45),
                          width: sizeHelper.calWp(120),
                          //   marginTop: sizeHelper.calHp(25),
                        }}
                        // isDisabled={isPromptModal && !value}
                        title={I18nManager.isRTL ? 'يحفظ' : 'Save'}
                        backgroundColor={AppColor.blue2}
                        titleColor={AppColor.white}
                        onPressButton={props.onPressSave}
                      />
                    </View>
                  </View>
                </>
              }
            />
          </>
          <>
            <CustomModal
              title={'Notes'}
              displayModal={props.notesModal}
              onModalShow={props.setNotesModal}
              setisPromptModal={() => {}}
              isPromptModal={false}
              // value={''}
              // onChangeText={() => {}}
              // reacallFunc={() => {}}
              // type={''}
              children={
                <>
                  <View
                    style={{
                      // top: -20,
                      zIndex: 1000,
                      justifyContent: 'center',
                      // backgroundColor: 'red',
                    }}>
                    <View
                      style={{
                        width:
                          sizeHelper.screenWidth > 450
                            ? sizeHelper.calWp(520)
                            : sizeHelper.calHp(450),
                        
                        alignItems: 'center',
                        alignSelf:'center',
                      }}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={'Enter Notes here...'}
                        placeholderTextColor={AppColor.black3}
                        value={props.notesDetail}
                        onChangeText={props.setNotesDetail}
                        keyboardType="default"
                        autoCorrect={true}
                        editable={true}
                        enablesReturnKeyAutomatically={true}
                        maxLength={5000}
                        multiline={true}
                        numberOfLines={100}
                        spellCheck={true}
                        textAlign={'left'}
                        textAlignVertical={'top'}
                        adjustsFontSizeToFit
                      />
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row-reverse',
                          width:
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calWp(520)
                              : sizeHelper.calHp(450),
                          alignItems: 'center',
                          // height: 40,
                          paddingVertical: 5,
                          backgroundColor: AppColor.backColor,
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 8,
                          }}>
                          <CustomButton
                            containerStyle={{
                              height: sizeHelper.calWp(45),
                              width: sizeHelper.calWp(120),
                              //   marginTop: sizeHelper.calHp(25),
                            }}
                            // isDisabled={isPromptModal && !value}
                            title={'Cancel'}
                            backgroundColor={AppColor.red}
                            titleColor={AppColor.white}
                            onPressButton={props.onClosenModal}
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 5,
                          }}>
                          <CustomButton
                            containerStyle={{
                              height: sizeHelper.calWp(45),
                              width: sizeHelper.calWp(120),
                              //   marginTop: sizeHelper.calHp(25),
                            }}
                            // isDisabled={isPromptModal && !value}
                            title={I18nManager.isRTL ? 'يحفظ' : 'Save'}
                            backgroundColor={AppColor.blue2}
                            titleColor={AppColor.white}
                            onPressButton={props.onClosenModal}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              }
            />
          </>

          {(props.isLoading || props.AddProductLoader) && (
            <View style={[styles.popupContainer, {zIndex: 99999}]}>
              <Loading />
            </View>
          )}{props.paymentView && (
            <View style={styles.footer}>
              <BottomSheet
                data={props.payments}
                setPaymentsValue={props.setPaymentsValue}
                setPaymentView={props.setPaymentView}
                placewithpay={props.placeOrderWithPay}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  ) : (
    <>
      <TouchableWithoutFeedback>
        <View style={styles.mainContainer}>
          <View style={{position: 'absolute', top: -400}}>{<props.QR />}</View>

          <StatusBar hidden={true} />

          <Header props={props} isSearch={false} />

          <View style={{flex: 1, marginHorizontal: sizeHelper.calWp(20)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: sizeHelper.calWp(10),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: sizeHelper.calHp(10),
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    marginHorizontal: sizeHelper.calWp(10),
                    borderRadius: sizeHelper.calWp(5),
                    paddingVertical: sizeHelper.calWp(3),
                    backgroundColor: AppColor.blue,
                    paddingHorizontal: sizeHelper.calWp(10),
                  }}
                  onPress={() => {
                    props.navigation.navigate('TableBook');
                    props.setOrderCode(true);
                  }}>
                  <Icon
                    name="angle-left"
                    size={sizeHelper.calWp(26)}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={false}
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    props.setOpenModal(true);
                  }}>
                  <Text
                    style={{
                      fontSize: sizeHelper.calWp(22),
                      fontFamily: 'ProximaNova-Regular',
                      color: AppColor.black3,
                    }}>
                    {I18nManager.isRTL ? 'الطاولة' : 'Table'}
                  </Text>

                  <Text
                    style={{
                      marginHorizontal: sizeHelper.calHp(10),
                      fontSize: sizeHelper.calWp(18),
                      fontFamily: 'ProximaNova-Regular',
                      color: AppColor.white,
                      backgroundColor: AppColor.green,
                      padding: sizeHelper.calHp(5),
                      paddingHorizontal: sizeHelper.calHp(10),
                      borderRadius: sizeHelper.calHp(5),
                    }}>
                    {props.orderDetails?.TableCode
                      ? '#' + props.orderDetails?.TableCode
                      : ''}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                disabled={true}
                style={{
                  marginTop: sizeHelper.calHp(10),
                  alignItems: 'center',
                  marginLeft: -sizeHelper.calWp(40),
                }}>
                <Text
                  style={{
                    fontSize: sizeHelper.calWp(22),
                    fontFamily: 'Proxima Nova Bold',
                    color: AppColor.black,
                  }}>
                  Order # {props.orderDetails?.OrderCode}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={true}
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                  marginTop: sizeHelper.calHp(10),
                }}>
                <Text
                  style={{
                    paddingTop: sizeHelper.calHp(3),
                    color: AppColor.black,
                    paddingLeft: sizeHelper.calHp(5),
                    fontSize: sizeHelper.calWp(22),
                    fontFamily: 'ProximaNova-Regular',
                  }}>
                  Time Required :{' '}
                  {props.orderDetails?.TimeRequired
                    ? props.orderDetails?.TimeRequired
                    : ''}{' '}
                  mins
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.selectedProductListContainer,
                {
                  flex: 4,
                },
              ]}>
              <SwipeListView
                showsVerticalScrollIndicator={false}
                disableRightSwipe={I18nManager.isRTL ? false : true}
                disableLeftSwipe={I18nManager.isRTL ? true : false}
                data={props.selectedProducts}
                extraData={props.selectedProducts}
                renderItem={renderSelectedOrder}
                renderHiddenItem={(data, index, rowMap) =>
                  renderHiddenItem(data, index)
                }
                rightOpenValue={sizeHelper.calWp(-100)}
                leftOpenValue={sizeHelper.calWp(100)}
                keyExtractor={item => item.SalesBillDetailsID}
              />
            </View>
            <KeyboardAvoidingView
              behavior={
                globleDiscountFocus || globleDiscountPFocus
                  ? 'position'
                  : 'padding'
              }
              style={styles.amountDetailsContianer}>
              {amountDetailsFun()}
            </KeyboardAvoidingView>

            <View
              style={{
                marginTop: sizeHelper.calWp(22),
                paddingStart: sizeHelper.calWp(5),
                paddingHorizontal: sizeHelper.calWp(22),
                paddingVertical: sizeHelper.calWp(15),
                backgroundColor: AppColor.gray,
                borderRadius: sizeHelper.calWp(15),
                borderWidth: 1,
                borderColor: AppColor.gray2,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Text
                    style={{
                      color: AppColor.black3,
                      paddingLeft: sizeHelper.calHp(5),
                      fontSize: sizeHelper.calWp(22),
                      fontFamily: 'ProximaNova-Regular',
                    }}>
                    Order Taker
                  </Text>
                </View>

                <View
                  style={{
                    marginLeft: 5,
                  }}>
                  <View
                    style={[
                      styles.dropdownSmallView,
                      {justifyContent: 'center', alignItems: 'center'},
                    ]}>
                    <Text
                      style={{
                        paddingTop: sizeHelper.calHp(3),
                        color: AppColor.black3,
                        paddingLeft: sizeHelper.calHp(5),
                        fontSize: sizeHelper.calWp(22),
                        fontFamily: 'ProximaNova-Regular',
                      }}>
                      {props?.orderDetails?.OrderTaker
                        ? props?.orderDetails?.OrderTaker
                        : ''}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Text
                    style={{
                      color: AppColor.black3,
                      paddingLeft: sizeHelper.calHp(5),
                      fontSize: sizeHelper.calWp(22),
                      fontFamily: 'ProximaNova-Regular',
                    }}>
                    Order Type
                  </Text>
                </View>
                <View style={{marginLeft: 5}}>
                  <View
                    style={[
                      styles.dropdownSmallView,
                      {justifyContent: 'center', alignItems: 'center'},
                    ]}>
                    <Text
                      style={{
                        paddingTop: sizeHelper.calHp(3),
                        color: AppColor.black3,
                        paddingLeft: sizeHelper.calHp(5),
                        fontSize: sizeHelper.calWp(22),
                        fontFamily: 'ProximaNova-Regular',
                      }}>
                      {props.orderDetails?.OrderType === 1
                        ? 'Dine In'
                        : props.orderDetails?.OrderType === 2
                        ? 'Take Away'
                        : 'Delivery'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* </KeyboardAvoidingView> */}

            <View
              style={{
                width: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                }}>
                <View style={styles.swipeContainer}>
                  <SwipeButton
                    containerStyles={styles.swipeButtonContainer}
                    disableResetOnTap
                    width={'100%'}
                    height={sizeHelper.calHp(60)}
                    // disabled={}
                    disabledRailBackgroundColor={AppColor.gray2}
                    disabledThumbIconBackgroundColor={'#fff'}
                    disabledThumbIconBorderColor={AppColor.gray2}
                    railBackgroundColor={AppColor.blue1}
                    railFillBackgroundColor={AppColor.blue1}
                    railBorderColor={AppColor.blue1}
                    thumbIconStyles={{
                      borderRadius: 5,
                      borderColor: AppColor.blue1,
                    }}
                    enableReverseSwipe={false}
                    railFillBorderColor={AppColor.white}
                    railStyles={{
                      borderRadius: 5,
                      borderColor: AppColor.blue1,
                    }}
                    // resetAfterSuccessAnimDelay={300}
                    // resetAfterSuccessAnimDuration={300}
                    shouldResetAfterSuccess={false}
                    thumbIconBackgroundColor={AppColor.blue1}
                    thumbIconBorderColor={AppColor.blue1}
                    thumbIconComponent={props.UpdateOrder}
                    titleFontSize={12}
                    thumbIconWidth={sizeHelper.calWp(170)}
                    onSwipeSuccess={() =>{ props.setPaymentView(true);console.log("setPaymentView 4");}}
                    onSwipeFail={() => console.log('Swipe fail')}
                    onSwipeStart={() => console.log('Swipe start---3')}
                    swipeSuccessThreshold={100}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.buttonsContainer]}>
              <CustomDropDown
                dropDownWidth={sizeHelper.calWp(200)} //payments
                dropDownHeight={sizeHelper.calHp(20)}
                items={props.payments}
                setItems={props.setPayments}
                placeholderTitle={props.StringsList._435}
                setValue={props.setPaymentsValue}
                value={props.paymentsValue}
                disabled={props.selectedProducts.length < 1}
                open={props.paymentsOpen}
                setOpen={props.setPaymentsOpen}
              />

              <View
                style={{
                  zIndex: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomButton
                  containerStyle={{
                    backgroundColor: AppColor.red1,
                    width: sizeHelper.calWp(200),
                    height: sizeHelper.calHp(70),
                  }}
                  title={I18nManager.isRTL ? 'موافق' : 'Cancel'}
                  backgroundColor={AppColor.red1}
                  onPressButton={props.CancelOrder}
                />
              </View>
            </View>
          </View>

          {props.isDrawar && (
            <View style={styles.popupContainer}>
              <DrawerPopUp
                StringsList={props.StringsList}
                userConfiguration={props.userConfiguration}
                TerminalConfiguration={props.TerminalConfiguration}
                cancel={() => {
                  props.drawerRef.current?.fadeOutRight().then(() => {
                    props.setIsDrawar(!props.isDrawar);
                    props.getDrawerSetting();
                  });
                }}
                viewref={props.drawerRef}
              />
            </View>
          )}
          {props.isIngredient && (
            <View style={[styles.popupContainer]}>
              <IngredientsList
                onPressCancel={() => props.setIsIngredient(false)}
                reacallFunc={props.onSelectIngredintes}
                data={
                  props.isIngredientSearch
                    ? props.searchIngredient
                    : props.ingredientsData
                }
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                onPressAddIntgredient={props.onPressAddIntgredient}
                onChangeText={props.searchIngredientFun}
                isGlobal
              />
            </View>
          )}

          {props.isPopup && (
            <View style={styles.popupContainer}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <CreditInfoPopUP
                  StringsList={props.StringsList}
                  cancel={props.paymentMethodSelect}
                  viewref={props.viewref}
                  totalPrice={props.totalPrice}
                  isCredit={props.paymentsValue === '2'}
                  cashPaidAmountFun={props.cashPaidAmountFun}
                  buyerInfo={props.buyerInfo}
                />
              </KeyboardAvoidingView>
            </View>
          )}
          {/* {props.isBuyer && (
            <View style={styles.popupContainer}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <AddSearchBuyer
                  StringsList={props.StringsList}
                  cancel={props.otherOptions}
                  buyerViewRef={props.buyerViewRef}
                  loyaltyList={props.loyaltyList}
                  setBuyerInfo={props.setBuyerInfo}
                  buyerInfo={props.buyerInfo}
                  TerminalConfiguration={props.TerminalConfiguration}
                  props={props}
                />
              </KeyboardAvoidingView>
            </View>
          )}{console.log("Props is 2----->",props)} */}
          {props.isLoyaltyCard && (
            <View style={styles.popupContainer}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <LoyaltyCard
                  StringsList={props.StringsList}
                  cancel={props.otherOptions}
                  loyaltyCardViewRef={props.loyaltyCardViewRef}
                  setRedeemPoints={props.setRedeemPoints}
                  redeemPoints={props.redeemPoints}
                  buyerInfo={props.buyerInfo}
                />
              </KeyboardAvoidingView>
            </View>
          )}
          {props.isInvoice && (
            <View style={styles.popupContainer}>
              <View style={styles.invoiceContainer}>
                <SafeAreaView style={{flex: 1}}>
                  <ScrollView
                    overScrollMode={'never'}
                    contentContainerStyle={{flexGrow: 1, zIndex: 9999999}}
                    style={{
                      flexGrow: 1,

                      paddingVertical: 2,
                    }}
                    showsVerticalScrollIndicator={false}>
                    <View style={{flex: 1}}>
                      <ViewShot
                        style={styles.viewShotStyle}
                        ref={props.qrRef2}
                        onCapture={props.onQRImage}
                        // ref={props.viewShotRef}
                        // onCapture={props.onCapture}

                        captureMode="mount">
                        <View>
                          {!!props?.TerminalConfiguration?.CompanyLogo && (
                            <Image
                              source={{
                                uri:
                                  props?.TerminalConfiguration
                                    ?.CompanyLogoType +
                                  ',' +
                                  props?.TerminalConfiguration?.CompanyLogo,
                              }}
                              style={{
                                //   backgroundColor: "green",
                                height: sizeHelper.calHp(150),
                                width: sizeHelper.calWp(155),
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                alignItems: 'center',
                              }}
                            />
                          )}
                          {!props.companyVATRegistor ? (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(35),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {I18nManager.isRTL
                                ? 'فاتورة مبيعات عادية'
                                : ' Ordinary sales invoice'}
                            </Text>
                          ) : props.totalPrice < 1000 ? (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(35),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {I18nManager.isRTL
                                ? 'فاتورة ضريبية مبسطة'
                                : 'Simplified tax invoice'}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(35),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {I18nManager.isRTL
                                ? 'فاتورة ضريبية'
                                : 'Tax invoice'}
                            </Text>
                          )}

                          {!!props.TerminalConfiguration?.Heading1 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.TerminalConfiguration.Heading1}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Heading2 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.TerminalConfiguration.Heading2}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Heading3 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.TerminalConfiguration.Heading3}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Heading4 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.TerminalConfiguration.Heading4}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.CompanyName && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 10,
                                  fontSize: sizeHelper.calHp(35),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.TerminalConfiguration.CompanyName}
                            </Text>
                          )}

                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                letterSpacing: 2,
                                fontSize: sizeHelper.calHp(35),
                                alignSelf: 'center',
                              },
                            ]}>
                            {currentDate}
                          </Text>

                          <View style={styles.divider} />
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: sizeHelper.calHp(5),
                                alignSelf: 'flex-start',
                              },
                            ]}>
                            {props.terminalSetup?.StartFrom}
                          </Text>

                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                alignSelf: 'center',
                                fontSize: sizeHelper.calHp(35),
                              },
                            ]}>
                            {props.StringsList._180}
                            {' : '}
                            {props.TerminalConfiguration?.ValueAddedTaxNumber}
                          </Text>

                          <Barcode
                        format="CODE128"
                        value={props.returnInvoiceNumber ? props.returnInvoiceNumber : props.invoiceNumber}
                        text={props.returnInvoiceNumber ? props.returnInvoiceNumber : props.invoiceNumber}
                        style={{ marginBottom: 20 }}
                        maxWidth={Dimensions.get('window').width / 2}
                        height={50}
                        textStyle={[styles.invoiceHeaderText, { letterSpacing: 18, fontSize: sizeHelper.calHp(20), alignSelf: "center" }]}

                      />
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 20,
                                letterSpacing: 8,
                                fontSize: sizeHelper.calHp(40),
                                alignSelf: 'center',
                              },
                            ]}>
                            {props.returnInvoiceNumber
                              ? props.returnInvoiceNumber
                              : props.invoiceNumber}
                          </Text>
                          {props.returnInvoiceNumber && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 20,
                                  letterSpacing: 8,
                                  fontSize: sizeHelper.calHp(40),
                                  alignSelf: 'center',
                                },
                              ]}>
                              {props.invoiceNumber}
                            </Text>
                          )}
                          {props.TerminalConfiguration.DefaultPrintStyle ==
                            2 && (
                            <View style={styles.invoiceHeader}>
                              <View style={{width: '40%'}}>
                                <Text style={styles.invoiceHeaderText}>
                                  {props.StringsList._76}
                                </Text>
                              </View>
                              <View style={{width: '20%'}}>
                                <Text
                                  style={[
                                    styles.invoiceHeaderText,
                                    {alignSelf: 'flex-start'},
                                  ]}>
                                  {props.StringsList._98}
                                </Text>
                              </View>
                              <View style={{width: '15%'}}>
                                <Text
                                  style={[
                                    styles.invoiceHeaderText,
                                    {alignSelf: 'center'},
                                  ]}>
                                  {I18nManager.isRTL
                                    ? props.StringsList._177
                                    : 'QTY'}
                                </Text>
                              </View>
                              <View style={{width: '25%'}}>
                                <Text
                                  style={[
                                    styles.invoiceHeaderText,
                                    {alignSelf: 'flex-end'},
                                  ]}>
                                  {props.StringsList._366}
                                </Text>
                              </View>
                            </View>
                          )}
                          <View
                            style={[
                              styles.divider,
                              {marginBottom: sizeHelper.calHp(15)},
                            ]}
                          />
                          {props.selectedProducts.map((item, index) => {
                            return props.TerminalConfiguration
                              .DefaultPrintStyle != 2 ? (
                              <View
                                id={index + item}
                                style={styles.invoiceListContainer}>
                                <View style={{width: '40%'}}>
                                  <Text style={[styles.titleValueStyle]}>
                                    {I18nManager.isRTL
                                      ? item.ProductName2
                                      : item.ProductName}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {fontSize: sizeHelper.calHp(20)},
                                    ]}>
                                    {item.IngredientNames}
                                  </Text>
                                </View>
                                <View style={{width: '20%'}}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {alignSelf: 'flex-start'},
                                    ]}>
                                    {item.PriceWithOutTax}
                                  </Text>
                                </View>
                                <View style={{width: '15%'}}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {alignSelf: 'center'},
                                    ]}>
                                    {item.IsParentAddOn
                                      ? item.Quantity
                                      : item.Quantity * item.OrignalQuantity}
                                  </Text>
                                </View>
                                <View style={{width: '25%'}}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {alignSelf: 'flex-end'},
                                    ]}>
                                    {/* {item.FreeProduct
                                      ? '0.00'
                                      : item.PriceOriginal.toFixed(
                                          props.TerminalConfiguration
                                            .DecimalsInAmount,
                                        )} */}
                                  </Text>
                                </View>
                              </View>
                            ) : (
                              <View
                                id={index + item}
                                style={styles.invoiceListContainer}>
                                <View style={{width: '65%'}}>
                                  <Text style={[styles.titleValueStyle]}>
                                    {I18nManager.isRTL
                                      ? item.ProductName2
                                      : item.ProductName}
                                    {item?.UOMFragment !== 0 &&
                                      (I18nManager.isRTL
                                        ? ' - ' + item.UOMName2
                                        : ' - ' + item.UOMName)}
                                  </Text>
                                  <Text style={styles.titleValueStyle}>
                                    {'@ ' + item.PriceWithOutTax + ' X '}
                                    {item.IsParentAddOn
                                      ? item.Quantity
                                      : item.Quantity * item.OrignalQuantity}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {fontSize: sizeHelper.calHp(20)},
                                    ]}>
                                    {item.IngredientNames}
                                  </Text>
                                </View>

                                <View style={{width: '35%'}}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {alignSelf: 'flex-end'},
                                    ]}>
                                    {item.FreeProduct
                                      ? '0.00'
                                      : item.PriceOriginal.toFixed(
                                          props.TerminalConfiguration
                                            .DecimalsInAmount,
                                        )}
                                  </Text>
                                </View>
                              </View>
                            );
                          })}
                          <View style={styles.divider} />

                          {InoviceAmountDetails.map((item, index) => {
                            return (
                              <View
                                style={{
                                  width: '100%',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={
                                    item.id === 'Total'
                                      ? styles.invoiceHeaderText
                                      : styles.titleValueStyle
                                  }>
                                  {item.title}
                                </Text>
                                <Text
                                  style={
                                    item.id === 'Total'
                                      ? styles.invoiceHeaderText
                                      : styles.titleValueStyle
                                  }>
                                  {item.value}
                                </Text>
                              </View>
                            );
                          })}
                          <View style={styles.divider} />
                          <View style={styles.invoiceHeader}>
                            <View>
                              <Text style={styles.invoiceHeaderText}>
                                {props.StringsList._174}
                              </Text>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {fontFamily: 'Proxima Nova Regular'},
                                ]}>
                                {I18nManager.isRTL
                                  ? props.selectedPyamentMethod
                                      ?.PaymentTypeName2
                                  : props.selectedPyamentMethod
                                      ?.PaymentTypeName}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {alignSelf: 'center'},
                                ]}>
                                {props.StringsList._171}
                              </Text>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {
                                    alignSelf: 'center',
                                    fontFamily: 'Proxima Nova Regular',
                                  },
                                ]}>
                                {props.selectedAgent?.SalesAgentName
                                  ? props.selectedAgent?.SalesAgentName
                                  : props.TerminalConfiguration?.SalesAgentName}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {alignSelf: 'center'},
                                ]}>
                                {props.StringsList._172}
                              </Text>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {
                                    alignSelf: 'center',
                                    fontFamily: 'Proxima Nova Regular',
                                  },
                                ]}>
                                {props.TerminalConfiguration?.TerminalCode}
                              </Text>
                            </View>
                          </View>
                          {!!props.buyerInfo && (
                            <View>
                              <View style={styles.divider} />
                              <Text style={styles.invoiceHeaderText}>
                                {props.StringsList._77 + ':-'}
                              </Text>
                              <View style={styles.invoiceHeader}>
                                {!!props.buyerInfo?.BuyerName && (
                                  <View>
                                    <Text style={styles.invoiceHeaderText}>
                                      {props.StringsList._76}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.invoiceHeaderText,
                                        {fontFamily: 'Proxima Nova Regular'},
                                      ]}>
                                      {props.buyerInfo?.BuyerName}
                                    </Text>
                                  </View>
                                )}
                                {!!props.buyerInfo?.BuyerCode && (
                                  <View>
                                    <Text style={[styles.invoiceHeaderText]}>
                                      {props.StringsList._141}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.invoiceHeaderText,
                                        {fontFamily: 'Proxima Nova Regular'},
                                      ]}>
                                      {props.buyerInfo?.BuyerCode}
                                    </Text>
                                  </View>
                                )}
                                {!!props.buyerInfo?.PrimaryPhone && (
                                  <View>
                                    <Text style={[styles.invoiceHeaderText]}>
                                      {props.StringsList._138}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.invoiceHeaderText,
                                        {fontFamily: 'Proxima Nova Regular'},
                                      ]}>
                                      {props.buyerInfo?.PrimaryPhone}
                                    </Text>
                                  </View>
                                )}
                              </View>

                              <View style={styles.invoiceHeader}>
                                {!!props.buyerInfo?.ValueAddedTaxNumber && (
                                  <View style={{width: '41%'}}>
                                    <Text style={styles.invoiceHeaderText}>
                                      {props.StringsList._140}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.invoiceHeaderText,
                                        {fontFamily: 'Proxima Nova Regular'},
                                      ]}>
                                      {props.buyerInfo?.ValueAddedTaxNumber}
                                    </Text>
                                  </View>
                                )}
                                {!!props.buyerInfo?.CCRNumber && (
                                  <View style={{width: '72%'}}>
                                    <Text style={[styles.invoiceHeaderText]}>
                                      {props.StringsList._139}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.invoiceHeaderText,
                                        {fontFamily: 'Proxima Nova Regular'},
                                      ]}>
                                      {props.buyerInfo?.CCRNumber}
                                    </Text>
                                  </View>
                                )}
                              </View>
                              {!!props.buyerInfo?.BuyerAddress && (
                                <View>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.StringsList._383}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.invoiceHeaderText,
                                      {fontFamily: 'Proxima Nova Regular'},
                                    ]}>
                                    {props.buyerInfo?.BuyerAddress}
                                  </Text>
                                </View>
                              )}
                            </View>
                          )}

                          <View style={styles.divider} />
                          {!!props.TerminalConfiguration?.Footer1 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                },
                              ]}>
                              {props.TerminalConfiguration.Footer1}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Footer2 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                },
                              ]}>
                              {props.TerminalConfiguration.Footer2}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Footer3 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                },
                              ]}>
                              {props.TerminalConfiguration.Footer3}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.Footer4 && (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginBottom: 3,
                                  fontSize: sizeHelper.calHp(25),
                                },
                              ]}>
                              {props.TerminalConfiguration.Footer4}
                            </Text>
                          )}
                          {!!props.TerminalConfiguration?.CompanyAddress && (
                            <Text style={styles.invoiceHeaderText}>
                              {props.TerminalConfiguration.CompanyAddress}
                            </Text>
                          )}
                        </View>
                        <View
                          style={{
                            alignSelf: 'center',
                            marginVertical: sizeHelper.calHp(30),
                            marginBottom: sizeHelper.calHp(50),
                          }}>
                          {<props.QR />}
                        </View>
                      </ViewShot>
                    </View>
                  </ScrollView>
                </SafeAreaView>
                <View style={styles.invoiceButtonContainer}>
                  <CustomButton
                    containerStyle={styles.invoiceButtonStyle}
                    title={I18nManager.isRTL ? 'لقطة شاشة' : 'Screenshot'}
                    backgroundColor={AppColor.blue2}
                    onPressButton={() => props.onSaveInvoice('save')}
                  />
                  <CustomButton
                    containerStyle={[
                      styles.invoiceButtonStyle,
                      {
                        marginEnd: sizeHelper.calHp(0),
                        backgroundColor: AppColor.red1,
                      },
                    ]}
                    title={props.StringsList._2}
                    backgroundColor={AppColor.red1}
                    onPressButton={props.onSaveInvoice}
                  />
                </View>
              </View>
            </View>
          )}

          {props.isTerminalSetup && (
            <View style={styles.popupContainer}>
              <TerminalSetup
                onPressCancel={() => props.setTerminalSetup(false)}
              />
            </View>
          )}
          {props.isPairPrinterFamily && (
            <View style={styles.popupContainer}>
              <PairPrinterFamily
                onPressCancel={() => props.setPairPrinterFamily(false)}
              />
            </View>
          )}

          {props.isHoldInvoices && (
            <View style={styles.popupContainer}>
              <HoldInvoices
                onPressCancel={() => props.setisHoldInvoices(false)}
                reacallFunc={props.getHoldInvoiveFun}
                deleteHoldedInvoice={props.deleteHoldedInvoice}
              />
            </View>
          )}

          <AlertModel
            displayAlert={props.displayAlert}
            onAlertShow={props.setDisplayAlert}
            setisPromptAlert={props.setisPromptAlert}
            isPromptAlert={props.isPromptAlert}
            message={props.message}
            value={props.alertValue}
            onChangeText={props.onChangeText}
            reacallFunc={props.reacallFunc}
            placeholderText={props.message}
            type={props.alertType}
          />
          {props.isScanner && (
            <View style={styles.popupContainer}>
              <QRCodeScannerScreen
                closeScanner={() => {
                  props.setScanner(false);
                }}
                onSuccess={props.onSuccessScan}
              />
            </View>
          )}
          {props.isReturnInvoice && (
            <View style={[styles.popupContainer]}>
              <ReturnInvoice
                onPressCancel={() => props.setisReturnInvoice(false)}
                reacallFunc={props.checkReturnProductAddons}
                data={props.retunProducts}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                selectedAllProducts={props.selectedAllProducts}
              />
            </View>
          )}
          {props.isAddon && (
            <View style={[styles.popupContainer]}>
              <AddonsList
                onPressCancel={() => props.setisAddon(false)}
                reacallFunc={props.addProductToList}
                data={props.retunProducts}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                isAddon
              />
            </View>
          )}
          {props.isGlobalTax && (
            <View style={[styles.popupContainer]}>
              <GlobalTaxList
                onPressCancel={() => props.setIsGlobalTax(false)}
                reacallFunc={props.globalTaxFun}
                data={props.globalTaxList}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                isGlobal
              />
            </View>
          )}
          <>
            <CustomModal
              title={I18nManager.isRTL ? 'طلب جديد' : 'New order'}
              displayModal={props.openModal}
              onModalShow={props.setOpenModal}
              setisPromptModal={() => {}}
              isPromptModal={false}
              // value={''}
              // onChangeText={() => {}}
              // reacallFunc={() => {}}
              // type={''}
              children={
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        marginLeft: sizeHelper.calHp(10),
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Proxima Nova Bold',
                          paddingBottom: sizeHelper.calHp(5),
                          fontSize: sizeHelper.calHp(22),
                          color: AppColor.black,
                          textAlign: 'left',
                        }}>
                        {I18nManager.isRTL ? 'زائر' : 'Guests'}
                      </Text>
                      <View
                        style={{
                          alignItems: 'center',
                          marginRight: sizeHelper.calHp(5),
                        }}>
                        <CustomPicker // Guest Picker
                          disableAutoScroll={true}
                          data={props.guestItem}
                          onSelect={(selectedItem, index) => {
                            console.log(index, selectedItem);
                          }}
                          defaultButtonText={'Select Guests'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            props.setSelectedGuest(selectedItem);

                            return selectedItem;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                          buttonStyle={styles.dropdown1BtnStyle}
                          buttonTextStyle={styles.dropdown1BtnTxtStyle}
                          renderDropdownIcon={isOpened => {
                            return (
                              <Icon
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={
                                  isOpened ? AppColor.black : AppColor.gray1
                                }
                                size={18}
                              />
                            );
                          }}
                          dropdownIconPosition={
                            I18nManager.isRTL ? 'left' : 'right'
                          }
                          dropdownStyle={styles.dropdown1DropdownStyle}
                          rowStyle={styles.dropdown1RowStyle}
                          rowTextStyle={styles.dropdown1RowTxtStyle}
                          selectedRowStyle={styles.dropdown1SelectedRowStyle}
                        />
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Proxima Nova Bold',
                          paddingBottom: sizeHelper.calHp(5),
                          fontSize: sizeHelper.calHp(22),
                          color: AppColor.black,
                        }}>
                        {'Area'}
                      </Text>
                      <View
                        style={{
                          alignItems: 'center',
                          marginHorizontal: sizeHelper.calHp(5),
                        }}>
                        <CustomPicker // Area Picker
                          disableAutoScroll={true}
                          data={props.areaItem}
                          onSelect={props.onSelect}
                          defaultButtonText={'Select Area'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            props.setSelectedArea(selectedItem);
                            console.log('selectedArea', props.selectedArea);

                            return selectedItem;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                          buttonStyle={styles.dropdown2BtnStyle}
                          buttonTextStyle={styles.dropdown2BtnTxtStyle}
                          renderDropdownIcon={isOpened => {
                            return (
                              <Icon
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={
                                  isOpened ? AppColor.black : AppColor.gray1
                                }
                                size={18}
                              />
                            );
                          }}
                          dropdownIconPosition={
                            I18nManager.isRTL ? 'left' : 'right'
                          }
                          dropdownStyle={styles.dropdown2DropdownStyle}
                          rowStyle={styles.dropdown2RowStyle}
                          rowTextStyle={styles.dropdown2RowTxtStyle}
                          selectedRowStyle={styles.dropdown2SelectedRowStyle}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{marginVertical: sizeHelper.calHp(15)}}>
                    {props.tableItem.length > 0 ? (
                      <CustomPicker // Tables Picker
                        disableAutoScroll={true}
                        data={props.tableItem}
                        onSelect={props.onSelectTable}
                        defaultButtonText={'Select Table'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return (
                            <>
                              <View style={{flexDirection: 'row'}}>
                                <View>
                                  <Text
                                    style={{
                                      fontFamily: 'ProximaNova-Regular',
                                      fontSize: 14,
                                      color: AppColor.black,
                                    }}>
                                    Selected Table ID :{' '}
                                  </Text>
                                </View>
                                <View>
                                  <Text
                                    style={{
                                      fontFamily: 'ProximaNova-Regular',
                                      fontSize: 14,
                                      color: AppColor.black,
                                    }}>
                                    {selectedItem.TableCodeID
                                      ? selectedItem.TableCodeID
                                      : ''}
                                  </Text>
                                </View>
                                <View>
                                  <Text
                                    style={{
                                      fontFamily: 'ProximaNova-Regular',
                                      fontSize: 14,
                                      color: AppColor.black,
                                    }}>
                                    {'  '} Sitting Capicity :{' '}
                                    {selectedItem.TotalCapacity
                                      ? selectedItem.TotalCapacity
                                      : ''}
                                  </Text>
                                </View>
                              </View>
                            </>
                          );
                        }}
                        rowTextForSelection={renderTables}
                        buttonStyle={styles.dropdown3BtnStyle}
                        buttonTextStyle={styles.dropdown3BtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                          return (
                            <Icon
                              name={isOpened ? 'chevron-up' : 'chevron-down'}
                              color={isOpened ? AppColor.black : AppColor.gray1}
                              size={18}
                            />
                          );
                        }}
                        dropdownIconPosition={
                          I18nManager.isRTL ? 'left' : 'right'
                        }
                        dropdownStyle={styles.dropdown3DropdownStyle}
                        rowStyle={styles.dropdown3RowStyle}
                        rowTextStyle={styles.dropdown3RowTxtStyle}
                        selectedRowStyle={styles.dropdown3SelectedRowStyle}
                      />
                    ) : (
                      <View
                        style={[
                          styles.dropdown3BtnStyle,
                          {alignItems: 'center', justifyContent: 'center'},
                        ]}>
                        <Text style={{textAlign: 'center'}}>
                          No Data Available
                        </Text>
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      width: '100%',
                      alignItems: 'center',
                      // height: 40,
                      paddingVertical: 5,
                      backgroundColor: AppColor.backColor,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 8,
                      }}>
                      <CustomButton
                        containerStyle={{
                          height: sizeHelper.calWp(45),
                          width: sizeHelper.calWp(120),
                          //   marginTop: sizeHelper.calHp(25),
                        }}
                        // isDisabled={isPromptModal && !value}
                        title={'Cancel'}
                        backgroundColor={AppColor.red}
                        titleColor={AppColor.white}
                        onPressButton={() => {
                          props.setOpenModal(false);
                          props.setStorageItems(null);
                          
                        }}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 5,
                      }}>
                      <CustomButton
                        containerStyle={{
                          height: sizeHelper.calWp(45),
                          width: sizeHelper.calWp(120),
                          //   marginTop: sizeHelper.calHp(25),
                        }}
                        // isDisabled={isPromptModal && !value}
                        title={'Save'}
                        backgroundColor={AppColor.blue2}
                        titleColor={AppColor.white}
                        onPressButton={props.onPressSave}
                      />
                    </View>
                  </View>
                </>
              }
            />
          </>

          {(props.isLoading || props.AddProductLoader) && (
            <View style={[styles.popupContainer, {zIndex: 99999}]}>
              <Loading />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Design;
