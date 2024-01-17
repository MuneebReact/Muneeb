import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import CirCleTableStyle from '../../components/CircleTableStyle';
import KitchenItem from '../../components/KitchenItem';
import OrderItem from '../../components/OrderItem';
import SquareTableStyle from '../../components/SquareTableStyle';
import sizeHelper from '../../helpers/sizeHelper';
import styles from './style';
import AppColor from '../../constant/AppColor';
import Loading from '../../components/Loading';
const Design = props => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.orderText}>Orders</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              props.setFocusedPending(true);
              props.setFocusedCompleted(false);
            }}>
            <Text
              style={{
                color:
                  props.focusedPending === false
                    ? AppColor.black3
                    : AppColor.blue2,
                fontSize: sizeHelper.calHp(20),
                fontFamily: 'Proxima Nova Bold',
              }}>
              {I18nManager.isRTL ? 'في الأوامر المعلقة' : 'In Pending orders'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              props.setFocusedPending(false);
              props.setFocusedCompleted(true);
            }}>
            <Text
              style={{
                color:
                  props.focusedCompleted === false
                    ? AppColor.black3
                    : AppColor.blue2,
                fontSize: sizeHelper.calHp(20),
                fontFamily: 'Proxima Nova Bold',
              }}>
              {I18nManager.isRTL ? 'لطلبات المنجزة' : 'Completed orders'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <OrderItem />
      <KitchenItem />
      {props.isLoading && (
        <View style={[styles.popupContainer, {zIndex: 99999}]}>
          <Loading />
        </View>
      )}
    </View>
  );
};

export default Design;
