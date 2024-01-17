import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import CirCleTableStyle from '../../components/CircleTableStyle';
import LongTable from '../../components/LongTable';
import SquareTableStyle from '../../components/SquareTableStyle';
import sizeHelper from '../../helpers/sizeHelper';
import styles from './style';
import BottomTabBar from '../../components/BottomTabBar';
import Header from '../../components/Header';

const Design = props => {
  console.log(' desing tb is', props);
  const renderTable = ({item, index}) => {
    console.log('idjfisdi.', item);

    return (
      <View
        style={{
          marginTop: sizeHelper.calHp(25),
          //    marginEnd: sizeHelper.calWp(22),
        }}>
        {item.type == 'cricle' ? (
          <CirCleTableStyle item={item} index={index} Pprop={props} />
        ) : item.type == 'Long' ? (
          <LongTable item={item} index={index} Pprop={props} />
        ) : (
          <SquareTableStyle item={item} index={index} Pprop={props} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        props={props}
        isSearch={false}
        onInvoiceClick={props.onInvoiceClick}
      />
      <BottomTabBar props={props.navigation} dispatch={props.dispatch} />
    </View>
  );
};

export default Design;
