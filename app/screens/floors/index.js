import React, {useEffect, useState} from 'react';

import Design from './design';

const FloorScreen = props => {
  return (
    <Design
      TableArray={props.screenData}
      onSelectTable={props.onPress}
      dispatch={props.dispatch}
      navigation={props.navigation}
      setScreenData={props.setScreenData}
      emptyAsyncTableObj={props.emptyAsyncTableObj}
      setLoading={props.setLoading}
      setTableID={props.setTableID}
    />
  );
};

export default FloorScreen;
