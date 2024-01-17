import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { I18nManager, BackHandler, Platform, NativeModules, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RNFS from 'react-native-fs';


import Design from './design';
import { getData, getDataById, updateColunm } from '../../sqliteHelper';
import { SaleBillDetailsTable } from '../../sqliteTables/SaleBillDetails';
import { ServerCall } from '../../redux/actions/asynchronousAction';
import { SaleBillsTable } from '../../sqliteTables/SaleBills';
import { DrawerSetupTable } from '../../sqliteTables/DrawerSetup';
import { TerminalConfigurationTable } from '../../sqliteTables/TerminalConfiguration';
import DBTable from '../../constant/UpdateDB';
import errorMessages from '../../constant/errorMessages';
import { SalesAgentsTable } from '../../sqliteTables/SalesAgents';
import { UserConfigurationTable } from '../../sqliteTables/UserConfiguration';

const DashboardScreen = props => {

  const [isPopup, setPopup] = useState(false);
  const [isTerminalSetup, setTerminalSetup] = useState(false);
  const [isPairPrinterFamily, setPairPrinterFamily] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  // const [message, setMessage] = useState(false);
  const [isBillNeedPost, setBillNeedPost] = useState(false);
  const [drawerSetupArr, setDrawerSetupArr] = useState({});
  const viewref = useRef(null);
  const [TerminalConfiguration, setTerminalConfiguration] = useState({});
  const [message, setMessage] = useState("");
  const [isRequriedLogin, setIsRequriedLogin] = useState(false);
  const [salesAgentsList, setSalesAgentsList] = useState([]);
  const [isSaleAgents, setIsSaleAgents] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [userConfiguration, setUserConfiguration] = useState({});
  const { PrinterNativeModule } = NativeModules;
  // useEffect(async () => {
  //   console.log('isBillNeedPost......');
  //   setLoading(true);
  //   await getData(SaleBillsTable, async cb => {
  //     console.log('isBillNeedPost......', cb);
  //     for (let i = 0; i < cb.length; i++) {
  //       if (
  //         (cb[i].isUploaded == 'false' || !cb[i].isUploaded) &&
  //         (cb[i].isProcessed == 'false' || !cb[i].isProcessed)
  //       ) {
  //         console.log('isBillNeedPost......2');
  //         setBillNeedPost(true);
  //       } else {
  //         setBillNeedPost(false);
  //       }
  //     }
  //     setLoading(false);
  //   });
  // }, []);

  useEffect(async () => {

    // BackHandler.addEventListener('hardwareBackPress', backButtonClick);
    setLoading(true);
    const unsubscribe = props.navigation.addListener('focus', async () => {
      await getData(SalesAgentsTable, cb => {
        setSalesAgentsList(cb)
      });
      await getData(UserConfigurationTable, cb => {
        setUserConfiguration(cb[0])
      });
      let saleAgent = await AsyncStorage.getItem('SELECTED_AGNETS');
      if (saleAgent) {
        saleAgent = JSON.parse(saleAgent)
        setSelectedAgent(saleAgent)
      }
      getData(TerminalConfigurationTable, cb => {
        setTerminalConfiguration(cb[0]);
      });
      await getData(SaleBillsTable, async cb => {
        for (let i = 0; i < cb.length; i++) {
          if (
            (cb[i].isUploaded == 'false' || !cb[i].isUploaded) &&
            (cb[i].isProcessed == 'false' || !cb[i].isProcessed)
          ) {
            setBillNeedPost(true);
          } else {
            setBillNeedPost(false);
          }
        }
      });
      getDrawerArray();
    });
    setLoading(false);
    return () => {
      unsubscribe;
    };
  }, [props.navigation]);

  // const backButtonClick = () => {
  //   console.log('safdadsfafasd');
  //   setLoading(true);

  //   props.navigation.navigate('login');
  //   return true;
  //   // BackHandler.removeEventListener('hardwareBackPress', backButtonClick);
  // };

  const getDrawerArray = () => {
    getData(DrawerSetupTable, cb => {
      setDrawerSetupArr(cb[0]);

      setLoading(false);
    });
  };

  const onPressItem = async type => {
    // console.log(type);
    switch (type) {
      case 'new':
        if (drawerSetupArr.isInitialCashSet === 'true') {
          props.navigation.goBack();
        } else {
          viewref.current?.slideInRight(280);
          setPopup(!isPopup);
        }
        break;
      case 'logout':
        Alert.alert(
          "Alert",
          props.StringsList._443,
          [
            {
              text: "yes",
              onPress: async () => {
                goToLogin()
              }
            },
            {
              text: "Cancel",

              style: "cancel"
            },

          ]
        );

        //goToLogin()
        break;
      case 'drawer':
        if (!isPopup) {
          viewref.current?.slideInRight(280);
          setPopup(!isPopup);
          // console.log('on cancel 1');
        } else {
          // console.log('on cancel 2');
          viewref.current?.fadeOutRight().then(() => setPopup(!isPopup));
          getDrawerArray();
        }
        // setPopup(!isPopup);

        break;
      case 'postBills':
        postBills();
        break;
      case 'saleAgents':
        setIsSaleAgents(true)
        break;
      case 'rebootTerminal':
        if (isBillNeedPost) {
          let msg = errorMessages.GetCounterMessage("PendingInvoices", props.StringsList);
          setMessage(msg);
          setDisplayAlert(true);
        } else {
          setLoading(true)
          setIsRequriedLogin(true)
          let accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
          let res = await DBTable.AddDataInDb(props, "rebootTerminal", accessToken)
          await AsyncStorage.removeItem('SELECTED_AGNETS');
          setLoading(false)

          if (!res) {

            let msg = errorMessages.GetCounterMessage("OfflineCounterNotAuthorizedMessage", props.StringsList);
            setMessage(msg);
            setDisplayAlert(true);
          }
        }
        // addDataInDb()
        // props.navigation.navigate('printer');
        break;
    }
  };
  const onClickSetting = async type => {
    //console.log(' onClickSetting ', type);
    switch (type) {
      case 'terminalSetup':
        setTerminalSetup(true);
        break;

      case 'pairPrinterFamily':
        setPairPrinterFamily(true);
        break;
      case 'pairPrinter':


        PrinterNativeModule.initData()
        break;
      default:
        break;
    }
  };


  const postBills = async () => {
    setLoading(true);
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
              cb[i].isProcessed = false,
                cb[i].isUploaded = true
              cb[i].BillDetails = billProducts
              cb[i].isGlobalTax1IncludedInPrice = cb[i].isGlobalTax1IncludedInPrice === "false" ? false : true,
                cb[i].isGlobalTax2IncludedInPrice = cb[i].isGlobalTax2IncludedInPrice === "false" ? false : true,
                cb[i].isLoyaltyInvoice = cb[i].isLoyaltyInvoice === "false" ? false : true

              newBillList.push(cb[i]);
            },
          );
        }
      }
      console.log('New Bill list ...', newBillList);
      // databaseBackup(newBillList)
      if (newBillList.length > 0) {
        console.log('New Bill list ...', newBillList);
        let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
        console.log('USER_LOGIN', newBillList);

        const response1 = await props.dispatch(
          ServerCall(UserLogin, 'SalesBill/CreateSalesBill', newBillList),
        );

        console.log("bill posting response", response1)
        if (response1 === 'success') {
          updatePostedIvoice(newBillList);
          setBillNeedPost(false);
          const extension = (Platform.OS === 'android') ? 'file://' : ''
          const path = `${extension}/storage/emulated/0/FinexcloudBills`;
          RNFS.unlink(path + "/" + 'invoices_backup.json')
            .then(() => {
              console.log('FILE DELETED');
            })

        } else if (response1 === 'False') {
          let msg = errorMessages.GetCounterMessage("PostSettingTaxorDiscounttoRemove", props.StringsList);
          setMessage(
            props.StringsList._298
          );

          setDisplayAlert(true);
          updatePostedIvoice(newBillList);
          setBillNeedPost(false);
          const extension = (Platform.OS === 'android') ? 'file://' : ''
          const path = `${extension}/storage/emulated/0/finexcloudBills`;
          RNFS.unlink(path + "/" + 'invoices_backup.json')
            .then(() => {
              console.log('FILE DELETED');
            })

        } else {
          setMessage(
            props.StringsList._228
          );

          setDisplayAlert(true);
        }
      }
      setLoading(false)

    });
  };



  const updatePostedIvoice = array => {
    for (let i = 0; i < array.length; i++) {
      let columnName = ['isUploaded', 'isProcessed'];
      let columnValue = [true, false];
      updateColunm(
        SaleBillsTable,
        columnName,
        'salesBillID',
        array[i].salesBillID,
        columnValue,
      );
    }
  };

  const goToLogin = async (type) => {
    setLoading(true)
    let loginUserInfo = await AsyncStorage.getItem('LOGIN_USER_INFO');
    loginUserInfo = JSON.parse(loginUserInfo)
    // console.log('access token ', loginUserInfo, JSON.parse(loginUserInfo));
    const response = await props.dispatch(
      ServerCall('', 'AuthorizeUser/SignOut', loginUserInfo),
    );
    console.log('user logout response.. ', response);
    // http://FXCapi.FXC.com/api/AuthorizeUser/SignOut

    props.navigation.replace('Auth');
    await AsyncStorage.removeItem('ACCESS_TOKEN');
    await AsyncStorage.removeItem('SELECTED_AGNETS');
    const checkasync = await AsyncStorage.getItem('ACCESS_TOKEN');
    console.log('checkasync response from server checkasync', checkasync);
    if (type === "terminal")
      await AsyncStorage.removeItem('LOGIN_USER_INFO');
    setLoading(false)
  }

  const reacallFunc = () => {
    goToLogin("terminal")
  }
  const onClickPowerOff = () => {
    Alert.alert(
      "Alert",
      props.StringsList._443,
      [
        {
          text: "yes",
          onPress: async () => {
            goToLogin()
          }
        },
        {
          text: "Cancel",

          style: "cancel"
        },

      ]
    );
  }
  const selectedSaleAgentsFun = async (item) => {
    const value1 = await AsyncStorage.setItem('SELECTED_AGNETS', JSON.stringify(item));
    setSelectedAgent(item)
  }
  return (
    <Design
      onPressItem={onPressItem}
      isPopup={isPopup}
      viewref={viewref}
      TerminalConfiguration={TerminalConfiguration}
      StringsList={props.StringsList}
      isTerminalSetup={isTerminalSetup}
      setTerminalSetup={setTerminalSetup}
      isPairPrinterFamily={isPairPrinterFamily}
      setPairPrinterFamily={setPairPrinterFamily}
      isLoading={isLoading}
      onClickSetting={onClickSetting}
      displayAlert={displayAlert}
      setDisplayAlert={setDisplayAlert}
      message={message}
      isBillNeedPost={isBillNeedPost}
      drawerSetupArr={drawerSetupArr}

      setMessage={setMessage}
      isRequriedLogin={isRequriedLogin}
      goToLogin={goToLogin}
      reacallFunc={reacallFunc}
      isSaleAgents={isSaleAgents}
      salesAgentsList={salesAgentsList}
      setIsSaleAgents={setIsSaleAgents}
      selectedSaleAgentsFun={selectedSaleAgentsFun}
      selectedAgent={selectedAgent}
      userConfiguration={userConfiguration}
      onClickPowerOff={onClickPowerOff}
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
