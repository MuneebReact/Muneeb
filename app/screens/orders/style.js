import React from 'react';
import {StyleSheet} from 'react-native';
import AppColor from '../../constant/AppColor';
import sizeHelper from '../../helpers/sizeHelper';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColor.backColor,
    paddingTop: sizeHelper.calHp(45),
    paddingHorizontal: sizeHelper.calWp(25),
    // marginTop: sizeHelper.calHp(4),
    //alignSelf: 'center',
    //   width: '100%',
    //height: sizeHelper.calHp(540),
    // alignItems: 'center',
    //   flexDirection: "row",
    //marginHorizontal: 15
    //alignItems: "center"
  },
  rowContainer: {
    //backgroundColor: AppColor.gray2,
    //   paddingBottom: 60,
    //  flexDirection: "row",
    //marginHorizontal: 15
    //    justifyContent: "space-around"
  },
  orderText: {
    fontSize: sizeHelper.calHp(30),
    color: AppColor.black3,
    fontFamily: 'Proxima Nova Bold',
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: sizeHelper.calHp(10),
    // marginBottom: sizeHelper.calHp(10),
  },
  buttonView: {
    alignItems: 'center',
    marginHorizontal: sizeHelper.calHp(20),
  },
  header: {alignItems: 'center', bottom: 20},
  buttonStyle: {
    height: sizeHelper.calWp(50),
    width: sizeHelper.calWp(166.66),
  },
  titleContainer: {
    backgroundColor: AppColor.blue2,
  },
  popupContainer: {
    width: '120%',
    height: '120%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColor.popUpBackgroundColor,
    zIndex: 9999,
    alignSelf: 'center',
    // flex:1
  },
});

export default styles;
