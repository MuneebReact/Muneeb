import React, {useState} from 'react';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import Design from './design';

const TableBookingScreen = props => {
  const [tableList, setTableList] = useState([
    {
      type: 'Squre',
      seat: 4,
      isSelected: false,
    },
    {
      type: 'Squre',
      seat: 4,
      isSelected: false,
    },
    {
      type: 'Squre',
      seat: 4,
      isSelected: false,
    },
    {
      type: 'Squre',
      seat: 4,
      isSelected: false,
    },
    {
      type: 'Squre',
      seat: 4,
      isSelected: false,
    },
    {
      type: 'Squre',
      seat: 4,
      isSelected: false,
    },
    {
      type: 'cricle',
      seat: 8,
      isSelected: false,
    },
    {
      type: 'cricle',
      seat: 8,
      isSelected: false,
    },
    {
      type: 'cricle',
      seat: 12,
      isSelected: false,
    },
    {
      type: 'cricle',
      seat: 8,
      isSelected: false,
    },
    {
      type: 'Squre',
      seat: 12,
      isSelected: false,
    },
    {
      type: 'Squre',
      seat: 4,
      isSelected: true,
    },
    {
      type: 'Long',
      seat: 4,
      isSelected: false,
    },
    {
      type: 'Squre',
      seat: 4,
      isSelected: false,
    },
  ]);

  const onSelectTable = index => {
    let TBL = [...tableList];
    TBL[index].isSelected = true;
    console.log('onSelectTable', tableList);
    setTableList(TBL);
  };
  return (
    <Design
      navigation={props.navigation}
      TableArray={tableList}
      onSelectTable={onSelectTable}
      dispatch={props.dispatch}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableBookingScreen);

// export default TableBookingScreen;
