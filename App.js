/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, Text,StyleSheet,ImageBackground,StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AppRouter from './app/routes/AppRoutes';
//import SplashScreen from './app/screens/splash';
import {Provider} from 'react-redux';
import persist from './app/redux/store/store';
import {MenuProvider} from 'react-native-popup-menu';
import {LogBox} from 'react-native';
import Index from './app/screens/splash/index';
import FXCLogo from './app/assets/svg/FXCLogo'
import sizeHelper from './app/helpers/sizeHelper';
// import Design from './DemoApp/Login/Design';
import Design from './BnodyMangerDamoScreens/Login/Design';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); 
LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
  ' Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React',
]);
// const persistStore = persist();

export default function App() {
  useEffect(() => {
    console.log('Root app, Props are: ');
  }, []);
  return (
    // <MenuProvider skipInstanceCheck={true} style={{flex: 1}}>
    //   <NavigationContainer>
    //     <Provider store={persistStore.store}>
    //       <AppRouter />
    //     </Provider>
    //   </NavigationContainer>
    // </MenuProvider>
    <View>
     <Design/>
     </View> 
  );
}
