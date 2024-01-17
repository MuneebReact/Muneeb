import AsyncStorage from '@react-native-async-storage/async-storage';
// import CameraRoll from '@react-native-community/cameraroll';
import moment from 'moment';
import React, {useEffect, useRef, useState ,useMemo} from 'react';
import uuid from 'react-native-uuid';
import {captureRef} from 'react-native-view-shot';
import {connect} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
// import { Invoice } from '@axenda/zatca';
// import {
//   BluetoothEscposPrinter,
//   BluetoothManager
// } from 'react-native-bluetooth-escpos-printer'
import {
  Alert,
  PermissionsAndroid,
  NativeEventEmitter,
  NativeAppEventEmitter,
  I18nManager,
  Platform,
  NativeModules,
  Vibration,
  Keyboard,
  View,
  Text,
  SafeAreaView,
  BackHandler,
} from 'react-native';

// import EscPosPrinter, {
//   getPrinterSeriesByName,
//   IPrinter,
// } from 'react-native-esc-pos-printer';
// import Encoder from 'esc-pos-encoder';

import {ServerCall} from '../../redux/actions/asynchronousAction';
import {
  DeleteColumnById,
  getData,
  getDataById,
  getDataJoinById,
  updateColunm,
} from '../../sqliteHelper';
import {CategoriesListTable} from '../../sqliteTables/CategoriesList';
import {DrawerSetupTable} from '../../sqliteTables/DrawerSetup';
import {
  HoldInvoiceTable,
  InsertHoldInvoice,
} from '../../sqliteTables/HoldInvoice';
import {ProductCardAddOnGroupListTable} from '../../sqliteTables/ProductCardAddOnGroupList';
import {ProductDetailListTable} from '../../sqliteTables/ProductDetailList';
import {ProductListTable} from '../../sqliteTables/ProductList';
import {
  InsertSaleBillDetails,
  SaleBillDetailsTable,
} from '../../sqliteTables/SaleBillDetails';
import {InsertSaleBills, SaleBillsTable} from '../../sqliteTables/SaleBills';
import {SalesAgentsTable} from '../../sqliteTables/SalesAgents';
import {TaxRateParentListTable} from '../../sqliteTables/TaxRateParentList';
import {TerminalConfigurationTable} from '../../sqliteTables/TerminalConfiguration';
import {TerminalSetupTable} from '../../sqliteTables/TerminalSetup';
import {UpdateProductDetailListTable} from '../../sqliteTables/UpdateProductDetailList';
import Design from './design';

import {createIconSetFromFontello} from 'react-native-vector-icons';

import {array} from 'yup/lib/locale';
import calculateTaxeGroups from '../../helpers/TaxCalculationHelper';
import {LoyaltyRewardsListTable} from '../../sqliteTables/LoyaltyRewardsList';
import {LoyaltyListTable} from '../../sqliteTables/LoyaltyList';

import {LoyaltyDetailListTable} from '../../sqliteTables/LoyaltyDetailList';

import errorMessages from '../../constant/errorMessages';
import {SalesPostingConfigurationListTable} from '../../sqliteTables/SalesPostingConfigurationList';
import DBTable from '../../constant/UpdateDB';
import {ProductCardAddOnEquivalentProductsListTable} from '../../sqliteTables/ProductCardAddOnEquivalentProductsList';
import {
  InsertProductCardIngredientsList,
  ProductCardIngredientsListTable,
} from '../../sqliteTables/ProductCardIngredientsList';
import sizeHelper from '../../helpers/sizeHelper';
import {UserConfigurationTable} from '../../sqliteTables/UserConfiguration';
import {
  getDeviceName,
  getCodename,
  getHost,
  getDeviceType,
  getBrand,
  getBundleId,
  getDevice,
  getDeviceId,
  getBaseOs,
} from 'react-native-device-info';
import styles from './style';
import {A4PrintStylesTable} from '../../sqliteTables/A4PrintStyles';
import {AreaListTable} from '../../sqliteTables/AreasList';
import {OrderTackerList} from '../../sqliteTables/OrderTackers';
import {object} from 'yup';
import {RestTablesTable} from '../../sqliteTables/RestTables';
import AppColor from '../../constant/AppColor';
import Icon from 'react-native-vector-icons/FontAwesome';
import base64 from 'react-native-base64';
var Sound = require('react-native-sound');
import Toast from 'react-native-simple-toast';
const {PrinterNativeModule} = NativeModules;

const HomeScreen = props => {
  console.log('HomeScreen Props', props);
  const [options, setOptions] = useState([
    {label: 'DineIn', value: 'DineInOrder'},

    {label: 'Take Away', value: 'Take Away'},
    {label: props.StringsList._30, value: 'buyer'},
    {label: props.StringsList._437, value: 'loyaltyCard'},
  ]);
  const [payments, setPayments] = useState([
    {label: props.StringsList._314, value: '1'},
    {label: props.StringsList._55, value: '2'},
    {label: props.StringsList._325, value: '3'},
  ]);

  const [paymentsOpen, setPaymentsOpen] = useState(false);
  const [optionsOpen, setoptionsOpen] = useState(false);
  const [isToggle, setToggle] = useState(false);
  const [allCategoreis, setAllCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subPrice, setsubPrice] = useState(0);
  const [focus, setfocus] = useState(0);
  const [isPopup, setPopup] = useState(false);
  const [AgentList, setAgentList] = useState([]);
  const [TerminalConfiguration, setTerminalConfiguration] = useState({});
  const [paymentsValue, setPaymentsValue] = useState(null);
  const [optionsValue, seOptionsValue] = useState(null);
  const [uriImage, setUriImage] = useState(null);
  const [isInvoice, setInvoice] = useState(false);
  const [isTerminalSetup, setTerminalSetup] = useState(false);
  const [isPairPrinterFamily, setPairPrinterFamily] = useState(false);
  const [manuallyCount, setmanuallyCount] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [returnInvoiceNumber, setReturnInvoiceNumber] = useState(null);
  const [salesBillID, setSalesBillID] = useState(null);
  const [creditAmount, setCreditAmount] = useState(0);
  const [advancePaidInCash, setAdvancePaidInCash] = useState(0);
  const [globalDiscountAmount, setglobalDiscountAmount] = useState(0);
  const [globalDiscountRate, setGlobalDiscountRate] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isPromptAlert, setisPromptAlert] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [isHoldInvoices, setisHoldInvoices] = useState(false);
  const [message, setMessage] = useState('');
  const [beepSound, setBeepSound] = useState(null);
  const [terminalSetup, setTerminalSetupObj] = useState(null);
  const [drawerSetupArr, setDrawerSetupArr] = useState({});
  const [holdInvoiceName, setHoldInvoiceName] = useState('');
  const [isScanner, setScanner] = useState(false);
  const [alertValue, setAlertValue] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [retunProducts, setReturnProducts] = useState([]);
  const [isReturnInvoice, setisReturnInvoice] = useState(false);
  const [isAddon, setisAddon] = useState(false);
  const [isStateUpdate, setStateUpdate] = useState(false);
  const [globalTaxList, setGlobalTaxList] = useState([]);
  const [isGlobalTax, setIsGlobalTax] = useState(false);
  const [globalTax, setGlobalTax] = useState(0);
  const [isBuyer, setisBuyer] = useState(false);
  const [loyaltyList, setLoyaltyList] = useState([]);
  const [buyerInfo, setBuyerInfo] = useState(null);
  const [isLoyaltyCard, setIsLoyaltyCard] = useState(false);
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [checkLoyalityReward, setCheckLoyalityReward] = useState(false);
  const [loyaltyDetailList, setLoyaltyDetailList] = useState([]);
  const [loyaltyRewardsList, setLoyaltyRewardsList] = useState([]);
  const [saleBillObj, setSaleBillObj] = useState({});
  const [globalTaxObj, setGlobalTaxObj] = useState([]);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [status, setStatus] = useState(0);
  const [rewardType, setRewardType] = useState(0);
  const [selectedGlobalTaxObj, setSelectedGlobalTaxObj] = useState(null);
  const [selectedPyamentMethod, setSelectedPyamentMethod] = useState(null);
  const [printerStatus, setPrinterStatus] = useState(false);
  const [noFamilyFound, setNoFamilyFound] = useState(false);
  const [returnBill, setReturnBill] = useState([]);
  const [EarnPointPArry, setEarnPointPArry] = useState([]);
  const [EarnPointCArry, setEarnPointCArry] = useState([]);
  const [EarnPointIArry, setEarnPointIArry] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [totalTaxOfInvoice, setTotalTaxOfInvoice] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isDrawar, setIsDrawar] = useState(false);
  const [isIngredient, setIsIngredient] = useState(false);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [sumOfProductTax, setSumOfProductsTax] = useState(0);
  const [sumOfProductDiscount, setSumOfProductsDiscount] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [searchIngredient, setSearchIngredient] = useState('');
  const [ingredientProductCode, setIngredientProductCode] = useState('');
  const [ingredientText, setIngredientText] = useState('');
  const [isIngredientSearch, setIsIngredientSearch] = useState(false);
  const [printerMacAddress, setPrinterMacAddress] = useState(null);
  const [printerName, setPrinterName] = useState(null);
  const [userConfiguration, setUserConfiguration] = useState({});
  const [userDiscountLimit, setUserDiscountLimit] = useState(0);
  const [selectedcat, setSelectedcat] = useState({});
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const [lastBillNumber, setLastBillNumber] = useState(null);
  const [addProductLoader, setAddProductLoader] = useState(false);
  const [companyVATRegistor, setCompanyVATRegistor] = useState(false);
  const [barCode, setBarCode] = useState(true);
  const [barCodeText, setbarCodeText] = useState('');
  const [billFormatType, setBillFormatType] = useState(1);
  const [displayModal, setDisplayModal] = useState(false);
  const viewref = useRef(null);
  const viewShotRef = useRef(null);
  const flatListRef = useRef(null);
  const buyerViewRef = useRef(null);
  const loyaltyCardViewRef = useRef(null);
  const qrRef = useRef(null);
  const drawerRef = useRef(null);
  const qrRef2 = useRef(null);
  const ref_searchBar = useRef(null);
  const [isdisabled, setisDisabled] = useState(false);
  const [guestItem, setGuestItem] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState('');
  const [areaItem, setAreaItem] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [tableItem, setTableItem] = useState([]);
  const [masterTableItems, setMasterTableItems] = useState([]);
  const [areas, setAreas] = useState([]);
  const [notesModal, setNotesModal] = useState(false);
  const [notesDetail, setNotesDetail] = useState('');
  const [storageItems, setStorageItems] = useState(null);
  const [enableTBut, setEnableTbut] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [orderItems, setOrderItems] = useState([
    {id: 1, value: 'Dine In'},
    {id: 2, value: 'Take Away'},
    {id: 3, value: 'Deliver'},
  ]);
  const [orderType, setOrderType] = useState(1);
  const [orderTaker, setOrderTaker] = useState([]);
  const [orderTakerType, setOrderTakerType] = useState();
  const [disable, setDisable] = useState(false);
  const [isRequriedLogin, setIsRequriedLogin] = useState(false);
  const [paymentView, setPaymentView] = useState(false);
  const [orderCode, setOrderCode] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);
  const [placedwithPay, setPlaceWithPay] = useState(false);
  const [orderValue, setOrderValue] = useState(0);
  const onOpenModal = () => {
    setNotesModal(true);
  };

  const onClosenModal = () => {
    setNotesModal(false);
  };

  useEffect(() => {
    if (props?.route?.params?.id !== undefined && orderCode !== false) {
      let orderId = props?.route?.params?.id;
      getOrderDetails(orderId);
    }
  });

  const getOrderDetails = async orderId => {
    setOrderCode(false);
    let token = await AsyncStorage.getItem('ACCESS_TOKEN');

    setLoading(true);

    try {
      const response = await props.dispatch(
        ServerCall(token, 'Order/FetchOrder?orderCode=' + orderId, 'GET'),
      );
      console.log('order Details responce', response);
      if (response?.message === 'Unauthorized') {
        Alert.alert('Alert', 'Your Session is Expirerd Please Login again', [
          {text: 'OK', onPress: () => goToLogin()},
        ]);
        setLoading(false);
      } else {
        let details = response?.ResOrderDetailList;
        console.log('details', details);

        setOrderDetails(response);
        setSelectedProducts(details);

        setLoading(false);
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };

  useEffect(() => {
    const unsubscri = props.navigation.addListener('focus', async () => {
      setOrderCode(true);
    });

    return () => {
      unsubscri;
    };
  }, [props.navigation]);
  const openinvoice =()=>{
    setInvoice(true)
     console.log("is Invoice is true",isInvoice);
  }
  const placewithpay = val => {
    if (val === '1') {
      setPaymentsValue(val);
      setPlaceWithPay(true);
      setPaymentView(true);
      console.log("setPaymentView 1");
    } else if (val === '2') {
      if (buyerInfo) {
        if (payemntAdded) {
          
          setPaymentsValue(val);
          setPlaceWithPay(true);
          setPaymentView(true);
          console.log("setPaymentView 2");
        } else {
        }
      }
    } else if (val === '4' || val === '5') {
      if (payemntAdded) {
        setPaymentsValue(val);
        setPlaceWithPay(true);
        setPaymentView(true);
        console.log("setPaymentView 3");
      } else {
        setRailStart(false);
      }
    }
  };
  const placeOrderWithPay = async key => {
    let tableData = await AsyncStorage.getItem('SELECTED_TABLE');
    let table = JSON.parse(tableData);
    setPlaceWithPay(false);
    let productfinalArray = [];
    let isProductHasZaroPrice = false;

    for (let i = 0; i < selectedProducts.length; i++) {
      if (
        Number(selectedProducts[i].PriceOriginal) == 0 &&
        Number(selectedProducts[i].PriceWithOutTax) == 0 &&
        selectedProducts[i]?.IsParentAddOn
      ) {
        isProductHasZaroPrice = true;
      }

      let obj = {
        OrderDetailCode: uuid.v4(),
        OrderCode: invoiceNumber,
        ProductCode: selectedProducts[i]?.ProductCode,
        Ingredients: selectedProducts[i]?.Ingredients,
        ProductBarCode: selectedProducts[i]?.ProductBarCode,
        UnitCode: selectedProducts[i]?.UOMCode,
        AddOnGroupCode: selectedProducts[i]?.AddOnGroupCode,
        AddOnParentOrderDetailCode:
          selectedProducts[i]?.AddOnParentOrderDetailCode,
        SerialNumber: selectedProducts[i]?.SerialNumber,
        ProductType: selectedProducts[i]?.ProductType,
        PriceType: selectedProducts[i]?.PriceType,
        UnitType: selectedProducts[i]?.UOMType,
        Quantity: selectedProducts[i]?.Quantity,
        UnitFragment: selectedProducts[i]?.UOMFragment,
        Price: selectedProducts[i]?.Price,
        DiscountRate: selectedProducts[i]?.DiscountRate,
        DiscountAmount: selectedProducts[i]?.DiscountAmount,
        IsParentAddOn: selectedProducts[i]?.IsParentAddOn === 1 ? true : false,
      };
      productfinalArray.push(obj);
    }
    let CurrentDate = moment().format();
    let date = String(CurrentDate).split('T');
    let yourDate = date[0];
    let time = date[1].split('+');
    let recordstamp = yourDate + ' ' + time[0];
    console.log(yourDate, ' <== date time==> ', time[0]);
    if (!isProductHasZaroPrice) {
      try {
        let placeOrderJson = [
          {
            OrderCode: invoiceNumber,
            TableCode: storageItems?.TableCodeID,
            CustomerNote: notesDetail,
            ResUserID: Number(TerminalConfiguration?.UserCode),
            TimeRequired: 30,
            OrderType: Number(orderType),
            Status: 1,
            OrderTime: new Date().toLocaleTimeString(),
            CompletionTime: new Date().toLocaleTimeString(),
            RecordTimeStamp:`${new Date().getFullYear()}-${new Date().getMonth()+1 < 10 ? '0' + new Date().getMonth()+1 : new Date().getMonth()+1}-${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()} ${ new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :new Date().getMinutes()}:${new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()}.${new Date().getMilliseconds()}`,
            OperationMode: 'INSERT',
            RestaurantSalesAgentCode: String(orderTakerType),
            CounterCode: TerminalConfiguration?.TerminalCode,
            ResOrderDetailList: productfinalArray,
          },
        ];
  
        let token = await AsyncStorage.getItem('ACCESS_TOKEN');

      console.log('orderPlaceJson', placeOrderJson);
      setLoading(true);

      const response = await props.dispatch(
        ServerCall(token, 'Order/CreateOrder', 'POST', placeOrderJson),
      );
      console.log('Place order api request responce =====>', response);

        // if (response) {
        if (response === 'success') {
          let table = await AsyncStorage.getItem('SELECTED_TABLE');
          console.log('here', JSON.parse(table));
          await AsyncStorage.removeItem('SELECTED_TABLE');
          let columnName = ['LastOrderNumber'];
          let columnValue = [Number(TerminalConfiguration.LastOrderNumber) + 1];
          console.log('bill number is', columnValue);
          updateColunm(
            TerminalConfigurationTable,
            columnName,
            'UserCode',
            TerminalConfiguration?.UserCode,
            columnValue,
          );
          let StartFromValue = [Number(terminalSetup.StartFrom) + 1];
          updateColunm(
            TerminalSetupTable,
            ['StartFrom'],
            'id',
            '12345678',
            StartFromValue,
          );
          list.isOrderPlaced = true;
          if (list.ordID === 1 && table) {
            emptyAsyncTableObj();
          } else if (list.ordID !== 1 && table) {
            changeTableStatus(table?.TableCodeID);
          }

          setLoading(false);
          Toast.show( 'Order Has been Placed with Invoice Successfully',
            Toast.LONG,
          );
          return true;
        } else if (isJson) {
          try {
            let jsonParsing = await JSON.parse(response);
            if (jsonParsing.message === 'Unauthorized') {
              Alert.alert(props.StringsList._537, props.StringsList._276, [
                {text: 'OK', onPress: () => onClickPowerOff()},
                setLoading(false),
              ]);
              setLoading(false);
            }
          } catch (error) {
            console.log('response is string and not converted to json', error);
          }
          setLoading(true);

          return false;
        } else {
          setToggled(false);
          setToggle(true);
          if (table) {
            changeTableStatus(table?.TableCodeID);
          }
          setLoading(false);
          return false;
        }
      } catch (e) {
        console.log('ordder place error', e);
        setLoading(false);
        return false;
      }
    } else {
      setPaymentsValue(null);
      setMessage(props.StringsList._270);
      setDisplayAlert(true);
      setRailStart(false);
      return false;
    }
  };

  const placeOrder = async key => {
    // let token = await AsyncStorage.getItem('ACCESS_TOKEN');

    // var localeInfo = RNLocalize.getLocales();
    // var languageTag = localeInfo[0].languageTag;

    // let decodeToken = base64.decode(UserLogin);
    // console.log('decode token', decodeToken);
    let productfinalArray = [];

    for (let i = 0; i < selectedProducts.length; i++) {
      let obj = {
        OrderDetailCode: uuid.v4(),
        OrderCode: invoiceNumber,
        ProductCode: selectedProducts[i]?.ProductCode,
        Ingredients: selectedProducts[i]?.Ingredients,
        ProductBarCode: selectedProducts[i]?.ProductBarCode,
        UnitCode: selectedProducts[i]?.UOMCode,
        AddOnGroupCode: selectedProducts[i]?.AddOnGroupCode,
        AddOnParentOrderDetailCode:
          selectedProducts[i]?.AddOnParentOrderDetailCode,
        SerialNumber: selectedProducts[i]?.SerialNumber,
        ProductType: selectedProducts[i]?.ProductType,
        PriceType: selectedProducts[i]?.PriceType,
        UnitType: selectedProducts[i]?.UOMType,
        Quantity: selectedProducts[i]?.Quantity,
        UnitFragment: selectedProducts[i]?.UOMFragment,
        Price: selectedProducts[i]?.Price,
        DiscountRate: selectedProducts[i]?.DiscountRate,
        DiscountAmount: selectedProducts[i]?.DiscountAmount,
        IsParentAddOn: selectedProducts[i]?.IsParentAddOn === 1 ? true : false,
      };

      productfinalArray.push(obj);
    }
    console.log(
      'productfinalArray',
      selectedProducts + '\n' + 'ghdgdhdhd',
      productfinalArray,
    );
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let Adate = [year, month, day].join('-');
    let arrangeDate = Adate + ' ' + new Date().toLocaleTimeString();

    console.log(
      'pdate today',
      arrangeDate,
      '  ',
      Adate,
      'orderType',
      orderType,
    );

    try {
      let placeOrderJson = [
        {
          OrderCode: invoiceNumber,
          TableCode: storageItems?.TableCodeID,
          CustomerNote: notesDetail,
          ResUserID: Number(TerminalConfiguration?.UserCode),
          TimeRequired: 30,
          OrderType: Number(orderType),
          Status: 1,
          OrderTime: new Date().toLocaleTimeString(),
          CompletionTime: new Date().toLocaleTimeString(),
          RecordTimeStamp:`${new Date().getFullYear()}-${new Date().getMonth()+1 < 10 ? '0' + new Date().getMonth()+1 : new Date().getMonth()+1}-${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()} ${ new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :new Date().getMinutes()}:${new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()}.${new Date().getMilliseconds()}`,
          OperationMode: 'INSERT',
          RestaurantSalesAgentCode: String(orderTakerType),
          CounterCode: TerminalConfiguration?.TerminalCode,
          ResOrderDetailList: productfinalArray,
        },
      ];

      let token = await AsyncStorage.getItem('ACCESS_TOKEN');

      console.log('orderPlaceJson', placeOrderJson);
      setLoading(true);

      const response = await props.dispatch(
        ServerCall(token, 'Order/CreateOrder', 'POST', placeOrderJson),
      );
      console.log('Place order api request responce =====>', response);

      if (response) {
        if (response === 'success') {
          let table = await AsyncStorage.getItem('SELECTED_TABLE');
          console.log('here', JSON.parse(table));
          await AsyncStorage.removeItem('SELECTED_TABLE');
          let columnName = ['LastOrderNumber'];
          let columnValue = [Number(TerminalConfiguration.LastOrderNumber) + 1];
          console.log('bill number is', columnValue);
          updateColunm(
            TerminalConfigurationTable,
            columnName,
            'UserCode',
            TerminalConfiguration?.UserCode,
            columnValue,
          );
          let StartFromValue = [Number(terminalSetup.StartFrom) + 1];
          updateColunm(
            TerminalSetupTable,
            ['StartFrom'],
            'id',
            '12345678',
            StartFromValue,
          );
          restState();
          list.isOrderPlaced = true;
          if (list.ordID === 1 && table) {
            emptyAsyncTableObj();
          } else if (list.ordID !== 1 && table) {
            changeTableStatus(table?.TableCodeID);
          }

          setLoading(false);
          // console.log('Table Removed');
          // props.navigation.replace('home');
          // await getData(TerminalSetupTable, cb => {
          //   setTerminalSetupObj(cb[0]);
          //   // console.log("TerminalSetupTable...", cb)
          // });
          // setLoading(false);
          
          Toast.show('Order Has been Placed Successfully', Toast.LONG);
          return true;
        } else if (response === 'Unauthorized') {
          setLoading(true);
          Alert.alert('Alert', 'Your Session is Expirerd Please Login again', [
            {text: 'OK', onPress: () => goToLogin()},
            setLoading(false),
          ]);
          return false;
        } else {
          console.log('Error order Not Placed');
          return false;
        }
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };

  const CancelOrder = async key => {
    let token = await AsyncStorage.getItem('ACCESS_TOKEN');

    setLoading(true);

    try {
      let placeOrderJson = [
        {
          OrderCode: orderDetails?.OrderCode,
          TableCode: orderDetails?.TableCodeID,
          CustomerNote: orderDetails?.CustomerNote,
          ResUserID: orderDetails?.ResUserID,
          TimeRequired: orderDetails?.TimeRequired,
          OrderType: orderDetails?.orderType?.id,
          Status: 4,
          OrderTime: orderDetails?.OrderTime,
          CompletionTime: orderDetails?.CompletionTime,
          RecordTimeStamp: orderDetails?.RecordTimeStamp,
          OperationMode: 'UPDATE',
          RestaurantSalesAgentCode: orderDetails?.RestaurantSalesAgentCode,
          CounterCode: orderDetails?.CounterCode,
          ResOrderDetailList: orderDetails?.ResOrderDetailList,
        },
      ];

      console.log('orderPlaceJson', placeOrderJson);
      const response = await props.dispatch(
        ServerCall(token, 'Order/CreateOrder', 'POST', placeOrderJson),
      );
      console.log('Cancel order api request responce', response);

      if (response) {
        if (response === 'success') {
          let table = await AsyncStorage.getItem('SELECTED_TABLE');

          console.log('here', JSON.parse(table));
          await AsyncStorage.removeItem('SELECTED_TABLE');
          let columnName = ['LastOrderNumber'];
          let columnValue = [Number(TerminalConfiguration.LastOrderNumber) + 1];
          console.log('bill number is', columnValue);
          updateColunm(
            TerminalConfigurationTable,
            columnName,
            'UserCode',
            TerminalConfiguration?.UserCode,
            columnValue,
          );
          let StartFromValue = [Number(terminalSetup.StartFrom) + 1];
          updateColunm(
            TerminalSetupTable,
            ['StartFrom'],
            'id',
            '12345678',
            StartFromValue,
          );
          restState();
          console.log('Table Removed');
          props.navigation.replace('home');
          await getData(TerminalSetupTable, cb => {
            setTerminalSetupObj(cb[0]);
            // console.log("TerminalSetupTable...", cb)
          });
          setLoading(false);
         
          Toast.show('Order Has been Cancelled Successfully', Toast.LONG);
        } else if (response === 'Unauthorized') {
          setLoading(true);
          Alert.alert('Alert', 'Your Session is Expirerd Please Login again', [
            {text: 'OK', onPress: () => goToLogin()},
            setLoading(false),
          ]);
        } else {
          alert('Error');
        }
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };

  const getStorageItem = async () => {
    let tableData = await AsyncStorage.getItem('SELECTED_TABLE');
    if (tableData) {
      let result = JSON.parse(tableData);
      console.log('tabledata', result);
      setStorageItems(result);
    }
  };

  const onSelectTable = (selectedItem, index) => {
    setStorageItems(selectedItem);
    return selectedItem;
  };

  const onPressSave = () => {
    setOpenModal(false);
  };

  const onSelect = (selectedItem, index) => {
    if (selectedGuest !== '') {
      let filterAreas = areas.find(x => x.Name === selectedItem);

      if (filterAreas) {
        let filterTables = masterTableItems.filter(
          x =>
            filterAreas.Name === x.AreaName &&
            x.TotalCapacity >= selectedGuest &&
            x.IsAvailable === 1,
        );
        console.log('=========>', filterTables);
        setTableItem(filterTables);

        // no need to filter here using forLoop

        // let finalArray = [];
        // for (let i = 0; i < filterTables.length; i++) {
        //   finalArray.push(filterTables[i]);
        //   setTableItem(finalArray);
        // }
      }
    } else {
      console.log('Error: Data not found');
    }
  };

  const tableInfoData = () => {
    let array = Array.from({length: 30}, (_, i) => i + 1);
    setGuestItem(array);

    getData(AreaListTable, arealist => {
      console.log(' AreaListTable', arealist);
      let myArray = [];
      setAreas(arealist);
      for (let i = 0; i < arealist.length; i++) {
        myArray.push(arealist[i].Name);
      }
      setAreaItem(myArray);
    });

    getData(RestTablesTable, tablesRecord => {
      console.log(' tablesRecord', tablesRecord);
      let tableArray = [];

      for (let i = 0; i < tablesRecord.length; i++) {
        tableArray.push(tablesRecord[i]);
      }
      // console.log('tableArray', tableArray);
      // change the state because of filter data changes
      setMasterTableItems(tableArray);
    });

    getData(OrderTackerList, taker => {
      console.log(' OrderTackerList', taker);

      let orderTackerArray = [];

      for (let i = 0; i < taker.length; i++) {
        orderTackerArray.push(taker[i]);
      }

      setOrderTaker(orderTackerArray);
    });
  };

  const DineInOrder = () => {
    return (
      <SafeAreaView
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              storageItems?.TableCodeID === undefined
                ? AppColor.gray
                : AppColor.blue2,
          },
        ]}>
        <View style={styles.iconView}>
          <Icon
            name={
              I18nManager.isRTL ? 'angle-double-left' : 'angle-double-right'
            }
            size={sizeHelper.screenWidth > 450 ? 25 : 20}
            color={AppColor.gray3}
          />
        </View>
        <View style={styles.iconTextView}>
          <Text
            style={[
              styles.text,
              {
                color:
                  storageItems?.TableCodeID === undefined
                    ? AppColor.gray3
                    : AppColor.white,
              },
            ]}>
            Swipe to Place Order
          </Text>
        </View>
      </SafeAreaView>
    );
  };

  const TakeAwayOrder = () => {
    return (
      <SafeAreaView
        style={[
          styles.iconContainer,
          {
            backgroundColor: AppColor.blue2,
          },
        ]}>
        <View style={styles.iconView}>
          <Icon
            name={
              I18nManager.isRTL ? 'angle-double-left' : 'angle-double-right'
            }
            size={sizeHelper.screenWidth > 450 ? 25 : 20}
            color={AppColor.gray3}
          />
        </View>
        <View style={styles.iconTextView}>
          <Text
            style={[
              styles.text,
              {
                color: AppColor.white,
              },
            ]}>
            Swipe to Place Order
          </Text>
        </View>
      </SafeAreaView>
    );
  };

  const UpdateOrder = () => {
    return (
      <SafeAreaView
        style={[
          styles.iconContainer,
          {
            backgroundColor: AppColor.blue2,
          },
        ]}>
        <View style={styles.iconView}>
          <Icon
            name={
              I18nManager.isRTL ? 'angle-double-left' : 'angle-double-right'
            }
            size={sizeHelper.screenWidth > 450 ? 25 : 20}
            color={AppColor.gray3}
          />
        </View>
        <View style={styles.iconTextView}>
          <Text
            style={[
              styles.text,
              {
                color: AppColor.white,
              },
            ]}>
            Modified the Order
          </Text>
        </View>
      </SafeAreaView>
    );
  };
  useEffect(() => {
    orderStatus();
  }, [orderValue]);
  const orderStatus = () => {
    if (orderValue === 1 && orderCode === false) {
      updateState();
      onNewInvoice();
    } else if (orderValue === 2 && orderCode === false) {
      setShowButton(true);
      setRefOrderNumber(null);
    }
  };
  // All other functions for Menu
  const rebootAlert = () => {
    Alert.alert('Alert', 'Are you sure to reboot terminal.?', [
      {
        text: 'yes',
        onPress: async () => {
          rebootTerminalFunction();
        },
      },
      {
        text: 'Cancel',

        style: 'cancel',
      },
    ]);
  };

  const rebootTerminalFunction = async () => {
    {
      setLoading(true);

      setIsRequriedLogin(true);

      let accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      console.log('accessToken', accessToken);
      let res = await DBTable.AddDataInDb(props, 'rebootTerminal', accessToken);
      await AsyncStorage.removeItem('SELECTED_AGNETS');
      setOrderCode(false);
      setLoading(false);
      if (!res) {
        let msg = errorMessages.GetInternetConnectionMessage(
          'NoInternet',
          props.StringsList,
        );
        setMessage(msg);
        setDisplayAlert(true);
      }
    }
  };

  const onClickLogoutFunction = () => {
    Alert.alert('Alert', props.StringsList._443, [
      {
        text: 'yes',
        onPress: async () => {
          goToLogin();
        },
      },
      {
        text: 'Cancel',

        style: 'cancel',
      },
    ]);
  };

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
    // http://FXCapi.FXC.com/api/AuthorizeUser/SignOut

    props.navigation.replace('Auth');
    // await AsyncStorage.removeItem('ACCESS_TOKEN');
    await AsyncStorage.removeItem('SELECTED_AGNETS');
    if (type === 'terminal') await AsyncStorage.removeItem('LOGIN_USER_INFO');
    setOrderCode(false);
    setLoading(false);
  };

  const onClickMenuFunction = async type => {
    //console.log(' onClickSetting ', type);
    switch (type) {
      case 'terminal':
        rebootAlert();
        break;

      case 'logout':
        onClickLogoutFunction();
        break;
      case 'pairPrinter':
        PrinterNativeModule.initData();
        break;
      default:
        break;
    }
  };
  
  useEffect(async () => {
    // const unsubscri = props.navigation.addListener('focus', async () => {
    //  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.VIBRATE)
    // console.log('home screen calling...');
    // console.log(
    //   'getBrand',
    //   getDeviceType(),
    //   getBrand(),
    //   getBundleId(),
    //   getDeviceId(),
    // );
    // getBaseOs().then((device) => {
    //   // "walleye"
    //   console.log("getBaseOs", device)
    // });
    // let page = await AsyncStorage.getItem('PRINTER_PAGE_SIZE');

    setLoading(true);

    tableInfoData();
    getAllCategories();
    let agentArray = [],
      loyaltyArray = [],
      paymentArray = [];
    getData(LoyaltyListTable, cb => {
      // console.log("LoyaltyListTable..", cb)

      cb.forEach(element => {
        loyaltyArray.push({
          label: element?.LoyaltyName,
          value: element?.LoyaltyName,
          ...element,
        });
      });
    });
    setLoyaltyList(loyaltyArray);
    getData(SalesAgentsTable, sa => {
      sa.forEach(element => {
        agentArray.push({
          label: element?.SalesAgentName,
          value: element?.UserCode,
          ...element,
        });
      });
    });

    await getData(A4PrintStylesTable, A4 => {
      //  console.log("A4PrintStylesTable", A4[0].ReportFooter)
    }),
      // createInvoiceNumber();
      await getData(TerminalSetupTable, cb => {
        setTerminalSetupObj(cb[0]);
        console.log('TerminalSetupTable...', cb);
      });
    await getData(TerminalConfigurationTable, async TC => {
      setTerminalConfiguration(TC[0]);
      let isnum = /^\d+$/.test(TC[0].ValueAddedTaxNumber);
      //let isCherector = /^[a-z]+$/i.test("a")
      // numberCher = /^[a-z0-9]+$/i.test("1245566555")
      let isZero = TC[0].ValueAddedTaxNumber === '000000000000000';
      console.log('TerminalConfigurationTable...', TC);
      if (TC[0].ValueAddedTaxNumber.length === 15 && isnum && !isZero)
        setCompanyVATRegistor(true);
      //  console.table("TerminalConfigurationTable...", TC[0])
    });
    await getData(UserConfigurationTable, async TC => {
      setUserConfiguration(TC[0]);
      setUserDiscountLimit(TC[0]?.DiscountLimit);
      //console.log("UserConfigurationTable...", TC)
      if (TC[0].SalesRefundAllowed === 0) {
        setOptions([
          {label: props.StringsList._32, value: 'getHoldInvoice'},
          {label: props.StringsList._30, value: 'buyer'},
          {label: props.StringsList._437, value: 'loyaltyCard'},
        ]);
      }
      await getData(SalesPostingConfigurationListTable, cb => {
        cb.forEach(element => {
          if (element?.PaymentTypeName === 'Credit') {
            if (TC[0]?.AllowCreditSale === 'true') {
              paymentArray.push({
                label: I18nManager.isRTL
                  ? element?.PaymentTypeName2
                  : element?.PaymentTypeName,
                value: element?.PaymentType,
                ...element,
              });
            }
          } else {
            paymentArray.push({
              label: I18nManager.isRTL
                ? element?.PaymentTypeName2
                : element?.PaymentTypeName,
              value: element?.PaymentType,
              ...element,
            });
          }
        });
      });
    });
    setPayments(paymentArray);
    setAgentList(agentArray);
    await getData(TaxRateParentListTable, cb => {
      let t = cb.filter(t => t.TaxLevel === 2);
      // console.log("TaxRateParentListTable", t)
      t.unshift({TaxFamilyName: 'None', TaxFamilyCode: 'None'});
      setGlobalTaxList(t);
      // setTerminalSetupObj(cb[0]);
    });

    // getPrinterList()
    soundLoading();
    getData(DrawerSetupTable, cb => {
      console.log(' DrawerSetupTable', cb);
      setDrawerSetupArr(cb[0]);
    });

    let saleAgent = await AsyncStorage.getItem('SELECTED_AGNETS');
    if (saleAgent) {
      console.log('SaleAgent', saleAgent);

      saleAgent = JSON.parse(saleAgent);

      // await getData(SalesPostingConfigurationListTable, cb => {

      //   cb.forEach(element => {
      //     if (element.PaymentTypeName === "Credit") {
      //       if (saleAgent.AllowCreditSale === "true") {
      //         paymentArray.push({
      //           label: I18nManager.isRTL ? element.PaymentTypeName2 : element.PaymentTypeName,
      //           value: element.PaymentType,
      //           ...element,
      //         });
      //       }
      //     } else {
      //       paymentArray.push({
      //         label: I18nManager.isRTL ? element.PaymentTypeName2 : element.PaymentTypeName,
      //         value: element.PaymentType,
      //         ...element,
      //       });
      //     }

      //   });

      // });
      setSelectedAgent(saleAgent);
    }
    // });
    // return () => {
    //   unsubscri;
    // };
  }, []);

  useEffect(() => {
    getData(DrawerSetupTable, cb => {
      if (cb[0]?.isInitialLogin === 'true') {
        updateColunm(
          DrawerSetupTable,
          ['isInitialLogin'],
          'id',
          'D12345678',
          'false',
        );
        const extension = Platform.OS === 'android' ? 'file://' : '';
        const path = `${extension}/storage/emulated/0/FineXCloudBills`;
        RNFS.readFile(path + '/' + 'invoices_backup.json').then(newBillList => {
          // console.log("file...", newBillList, newBillList.length)
          if (newBillList.length > 0) {
            Alert.alert(
              'Panding Bill',
              'Some  bill  is remaining to Post you want to post those bill',
              [
                {
                  text: 'yes',
                  onPress: async () => {
                    postingBill(newBillList);
                    RNFS.unlink(path + '/' + 'invoices_backup.json').then(
                      () => {
                        console.log('FILE DELETED');
                      },
                    );
                  },
                },
                {
                  text: 'Cancel',
                  onPress: () => {
                    RNFS.unlink(path + '/' + 'invoices_backup.json').then(
                      () => {
                        console.log('FILE DELETED');
                      },
                    );
                  },
                  style: 'cancel',
                },
              ],
            );
          }
        });
      }
    });
  }, []);

  const postingBill = async newBillList => {
    setLoading(true);
    let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');

    let bill = await JSON.parse(newBillList);

    const response1 = await props.dispatch(
      ServerCall(UserLogin, 'SalesBill/CreateSalesBill', bill),
    );

    // console.log("bill posting response", response1)
    if (response1 === 'success') {
      setLoading(true);
      let accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      let res = await DBTable.AddDataInDb(props, 'rebootTerminal', accessToken);
      await AsyncStorage.removeItem('SELECTED_AGNETS');
      setLoading(false);
    } else {
      Alert.alert('Issue Bill', props.StringsList._298, [
        {
          text: 'Try Again',
          onPress: () => {
            postingBill(newBillList);
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
      ]);

      setLoading(false);
    }

    setLoading(false);
  };

  const convertArabicNumbersToEnglish = arabicText => {
    let arabic_numbers = '٠١٢٣٤٥٦٧٨٩'.split('');
    let n = '';
    let englishNumber = false;

    for (let i = 0; i < arabicText?.length; i++) {
      var number = arabic_numbers.find(x => x == arabicText[i]);
      if (number) {
        englishNumber = false;
      } else {
        englishNumber = true;
        return arabicText;
      }

      if (!englishNumber) {
        let state = arabic_numbers.indexOf(arabicText[i]);
        n += state;
      }

      //   if(state > 0){
      //        n+=state;
      //   }else{
      //        n+=arabicText[i];
      //   }
    }
    return n;
  };

  const QR = () => {
    // var tax = globalTax,
    //   proTax = 0,
    //   prodis = 0;
    // for (let i = 0; i < selectedProducts?.length; i++) {
    //   let pro = selectedProducts[i];
    //   tax = tax + pro.tax;
    //   proTax = proTax + pro.tax;
    //   prodis = pro?.DiscountAmount
    //     ? prodis + Number(pro.DiscountAmount)
    //     : prodis + 0;
    // }
    // setSumOfProductsTax(proTax);
    // setSumOfProductsDiscount(prodis);
    // let VAT = TerminalConfiguration?.ValueAddedTaxNumber
    //   ? TerminalConfiguration?.ValueAddedTaxNumber
    //   : '000000000000000';
    // let currentDate = moment().format('YYYY-MM-DD H:mm:ss');
    // let invoiceTotal = totalPrice.toFixed(
    //   TerminalConfiguration.DecimalsInAmount,
    // );
    // let invoiceVatTotal = tax.toFixed(TerminalConfiguration.DecimalsInAmount);
    // // console.log("current Date", currentDate)
    // // console.log("selectedProducts tax", invoiceTotal, invoiceVatTotal, currentDate, VAT)
    // const invoice = new Invoice({
    //   sellerName: TerminalConfiguration.CompanyName,
    //   vatRegistrationNumber: convertArabicNumbersToEnglish(VAT),
    //   invoiceTimestamp: currentDate,
    //   invoiceTotal: invoiceTotal,
    //   invoiceVatTotal: invoiceVatTotal,
    // });
    // // console.log("imageData......imageData", TerminalConfiguration.CompanyName, VAT, currentDate, invoiceTotal, invoiceVatTotal, convertArabicNumbersToEnglish(VAT))
    // let imageData = invoice.toBase64();
    // if (imageData !== null) {
    //   return (
    //     <QRCode size={sizeHelper.calWp(300)} value={imageData} getRef={qrRef} />
    //   );
    // }
  };

  const callback = dataURL => {
    // createInvoiceStyle(dataURL)
  };

  const getDataURL = () => {
    // qrRef.current.toDataURL(callback);
  };

  const soundLoading = () => {
    let sound = new Sound(require('../../assets/sounds/beep01.mp3'), error => {
      if (error) {
        console.log('failed to load the sound', error);
      }
    });
    setBeepSound(sound);
  };

  const SoundPlay = () => {
    beepSound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const updateTerminalConfiguration = () => {
    let columnName = ['LastBillNumber'];
    let columnValue = [Number(TerminalConfiguration.LastBillNumber) + 1];
    updateColunm(
      TerminalConfigurationTable,
      columnName,
      'UserCode',
      TerminalConfiguration.UserCode,
      columnValue,
    );
    let StartFromValue = [Number(terminalSetup.StartFrom) + 1];
    updateColunm(
      TerminalSetupTable,
      ['StartFrom'],
      'id',
      '12345678',
      StartFromValue,
    );

    if (paymentsValue === '1') {
      let estimatedAmountinDrawer =
        Number(drawerSetupArr.estimatedAmountinDrawer) + Number(totalPrice);
      if (estimatedAmountinDrawer > 0) {
        let salePrice = Number(drawerSetupArr.CashSales) + Number(totalPrice);
        let columnNameDrawer = ['CashSales', 'estimatedAmountinDrawer'];

        let columnValueDrawer = [salePrice, estimatedAmountinDrawer];
        updateColunm(
          DrawerSetupTable,
          columnNameDrawer,
          'id',
          'D12345678',
          columnValueDrawer,
        );
        
      }
    } else {
      let estimatedAmountinDrawer =
        Number(drawerSetupArr.estimatedAmountinDrawer) + Number(totalPrice);
      if (estimatedAmountinDrawer > 0) {
        let creditSales =
          Number(drawerSetupArr.creditSales) + Number(totalPrice);
        let columnNameDrawer = ['creditSales', 'estimatedAmountinDrawer'];
        let columnValueDrawer = [creditSales, estimatedAmountinDrawer];
        updateColunm(
          DrawerSetupTable,
          columnNameDrawer,
          'id',
          'D12345678',
          columnValueDrawer,
        );
      }
    }
  };
  const updateReturnTerminalConfiguration = () => {
    let columnName = ['LastReturnBillNumber'];
    let columnValue = [Number(TerminalConfiguration.LastReturnBillNumber) + 1];
    updateColunm(
      TerminalConfigurationTable,
      columnName,
      'UserCode',
      TerminalConfiguration.UserCode,
      columnValue,
    );

    let estimatedAmountinDrawer =
      Number(drawerSetupArr.estimatedAmountinDrawer) - Number(totalPrice);
    if (estimatedAmountinDrawer > 0) {
      let salePrice = Number(drawerSetupArr.CashRefund) + Number(totalPrice);
      let columnNameDrawer = ['CashRefund', 'estimatedAmountinDrawer'];
      let columnValueDrawer = [salePrice, estimatedAmountinDrawer];
      updateColunm(
        DrawerSetupTable,
        columnNameDrawer,
        'id',
        'D12345678',
        columnValueDrawer,
      );
    }
  };

  const getAllCategories = async type => {
    getData(CategoriesListTable, async categories => {
      setAllCategories(categories);
      if (categories.length > 0) {
        getSelectedCategoryProducts(categories[0]);
      } else {
        setNoFamilyFound(true);
        getData(UpdateProductDetailListTable, productsDetail => {
          console.log('UpdateProductDetailListTable', productsDetail);
          if (type !== 'isRestState') {
            onSelectProduct(null, productsDetail);
          } else {
            setCategoryProducts(productsDetail);
          }
          setLoading(false);
        });
      }
    });
    // getData(UpdateProductDetailListTable, async products => {
    //   console.log("UpdateProductDetailListTable", products)
    //   // setAllCategories(categories);
    //   // getSelectedCategoryProducts(categories[0]);
    // });
  };

  const getAddOnProducts = async (item, index) => {
    let selectedProduct = [...selectedProducts];
    setLoading(true);

    await getDataJoinById(
      ProductCardAddOnGroupListTable,
      UpdateProductDetailListTable,
      'AddOnGroupCode',
      item.AddOnGroupCode,
      async addonProducts => {
        console.log('Product Card Add On Group List Table...', addonProducts);
        let products = [];

        for (let i = 0; i < addonProducts.length; i++) {
          let isFind = selectedProduct.find(
            x =>
              (x.ProductBarCode === addonProducts[i].ProductBarCode ||
                x.EquiProductCode === addonProducts[i].ProductCode) &&
              x.AddOnParentSalesInvoiceDetailsID === item.SalesBillDetailsID,
          );
          await getDataJoinById(
            ProductCardAddOnEquivalentProductsListTable,
            UpdateProductDetailListTable,
            'EquiProductCode',
            addonProducts[i].ProductCode,
            EquivalentProduct => {
              console.log('addon equivaletnt Products', EquivalentProduct);
              let EqP = [];
              for (let j = 0; j < EquivalentProduct.length; j++) {
                let pro = {
                  SalesBillDetailsID: uuid.v4,
                  SalesBillID: null,
                  BillNumber: null,
                  FiscalSpanID: 0,
                  BillType: addonProducts[i].BillType,
                  SerialNumber: 1,
                  ProductCode: EquivalentProduct[j].ProductCode,
                  ProductName: EquivalentProduct[j].Name,
                  ProductName2: EquivalentProduct[j].Name2,
                  ProductType: EquivalentProduct[j].ProductType,
                  Quantity: addonProducts[i].Quantity,
                  UOMType: EquivalentProduct[j].UOMType,
                  UOMCode: EquivalentProduct[j].UOMCode,
                  UOMFragment: EquivalentProduct[j].UOMFragment,
                  UOMCode: EquivalentProduct[j].UOMCode,
                  UOMName: EquivalentProduct[j].UOMName,
                  Price: 0,
                  PriceOriginal: addonProducts[i].Price,
                  PriceType: item.PriceType,
                  DiscountRate: addonProducts[i].DiscountRate
                    ? addonProducts[i].DiscountRate
                    : 0,
                  DiscountAmount: 0,
                  TaxGroupID: EquivalentProduct[0].SaleTaxGroupCode,
                  IsTax1IncludedInPrice: false,
                  IsTax2IncludedInPrice: false,
                  Tax1Code: '',
                  Tax1Name: '',
                  Tax1Rate: 0,
                  Tax1Amount: 0,
                  Tax2Code: '',
                  Tax2Name: '',
                  Tax2Rate: 0,
                  Tax2Amount: 0,
                  GrandAmount: addonProducts[i].Price,
                  GroupDataID: '',
                  ProductBarCode: EquivalentProduct[j].ProductBarCode,
                  ReturnSalesBillDetailID: '',
                  DeliveryStatus: '',
                  DeliveryDate: '',
                  DeliveryTime: '',
                  DeliveryNote: '',
                  DeliveredDate: '',
                  DeliveredTime: '',
                  Remarks: '',
                  SalesAgentCode: null,
                  IsParentAddOn: false,
                  AddOnGroupCode: addonProducts[i].AddOnGroupCode,
                  ParentInvoiceDetailsID: item.SalesBillDetailsID,
                  OrignalQuantity: addonProducts[i].Quantity,
                  AddonProductDetailcode: addonProducts[i].AddOnGroupDetailCode,
                  Ingredients: 0,
                  EarnedPoints: 0,
                  RedeemPoints: 0,
                  Status: 0,
                  ProductCategoryCode: addonProducts[i].ProductCategoryCode,
                  MediaContentType: addonProducts[i].MediaContentType,
                  MediaContents: addonProducts[i].MediaContents,
                  HoldFromSale: EquivalentProduct[j].HoldFromSale,
                  parentIndex: index + 1,
                  parentQuantity: item.Quantity,
                  AddOnParentSalesInvoiceDetailsID: item.SalesBillDetailsID,
                  EquiProductCode: EquivalentProduct[j].EquiProductCode,
                };
                EqP.push(pro);
              }

              if (!isFind) {
                let pro = {
                  SalesBillDetailsID: uuid.v4,
                  SalesBillID: null,
                  BillNumber: null,
                  FiscalSpanID: 0,
                  BillType: addonProducts[i].BillType,
                  SerialNumber: 1,
                  ProductCode: addonProducts[i].ProductCode,
                  ProductName: addonProducts[i].Name,
                  ProductName2: addonProducts[i].Name2,
                  ProductType: addonProducts[i].ProductType,
                  Quantity: addonProducts[i].Quantity,
                  UOMType: addonProducts[i].UOMType,
                  UOMCode: addonProducts[i].UOMCode,
                  UOMFragment: addonProducts[i].UOMFragment,
                  UOMCode: addonProducts[i].UOMCode,
                  UOMName: addonProducts[i].UOMName,
                  Price: 0,
                  PriceOriginal: addonProducts[i].Price,
                  PriceType: item.PriceType,
                  DiscountRate: addonProducts[i].DiscountRate
                    ? addonProducts[i].DiscountRate
                    : 0,
                  DiscountAmount: 0,
                  TaxGroupID: addonProducts[0].SaleTaxGroupCode,
                  IsTax1IncludedInPrice: false,
                  IsTax2IncludedInPrice: false,
                  Tax1Code: '',
                  Tax1Name: '',
                  Tax1Rate: 0,
                  Tax1Amount: 0,
                  Tax2Code: '',
                  Tax2Name: '',
                  Tax2Rate: 0,
                  Tax2Amount: 0,
                  GrandAmount: addonProducts[i].Price,
                  GroupDataID: '',
                  ProductBarCode: addonProducts[i].ProductBarCode,
                  ReturnSalesBillDetailID: '',
                  DeliveryStatus: '',
                  DeliveryDate: '',
                  DeliveryTime: '',
                  DeliveryNote: '',
                  DeliveredDate: '',
                  DeliveredTime: '',
                  Remarks: '',
                  SalesAgentCode: null,
                  IsParentAddOn: false,
                  AddOnGroupCode: addonProducts[i].AddOnGroupCode,
                  ParentInvoiceDetailsID: item.SalesBillDetailsID,
                  OrignalQuantity: addonProducts[i].Quantity,
                  AddonProductDetailcode: addonProducts[i].AddOnGroupDetailCode,
                  Ingredients: 0,
                  EarnedPoints: 0,
                  RedeemPoints: 0,
                  Status: 0,
                  ProductCategoryCode: addonProducts[i].ProductCategoryCode,
                  MediaContentType: addonProducts[i].MediaContentType,
                  MediaContents: addonProducts[i].MediaContents,
                  HoldFromSale: addonProducts[i].HoldFromSale,
                  parentIndex: index + 1,
                  parentQuantity: item.Quantity,
                  AddOnParentSalesInvoiceDetailsID: item.SalesBillDetailsID,
                  EquivalentProducts: EqP,
                };
                products.push(pro);
              }
            },
          );
        }
        // console.log('update addon products......', products);
        setisAddon(true), setReturnProducts(products);
        setLoading(false);
      },
    );
  };

  const getProductsIngredients = async item => {
    setLoading(true);
    let selectedProduct = [...selectedProducts];
    await getDataById(
      ProductCardIngredientsListTable,
      'ProductBarCode',
      item.ProductBarCode,
      ingredients => {
        console.log('ingredients.....', ingredients, item);
        for (let i = 0; i < ingredients.length; i++) {
          let isFind = item?.IngredientsArray.find(
            x => x.Id === ingredients[i].Id,
          );
          if (isFind) {
            ingredients[i].isSelected = true;
          } else {
            ingredients[i].isSelected = false;
          }
        }

        setIsIngredient(true);
        setIngredientsData(ingredients);
        setIngredientProductCode(item.ProductBarCode);
        setLoading(false);
      },
    );
  };

  const searchIngredientFun = text => {
    setLoading(true);

    let filteredName = [];

    if (text || text !== '') {
      ingredientsData.filter(item => {
        if (
          item?.IngredientName?.toLowerCase().match(text?.toLowerCase()) ||
          item?.IngredientName1?.toLowerCase().match(text?.toLowerCase())
        ) {
          filteredName.push(item);
        }
      });
      // console.log('text...', text, filteredName, searchIngredient);
      setSearchIngredient(filteredName);
      setIsIngredientSearch(true);
      setLoading(false);
    } else {
      setSearchIngredient([]);
      setIsIngredientSearch(false);
      setLoading(false);
    }
  };

  const onSelectIngredintes = (item, ingredintItem, index) => {
    let ingredient = [...ingredientsData];
    let selectpro = [...selectedProducts];
    ingredient[index].isSelected = !item.isSelected;
    // console.log("onSelectIngredintes", item, index)
    selectpro.forEach(pro => {
      if (pro.ProductBarCode === item.ProductBarCode) {
        console.log('select item run', item);
        if (ingredient[index].isSelected) {
          pro.IngredientsArray.push(item);
          pro.Ingredients =
            String(pro.Ingredients) + String(item.CategoryIngredientCode) + ',';
          pro.IngredientNames =
            String(pro.IngredientNames) + String(item.IngredientName) + ',';
        } else {
          const index = pro.IngredientsArray.findIndex(
            res => res.Id === item.Id,
          );
          console.log('onSelectIngredintes ', index, pro.IngredientsArray);
          if (index > -1) {
            pro.IngredientsArray.splice(index, 1);
            pro.Ingredients = String(pro.Ingredients).replace(
              `${item.CategoryIngredientCode},`,
              '',
            );
            pro.IngredientNames = String(pro.IngredientNames).replace(
              `${item.IngredientName},`,
              '',
            );
            console.log(
              'pro.Ingredients.replace',
              pro.Ingredients,
              `${item.CategoryIngredientCode},`,
            );
          }
        }
      }
    });

    setSelectedProducts(selectpro);
    setIngredientsData(ingredient);
  };

  const addIngredientFun = async () => {
    let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
    let ingredientName = ingredientText,
      cultureCode = I18nManager.isRTL ? 'ar-SA' : 'en-US',
      productBarCode = ingredientProductCode;

    const response1 = await props.dispatch(
      ServerCall(
        UserLogin,
        `Products/CreateProductIngredient?ingredientName=${ingredientName}&cultureCode=${cultureCode}&productBarCode=${productBarCode}`,
        'GET',
      ),
    );

    console.log('add new integredient', response1);
    let ing = [];
    ing.push(response1);
    InsertProductCardIngredientsList(ing);
  };

  const onPressAddIntgredient = () => {
    setMessage(props.StringsList._407);
    setAlertType('ingredient');
    setDisplayAlert(true);
    setisPromptAlert(true);
  };

  const getDetailofProduct = async items => {
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let filterCategoryProducts = [];

    for (let i = 0; i < items.length; i++) {
      var product = items[i];

      await getDataById(
        UpdateProductDetailListTable,
        'ProductBarCode',
        product?.ProductCode,
        async productDeltail => {
          if (productDeltail.length > 0) {
            filterCategoryProducts.push(productDeltail[0]);
          }
        },
      );
    }
    // console.log('Filter Category Products', filterCategoryProducts);
    return filterCategoryProducts;
  };

  const getSelectedCategoryProducts = async (item, index) => {
    setLoading(true);
    let itemId = item
      ? item.ProductFamilyCode
      : allCategoreis[0].ProductFamilyCode;
    let selectCat = item ? item : allCategoreis[0];

    setSelectedcat(selectCat);
    setSelectedCatIndex(index);
    setToggle(false);

    setfocus(index ? index : 0);

    let catProducts = [];
    let filterCategoryProducts;

    await getDataById(
      ProductListTable,
      'ProductFamilyCode',
      itemId,
      products => {
        catProducts = products;
      },
    );
    // console.log('catProducts', catProducts);

    filterCategoryProducts = await getDetailofProduct(catProducts);
    setLoading(false);
    setCategoryProducts(filterCategoryProducts);
    if (item) {
      //alert("df")
      onSelectProduct(null, filterCategoryProducts);
    }
    setLoading(false);
  };

  const toggleFun = () => {
    setToggle(!isToggle);
    // getSelectedCategoryProducts(allCategoreis[0])
  };

  onPressBackCat = () => {
    if (noFamilyFound) {
      // getAllCategories()
      setToggle(false);
    } else {
      // getSelectedCategoryProducts(selectedcat, selectedCatIndex)
      setToggle(false);
    }
  };

  const onInvoiceClick = () => {
    let srNo = 1;
    selectedProducts.forEach(e => {
      if (e.IsParentAddOn) {
        e.srNo = srNo++;
      } else {
        e.srNo = 0;
      }
    });

    setoptionsOpen(false);
    setPaymentsOpen(false);
    if (returnInvoiceNumber) {
      setisReturnInvoice(true);
    }
    setToggle(true);
  };

  const onManuallyAddCount = async item => {
    setoptionsOpen(false);
    setPaymentsOpen(false);

    //addIngredientFun()
    let selectedProduct = [...selectedProducts];
    let sPrice = subPrice,
      tPrice = totalPrice;

    if (selectedProduct.length > 0 && manuallyCount > 0) {
      let newQuantity = manuallyCount;

      for (let i = 0; i < selectedProduct.length; i++) {
        let product = selectedProduct[i];
        if (
          product.SalesBillDetailsID === item?.SalesBillDetailsID ||
          product?.ParentInvoiceDetailsID === item.SalesBillDetailsID
        ) {
          setLoading(true);
          let Amount = Number(product.PriceOriginal * newQuantity);
          let taxAmt = await calculateTaxeGroups(
            newQuantity,
            Amount,
            product.DiscountAmount,
            product.TaxGroupID,
            1,
            null,
            0,
            TerminalConfiguration,
            product.PriceOriginal,
            product.DiscountRate,
          );
          console.log('AmountAmountAmount', taxAmt);
          let proQ,
            discount = 0;
          product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
          (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
            (product.Tax1Rate = taxAmt.Tax1Percentage
              ? taxAmt.Tax1Percentage
              : 0),
            (product.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
            (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
            (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
            (product.Tax2Rate = taxAmt?.Tax2Percentage
              ? taxAmt?.Tax2Percentage
              : 0),
            (product.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);

          if (!product.IsParentAddOn) {
            proQ =
              (product.maxQuantity > 0 ? newQuantity - 1 : newQuantity) *
              product.OrignalQuantity;
          } else {
            proQ = product.maxQuantity > 0 ? newQuantity - 1 : newQuantity;
          }
          if (proQ !== product.maxQuantity) {
            product.Quantity = newQuantity;

            if (product.DiscountRate > 0) {
              discount = taxAmt.DiscountAmount
                ? taxAmt.DiscountAmount
                : parseFloat(
                    (product.DiscountRate *
                      (product.PriceWithOutTax * newQuantity +
                        product.Tax1Amount)) /
                      100,
                  );
            }
            let GAmount = Number(
              product.PriceOriginal * newQuantity - discount,
            );

            sPrice = Number(sPrice + GAmount - product.GrandAmount);
            tPrice = Number(tPrice + GAmount - product.GrandAmount);
            product.GrandAmount = Number(GAmount);

            //;
            product.DiscountAmount = discount.toFixed(
              TerminalConfiguration.DecimalsInAmount,
            );
            product.tax = product.Tax1Amount + product.Tax2Amount;
          } else {
            setMessage(props.StringsList._230);
            setDisplayAlert(true);
            setLoading(false);
          }

          if (selectedGlobalTaxObj || globalDiscountRate > 0) {
            if (globalDiscountRate > 0) {
              globalDiscountAmountFun('', sPrice, tPrice, 'recalling');
            } else if (globalDiscountAmount > 0) {
              globalDiscountAmountFun(
                'globalDiscount',
                sPrice,
                tPrice,
                'recalling',
              );
            } else if (selectedGlobalTaxObj) {
              globalTaxFun(selectedGlobalTaxObj, sPrice, '', tPrice);
            }
            setsubPrice(sPrice);
            setmanuallyCount(1);

            setSelectedProducts(selectedProduct);
          } else {
            setmanuallyCount(1);
            setSelectedProducts(selectedProduct);
            setsubPrice(sPrice);
            setTotalPrice(tPrice);
            setLoading(false);
          }
        }
      }
    }
  };

  const onManuallyChangePrice = async item => {
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let selectedProduct = [...selectedProducts];
    let sPrice = subPrice,
      tPrice = totalPrice;

    if (selectedProduct.length > 0) {
      let newQuantity = item.Quantity;

      for (let i = 0; i < selectedProduct.length; i++) {
        let product = selectedProduct[i];
        if (
          product.SalesBillDetailsID === item?.SalesBillDetailsID &&
          manuallyCount !== item.PriceWithOutTax
        ) {
          let Amount =
            manuallyCount === item.PriceWithOutTax
              ? Number(item.PriceOriginal * item.Quantity)
              : Number(manuallyCount * item.Quantity);
          console.log(
            'calculateTaxeGroups...onManuallyChangePrice',
            Amount,
            manuallyCount,
          );
          let taxAmt = await calculateTaxeGroups(
            newQuantity,
            Amount,
            0,
            product.TaxGroupID,
            1,
            null,
            0,
            TerminalConfiguration,
            manuallyCount,
            product.DiscountRate,
          );
          console.log('calculateTaxeGroups...onManuallyChangePrice', taxAmt);
          let proQ,
            discount = 0;
          product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
          (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
            (product.Tax1Rate = taxAmt.Tax1Percentage
              ? taxAmt.Tax1Percentage
              : 0),
            (product.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
            (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
            (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
            (product.Tax2Rate = taxAmt?.Tax2Percentage
              ? taxAmt?.Tax2Percentage
              : 0),
            (product.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);
          product.PriceWithOutTax = taxAmt.Price;
          product.PriceOriginal = manuallyCount;
          if (!product.IsParentAddOn) {
            proQ =
              (product.maxQuantity > 0 ? newQuantity - 1 : newQuantity) *
              product.OrignalQuantity;
          } else {
            proQ = product.maxQuantity > 0 ? newQuantity - 1 : newQuantity;
          }
          if (proQ !== product.maxQuantity) {
            product.Quantity = newQuantity;

            if (product.DiscountRate > 0) {
              discount = taxAmt.DiscountAmount
                ? taxAmt.DiscountAmount
                : parseFloat(
                    (product.DiscountRate *
                      (product.PriceWithOutTax * newQuantity +
                        taxAmt.Tax1Amount)) /
                      100,
                  );
            }
            //console.log("slkjlfjlwjfljsljfl", product.PriceWithOutTax, newQuantity, taxAmt.Tax1Amount, discount)
            let GAmount = Number(
              product.PriceWithOutTax * newQuantity - discount,
            );

            sPrice = Number(sPrice + GAmount - product.GrandAmount);
            tPrice = Number(tPrice + GAmount - product.GrandAmount);
            product.GrandAmount = Number(GAmount);

            //;
            product.DiscountAmount = discount.toFixed(0);

            product.tax = product.Tax1Amount + product.Tax2Amount;
          } else {
            setMessage(props.StringsList._230);
            setDisplayAlert(true);
            setLoading(false);
          }
          if (globalDiscountAmount > 0) {
          }
          if (selectedGlobalTaxObj || globalDiscountAmount > 0) {
            if (selectedGlobalTaxObj) {
              globalTaxFun(selectedGlobalTaxObj, sPrice, '', tPrice);
              setsubPrice(sPrice);
              setmanuallyCount(1);
              setSelectedProducts(selectedProduct);
            } else {
              if (globalDiscountRate > 0) {
                globalDiscountAmountFun('', sPrice, tPrice, 'recalling');
              } else {
                globalDiscountAmountFun(
                  'globalDiscount',
                  sPrice,
                  tPrice,
                  'recalling',
                );
              }
              setsubPrice(sPrice);
              setmanuallyCount(1);
              setSelectedProducts(selectedProduct);
            }
          } else {
            setmanuallyCount(1);
            setSelectedProducts(selectedProduct);
            setsubPrice(sPrice);
            setTotalPrice(tPrice);
            setLoading(false);
          }
        }
      }
    }
  };

  const onManuallyAddDiscount = async (item, type) => {
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let selectedProduct = [...selectedProducts];
    let sPrice, tPrice, discount, pDiscount;
    item.DiscountAmount = Number(item.DiscountAmount);
    let dP = 0; //item.DiscountRate
    let dA = 0; //item.DiscountAmount
    let amtDisP = 0,
      pAmtP = 0;

    if (type === 'DiscountRate') {
      dA = manuallyCount === 0 ? manuallyCount : item.DiscountAmount;
      dP = manuallyCount;
    } else {
      dA = manuallyCount;
      dP = 0;
    }
    let taxAmt = await calculateTaxeGroups(
      item.Quantity,
      item.PriceOriginal * item.Quantity,
      dA,
      item.TaxGroupID,
      1,
      null,
      0,
      TerminalConfiguration,
      item.PriceWithOutTax,
      dP,
    );
    let tax = taxAmt?.Tax1Amount ? taxAmt?.Tax1Amount : 0;
    console.log(
      'calculateTaxeGroups...onManuallyAddDiscount',
      taxAmt,
      manuallyCount,
      userDiscountLimit,
      item.DiscountAmount,
    );
    // console.log("calculateTaxeGroups...", item.Quantity, item.PriceOriginal, item.DiscountAmount, item.TaxGroupID, 1, null, 0, TerminalConfiguration, item.PriceWithOutTax, item.DiscountRate)
    if (tax >= 0) {
      if (type === 'DiscountRate') {
        pDiscount =
          manuallyCount === 0
            ? 0
            : taxAmt?.DiscountAmount
            ? taxAmt.DiscountAmount
            : parseFloat(
                (manuallyCount * (item.PriceWithOutTax * item.Quantity + tax)) /
                  100,
              );
      } else {
        amtDisP =
          manuallyCount === 0
            ? 0
            : (manuallyCount / (item.GrandAmount + item.DiscountAmount)) * 100;
        pAmtP =
          manuallyCount === 0
            ? 0
            : (item.DiscountAmount / (item.GrandAmount + item.DiscountAmount)) *
              100;
        console.log(
          'manuallyCount....amtDisP',
          userDiscountLimit,
          pAmtP,
          amtDisP,
        );
        if (manuallyCount > item.GrandAmount + item.DiscountAmount) {
          setMessage(props.StringsList._440);
          setDisplayAlert(true);
          setLoading(false);
          return;
        }
        // dis = manuallyCount === 0 ? 0 : taxAmt?.DiscountAmount ? taxAmt.DiscountAmount : parseFloat(
        //   (manuallyCount *
        //     (item.PriceWithOutTax * item.Quantity +
        //       tax)) /
        //   100,
        // );
      }

      if (
        (dP <= userDiscountLimit + item.DiscountRate &&
          type === 'DiscountRate') ||
        (amtDisP <= userDiscountLimit + pAmtP && type !== 'DiscountRate')
      ) {
        if (manuallyCount === 0 && type === 'DiscountRate') {
          let disLimt =
            userDiscountLimit - Number(manuallyCount) + item.DiscountRate;
          setUserDiscountLimit(disLimt);
        } else {
          let p = 0;
          if (item.DiscountAmount > 0) {
            console.log('');
            p =
              (item.DiscountAmount / (item.GrandAmount + item.DiscountAmount)) *
              100;
          }

          let disLimt = userDiscountLimit - amtDisP + p;
          console.log(
            'manuallyCount....disLimt',
            disLimt,
            amtDisP,
            p,
            userDiscountLimit,
          );
          setUserDiscountLimit(disLimt);
        }
        if (selectedProduct.length > 0 && manuallyCount !== 0) {
          selectedProduct.forEach(async product => {
            if (product.SalesBillDetailsID === item?.SalesBillDetailsID) {
              if (type === 'DiscountRate') {
                let disLimt =
                  userDiscountLimit - manuallyCount + item.DiscountRate;
                setUserDiscountLimit(disLimt);
                sPrice = Math.abs(
                  product.DiscountAmount
                    ? subPrice +
                        item.PriceOriginal * item.Quantity -
                        pDiscount -
                        item.GrandAmount
                    : subPrice + tax - (pDiscount + product.tax),
                );

                tPrice = Math.abs(
                  product.DiscountAmount
                    ? totalPrice +
                        item.PriceOriginal * item.Quantity -
                        pDiscount -
                        item.GrandAmount
                    : totalPrice + tax - (pDiscount + product.tax),
                );

                product.GrandAmount = Number(
                  product.DiscountAmount
                    ? item.PriceOriginal * item.Quantity - pDiscount
                    : item.PriceOriginal * item.Quantity - pDiscount,
                );

                product.DiscountRate = manuallyCount === 0 ? 0 : manuallyCount;
                // console.log("DiscountAmount........", taxAmt.DiscountAmount, pDiscount)
                product.DiscountAmount =
                  manuallyCount === 0
                    ? 0
                    : taxAmt.DiscountAmount
                    ? taxAmt.DiscountAmount.toFixed(
                        TerminalConfiguration.DecimalsInAmount,
                      )
                    : pDiscount.toFixed(TerminalConfiguration.DecimalsInAmount);
                product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
                (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
                  (product.Tax1Rate = taxAmt.Tax1Percentage
                    ? taxAmt.Tax1Percentage
                    : 0),
                  (product.Tax1Amount = taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount
                    : 0),
                  (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
                  (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
                  (product.Tax2Rate = taxAmt?.Tax2Percentage
                    ? taxAmt?.Tax2Percentage
                    : 0),
                  (product.Tax2Amount = taxAmt?.Tax2Amount
                    ? taxAmt?.Tax2Amount
                    : 0);
                product.tax = product.Tax1Amount + product.Tax2Amount;
                // console.log('dddddd', manuallyCount, pDiscount);
              } else {
                let GA = item.PriceOriginal * item.Quantity;
                let GAmount = Number(GA) - Number(manuallyCount);
                sPrice = Math.abs(
                  Number(subPrice) -
                    Number(product.GrandAmount) +
                    Number(GAmount),
                );

                tPrice = Math.abs(
                  Number(totalPrice) -
                    Number(product.GrandAmount) +
                    Number(GAmount),
                );

                console.log(
                  'product.GrandAmount discount',
                  product.GrandAmount - manuallyCount,
                  product.GrandAmount,
                  GAmount,
                  product.DiscountAmount,
                  manuallyCount,
                );
                product.DiscountAmount = Number(manuallyCount);
                product.GrandAmount = GAmount;
                product.tax = tax;
                product.DiscountAmountP = 0;
              }

              setmanuallyCount(1);
            }
          });
        } else {
          let GA = item.PriceOriginal * item.Quantity;

          sPrice = Math.abs(subPrice - item.GrandAmount + GA);

          tPrice = Math.abs(totalPrice - item.GrandAmount + GA);

          item.GrandAmount = Number(GA);

          item.DiscountRate = 0;

          item.DiscountAmount = 0;
          item.tax = tax;
          item.DiscountAmountP = 0;
        }
        if (selectedGlobalTaxObj) {
          globalTaxFun(selectedGlobalTaxObj, sPrice, '', tPrice);
          setsubPrice(sPrice);
          // setTotalPrice(tPrice);
          // console.log("selectedProduct..........", selectedProduct)

          setSelectedProducts(selectedProduct);
        } else {
          setSelectedProducts(selectedProduct);
          console.log('AASDASSAD', sPrice, tPrice, selectedProduct);
          setsubPrice(sPrice);
          setTotalPrice(tPrice);
        }
      } else {
        setMessage(props.StringsList._267);
        setDisplayAlert(true);
        setLoading(false);
      }
    } else {
      setMessage(props.StringsList._267);
      setDisplayAlert(true);
      setLoading(false);
    }
  };

  const addProductToList = async (itm, type, index, proArray, SP, TP) => {
    // console.log("addProductToList item", itm)
    // getProductsIngredients(itm)

    setLoading(true);
    setoptionsOpen(false);
    setPaymentsOpen(false);

    // createInvoiceStyle()
    if (!returnInvoiceNumber && !invoiceNumber) onNewInvoice();

    let item = {...itm},
      selectedProduct = [...selectedProducts],
      sPrice = subPrice,
      tPrice = totalPrice;

    if (terminalSetup?.BeepSound === 'true') {
      SoundPlay();
    }

    if (retunProducts.length > 0 && !itm.IsParentAddOn) {
      let retp = [...retunProducts];
      // console.log("Retun Products...", retp)

      retp.splice(index, 1);

      setReturnProducts(retp);
    }

    let isAlredySelected = false;
    if (selectedProducts.length > 0) {
      let newQuantity;

      // let taxAmt = await calculateTaxeGroups(newQuantity, Amount, item.DiscountAmount, item.TaxGroupID, 1, null, 0, TerminalConfiguration, item.PriceOriginal, item.DiscountRate)
      // selectedProduct.map(async product =>
      for (let i = 0; i < selectedProduct.length; i++) {
        let product = selectedProduct[i];
        if (
          product?.ProductBarCode === item?.ProductBarCode &&
          product?.PriceOriginal === item?.PriceOriginal
        ) {
          newQuantity =
            type !== 'increment' ? product.Quantity - 1 : product.Quantity + 1;
        }
        console.log('add Product To List... item', item);

        if (
          ((product?.ProductBarCode === item?.ProductBarCode &&
            product?.PriceOriginal === item?.PriceOriginal) ||
            product?.AddOnParentSalesInvoiceDetailsID ===
              item.SalesBillDetailsID) &&
          type !== 'returnInvoice'
        ) {
          // console.log("calculateTaxeGroups...", taxAmt)

          let discount = 0;
          isAlredySelected = true;
          let Amount = Number(product.PriceOriginal * newQuantity),
            pd = product.DiscountRate ? product.DiscountAmount : 0,
            dr = product.DiscountRate
              ? product.DiscountRate
              : product.DiscountAmountP;
          // console.log("Amount.....", newQuantity, Amount, product.DiscountAmount, product.TaxGroupID, 1, null, 0, product.PriceOriginal, product.DiscountRate, product.ProductName)
          let taxAmt = await calculateTaxeGroups(
            newQuantity,
            Amount,
            pd,
            product.TaxGroupID,
            1,
            null,
            0,
            TerminalConfiguration,
            product.PriceOriginal,
            dr,
          );
          //  console.log("Amount.....taxAmt", taxAmt)
          product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
          (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
            (product.Tax1Rate = taxAmt.Tax1Percentage
              ? taxAmt.Tax1Percentage
              : 0),
            (product.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
            (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
            (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
            (product.Tax2Rate = taxAmt?.Tax2Percentage
              ? taxAmt?.Tax2Percentage
              : 0),
            (product.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);

          if (type === 'increment') {
            // productIncrement(taxAmt, product)
            if (taxAmt) {
              let proQ;

              if (!product.IsParentAddOn) {
                proQ =
                  type === 'increment'
                    ? (newQuantity - 1) * product.OrignalQuantity
                    : newQuantity * product.OrignalQuantity;
              } else {
                proQ = type === 'increment' ? newQuantity - 1 : newQuantity;
              }
              // console.log("proQ !== product.maxQuantity...", proQ, newQuantity, product)
              if (proQ !== product.maxQuantity) {
                product.Quantity = newQuantity;

                if (dr > 0) {
                  discount = taxAmt.DiscountAmount
                    ? taxAmt.DiscountAmount
                    : parseFloat(
                        (dr *
                          (product.PriceWithOutTax * newQuantity +
                            taxAmt.Tax1Amount)) /
                          100,
                      );
                }
                let GAmount = Number(
                  product.PriceOriginal * newQuantity - discount,
                );

                sPrice = Number(sPrice + GAmount - product.GrandAmount);
                tPrice = Number(tPrice + GAmount - product.GrandAmount);
                product.GrandAmount = Number(GAmount);

                //;
                product.DiscountAmount = discount.toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                );
                product.tax = product.Tax1Amount + product.Tax2Amount;
              } else {
                // console.log("asmdfjsagjdfjsadfgj")
                setMessage(props.StringsList._230);
                setDisplayAlert(true);
                setLoading(false);
              }
            }
          } else if (type === 'decrement') {
            // console.log("newQuantity", newQuantity)
            product.Quantity = newQuantity;
            if (dr > 0) {
              discount = taxAmt.DiscountAmount
                ? taxAmt.DiscountAmount
                : parseFloat(
                    (dr *
                      (product.PriceWithOutTax * product.Quantity +
                        taxAmt.Tax1Amount)) /
                      100,
                  );
            }
            let GAmount = Number(
              product.PriceOriginal * product.Quantity - discount,
            );
            sPrice = Number(sPrice + GAmount - product.GrandAmount);
            tPrice = Number(tPrice + GAmount - product.GrandAmount);
            product.GrandAmount = Number(GAmount);

            //;
            product.DiscountAmount = discount.toFixed(
              TerminalConfiguration.DecimalsInAmount,
            );

            product.tax = product.Tax1Amount + product.Tax2Amount;

            // product.GrandAmount = Number(
            //   ((product.Price) * product.Quantity) - discount,
            // );
            // sPrice = Number(sPrice - product.Price + product.DiscountAmount - discount);

            // tPrice = Number(
            //   tPrice -
            //   product.Price + product.DiscountAmount - discount
            // ); //;
            // product.DiscountAmount = discount
          }
        }
      }
    } else {
      let time = moment().format('HH:mm:ss');
      setStartTime(time);
    }
    if (!isAlredySelected) {
      // addProductAsNew(item)

      if (!isReturnInvoice) {
        if (item.parentQuantity > 0) {
          item.Quantity = item.parentQuantity;
        } else {
          item.Quantity = 1;
        }

        let Amount = Number(item.PriceOriginal) * item.Quantity;
        let taxAmt = await calculateTaxeGroups(
          item.Quantity,
          Amount,
          item.DiscountAmount,
          item.TaxGroupID,
          1,
          null,
          0,
          TerminalConfiguration,
          item.PriceOriginal,
          item.DiscountRate,
        );
        // console.log("calculateTaxeGroups...", taxAmt, item)
        console.log('discount else', taxAmt, item);
        item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
        (item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
          (item.Tax1Rate = taxAmt.Tax1Percentage ? taxAmt.Tax1Percentage : 0),
          (item.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
          (item.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
          (item.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
          (item.Tax2Rate = taxAmt?.Tax2Percentage ? taxAmt?.Tax2Percentage : 0),
          (item.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);
        let tax = item.Tax1Amount + item.Tax2Amount;
        item.Price = Number(taxAmt.Price + tax);
        item.PriceWithOutTax = Number(taxAmt.Price);
        item.IsTax1IncludedInPrice = taxAmt?.IsTax1IncludedInPrice ? 1 : 0;
        item.IsTax2IncludedInPrice = taxAmt?.IsTax2IncludedInPrice ? 1 : 0;
        item.IngredientsArray = [];
        item.IngredientNames = '';

        item.tax = Number(tax);

        item.GrandAmount = Number(taxAmt.Price * item.Quantity) + tax;
        item.SalesBillDetailsID = uuid.v4();

        sPrice = Number(subPrice + taxAmt.Price * item.Quantity + tax);

        tPrice = Number(totalPrice + taxAmt.Price * item.Quantity + tax);

        if (item.IsParentAddOn) {
          selectedProduct.push(item);
        } else {
          selectedProduct.splice(item.parentIndex, 0, item);
        }
      } else {
        if (type === 'addnos') {
          sPrice = Number(subPrice + SP);
          tPrice = Number(totalPrice + TP);
          selectedProduct = selectedProduct.concat(proArray);
          // console.log("selected Product addons", selectedProduct)
        } else {
          sPrice = Number(subPrice + item.GrandAmount - item.DiscountAmount);
          tPrice = Number(totalPrice + item.GrandAmount - item.DiscountAmount);

          if (item.IsParentAddOn) {
            selectedProduct.push(item);
          } else {
            if (!isReturnInvoice) {
              selectedProduct.splice(item.parentIndex, 0, item);
            } else {
              selectedProduct.push(item);
            }
          }
        }
      }
    }
    if (selectedGlobalTaxObj || globalDiscountRate > 0) {
      if (globalDiscountRate > 0) {
        globalDiscountAmountFun('', sPrice, tPrice, 'recalling');
      } else if (globalDiscountAmount > 0) {
        globalDiscountAmountFun('globalDiscount', sPrice, tPrice, 'recalling');
      } else if (selectedGlobalTaxObj) {
        globalTaxFun(selectedGlobalTaxObj, sPrice, '', tPrice);
      }
      setsubPrice(sPrice);

      setSelectedProducts(selectedProduct);
    } else {
      setTotalPrice(tPrice);
      setLoading(false);
    }
    setsubPrice(sPrice);
    setStateUpdate(true);

    setSelectedProducts(selectedProduct);
    // let number = selectedProduct.filter(w => (w.IsParentAddOn === 1 || w.IsParentAddOn === true)).length
    //console.log("number........", number, selectedProduct)
    // setNumberOfItems(number)
  };

  addProductAsNew = async (item, sPrice, tPrice, selectedProduct) => {
    if (!isReturnInvoice) {
      if (item.parentQuantity > 0) {
        item.Quantity = item.parentQuantity;
      } else {
        item.Quantity = 1;
      }

      let Amount = Number(item.PriceOriginal) * item.Quantity;
      let taxAmt = await calculateTaxeGroups(
        item.Quantity,
        Amount,
        item.DiscountAmount,
        item.TaxGroupID,
        1,
        null,
        0,
        TerminalConfiguration,
        item.PriceOriginal,
        item.DiscountRate,
      );
      // console.log("calculateTaxeGroups...", taxAmt, item)
      console.log('discount else', taxAmt, item);
      item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
      (item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
        (item.Tax1Rate = taxAmt.Tax1Percentage ? taxAmt.Tax1Percentage : 0),
        (item.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
        (item.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
        (item.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
        (item.Tax2Rate = taxAmt?.Tax2Percentage ? taxAmt?.Tax2Percentage : 0),
        (item.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);
      let tax = item.Tax1Amount + item.Tax2Amount;
      item.Price = Number(taxAmt.Price + tax);
      item.PriceWithOutTax = Number(taxAmt.Price);
      item.IsTax1IncludedInPrice = taxAmt?.IsTax1IncludedInPrice ? 1 : 0;
      item.IsTax2IncludedInPrice = taxAmt?.IsTax2IncludedInPrice ? 1 : 0;
      item.IngredientsArray = [];
      item.IngredientNames = '';

      item.tax = Number(tax);

      item.GrandAmount = Number(taxAmt.Price * item.Quantity) + tax;
      item.SalesBillDetailsID = uuid.v4();

      sPrice = Number(subPrice + taxAmt.Price * item.Quantity + tax);

      tPrice = Number(totalPrice + taxAmt.Price * item.Quantity + tax);

      if (item.IsParentAddOn) {
        selectedProduct.push(item);
      } else {
        selectedProduct.splice(item.parentIndex, 0, item);
      }
    } else {
      if (type === 'addnos') {
        sPrice = Number(subPrice + SP);
        tPrice = Number(totalPrice + TP);
        selectedProduct = selectedProduct.concat(proArray);
        // console.log("selected Product addons", selectedProduct)
      } else {
        sPrice = Number(subPrice + item.GrandAmount - item.DiscountAmount);
        tPrice = Number(totalPrice + item.GrandAmount - item.DiscountAmount);

        if (item.IsParentAddOn) {
          selectedProduct.push(item);
        } else {
          if (!isReturnInvoice) {
            selectedProduct.splice(item.parentIndex, 0, item);
          } else {
            selectedProduct.push(item);
          }
        }
      }
    }

    if (selectedGlobalTaxObj || globalDiscountRate > 0) {
      if (globalDiscountRate > 0) {
        globalDiscountAmountFun('', sPrice, tPrice, 'recalling');
      } else if (globalDiscountAmount > 0) {
        globalDiscountAmountFun('globalDiscount', sPrice, tPrice, 'recalling');
      } else if (selectedGlobalTaxObj) {
        globalTaxFun(selectedGlobalTaxObj, sPrice, '', tPrice);
      }
      setsubPrice(sPrice);

      setSelectedProducts(selectedProduct);
    } else {
      setTotalPrice(tPrice);
      setLoading(false);
    }
    setsubPrice(sPrice);
    setStateUpdate(true);

    setSelectedProducts(selectedProduct);
  };

  const onSelectProduct = (item, filterCategoryProducts) => {
    // console.log('onSelectProduct........', item);

    if (drawerSetupArr.isInitialCashSet === 'false') {
      onNewInvoice();
    } else {
      // onNewInvoice();
      let newArray = [];
      let categoryProduct = item
        ? [...categoryProducts]
        : filterCategoryProducts;

      if (item) {
        categoryProduct.forEach(product => {
          if (product?.ProductBarCode === item?.ProductBarCode) {
            product.isSelected = true;
            product.Quantity = item?.Quantity ? item.Quantity : 1;
            newArray.push(product);
          } else {
            newArray.push(product);
          }
        });
        addProductToList(item, 'increment');
      } else {
        if (selectedProducts.length > 0) {
          categoryProduct.forEach(product => {
            let cartItems = selectedProducts.find(
              x => x.ProductBarCode === product.ProductBarCode,
            );
            if (cartItems) {
              product.isSelected = true;
              product.Quantity = item?.Quantity ? item.Quantity : 1;
              newArray.push(product);
            } else {
              product.isSelected = false;
              newArray.push(product);
            }
          });
        }
      }
      // console.log('categoryProduct.2..', filterCategoryProducts);
      setCategoryProducts(
        newArray.length > 0 ? newArray : filterCategoryProducts,
      );
    }
  };

  const deleteItem = (item, index) => {
    // console.log("deleteItem..........", item)
    let sPrice = subPrice,
      tPrice = totalPrice;

    let remainProduct = [...selectedProducts];
    let addOn = remainProduct.filter(itm => {
      if (itm.ParentInvoiceDetailsID === item.SalesBillDetailsID) {
        sPrice = sPrice - itm.GrandAmount;

        tPrice = tPrice - itm.GrandAmount;
        return itm;
      }
    });

    remainProduct[index].isSelected = false;

    // console.log('addOn', tPrice, sPrice);
    sPrice = sPrice - item.GrandAmount;

    tPrice = tPrice - item.GrandAmount;
    // console.log('addOn', tPrice, sPrice);
    remainProduct.splice(index, addOn.length + 1);
    let srNo = 1;
    let rm = [];
    remainProduct.filter(e => {
      if (e.IsParentAddOn) {
        e.srNo = srNo++;
      } else {
        e.srNo = 0;
      }
      // console.log("e.srNo.......", e.srNo)
      rm.push(e);
    });
    // console.log("rem.............................", rm)
    setNumberOfItems(srNo);
    setSelectedProducts(rm);
    setsubPrice(sPrice);
    if (
      (selectedGlobalTaxObj || globalDiscountRate > 0) &&
      remainProduct.length > 0
    ) {
      if (globalDiscountRate > 0) {
        globalDiscountAmountFun('', sPrice, tPrice, 'recalling');
      } else if (globalDiscountAmount > 0) {
        globalDiscountAmountFun('globalDiscount', sPrice, tPrice, 'recalling');
      } else if (selectedGlobalTaxObj) {
        globalTaxFun(selectedGlobalTaxObj, sPrice, '', tPrice);
      }
    } else {
      setTotalPrice(tPrice);
    }
    let number = remainProduct.filter(
      w => w.IsParentAddOn === 1 || w.IsParentAddOn === true,
    ).length;
    // console.log("number........", number, selectedProduct)
    setNumberOfItems(number);
    if (remainProduct.length === 0) {
      setTotalPrice(0);
      setGlobalTax(0);
      if (!returnInvoiceNumber) {
        setToggle(false);

        if (!noFamilyFound) {
          getSelectedCategoryProducts();
        } else {
          getAllCategories('isRestState');
        }
      }
    }
  };

  const createInvoiceNumber = () => {
    getData(DrawerSetupTable, cb => {
      // console.log(' DrawerSetupTable', cb);
      setDrawerSetupArr(cb[0]);
    });
    getData(TerminalConfigurationTable, cb => {
      console.log(
        'TerminalConfigurationTable order number is',
        cb[0]?.LastOrderNumber,
      );

      let preZero = '0000000';
      let silceNumber =
        Number(cb[0]?.LastOrderNumber) >= 99999
          ? preZero.length - 5
          : Number(cb[0]?.LastOrderNumber) >= 9999
          ? preZero.length - 4
          : Number(cb[0]?.LastOrderNumber) >= 999
          ? preZero.length - 3
          : Number(cb[0]?.LastOrderNumber) >= 99
          ? preZero.length - 2
          : Number(cb[0]?.LastOrderNumber) >= 9
          ? preZero.length - 1
          : preZero.length;
      let invoiceNumber =
        Number(cb[0]?.LastOrderNumber) >= 999999
          ? cb[0].BillPrefix + '-' + (Number(cb[0].LastOrderNumber) + 1)
          : cb[0].BillPrefix +
            '-' +
            preZero.slice(1 - silceNumber) +
            (Number(cb[0].LastOrderNumber) + 1);

      setInvoiceNumber(invoiceNumber);
      setTerminalConfiguration(cb[0]);
    });
    setSalesBillID(uuid.v4());
    setOptions([
      {label: props.StringsList._373, value: 'holdInvoice'},
      {label: props.StringsList._436, value: 'scanner'},
      {label: props.StringsList._30, value: 'buyer'},
      {label: props.StringsList._437, value: 'loyaltyCard'},
    ]);
  };

  const createReturnInvoiceNumber = () => {
    getData(DrawerSetupTable, cb => {
      // console.log(' DrawerSetupTable', cb);
      setDrawerSetupArr(cb[0]);
    });
    getData(TerminalConfigurationTable, cb => {
      let preZero = '0000000';
      let silceNumber =
        Number(cb[0]?.LastReturnBillNumber) >= 99999
          ? preZero.length - 5
          : Number(cb[0]?.LastReturnBillNumber) >= 9999
          ? preZero.length - 4
          : Number(cb[0]?.LastReturnBillNumber) >= 999
          ? preZero.length - 3
          : Number(cb[0]?.LastReturnBillNumber) >= 99
          ? preZero.length - 2
          : Number(cb[0]?.LastReturnBillNumber) >= 9
          ? preZero.length - 1
          : preZero.length;
      let invoiceNumber =
        Number(cb[0]?.LastReturnBillNumber) >= 999999
          ? cb[0].BillReturnPrefix +
            '-' +
            (Number(cb[0].LastReturnBillNumber) + 1)
          : cb[0].BillReturnPrefix +
            '-' +
            preZero.slice(1 - silceNumber) +
            (Number(cb[0].LastReturnBillNumber) + 1);

      console.log('Return invoice Number', invoiceNumber);
      setReturnInvoiceNumber(invoiceNumber);
      setSalesBillID(uuid.v4());
      setTerminalConfiguration(cb[0]);
    });
  };
  const updateState = async () => {
    setLoading(true);
    setIsSearch(false);
    setPaymentAdded(false);
    setPrintType(null);
    props.navigation.navigate('home', {id: undefined});
    setOrderCode(true);
    setToggle(false);
    setSearchText('');
    setShowButton(false);
    selectedProducts.forEach(item => {
      item.isSelected = false;
    });
    list.isOrderPlaced = false;

    setFocusSearch(false);
    setOrderValue(0);
    setCustomerNotes('');
    setSelectedOrderType(0);
    setSelectedProducts([]);
    setsubPrice(0);
    setOrderDetails(null);
    setProductIndex(null);
    setNotesModal(false);
    setglobalDiscountAmount(0);
    setTotalPrice(0);
    setRailStart(false);
    setNumberOfItems(0);
    setAdvancePaidInCash(0);
    setIngredientsData([]);
    setDueAmount(0);
    setPaymentsValue(null);
    setToggle(false);
    setPopup(false);
    seOptionsValue(null);
    setUriImage(null);
    setInvoice(false);
    setShortInvoice(false);
    setTerminalSetup(false);
    setPairPrinterFamily(false);
    setInvoiceNumber(null);
    setReturnInvoiceNumber(null);
    setSalesBillID(null);
    setCreditAmount(0);
    setGlobalDiscountRate(0);
    setStartTime(null);
    setisPromptAlert(false);
    setDisplayAlert(false);
    setisHoldInvoices(false);
    setMessage('');
    setHoldInvoiceName('');
    setScanner(false);
    setAlertValue(null);
    setAlertType(null);
    setReturnProducts([]);
    setisReturnInvoice(false);
    setGlobalTax(0);
    setEarnPointCArry([]);
    setEarnPointPArry([]);
    setEarnPointIArry([]);
    setBuyerInfo(null);
    setRedeemPoints(0);
    setCheckLoyalityReward(false);
    setStatus(0);
    setGlobalTaxObj(null);
    setSelectedGlobalTaxObj(null);
    setoptionsOpen(false);
    setPaymentsOpen(false);
    setOrderType({id: 0, value: 'Select Type'});
    setPlaceWithPay(false);
    list.ordID = 0;
    list.billHasOrder = false;

    if (!noFamilyFound) {
      getSelectedCategoryProducts();
    } else {
      getAllCategories('isRestState');
    }
    setUserDiscountLimit(userConfiguration.DiscountLimit);
    setInvoiceDate(null);
    setLoading(false);
  };
  const restState = async () => {
    setOptions(
      userConfiguration.SalesRefundAllowed === 1
        ? [
            {label: props.StringsList._32, value: 'getHoldInvoice'},

            {label: props.StringsList._319, value: 'returnBill'},
            {label: props.StringsList._30, value: 'buyer'},
            {label: props.StringsList._437, value: 'loyaltyCard'},
          ]
        : [
            {label: props.StringsList._32, value: 'getHoldInvoice'},
            {label: props.StringsList._30, value: 'buyer'},
            {label: props.StringsList._437, value: 'loyaltyCard'},
          ],
    );
    setLoading(true);
    selectedProducts.forEach(item => {
      item.isSelected = false;
    });
    setOrderCode(true);
    setSelectedProducts([]);
    setsubPrice(0);
    setglobalDiscountAmount(0);
    setTotalPrice(0);
    //  await getAllCategories();
    setNumberOfItems(0);
    setSearchText('');
    setAdvancePaidInCash(0);
    setIngredientsData([]);
    setDueAmount(0);
    setPaymentsValue(null);
    setToggle(false);
    setPopup(false);
    seOptionsValue(null);
    setUriImage(null);
    setInvoice(false);
    setTerminalSetup(false);
    setPairPrinterFamily(false);
    setInvoiceNumber(null);
    setReturnInvoiceNumber(null);
    setSalesBillID(null);
    setCreditAmount(0);
    setGlobalDiscountRate(0);
    setStartTime(null);
    setisPromptAlert(false);
    setDisplayAlert(false);
    setisHoldInvoices(false);
    setMessage('');
    setHoldInvoiceName('');
    setScanner(false);
    setAlertValue(null);
    setAlertType(null);
    setReturnProducts([]);
    setisReturnInvoice(false);
    setLoading(false);
    setGlobalTax(0);
    setEarnPointCArry([]);
    setEarnPointPArry([]);
    setEarnPointIArry([]);
    setBuyerInfo(null);
    setRedeemPoints(0);
    setCheckLoyalityReward(false);
    setStatus(0);
    setGlobalTaxObj(null);
    setSelectedGlobalTaxObj(null);
    setoptionsOpen(false);
    setPaymentsOpen(false);
    setOrderType(1);
    //  console.log("flatListRef.current", flatListRef.current)
    if (!noFamilyFound) {
      getSelectedCategoryProducts();
    } else {
      getAllCategories('isRestState');
    }
    setUserDiscountLimit(userConfiguration.DiscountLimit);
    await flatListRef.current.scrollToIndex({index: 0});

    // databaseBackup()
  };

  const getDrawerSetting = () => {
    getData(DrawerSetupTable, cb => {
      setDrawerSetupArr(cb[0]);
    });
  };

  const onNewInvoice = async isCreateInvoice => {
    //

    //console.log("drawerSetupArrdrawerSetupArrdrawerSetupArrdrawerSetupArr", drawerSetupArr)

    if (drawerSetupArr.isInitialCashSet === 'false') {
      viewref.current?.slideInRight(280);
      setIsDrawar(!isDrawar);
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES,
      );
      createInvoiceNumber();
      ref_searchBar.current.focus();
    }

    // await RNPrint.print({
    //   html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>',
    //   paperSize: 'receipt'
    // })
  };

  const emptyAsyncTableObj = async () => {
    try {
      let table = await AsyncStorage.getItem('SELECTED_TABLE');
      console.log(JSON.stringify(table));
      await AsyncStorage.removeItem('SELECTED_TABLE');
      console.log('Table Removed');
      setEnableTbut(true);
      setStorageItems(null);
    } catch (e) {
      console.log(e, 'error');
    }
  };

  const onClickCancel = async () => {
    // PrinterNativeModule.printing('react native calling....', uriImage);
    if (invoiceNumber) {
      setOptions(
        userConfiguration.SalesRefundAllowed === 1
          ? [
              {label: props.StringsList._32, value: 'getHoldInvoice'},

              {label: props.StringsList._319, value: 'returnBill'},
              {label: props.StringsList._30, value: 'buyer'},
              {label: props.StringsList._437, value: 'loyaltyCard'},
            ]
          : [
              {label: props.StringsList._32, value: 'getHoldInvoice'},
              {label: props.StringsList._30, value: 'buyer'},
              {label: props.StringsList._437, value: 'loyaltyCard'},
            ],
      );
      restState();
      emptyAsyncTableObj();
    } else {
      // props.navigation.goBack();

      props.navigation.navigate('home');
    }
  };

  const paymentMethodSelect = async item => {
    // console.log("paymentsValuepaymentsValue", paymentsValue)

    if (selectedProducts.length > 0 && paymentsValue) {
      let ConnectedBluetoothInfo = await AsyncStorage.getItem(
        'ConnectedBluetoothInfo',
      );
      if (ConnectedBluetoothInfo) {
        console.log('ConnectedBluetoothInfo', ConnectedBluetoothInfo);
        let printAdress = ConnectedBluetoothInfo?.split('|');
        setPrinterMacAddress(printAdress[1]);
        setPrinterName(printAdress[0]);
      }

      let checkZeroPrice = selectedProducts.some(p => p.PriceOriginal === 0);
      if (checkZeroPrice) {
        setPaymentsValue(null);
        setMessage(props.StringsList._270);
        setDisplayAlert(true);
      } else {
        let selP = payments.filter(e => e.PaymentType === paymentsValue);
        console.log('setSelectedPyamentMethod', selP[0]);
        setSelectedPyamentMethod(selP[0]);
        if (
          buyerInfo?.LoyaltyCard &&
          !checkLoyalityReward &&
          redeemPoints > 0
        ) {
          checkLoyalitRewardsFun();
          setCheckLoyalityReward(true);
        } else {
          if (paymentsValue === '2') {
            if (buyerInfo) {
              if (!isPopup) {
                viewref.current?.slideInRight(280);
                setPopup(!isPopup);
              } else {
                setPaymentsValue(null);
                viewref.current?.fadeOutRight().then(() => setPopup(!isPopup));
              }
            } else {
              // setSelectedPyamentMethod(null)
              setPaymentsValue(null);
              setMessage(props.StringsList._367);
              setDisplayAlert(true);
            }
            // createInvoiceStyle()
          } else if (paymentsValue === '4' || paymentsValue === '5') {
            if (!isPopup) {
              viewref.current?.slideInRight(280);
              setPopup(!isPopup);
            } else {
              setPaymentsValue(null);
              viewref.current?.fadeOutRight().then(() => setPopup(!isPopup));
            }

            // setLoading(false);
          } else {
            paymentProcess(null, selP[0]);
          }
        }
      }
    } else {
      if (paymentsValue) {
        
      }

      setPaymentsValue(null);
    }
  };

  const paymentProcess = (ADamount, selP) => {
    console.log('paymentProcess........');
    setLoading(true);

    //getDataURL()

    setUriImage(null);
    setTimeout(() => {
      console.log('paymentProcess........setTimeout');
      selectedProductUpdate();
      saleBill(ADamount, selP);
      if (returnInvoiceNumber) {
        updateReturnTerminalConfiguration();
      } else {
        updateTerminalConfiguration();
      }
      setInvoice(true);
      setLoading(false);
    }, 1000);
  };
  // A4PrinterStyle = async () => {

  //   await RNPrint.print({
  //     html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>'
  //   })

  // }
  

  useEffect(() => {
    paymentMethodSelect();
  }, [paymentsValue]);

  useEffect(() => {
    otherOptions();
  }, [optionsValue]);
  useMemo(async () => {
    if (placedwithPay) {
      let isOrderPlaced = await placeOrderWithPay();
      if (isOrderPlaced) paymentMethodSelect();
    } else {
      paymentMethodSelect();
    }
  }, [paymentsValue]);

  const otherOptions = () => {
    // console.log("paymentsValue in buyer optionsValue", optionsValue)

    if (optionsValue === 'holdInvoice') {
      if (selectedProducts.length > 0) {
        setMessage(props.StringsList._78);
        setAlertType('holdInvoice');
        setDisplayAlert(true);
        setisPromptAlert(true);
        // holdInvoiceFun();
      } else {
        let msg = errorMessages.GetCounterMessage(
          'noItemUnableHold',
          props.StringsList,
        );
        setMessage(msg);
        setDisplayAlert(true);
        seOptionsValue(null);
      }
    } else if (optionsValue === 'getHoldInvoice') {
      setisHoldInvoices(true);
      seOptionsValue(null);
      // getHoldInvoiveFun();
    } else if (optionsValue === 'scanner') {
      setScanner(true);
      seOptionsValue(null);
    } else if (optionsValue === 'returnBill') {
      setMessage(props.StringsList._63);
      setAlertType('returnInvoice');
      setDisplayAlert(true);
      setisPromptAlert(true);
    } else if (optionsValue === 'buyer') {
      //  console.log("paymentsValue in buyer", paymentsValue, isBuyer, buyerViewRef, viewref)
      if (!isBuyer) {
        buyerViewRef.current?.slideInRight(280);
        setisBuyer(!isBuyer);
      } else {
        // console.log("paymentsValue in buyer else")
        seOptionsValue(null);
        buyerViewRef.current?.fadeOutRight().then(() => setisBuyer(!isBuyer));
      }
    } else if (optionsValue === 'loyaltyCard') {
      // console.log("paymentsValue in buyer", redeemPoints)
      if (!isLoyaltyCard) {
        loyaltyCardViewRef.current?.slideInRight(280);
        setIsLoyaltyCard(!isLoyaltyCard);
      } else {
        seOptionsValue(null);
        loyaltyCardViewRef.current
          ?.fadeOutRight()
          .then(() => setIsLoyaltyCard(!isLoyaltyCard));
      }
    }
  };

  const onChangeText = (type, text, item) => {
    // console.log('akhdkfhkasdhkf', type, text);
    if (type === 'holdInvoice') {
      setHoldInvoiceName(text);
      setAlertValue(text);
    } else if (type === 'returnInvoice') {
      setAlertValue(text);
    } else if (type === 'searchText') {
      setSearchText(text);
    } else if (type === 'ingredient') {
      setIngredientText(text);
      setAlertValue(text);
    } else {
      setmanuallyCount(Number(text));
    }
  };

  const onEndEditing = (type, item) => {
    // console.log("onEndEditing..", type, item)
    if (type === 'manuallyCount') {
      onManuallyAddCount(item);
    } else if (type === 'DiscountAmount') {
      onManuallyAddDiscount(item);
    } else if (type === 'DiscountRate') {
      onManuallyAddDiscount(item, 'DiscountRate');
    } else if (type === 'globalDiscount') {
      globalDiscountAmountFun(type);
    } else if (type === 'globalDiscountP') {
      globalDiscountAmountFun(type);
    } else if (type === 'cashPaid') {
      cashPaidAmountFun();
    } else if (type === 'changePrice') {
      onManuallyChangePrice(item);
    }
  };

  const searchTextFun = e => {
    //  console.log("searchText", searchText)

    let text = searchText.toLowerCase();
    let filteredName = [];
    //console.log('text...', text || text !== '');
    if (text && text !== '') {
      //console.log("searchText..", text.length)
      setbarCodeText(text);

      if (barCode) {
        setLoading(true);
        onSuccessScan(text);
        ref_searchBar.current.focus();
        setSearchText('');
      } else {
        getData(UpdateProductDetailListTable, productsDetail => {
          productsDetail.filter(item => {
            if (
              item.ProductName.toLowerCase().match(text) ||
              item.ProductBarCode.toLowerCase().match(text) ||
              item.ProductName2.toLowerCase().match(text)
            ) {
              filteredName.push(item);
            }
          });
          setCategoryProducts(filteredName);
          setLoading(false);
        });
      }
    } else {
      if (!barCode) {
        getAllCategories(null);
      }
      setLoading(false);
    }
  };

  toggleSearchScan = () => {
    setBarCode(!barCode);
    ref_searchBar.current.focus();
    setbarCodeText('');
    //  Keyboard.dismiss()
  };

  const onCapture = uri => {
    captureRef(viewShotRef.current, {
      format: 'png',
      quality: 1.0,
    }).then(
      urii => {
        // setUriImage(urii);
      },
      error => console.error('Oops, snapshot failed', error),
    );
  };

  const onQRImage = () => {
    captureRef(qrRef2.current, {
      format: 'png',
      quality: 1.0,
    }).then(
      async urii => {
        setUriImage(urii);
        //console.log("invoice info object", globalDiscountAmount, sumOfProductDiscount)

        let invoiceTypeE = !companyVATRegistor
          ? ' Ordinary sales invoice'
          : totalPrice < 1000
          ? 'Simplified tax invoice'
          : 'Tax invoice';
        let invoiceTypeA = !companyVATRegistor
          ? 'فاتورة مبيعات عادية'
          : totalPrice < 1000
          ? 'فاتورة ضريبية مبسطة'
          : 'فاتورة ضريبية';
        let currentDate = moment().format('DD/MM/YYYY HH:mm:ss');

        //         let whiteSpaceName = "";
        //         if (w[w.length - 1].length < 12) {
        //           whiteSpaceName = "            "
        //           // console.log("whiteSpace before trim", whiteSpaceName.length)
        //           whiteSpaceName = whiteSpaceName.slice(w[w.length - 1].length, whiteSpaceName.length)
        //           // console.log("whiteSpace after trim", whiteSpaceName.length)
        //         }
        let whiteSpace = '            '; // 12
        let totalAmountSpace = whiteSpace.slice(
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length,
          whiteSpace.length,
        );
        let subPriceSpce = whiteSpace.slice(
          (subPrice - sumOfProductDiscount - sumOfProductTax).toFixed(
            TerminalConfiguration.DecimalsInAmount,
          ).length,
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length,
        );
        let taxSpace = whiteSpace.slice(
          (globalTax + sumOfProductTax).toFixed(
            TerminalConfiguration.DecimalsInAmount,
          ).length,
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length,
        );
        let discountSpace = whiteSpace.slice(
          (globalDiscountAmount + sumOfProductDiscount).toFixed(
            TerminalConfiguration.DecimalsInAmount,
          ).length,
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length,
        );
        let invoiceInfoObj = [
          {
            printerMacAddress: printerMacAddress,
            printerName: printerName,
            tagNo: terminalSetup.StartFrom,
            invoiceNumber: invoiceNumber,
            totalPrice: totalPrice.toFixed(
              TerminalConfiguration.DecimalsInAmount,
            ),
            subPrice: (
              subPrice -
              sumOfProductDiscount -
              sumOfProductTax
            ).toFixed(TerminalConfiguration.DecimalsInAmount),
            globalDiscountAmount: globalDiscountAmount,
            salesmanName: selectedAgent?.SalesAgentName
              ? selectedAgent?.SalesAgentName
              : TerminalConfiguration?.SalesAgentName,
            TerminalCode: TerminalConfiguration?.TerminalCode,
            // sumOfProductTax:sumOfProductTax,
            totalTax: (globalTax + sumOfProductTax).toFixed(
              TerminalConfiguration.DecimalsInAmount,
            ),
            totalDiscount: (
              globalDiscountAmount + sumOfProductDiscount
            ).toFixed(TerminalConfiguration.DecimalsInAmount),
            paymentType: selectedPyamentMethod?.PaymentTypeName,
            totalAmountSpace: totalAmountSpace,
            subPriceSpce: subPriceSpce,
            taxSpace: taxSpace,
            discountSpace: discountSpace,
            currentDate: currentDate,
            ar: I18nManager.isRTL ? 'ar' : 'en',
            ...TerminalConfiguration,
            invoiceType: I18nManager.isRTL ? invoiceTypeA : invoiceTypeE,
            companyVAT: `${props.StringsList._180} : ${TerminalConfiguration.ValueAddedTaxNumber}`,
            isBuyer: buyerInfo ? true : false,
            ...buyerInfo,
          },
        ];
        console.log('invoice info object', selectedProducts);
        if (printerMacAddress) {
          PrinterNativeModule.printing(
            JSON.stringify(invoiceInfoObj),
            urii,
            '[]',
          );
        }
        // let base64data = await RNFS.readFile(urii, 'base64').then();

        // console.log(base64data);
        // createInvoiceStyle(base64data)
        // console.log('qrRef2, snapshot qrRef2', base64data)
      },
      error => console.error('Oops, snapshot failed', error),
    );
  };

  // const saveToGallery = async () => {
  //   // alert("uriImage:  " + uriImage)
  //   await CameraRoll.save(uriImage, {
  //     type: 'photo',
  //     album: 'FineXCloud',
  //   });
  // };

  const onSaveInvoice = type => {
    setInvoice(!isInvoice);
    if (type === 'save') {
      // console.log('save on gallery');
      //saveToGallery();
      setInvoice(!isInvoice);
      setInvoiceNumber(null);
      restState();
    } else {
      restState();
      setInvoiceNumber(null);
      setInvoice(!isInvoice);
    }
  };

  const onClickSetting = type => {
    //console.log(' onClickSetting ', type);
    switch (type) {
      case 'terminalSetup':
        setTerminalSetup(true);
        break;
      case 'pairPrinterFamily':
        setPairPrinterFamily(true);
        break;

      default:
        break;
    }
  };

  const saleBill = async (ADamount, selP) => {
    let ADPay = ADamount ? ADamount : advancePaidInCash;
    // createInvoiceStyle()
    let earnPoint = 0;
    if (buyerInfo?.LoyaltyCard) earnPoint = await invoiceEarnPoints();

    let currentDate = moment().format('YYYYMMDD');
    let time = moment().format('HH:mm:ss');

    let obj = {
      salesBillID: salesBillID,
      billNumber: returnInvoiceNumber ? returnInvoiceNumber : invoiceNumber,
      fiscalSpanID: TerminalConfiguration?.FiscalSpanID,
      billDate: currentDate,
      billType: returnInvoiceNumber ? 2 : 1,
      paymentType: selP ? selP.PaymentType : selectedPyamentMethod?.PaymentType,
      godownCode: TerminalConfiguration?.GoDownCode,

      cardDetails: '',

      salesagentCode: selectedAgent?.SalesAgentCode
        ? selectedAgent.SalesAgentCode
        : TerminalConfiguration?.SalesAgentCode,
      salesmanName: selectedAgent?.SalesAgentName
        ? selectedAgent?.SalesAgentName
        : TerminalConfiguration?.SalesAgentName,
      grandAmount: subPrice,

      globalDiscountRate: globalDiscountRate,
      globalDiscountAmount: globalDiscountAmount,
      globalTax1Code: globalTaxObj?.Tax1Code ? globalTaxObj.Tax1Code : '',
      globalTax1Name: globalTaxObj?.Tax1Name ? globalTaxObj.Tax1Name : '',
      globalTax1Rate: globalTaxObj?.Tax1Percentage
        ? globalTaxObj.Tax1Percentage
        : '',
      globalTax1Amount: globalTaxObj?.Tax1Amount ? globalTaxObj.Tax1Amount : 0,
      globalTax2Code: globalTaxObj?.Tax2Code ? globalTaxObj.Tax2Code : '',
      globalTax2Name: globalTaxObj?.Tax2Name ? globalTaxObj.Tax2Name : '',
      globalTax2Rate: globalTaxObj?.Tax2Percentage
        ? globalTaxObj.Tax2Percentage
        : '',
      globalTax2Amount: globalTaxObj?.Tax2Amount ? globalTaxObj.Tax2Amount : 0,

      surplusChargesAmount: 0,

      netAmount: totalPrice - ADPay,
      advancePaidInCash: ADPay,
      counterCode: TerminalConfiguration?.TerminalCode,
      roundOffAmount: totalPrice - ADPay,

      roundOffDifference: 0.0,

      posUserID: TerminalConfiguration?.UserCode,
      returnedBillNumber: returnInvoiceNumber ? invoiceNumber : '',
      returnedFiscalSpanID: returnInvoiceNumber
        ? TerminalConfiguration?.FiscalSpanID
        : '',
      returnedBillDate: returnInvoiceNumber ? currentDate : '',

      isProcessed: false,
      isUploaded: false,
      startTime: startTime,
      endTime: time,
      tagNo: terminalSetup.StartFrom,
      cashTender: 0,

      creditAmount: creditAmount,
      globalTaxGroupID: globalTaxObj?.globalTaxGroupID
        ? globalTaxObj.globalTaxGroupID
        : '',
      isGlobalTax1IncludedInPrice: globalTaxObj?.IsTax1IncludedInPrice
        ? globalTaxObj.IsTax1IncludedInPrice
        : false,
      isGlobalTax2IncludedInPrice: globalTaxObj?.IsTax2IncludedInPrice
        ? globalTaxObj.IsTax2IncludedInPrice
        : false,
      billTime: time,
      paymentTypeName: selP
        ? selP?.PaymentTypeName
        : selectedPyamentMethod?.PaymentTypeName,

      BillDetails: '',

      buyerCode: buyerInfo?.BuyerCode ? buyerInfo?.BuyerCode : '',
      buyerName: buyerInfo?.BuyerName ? buyerInfo?.BuyerName : '',
      buyerVAT: buyerInfo?.ValueAddedTaxNumber
        ? buyerInfo?.ValueAddedTaxNumber
        : '',
      buyerCCR: buyerInfo?.CCRNumber ? buyerInfo?.CCRNumber : '',
      buyerPhone: buyerInfo?.PrimaryPhone ? buyerInfo?.PrimaryPhone : '',
      buyerAddress: buyerInfo?.BuyerAddress ? buyerInfo?.BuyerAddress : '',

      loyaltyCode: buyerInfo?.LoyaltyCard
        ? buyerInfo?.LoyaltyCard.LoyaltyCode
        : '',
      isLoyaltyInvoice: redeemPoints > 0 ? true : false,

      deliveryType: '',
      deliveryTypeNote: '',

      totalPTax1Name: '',
      totalTax1Amount: 0,
      totalPTax2Name: '',
      totalTax2Amount: 0,

      totalGlobalTaxAmount: globalTax,

      totalTaxAmount: 0,
      totalProductTaxAmount: 0.0,

      earnedPoints: earnPoint,
      redeemPoints: redeemPoints,
      status: earnPoint > 0 ? 1 : status,

      rewardType: rewardType,
    };
    console.log('sale bill object...', obj);
    InsertSaleBills(obj);
    databaseBackup();
  };

  const selectedProductUpdate = async () => {
    // await DeleteTable(SaleBillDetailsTable);
    // await CreateTable(SaleBillDetailsTable, SaleBillDetailsCreateTableCoulumns);
    let updateSelectProducts = [];
    selectedProducts.filter(async product => {
      let EarnedPoint = 0;
      if (buyerInfo?.LoyaltyCard) EarnedPoint = await proCatEarnPoints(product);
      let pro = {
        SalesBillDetailsID: returnInvoiceNumber
          ? uuid.v4()
          : product.SalesBillDetailsID,
        SalesBillID: salesBillID,
        BillNumber: returnInvoiceNumber ? returnInvoiceNumber : invoiceNumber,
        FiscalSpanID: TerminalConfiguration?.FiscalSpanID,
        BillType: returnInvoiceNumber ? 2 : 1,
        SerialNumber: product.SerialNumber,
        ProductCode: product.ProductCode,
        ProductName: product.ProductName,
        ProductName2: product.ProductName2,
        ProductType: product.ProductType,
        Quantity: product.IsParentAddOn
          ? product.Quantity
          : product.Quantity * product.OrignalQuantity,
        UOMType: product.UOMType,
        UOMCode: product.UOMCode,
        UOMFragment: product.UOMFragment ? product.UOMFragment : '',
        UOMCode: product.UOMCode ? product.UOMCode : '',
        UOMName: product.UOMName,
        Price: product.IsParentAddOn
          ? product.PriceWithOutTax
          : product.PriceWithOutTax / product.OrignalQuantity,
        PriceOriginal: product.IsParentAddOn
          ? product.PriceOriginal
          : product.PriceOriginal / product.OrignalQuantity,
        DiscountRate: product.DiscountRate ? product.DiscountRate : 0,
        DiscountAmount: product.DiscountAmount ? product.DiscountAmount : 0,
        TaxGroupID: product.TaxGroupID,
        IsTax1IncludedInPrice: product.IsTax1IncludedInPrice,
        IsTax2IncludedInPrice: product.IsTax2IncludedInPrice,
        Tax1Code: product.Tax1Code,
        Tax1Name: product.Tax1Name,
        Tax1Rate: product.Tax1Rate,
        Tax1Amount: product.Tax1Amount,
        Tax2Code: product.Tax2Code,
        Tax2Name: product.Tax2Name,
        Tax2Rate: product.Tax2Rate,
        Tax2Amount: product.Tax2Amount,
        GrandAmount: product.GrandAmount,
        GroupDataID: '',
        ProductBarCode: product.ProductBarCode,
        ReturnSalesBillDetailID: returnInvoiceNumber
          ? product.SalesBillDetailsID
          : '',
        DeliveryStatus: '',
        DeliveryDate: '',
        DeliveryTime: '',
        DeliveryNote: '',
        DeliveredDate: '',
        DeliveredTime: '',
        Remarks: '',
        SalesAgentCode: TerminalConfiguration.SalesAgentCode,
        IsParentAddOn: product.IsParentAddOn,
        AddOnGroupCode: product.AddOnGroupCode,
        ParentInvoiceDetailsID: product.ParentInvoiceDetailsID,
        OrignalQuantity: product.IsParentAddOn ? 0 : product.Quantity,
        AddonProductDetailcode: product.AddonProductDetailcode,
        Ingredients: product.Ingredients,
        EarnedPoints: EarnedPoint,
        RedeemPoints: product.RedeemPoints,
        Status: EarnedPoint > 0 ? 1 : 0,
        ProductCategoryCode: product.ProductCategoryCode,
        AddOnParentSalesInvoiceDetailsID:
          product.AddOnParentSalesInvoiceDetailsID,
        HoldFromSale: product.HoldFromSale,
        PriceType: 1,
      };
      InsertSaleBillDetails(pro);
      updateSelectProducts.push(pro);
    });

    console.log('updateSelectProducts...', updateSelectProducts);
  };

  const onClickIn = () => {
    console.log('onClickIn');
    setLoading(true);
  };

  const databaseBackup = async () => {
    let newBillList = [];
    await getData(SaleBillsTable, async cb => {
      for (let i = 0; i < cb.length; i++) {
        if (
          (cb[i].isUploaded == 'false' || !cb[i].isUploaded) &&
          (cb[i].isProcessed == 'false' || !cb[i].isProcessed)
        ) {
          //console.log('sale bills ', cb[i].isUploaded);
          await getDataById(
            SaleBillDetailsTable,
            'salesBillID',
            cb[i].salesBillID,
            billProducts => {
              // console.log("billProducts....", billProducts)
              // cb[i].BillDetails = billProducts;
              (cb[i].isProcessed = false), (cb[i].isUploaded = true);
              cb[i].BillDetails = billProducts;
              (cb[i].isGlobalTax1IncludedInPrice =
                cb[i].isGlobalTax1IncludedInPrice === 'false' ? false : true),
                (cb[i].isGlobalTax2IncludedInPrice =
                  cb[i].isGlobalTax2IncludedInPrice === 'false' ? false : true),
                (cb[i].isLoyaltyInvoice =
                  cb[i].isLoyaltyInvoice === 'false' ? false : true);

              newBillList.push(cb[i]);
            },
          );
        }
      }
      console.log('New Bill list ...', newBillList);
      const extension = Platform.OS === 'android' ? 'file://' : '';
      const path = `${extension} / storage / emulated / 0 /FineXCloudBills`;
      console.log('error', path);
      RNFS.mkdir(path).then(result => {
        RNFS.writeFile(
          path + '/' + 'invoices_backup.json',
          JSON.stringify(newBillList),
        ).then(() => {
          console.log('Successful');
          // alert('Backup created successfully!')
        });
      });
      // console.log("database Backup..", value, path, JSON.stringify(newBillList))
    });
  };

  const globalDiscountAmountFun = (type, sAmount, tAmount, recalling) => {
    let subA = sAmount > 0 ? sAmount : subPrice;
    let tolA = sAmount > 0 ? tAmount : totalPrice;
    let disAmt =
      sAmount > 0 && globalDiscountRate > 0
        ? globalDiscountRate
        : recalling === 'recalling'
        ? 0
        : manuallyCount;
    if (type === 'globalDiscount') {
      if (subA >= disAmt || recalling === 'recalling') {
        //  console.log("disAmt..........", manuallyCount)

        let tPrice;
        tPrice = Number(tolA - disAmt + globalDiscountAmount); //;
        setglobalDiscountAmount(Number(disAmt)); //);

        setAdvancePaidInCash(0); //);
        setDueAmount(0);
        if (selectedGlobalTaxObj) {
          globalTaxFun(selectedGlobalTaxObj, subA, '', tolA, disAmt);
        } else {
          setTotalPrice(tPrice);
        }
      } else {
        setMessage(props.StringsList._440);
        setDisplayAlert(true);
      }
    } else {
      let pDiscount;
      let tPrice = subPrice;
      pDiscount = parseFloat((disAmt * subA) / 100);
      if (subA >= pDiscount) {
        tPrice = Number(subA - pDiscount); //;
        setglobalDiscountAmount(Number(pDiscount)); //);
        setGlobalDiscountRate(Number(disAmt));

        setAdvancePaidInCash(0); //);
        setDueAmount(0);
        if (selectedGlobalTaxObj) {
          globalTaxFun(selectedGlobalTaxObj, subA, '', tolA, pDiscount);
        } else {
          setTotalPrice(tPrice);
        }
      } else {
        setMessage(props.StringsList._440);
        setDisplayAlert(true);
      }
    }
    setLoading(false);
  };

  const globalTaxFun = async (itm, type, n, totalAmount, disAmount) => {
    setLoading(true);
    if (itm.TaxFamilyCode !== 'None') {
      let tPrice = totalAmount ? totalAmount : totalPrice;
      let subPr = type === 'returnInvoice' ? subPrice : type;
      let disA =
        disAmount || disAmount === 0 ? disAmount : globalDiscountAmount;
      setSelectedGlobalTaxObj(itm);
      // console.log("globalTaxFun calling....", itm)
      let taxAmt = await calculateTaxeGroups(
        0,
        subPr,
        disA,
        itm.TaxFamilyCode,
        1,
        null,
        0,
        TerminalConfiguration,
        0,
        0,
        true,
      );
      taxAmt.globalTaxGroupID = itm.TaxFamilyCode;

      let tax = taxAmt.Tax2Amount
        ? taxAmt.Tax1Amount + taxAmt.Tax2Amount
        : taxAmt.Tax1Amount
        ? taxAmt.Tax1Amount
        : 0;
      let diA = taxAmt.DiscountAmount ? taxAmt.DiscountAmount : 0;

      if (tax > 0) {
        tPrice = subPr + tax - diA;

        setTotalPrice(tPrice);
      } else {
        tPrice = subPr - disA;

        setTotalPrice(tPrice);
      }
      setGlobalTaxObj(taxAmt);
      setGlobalTax(tax);
      setLoading(false);
    } else {
      let tPrice = totalPrice - globalTax;
      console.log('globalTax else', tPrice);
      setTotalPrice(tPrice);
      setSelectedGlobalTaxObj(null);
      setGlobalTaxObj(null);
      setGlobalTax(0);
      setLoading(false);
    }
  };

  const cashPaidAmountFun = amount => {
    // if (amount - totalPrice >= 0) {
    let am = amount ? amount : 0;
    let duePrice;
    duePrice = Number(amount - totalPrice); //;
    setAdvancePaidInCash(Number(am)); //);
    paymentProcess(amount);
    //  setDueAmount(duePrice);
    // } else {
    //   setMessage(props.StringsList._234);
    //   setDisplayAlert(true);
    // }
  };

  const holdInvoiceFun = async () => {
    if (selectedProducts.length > 0) {
      setLoading(true);
      let invoice = [
        {
          salesBillID: salesBillID,
          invoiceNumber: holdInvoiceName,
          subPrice: subPrice,
          // creditAmount: creditAmount,
          totalPrice: totalPrice,
          advancePaidInCash: advancePaidInCash,
          date: moment().format('DD/MM/YYYY'),
          selectedProducts: JSON.stringify(selectedProducts),
        },
      ];
      InsertHoldInvoice(invoice);
      setOptions(
        userConfiguration.SalesRefundAllowed === 1
          ? [
              {label: props.StringsList._32, value: 'getHoldInvoice'},

              {label: props.StringsList._319, value: 'returnBill'},
              {label: props.StringsList._30, value: 'buyer'},
              {label: props.StringsList._437, value: 'loyaltyCard'},
            ]
          : [
              {label: props.StringsList._32, value: 'getHoldInvoice'},
              {label: props.StringsList._30, value: 'buyer'},
              {label: props.StringsList._437, value: 'loyaltyCard'},
            ],
      );
      restState();
    } else {
      setMessage(props.StringsList._238);
      setDisplayAlert(true);
    }
  };

  const getHoldInvoiveFun = async holdInvoiceNumber => {
    setLoading(true);
    await getDataById(
      HoldInvoiceTable,
      'invoiceNumber',
      holdInvoiceNumber,
      cb => {
        // console.log('holdInvoice..', cb);

        if (cb.length > 0) {
          let holdInvoice = JSON.parse(cb[0].selectedProducts);
          if (holdInvoice.length > 0) {
            setSalesBillID(cb[0]?.salesBillID);

            setsubPrice(Number(cb[0]?.subPrice));

            setTotalPrice(Number(cb[0]?.totalPrice));
            setAdvancePaidInCash(Number(cb[0]?.advancePaidInCash));
            setSelectedProducts(holdInvoice);
            setToggle(true);
            onNewInvoice();
          }
        } else {
          setMessage(props.StringsList._301);
          setDisplayAlert(true);
        }
        setLoading(false);
      },
      3,
    );
    DeleteColumnById(HoldInvoiceTable, 'invoiceNumber', holdInvoiceNumber);
  };

  const onSuccessScan = async itm => {
    let productBar = itm?.data ? itm.data : itm;
    console.log(' Reward List Table outer', productBar);
    setLoading(true);
    await getDataById(
      UpdateProductDetailListTable,
      'ProductBarCode',
      productBar,
      async pro => {
        console.log(' on Successfully  Scan', selectedProducts);
        if (pro.length > 0) {
          let product = selectedProducts.filter(res => {
            if (
              pro[0]?.ProductBarCode === res?.ProductBarCode &&
              pro[0]?.PriceOriginal === res?.PriceOriginal
            ) {
              return res;
            }
          });
          console.log('on Successfully  Scan product', pro);
          let addPro = product.length > 0 ? product[0] : pro[0];
          await addProductToList(addPro, 'increment');
          setToggle(true);
          // setRewardType(1)
        } else {
          setMessage(props.StringsList._251);
          setDisplayAlert(true);
        }
        setLoading(false);
      },
    );
  };

  // const createInvoiceStyle = async (url) => {

  //   // let url = qrRef.current.toDataURL();
  //   let pageSize = "42"

  //   let a = "a"
  //   const base64Image = "data:image/png;base64," + url;
  //   console.log("create Invoice Style cal..", base64Image)
  //   let proTax = 0, prodDis = 0;
  //   let printing = new EscPosPrinter.printing();
  //   const encoder = new Encoder();
  //   let currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
  //   switch (pageSize) {

  //     case "36":

  //       selectedProducts.forEach((product) => {
  //         console.log("printing............selectedProducts", product.DiscountAmount)
  //         product.DiscountAmount = product.DiscountAmount === "0.00" ? 0 : product.DiscountAmount
  //         proTax = proTax + product.tax
  //         prodDis = prodDis + product.DiscountAmount

  //         let w = product.ProductName.split(" ")

  //         let whiteSpaceName = "";
  //         if (w[w.length - 1].length < 12) {
  //           whiteSpaceName = "            "
  //           // console.log("whiteSpace before trim", whiteSpaceName.length)
  //           whiteSpaceName = whiteSpaceName.slice(w[w.length - 1].length, whiteSpaceName.length)
  //           // console.log("whiteSpace after trim", whiteSpaceName.length)
  //         }

  //         encoder
  //           .initialize()
  //           .size(1, 2)
  //           .text(String(product.ProductName), 1)
  //           .size(1, 2)
  //           .text(whiteSpaceName + String(product.PriceOriginal),)
  //           .size(1, 2)
  //           .text("    " + String(product.Quantity),)
  //           .size(1, 2)
  //           .text("      " + String(product.FreeProduct ? "0.00" : (product.GrandAmount).toFixed(TerminalConfiguration.DecimalsInAmount)))
  //           .newline(0.5)

  //       });
  //       printing.initialize()
  //         .align('center')
  //         .size(2, 1)
  //         .line(currentDate)
  //         .smooth(false)
  //         .size(1, 1)
  //         .line("******************************************")
  //         .align('left')
  //         .bold()
  //         .line(String(terminalSetup.StartFrom))
  //         .align('center')
  //         .size(2)
  //         .bold()
  //         .underline()
  //         .line(invoiceNumber)
  //         .align('center')
  //         .barcode({
  //           value: invoiceNumber,
  //           type: 'EPOS2_BARCODE_CODE93',
  //           width: 2,
  //           height: 50,
  //           hri: 'EPOS2_HRI_BELOW',
  //         })
  //         .underline(false)
  //         .newline()
  //         .data(encoder.encode())
  //         .size(1, 1)
  //         .align("center")
  //         .line("********************")
  //         .align("left")
  //         .bold(false)
  //         .text("Sub Amount" + "                " + String(subPrice - prodDis - proTax))//15
  //         .newline(0.5)
  //         .text("Tax" + "                       " + String(globalTax + proTax))//15
  //         .newline(0.5)
  //         .text("Discount" + "                  " + String(globalDiscountAmount + prodDis))//15
  //         .newline(0.5)
  //         .bold()
  //         .text("Total Price" + "               " + String(totalPrice))//15
  //         .newline()
  //         .bold(false)
  //         .align("center")
  //         .line("********************")
  //         .newline()
  //         .align("left")
  //         .bold(false)
  //         .text("Sale type" + "   " + "Sales Agent" + "   " + "Terminal") //4
  //         .newline(0.5)
  //         .line("Cash" + "         " + String(selectedAgent?.SalesAgentName ? selectedAgent?.SalesAgentName : TerminalConfiguration?.SalesAgentName) + "       " + String(TerminalConfiguration?.TerminalCode)) //9
  //         .align('center')
  //         .line("********************")
  //         .newline(2)
  //         .align('center')
  //         .image({
  //           uri:
  //             base64Image
  //         },
  //           { width: 255, height: 255 })
  //       break;
  //     case "42":
  //       selectedProducts.forEach((product) => {

  //         product.DiscountAmount = product.DiscountAmount === "0.00" ? 0 : product.DiscountAmount
  //         proTax = proTax + product.tax
  //         prodDis = prodDis + product.DiscountAmount

  //         // console.log("printing............selectedProducts", product.ProductName.length,)

  //         let w = product.ProductName.split(" ")

  //         let whiteSpaceName = "";
  //         if (w[w.length - 1].length < 15) {
  //           whiteSpaceName = "               "
  //           // console.log("whiteSpace before trim", whiteSpaceName.length)
  //           whiteSpaceName = whiteSpaceName.slice(w[w.length - 1].length, whiteSpaceName.length)
  //           // console.log("whiteSpace after trim", whiteSpaceName.length)
  //         }
  //         let priceSpace = "          "

  //         priceSpace = priceSpace.slice(String(product.PriceOriginal).length, priceSpace.length)
  //         let quantitySpace = "          "

  //         quantitySpace = quantitySpace.slice(String(product.Quantity).length, quantitySpace.length)

  //         console.log("printing............selectedProducts", product.PriceOriginal.length, priceSpace, product.Quantity.length, quantitySpace)
  //         encoder
  //           .initialize()
  //           .size(1, 2)
  //           .text(String(product.ProductName), 1)
  //           .size(1, 2)
  //           .text(whiteSpaceName + String(product.PriceOriginal),)
  //           .size(1, 2)
  //           .text(priceSpace + String(product.Quantity),)
  //           .size(1, 2)
  //           .text(quantitySpace + String(product.FreeProduct ? "0.00" : (product.GrandAmount).toFixed(TerminalConfiguration.DecimalsInAmount)))
  //           .newline(0.5)

  //       });
  //       printing.initialize()
  //         .align('center')
  //         .size(2, 1)
  //         .line(currentDate)
  //         .smooth(false)
  //         .size(1, 1)
  //         .line("******************************************")
  //         .align('left')
  //         .bold()
  //         .line(String(terminalSetup.StartFrom))
  //         .align('center')
  //         .size(2)
  //         .bold()
  //         .underline()
  //         .line(invoiceNumber)
  //         .align('center')
  //         .barcode({
  //           value: invoiceNumber,
  //           type: 'EPOS2_BARCODE_CODE93',
  //           width: 2,
  //           height: 50,
  //           hri: 'EPOS2_HRI_BELOW',
  //         })
  //         .underline(false)
  //         .newline()

  //         .data(encoder.encode())
  //         .size(1, 1)
  //         .align("center")
  //         .line("********************")
  //         .align("left")
  //         .bold(false)
  //         .text("Sub Amount" + "                       " + String(Number(subPrice - prodDis - proTax).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .text("Tax" + "                              " + String(Number(globalTax + proTax).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .text("Discount" + "                         " + String(Number(globalDiscountAmount + prodDis).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .bold()
  //         .text("Total Price" + "                      " + String(Number(totalPrice).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline()
  //         .bold(false)
  //         .align("center")
  //         .line("********************")
  //         .newline()
  //         .align("left")
  //         .bold(false)
  //         .text("Sale type" + "         " + "Sales Agent" + "         " + "Terminal") //9
  //         .newline(0.5)
  //         .line(selectedPyamentMethod.PaymentTypeName + "              " + String(selectedAgent?.SalesAgentName ? selectedAgent?.SalesAgentName : TerminalConfiguration?.SalesAgentName) + "           " + String(TerminalConfiguration?.TerminalCode)) //9
  //         .align('center')
  //         .line("********************")
  //         .newline(2)
  //         .align('center')
  //         .image({
  //           uri:
  //             base64Image
  //         },
  //           { width: 255, height: 255 })
  //       const status = await printing.cut().send();
  //       break;
  //     default:
  //       selectedProducts.forEach((product) => {

  //         product.DiscountAmount = product.DiscountAmount === "0.00" ? 0 : product.DiscountAmount
  //         proTax = proTax + product.tax
  //         prodDis = prodDis + product.DiscountAmount

  //         // console.log("printing............selectedProducts", product.ProductName.length,)

  //         let w = product.ProductName.split(" ")

  //         let whiteSpaceName = "";
  //         if (w[w.length - 1].length < 15) {
  //           whiteSpaceName = "               "
  //           // console.log("whiteSpace before trim", whiteSpaceName.length)
  //           whiteSpaceName = whiteSpaceName.slice(w[w.length - 1].length, whiteSpaceName.length)
  //           // console.log("whiteSpace after trim", whiteSpaceName.length)
  //         }
  //         let priceSpace = "          "

  //         priceSpace = priceSpace.slice(String(product.PriceOriginal).length, priceSpace.length)
  //         let quantitySpace = "          "

  //         quantitySpace = quantitySpace.slice(String(product.Quantity).length, quantitySpace.length)

  //         console.log("printing............selectedProducts", product.PriceOriginal.length, priceSpace, product.Quantity.length, quantitySpace)
  //         encoder
  //           .initialize()
  //           .size(1, 2)
  //           .text(String(product.ProductName), 1)
  //           .size(1, 2)
  //           .text(whiteSpaceName + String(product.PriceOriginal),)
  //           .size(1, 2)
  //           .text(priceSpace + String(product.Quantity),)
  //           .size(1, 2)
  //           .text(quantitySpace + String(product.FreeProduct ? "0.00" : (product.GrandAmount).toFixed(TerminalConfiguration.DecimalsInAmount)))
  //           .newline(0.5)

  //       });
  //       printing.initialize()
  //         .align('center')
  //         .size(2, 1)
  //         .line(currentDate)
  //         .smooth(false)
  //         .size(1, 1)
  //         .line("******************************************")
  //         .align('left')
  //         .bold()
  //         .line(String(terminalSetup.StartFrom))
  //         .align('center')
  //         .size(2)
  //         .bold()
  //         .underline()
  //         .line(invoiceNumber)
  //         .align('center')
  //         .barcode({
  //           value: invoiceNumber,
  //           type: 'EPOS2_BARCODE_CODE93',
  //           width: 2,
  //           height: 50,
  //           hri: 'EPOS2_HRI_BELOW',
  //         })
  //         .underline(false)
  //         .newline()

  //         .data(encoder.encode())
  //         .size(1, 1)
  //         .align("center")
  //         .line("********************")
  //         .align("left")
  //         .bold(false)
  //         .text("Sub Amount" + "                       " + String(Number(subPrice - prodDis - proTax).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .text("Tax" + "                              " + String(Number(globalTax + proTax).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .text("Discount" + "                         " + String(Number(globalDiscountAmount + prodDis).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .bold()
  //         .text("Total Price" + "                      " + String(Number(totalPrice).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline()
  //         .bold(false)
  //         .align("center")
  //         .line("********************")
  //         .newline()
  //         .align("left")
  //         .bold(false)
  //         .text("Sale type" + "         " + "Sales Agent" + "         " + "Terminal") //9
  //         .newline(0.5)
  //         .line(selectedPyamentMethod.PaymentTypeName + "              " + String(selectedAgent?.SalesAgentName ? selectedAgent?.SalesAgentName : TerminalConfiguration?.SalesAgentName) + "           " + String(TerminalConfiguration?.TerminalCode)) //9
  //         .align('center')
  //         .line("********************")
  //         .newline(2)
  //         .align('center')
  //         .image({
  //           uri:
  //             base64Image
  //         },
  //           { width: 255, height: 255 })
  //       const a = await printing.cut().send();
  //       break;
  //   }
  //   console.log("kjhkashdkh", subPrice, prodDis, proTax)

  // }

  const getReturnBill = async () => {
    setLoading(true);
    let accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    // console.log('access token ', accessToken);
    const response = await props.dispatch(
      ServerCall(
        accessToken,
        `SalesBill/FetchSalesBill?billNumber=${alertValue}`,
        'GET',
      ),
    );
    console.log('FetchSalesBill....', response);
    setAlertValue('');
    seOptionsValue(null);

    if (response) {
      setReturnBill(response);
      console.log('ReturnedQuantity....', response);

      if (response?.BillDetails?.length > 0) {
        let products = response.BillDetails.filter(item => {
          let Quantity = item.Quantity - item.ReturnedQuantity;

          if (Quantity > 0) {
            let addonPQ = response.BillDetails.filter(
              r =>
                r.SalesBillDetailsID === item.AddOnParentSalesInvoiceDetailsID,
            );
            console.log('addonPQaddonPQaddonPQ', addonPQ);
            if (addonPQ.length > 0) {
              let OQty = Quantity / addonPQ[0].Quantity;
              item.Quantity = addonPQ[0].Quantity;
              item.OrignalQuantity = OQty;
              item.ParentInvoiceDetailsID = addonPQ[0].SalesBillDetailsID;
              item.maxQuantity = Quantity;
              item.tax = item.Tax1Amount + item.Tax2Amount;
              item.PriceWithOutTax = Number(item.Price) * OQty;
              item.PriceOriginal = item.PriceOriginal * OQty;
              item.GrandAmount = item.GrandAmount; //(item.PriceWithOutTax * addonPQ[0].Quantity) + item.tax
            } else {
              item.OrignalQuantity = 1;
              item.maxQuantity = Quantity;
              item.Quantity = Quantity;
              item.tax = item.Tax1Amount + item.Tax2Amount;
              item.PriceWithOutTax = Number(item.Price);
              item.GrandAmount = item.GrandAmount; //(item.PriceWithOutTax * Quantity) + item.tax
            }

            item.IsParentAddOn = item.AddOnParentSalesInvoiceDetailsID
              ? false
              : true;

            return item;
          }
        });

        if (products.length > 0) {
          let GT = globalTaxList.filter(
            e => response.GlobalTaxGroupID === e.TaxFamilyCode,
          );
          // console.log("")
          createReturnInvoiceNumber(invoiceNumber);
          setSelectedGlobalTaxObj(GT[0]);
          console.log('kjsahkjfhksdhkfh', response.BillNumber);
          setInvoiceNumber(response.BillNumber);
          setReturnProducts(products);
          setisReturnInvoice(true);
          setToggle(true);
          if (response.BuyerCode) {
            const current = new Date();
            let date, month, year;
            date = current.getDate();
            month = current.getMonth() + 1;
            year = current.getFullYear();

            const currentDate = `${year}${
              month < 10 ? '0' + month : month + 1
            }${date < 10 ? '0' + date : date}`;

            let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');

            let body = {
              BuyerName: '',
              ReturnCode: 0,
              BuyerCode: null,
              PrimaryPhone: response.BuyerCode,
              CCRNumber: '',
              ValueAddedTaxNumber: '',
              BuyerAddress: '',
              Operation: 'search',
              CurrentDate: currentDate,
              LoyaltyCard: null,
            };

            const response1 = await props.dispatch(
              ServerCall(UserLogin, 'Buyer/CreateBuyer', "POST",body),
            );
            console.log('buyers response1 is ;;;;;;>',response1)
            if (response1.success) {
              setBuyerInfo(response1);
            }
          }
        } else {
          setMessage(props.StringsList._301);
          setDisplayAlert(true);
          seOptionsValue(null);
        }

        setLoading(false);
      }
    } else {
      setMessage(props.StringsList._301);
      setDisplayAlert(true);
      setLoading(false);
    }

    // setReturnInvoiceNumber(null);
  };

  const reacallFunc = type => {
    // console.log('reacallFunc', type);
    if (type === 'holdInvoice') {
      holdInvoiceFun();
    } else if (type === 'returnInvoice') {
      getReturnBill();
    } else if (type === 'ingredient') {
      addIngredientFun();
    }
  };

  const checkReturnProductAddons = async (itm, type, index) => {
    let proArray = [],
      sPrice = Number(itm.GrandAmount - itm.DiscountAmount),
      tPrice = Number(itm.GrandAmount - itm.DiscountAmount);
    proArray.push(itm);

    let addons = retunProducts.filter(async pro => {
      if (itm.SalesBillDetailsID === pro.AddOnParentSalesInvoiceDetailsID) {
        console.log(
          'pro.Quantitypro.Quantitypro.Quantitypro.Quantity',
          pro.Quantity,
          itm.Quantity,
        );

        sPrice = Number(sPrice + pro.GrandAmount - pro.DiscountAmount);
        tPrice = Number(tPrice + pro.GrandAmount - pro.DiscountAmount);
        // if (!pro.ParentInvoiceDetailsID) {
        //   let OQty = pro.Quantity / itm.Quantity;
        //   pro.Quantity = itm.Quantity
        //   pro.OrignalQuantity = OQty
        //   pro.ParentInvoiceDetailsID = itm.SalesBillDetailsID
        // }
        proArray.push(pro);
        // setTimeout(() => { addProductToList(pro, "addons") }, 1000)
        return pro;
      }
    });
    if (addons.length > 0) {
      await addProductToList(itm, 'addnos', index, proArray, sPrice, tPrice);
    } else {
      await addProductToList(itm, type, index);
    }
  };

  useEffect(() => {
    // console.log("buyer Info", buyerInfo)
    const loyaltyfunctions=async ()=>{
      if (buyerInfo?.LoyaltyCard) {
        let pArry = [],
          cArry = [],
          iArry = [];
        await getDataById(
          LoyaltyDetailListTable,
          'LoyaltyCode',
          buyerInfo.LoyaltyCard.LoyaltyCode,
          loyalty => {
            // console.log("Loyalty Detail List Table", loyalty)
            loyalty.forEach(e => {
              if (e.CalculationType === 1) {
                pArry.push(e);
              } else if (e.CalculationType === 2) {
                iArry.push(e);
              } else if (e.CalculationType === 3) {
                cArry.push(e);
              }
            });
            setEarnPointPArry(pArry);
            setEarnPointIArry(iArry);
            setEarnPointCArry(cArry);
            setLoyaltyDetailList(loyalty);
          },
        );
        await getDataById(
          LoyaltyRewardsListTable,
          'LoyaltyCode',
          buyerInfo.LoyaltyCard.LoyaltyCode,
          loyalty => {
            // console.log("Loyalty Reward List Table", loyalty)
            setLoyaltyRewardsList(loyalty);
          },
        );
      }
    }
    return () => {
      loyaltyfunctions();
    };
    
  }, [buyerInfo]);

  useEffect(() => {
    const unsubscri = props.navigation.addListener('focus', async () => {
      // function to update table values
      getStorageItem();
      ///
    });
    return () => {
      unsubscri;
    };
  }, [props.navigation]);

  const checkLoyalitRewardsFun = async () => {
    if (loyaltyRewardsList?.length > 0 && redeemPoints > 0) {
      let rewards = loyaltyRewardsList.filter(
        res =>
          redeemPoints >= res.RewardCostFrom &&
          redeemPoints <= res.RewardCostTo,
      );
      // console.log("rewards..........", rewards)
      let excludeProSum = 0;
      let excludeProducts = loyaltyRewardsList.filter(res => {
        selectedProducts.forEach(s => {
          if (res.ExcludeProductBarCode === s.ProductBarCode) {
            excludeProSum = excludeProSum + s.GrandAmount;
            // console.log("exclude Product sum..55.", excludeProSum)
          }
        });
      });
      // console.log("exclude Product sum...", excludeProSum)
      setStatus(2);
      if (rewards.length > 1) {
        Alert.alert('Loyalty Inovice', 'Please select open option', [
          {
            text: 'Free Product',
            onPress: () => {
              let reward = rewards.filter(res => res.ProductBarCode !== '');
              // console.log("free product ", reward)
              freeProductReward(reward);
            },
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Invoice Discount',
            onPress: () => {
              let reward = rewards.filter(res => res.ProductBarCode === '');
              invoiceDiscountReward(reward[0], excludeProSum);
              // console.log("Invoice Discount ", reward)
            },
          },
        ]);

        // invoiceDiscountReward(rewards)
      } else {
        if (rewards[0].ProductBarCode !== '') {
          let PReward = rewards.filter(res => res.ProductBarCode !== '');
          freeProductReward(PReward);
        } else {
          invoiceDiscountReward(rewards[0], excludeProSum);
        }
      }
    }
  };

  const freeProductReward = async rewards => {
    let selectedP = [...selectedProducts];
    setToggle(true);
    for (let i = 0; i < rewards.length; i++) {
      let e = rewards[i];
      // console.log(" Reward List ProductBarCode", e)
      await getDataById(
        UpdateProductDetailListTable,
        'ProductBarCode',
        e.ProductBarCode,
        async pro => {
          let P = pro[0];
          let taxAmt = await calculateTaxeGroups(
            1,
            P.PriceOriginal,
            P.DiscountAmount,
            P.TaxGroupID,
            1,
            null,
            0,
            TerminalConfiguration,
            P.PriceOriginal,
            P.DiscountRate,
          );
          P.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
          (P.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
            (P.Tax1Rate = taxAmt.Tax1Percentage ? taxAmt.Tax1Percentage : 0),
            (P.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
            (P.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
            (P.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
            (P.Tax2Rate = taxAmt?.Tax2Percentage ? taxAmt?.Tax2Percentage : 0),
            (P.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);

          // console.log(" Reward List Table", P, taxAmt)
          // await addProductToList(pro[0], "FreeProduct")
          P.GrandAmount = 0;
          P.tax = P.Tax1Amount + P.Tax2Amount;
          P.PriceWithOutTax = taxAmt.Price;
          P.Quantity = 1;
          P.FreeProduct = true;

          selectedP.push(P);
          setRewardType(1);
        },
      );
    }
    setSelectedProducts(selectedP);
  };

  const invoiceDiscountReward = (rewards, excludeProSum) => {
    let tAmount = totalPrice,
      amountGD = globalDiscountAmount,
      tax = globalTax;
    if (
      rewards.IsDiscountIncluded === 'true' &&
      rewards.IsTaxIncluded === 'true'
    ) {
      if (totalPrice - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else if (
      rewards.IsDiscountIncluded === 'false' &&
      rewards.IsTaxIncluded === 'true'
    ) {
      if (totalPrice - amountGD - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else if (
      rewards.IsDiscountIncluded === 'true' &&
      rewards.IsTaxIncluded === 'false'
    ) {
      if (totalPrice - tax - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else if (
      rewards.IsDiscountIncluded === 'false' &&
      rewards.IsTaxIncluded === 'false'
    ) {
      if (subPrice - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else {
      alert('invoice amount must be greater then Reward minimum amount');
    }
  };

  const invoiceEarnPoints = async cb => {
    let tAmount = totalPrice,
      amountGD = globalDiscountAmount,
      tax = globalTax;
    let invEP = EarnPointIArry.find(
      e => totalPrice >= e.InvoiceAmountFrom && totalPrice <= e.InvoiceAmountTo,
    );
    // console.log("invoiceEarnPointsinvoiceEarnPoints", invEP)
    if (!invEP) {
      return 0;
    }

    if (invEP.IsDiscountIncluded === 'true' && invEP.IsTaxIncluded === 'true') {
      if (
        totalPrice >= invEP.InvoiceAmountFrom &&
        totalPrice <= invEP.InvoiceAmountTo
      ) {
        return invEP.PointsEarned;
      } else {
        return 0;
      }
    } else if (
      invEP.IsDiscountIncluded === 'false' &&
      invEP.IsTaxIncluded === 'true'
    ) {
      if (
        totalPrice - amountGD >= invEP.InvoiceAmountFrom &&
        totalPrice - amountGD <= invEP.InvoiceAmountTo
      ) {
        return invEP.PointsEarned;
      } else {
        return 0;
      }
    } else if (
      invEP.IsDiscountIncluded === 'true' &&
      invEP.IsTaxIncluded === 'false'
    ) {
      if (
        totalPrice - tax >= invEP.InvoiceAmountFrom &&
        totalPrice - tax <= invEP.InvoiceAmountTo
      ) {
        return invEP.PointsEarned;
      } else {
        return 0;
      }
    } else if (
      invEP.IsDiscountIncluded === 'false' &&
      invEP.IsTaxIncluded === 'false'
    ) {
      if (
        subPrice >= invEP.InvoiceAmountFrom &&
        subPrice <= invEP.InvoiceAmountTo
      ) {
        return invEP.PointsEarned;
      } else {
        return 0;
      }
    } else {
      // alert("invoice amount must be greater then Reward minimum amount")
      return 0;
    }
  };

  const proCatEarnPoints = async pro => {
    let catMatch = EarnPointCArry.find(
      e => e.CategoryCode === pro.ProductCategoryCode,
    );
    let proMatch = EarnPointPArry.find(
      e =>
        e.ProductBarCode === pro.ProductBarCode && e.Quantity === pro.Quantity,
    );
    let erP;
    // console.log("product.EarnedPoints + EarnPointPArry.PointsEarned", proMatch, catMatch, pro)
    if (proMatch && catMatch) {
      erP = proMatch.PointsEarned + catMatch.PointsEarned;
      // console.log("1....", erP)
      return erP;
    } else if (catMatch) {
      erP = catMatch.PointsEarned;
      // console.log("2....", erP)
      return erP;
    } else if (proMatch) {
      erP = proMatch.PointsEarned;
      // console.log("3...", erP)
      return erP;
    } else {
      erP = 0;
      return erP;
    }
  };

  const onClickPowerOff = async () => {
    Alert.alert('Alert', props.StringsList._443, [
      {
        text: 'yes',
        onPress: async () => {
          setLoading(true);
          let loginUserInfo = await AsyncStorage.getItem('LOGIN_USER_INFO');
          loginUserInfo = JSON.parse(loginUserInfo);
          // console.log('access token ', loginUserInfo);
          const response = await props.dispatch(
            ServerCall('', 'AuthorizeUser/SignOut', loginUserInfo),
          );
          console.log('user logout response.. ', response);
          // http://FXCapi.FXC.com/api/AuthorizeUser/SignOut
          props.navigation.replace('Auth');
          await AsyncStorage.removeItem('ACCESS_TOKEN');
          await AsyncStorage.removeItem('LOGIN_USER_INFO');
          setLoading(false);
        },
      },
      {
        text: 'Cancel',

        style: 'cancel',
      },
    ]);
  };

  const selectedAllProducts = () => {
    let tPrice = 0,
      sPrice = 0,
      allpro = [];

    console.log('return billsssssss', retunProducts);
    retunProducts.forEach(pro => {
      tPrice = tPrice + pro.GrandAmount;
      sPrice = sPrice + pro.GrandAmount;
    });
    //  console.log("retunProducts...", selectedGlobalTaxObj)
    if (returnBill.GlobalTax1Amount > 0 || returnBill.GlobalDiscountRate > 0) {
      if (returnBill.GlobalDiscountRate > 0) {
        globalDiscountAmountFun('', sPrice, tPrice, 'recalling');
      } else if (returnBill.GlobalDiscountAmount > 0) {
        globalDiscountAmountFun('globalDiscount', sPrice, tPrice, 'recalling');
      } else if (returnBill.GlobalTax1Amount) {
        globalTaxFun(selectedGlobalTaxObj, sPrice, '', tPrice);
      }
      setsubPrice(sPrice);
    } else {
      setTotalPrice(tPrice);
      setsubPrice(sPrice);
    }
    setSelectedProducts(retunProducts);
    let number = retunProducts.filter(
      w => w.IsParentAddOn === 1 || w.IsParentAddOn === true,
    ).length;
    // console.log("number........", number, selectedProduct)
    setNumberOfItems(number);

    setisReturnInvoice(false);
  };

  const deleteHoldedInvoice = holdInvoiceNumber => {
    DeleteColumnById(HoldInvoiceTable, 'invoiceNumber', holdInvoiceNumber);
  };

  const productAssignSaleAgent = (items, value, item) => {
    console.log('productAssignSaleAgent', items, value, item);
    let selectedAgent = items.filter(res => res.value === value);
    console.log('selectedAgent', selectedAgent);
    let selectedPro = [...selectedProducts];
    selectedPro.forEach(pro => {
      if (pro.SalesBillDetailsID === item.SalesBillDetailsID) {
        pro.SalesAgentCode = selectedAgent[0].SalesAgentCode;
        pro.value = value;
      }
    });
    setSelectedProducts(selectedPro);
  };
  return (
    <Design
      navigation={props.navigation}
      onClickPowerOff={onClickPowerOff}
      options={options}
      setOptions={setOptions}
      payments={payments}
      setPayments={setPayments}
      isToggle={isToggle}
      toggleFun={toggleFun}
      onInvoiceClick={onInvoiceClick}
      allCategoreis={allCategoreis}
      categoryProducts={categoryProducts}
      getSelectedCategoryProducts={getSelectedCategoryProducts}
      onSelectProduct={onSelectProduct}
      selectedProducts={selectedProducts}
      addProductToList={addProductToList}
      totalPrice={totalPrice}
      subPrice={subPrice}
      globalDiscountAmount={globalDiscountAmount}
      deleteItem={deleteItem}
      onClickCancel={onClickCancel}
      onNewInvoice={onNewInvoice}
      name={props.name}
      paymentMethodSelect={paymentMethodSelect}
      onChangeText={onChangeText}
      isPopup={isPopup}
      viewref={viewref}
      focus={focus}
      setfocus={setfocus}
      TerminalConfiguration={TerminalConfiguration}
      AgentList={AgentList}
      searchTextFun={searchTextFun}
      searchText={searchText}
      StringsList={props.StringsList}
      flatListRef={flatListRef}
      paymentsValue={paymentsValue}
      setPaymentsValue={setPaymentsValue}
      optionsValue={optionsValue}
      setOptionsValue={seOptionsValue}
      viewShotRef={viewShotRef}
      onCapture={onCapture}
      uriImage={uriImage}
      onSaveInvoice={onSaveInvoice}
      isInvoice={isInvoice}
      isTerminalSetup={isTerminalSetup}
      onClickSetting={onClickSetting}
      setTerminalSetup={setTerminalSetup}
      isPairPrinterFamily={isPairPrinterFamily}
      setPairPrinterFamily={setPairPrinterFamily}
      onEndEditing={onEndEditing}
      manuallyCount={manuallyCount}
      setmanuallyCount={setmanuallyCount}
      isLoading={isLoading}
      invoiceNumber={invoiceNumber}
      setLoading={setLoading}
      dueAmount={dueAmount}
      advancePaidInCash={advancePaidInCash}
      displayAlert={displayAlert}
      setDisplayAlert={setDisplayAlert}
      setisPromptAlert={setisPromptAlert}
      isPromptAlert={isPromptAlert}
      getHoldInvoiveFun={getHoldInvoiveFun}
      message={message}
      isHoldInvoices={isHoldInvoices}
      setisHoldInvoices={setisHoldInvoices}
      holdInvoiceFun={holdInvoiceFun}
      holdInvoiceName={holdInvoiceName}
      isScanner={isScanner}
      onSuccessScan={onSuccessScan}
      setScanner={setScanner}
      returnInvoiceNumber={returnInvoiceNumber}
      alertValue={alertValue}
      alertType={alertType}
      reacallFunc={reacallFunc}
      retunProducts={retunProducts}
      isReturnInvoice={isReturnInvoice}
      setisReturnInvoice={setisReturnInvoice}
      getAddOnProducts={getAddOnProducts}
      isAddon={isAddon}
      setisAddon={setisAddon}
      props={props}
      States={useState}
      checkReturnProductAddons={checkReturnProductAddons}
      isGlobalTax={isGlobalTax}
      setIsGlobalTax={setIsGlobalTax}
      globalTaxList={globalTaxList}
      setGlobalTaxList={setGlobalTaxList}
      globalTaxFun={globalTaxFun}
      globalTax={globalTax}
      buyerViewRef={buyerViewRef}
      isBuyer={isBuyer}
      loyaltyList={loyaltyList}
      setBuyerInfo={setBuyerInfo}
      buyerInfo={buyerInfo}
      loyaltyCardViewRef={loyaltyCardViewRef}
      isLoyaltyCard={isLoyaltyCard}
      setIsLoyaltyCard={setIsLoyaltyCard}
      otherOptions={otherOptions}
      setRedeemPoints={setRedeemPoints}
      redeemPoints={redeemPoints}
      paymentsOpen={paymentsOpen}
      setPaymentsOpen={setPaymentsOpen}
      optionsOpen={optionsOpen}
      setoptionsOpen={setoptionsOpen}
      globalDiscountRate={globalDiscountRate}
      cashPaidAmountFun={cashPaidAmountFun}
      noFamilyFound={noFamilyFound}
      selectedAllProducts={selectedAllProducts}
      onManuallyChangePrice={onManuallyChangePrice}
      setToggle={setToggle}
      deleteHoldedInvoice={deleteHoldedInvoice}
      QR={QR}
      setIsDrawar={setIsDrawar}
      drawerRef={drawerRef}
      isDrawar={isDrawar}
      getDrawerSetting={getDrawerSetting}
      isIngredient={isIngredient}
      setIsIngredient={setIsIngredient}
      ingredientsData={ingredientsData}
      setIngredientsData={setIngredientsData}
      onSelectIngredintes={onSelectIngredintes}
      sumOfProductTax={sumOfProductTax}
      numberOfItems={numberOfItems}
      qrRef2={qrRef2}
      onQRImage={onQRImage}
      areaItem={areaItem}
      setAreaItem={setAreaItem}
      tableItem={tableItem}
      setTableItem={setTableItem}
      getProductsIngredients={getProductsIngredients}
      searchIngredient={searchIngredient}
      searchIngredientFun={searchIngredientFun}
      onPressAddIntgredient={onPressAddIntgredient}
      isIngredientSearch={isIngredientSearch}
      sumOfProductDiscount={sumOfProductDiscount}
      selectedAgent={selectedAgent}
      selectedPyamentMethod={selectedPyamentMethod}
      terminalSetup={terminalSetup}
      userConfiguration={userConfiguration}
      productAssignSaleAgent={productAssignSaleAgent}
      onPressBackCat={onPressBackCat}
      onClickIn={onClickIn}
      setAddProductLoader={setAddProductLoader}
      AddProductLoader={addProductLoader}
      companyVATRegistor={companyVATRegistor}
      dispatch={props.dispatch}
      toggleSearchScan={toggleSearchScan}
      barCode={barCode}
      ref_searchBar={ref_searchBar}
      barCodeText={barCodeText}
      billFormatType={billFormatType}
      displayModal={displayModal}
      setDisplayModal={setDisplayModal}
      guestItem={guestItem}
      setGuestItem={setGuestItem}
      notesModal={notesModal}
      setNotesModal={setNotesModal}
      notesDetail={notesDetail}
      setNotesDetail={setNotesDetail}
      onOpenModal={onOpenModal}
      onClosenModal={onClosenModal}
      selectedGuest={selectedGuest}
      setSelectedGuest={setSelectedGuest}
      selectedArea={selectedArea}
      setSelectedArea={setSelectedArea}
      areas={areas}
      setAreas={setAreas}
      onSelect={onSelect}
      isdisabled={isdisabled}
      setisDisabled={setisDisabled}
      DineInOrder={DineInOrder}
      TakeAwayOrder={TakeAwayOrder}
      UpdateOrder={UpdateOrder}
      orderTaker={orderTaker}
      orderTakerType={orderTakerType}
      setOrderTakerType={setOrderTakerType}
      setOrderTaker={setOrderTaker}
      placeOrder={placeOrder}
      getStorageItem={getStorageItem}
      storageItems={storageItems}
      setStorageItems={setStorageItems}
      enableTBut={enableTBut}
      setEnableTbut={setEnableTbut}
      openModal={openModal}
      setOpenModal={setOpenModal}
      orderType={orderType}
      setOrderType={setOrderType}
      orderItems={orderItems}
      setOrderItems={setOrderItems}
      disable={disable}
      setDisable={setDisable}
      onSelectTable={onSelectTable}
      onPressSave={onPressSave}
      rebootTerminalFunction={rebootTerminalFunction}
      onClickLogoutFunction={onClickLogoutFunction}
      onClickMenuFunction={onClickMenuFunction}
      rebootAlert={rebootAlert}
      orderCode={orderCode}
      setOrderCode={setOrderCode}
      orderDetails={orderDetails}
      setOrderDetails={setOrderDetails}
      getOrderDetails={getOrderDetails}
      CancelOrder={CancelOrder}
      paymentView={paymentView}
      setPaymentView={setPaymentView}
      placedwithPay={placedwithPay}
      placeOrderWithPay={placeOrderWithPay}
      setOrderValue={setOrderValue}
      placewithpay={placewithpay}
    />
    
  );
};

const mapStateToProps = state => {
  return {
    TerminalConfiguration: state.user.SaveAllData.TerminalConfiguration,
    ProductsInfo: state.user.SaveAllData.ProductsInfo,
    StringsList: state.user.SaveAllData.StringsList,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
