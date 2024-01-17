import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import CirCleTableStyle from '../../components/CircleTableStyle';
import SquareTableStyle from '../../components/SquareTableStyle';
import sizeHelper from '../../helpers/sizeHelper';
import styles from './style';
const Design = props => {
  const renderTable = ({item, index}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            marginTop: sizeHelper.calHp(20),
            zIndex: item.isRestViewDetail ? 999 : 0,
            alignItems: 'center',

            //    marginEnd: sizeHelper.calWp(22),
            //overflow: "hidden"
          }}>
          {item.TableTypeName == 'Round' ? (
            <CirCleTableStyle
              item={item}
              index={index}
              Pprop={props}
              dispatch={props.dispatch}
              navigation={props.navigation}
              screenData={props.TableArray}
              setScreenData={props.setScreenData}
              emptyAsyncTableObj={props.emptyAsyncTableObj}
              setLoading={props.setLoading}
              setTableID={props.setTableID}
            />
          ) : (
            <SquareTableStyle
              item={item}
              index={index}
              Pprop={props}
              dispatch={props.dispatch}
              navigation={props.navigation}
              screenData={props.TableArray}
              setScreenData={props.setScreenData}
              emptyAsyncTableObj={props.emptyAsyncTableObj}
              setLoading={props.setLoading}
              setTableID={props.setTableID}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          // flex: 1,
          width: '95%',
        }}
        numColumns={3}
        nestedScrollEnabled
        columnWrapperStyle={{
          // flexDirection: "column",
          justifyContent: 'space-between',

          //marginTop: 25
        }}
        contentContainerStyle={{
          // justifyContent: 'center',

          // backgroundColor: "green",
          paddingBottom: 20,
        }}
        CellRendererComponent={({children}) => children}
        removeClippedSubviews={false}
        // data={props.TableArray.sort((a, b) => a.localeCompare(b))}
        data={props.TableArray}
        extraData={props.TableArray}
        // extraData={props.TableArray.sort((a, b) => a.localeCompare(b))}
        renderItem={renderTable}
        keyExtractor={(item, index) => item.key}
        key={props.TableArray?.TableCode?.toString()}
        // keyExtractor={(item, index) =>
        //   '_' + item?.TableCode?.toString() + index
        // }
        // key={'_'}
      />
    </View>
  );
};

export default Design;
