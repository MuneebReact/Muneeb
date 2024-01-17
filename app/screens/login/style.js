import {StyleSheet} from 'react-native';
import AppColor from '../../constant/AppColor';
import sizeHelper from '../../helpers/sizeHelper';
import {I18nManager} from 'react-native';

const styles = StyleSheet.create({
  splashContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: '100%',
    height: '200%',
    flex: 1, 
  },
  signinText: {
      fontSize: sizeHelper.calHp(26),
      color: "#000",
      fontWeight:"bold",
      marginTop: sizeHelper.calHp(18),
      fontFamily: 'ProximaNova-Regular',
      alignSelf:'center',
      paddingTop: sizeHelper.calHp(40),
    },
    signinText1: {
      fontSize: sizeHelper.calHp(26),
      fontWeight:"500",
      marginTop: sizeHelper.calHp(10),
      fontFamily: 'ProximaNova-Regular',
      alignSelf:'center',
      paddingBottom : sizeHelper.calHp(60),
    },
    inputContainer: {
      width: sizeHelper.calWp(609),
      height: sizeHelper.calHp(80),
      backgroundColor: AppColor.white,
      borderRadius: sizeHelper.calHp(50),
      paddingStart: sizeHelper.calWp(27),
      marginTop: sizeHelper.calHp(50),
      alignItems: 'center',
      flexDirection: 'row',
      borderColor: AppColor.red,
      borderRadius: sizeHelper.calWp(5),
      borderWidth: 1,
    },
    popupContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: AppColor.popUpBackgroundColor,
      zIndex: 9999,
    },
    inputField: {
      textAlignVertical: 'center',
      padding: 0,
      paddingStart: sizeHelper.calWp(18),
      width: sizeHelper.calWp(510),
      marginEnd: sizeHelper.calWp(10),
      height: sizeHelper.calHp(75),
      backgroundColor: AppColor.white,
      fontFamily: 'Proxima Nova Bold',
      fontSize: sizeHelper.calHp(20),
      color: AppColor.black,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    signinButtonContainer: {
      width: sizeHelper.calWp(609),
      height: sizeHelper.calHp(80),
      backgroundColor: '#3a74bf',
      borderRadius: sizeHelper.calHp(5),
      marginTop: sizeHelper.calHp(40),
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    buttonText: {
      // textAlign: 'left',
      textAlignVertical: 'center',
      fontSize: sizeHelper.calHp(24),
      color: AppColor.white,
      fontFamily: 'ProximaNova-Semibold',
      marginEnd: sizeHelper.calWp(4),
    },
    errorText: {
      //textAlign: 'right',
      color: '#3a74bf',
      fontFamily: 'ProximaNova-Semibold',
      marginTop: sizeHelper.calHp(10),
      fontSize: sizeHelper.calHp(20),
  
      marginStart: sizeHelper.calWp(55),
    },
    input: {
      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      flex: 0.8,
      alignItems: 'center',
      backgroundColor: AppColor.white,
      fontSize: 15,
      color: '#424242',
      margin: 1,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    bgimg: {
      position: 'absolute',
      width: 250,
      height: 200,
      top: 0,
      // right: I18nManager.isRTL ? 0 : width - 250,
    },
    intro: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: AppColor.blue,
    },
    topView: {
      flex: 1,
      backgroundColor: AppColor.blue,
    },
    container: {
      height: 65, 
      position: 'relative',
    },
    labelContainer: {
      position: 'absolute',
      backgroundColor: '#FFF',
      top: -8,
      left: 25,
      padding: 5,
      zIndex: 50,
    },
    textInput: {
      flex: 1, 
      borderWidth: 1, 
      borderColor: "steel",
      justifyContent: 'flex-end',
      height: 44,
      borderRadius: 65,
      paddingHorizontal: 25,
    },
});

export default styles;