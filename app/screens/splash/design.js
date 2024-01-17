import React,{useEffect} from 'react';
import { View, StatusBar, SafeAreaView, ImageBackground,Image,TouchableOpacity,Text } from 'react-native';
import * as Progress from 'react-native-progress';

import { createStackNavigator } from "@react-navigation/stack";
import * as Animatable from "react-native-animatable";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from './style';
import Logo from '../../assets/svg/FXCLogo.svg';
import sizeHelper from '../../helpers/sizeHelper';
import AppColor from '../../constant/AppColor';

const Design = (props) => {
  const checktoken =async()=>{
    let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
    console.log('UserLogin token is................... ', UserLogin);
  }
  useEffect(()=>{
    checktoken()
  },[]);

  return !props.showRealApp ? (

    <Animatable.View style={{ flex: 1 }} animation="zoomIn">
      {/* <StatusBar hidden barStyle="light-content" backgroundColor={AppColor.blue} /> */}

      {/* <AppIntroSlider
        activeDotStyle={
          { marginBottom: 20, width: 30, backgroundColor: AppColor.white }
        }
        dotStyle={
          {

            marginBottom: 20, backgroundColor: AppColor.gray3
          }
        }
        data={props.slides}


        renderItem={props.renderItem}
        renderDoneButton={props.renderDoneButton}
        renderNextButton={props.renderNextButton}
      /> */}
      <ImageBackground style={styles.mainContainer} source={require('../../assets/images/bg.png')}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <View style={{ backgroundColor: 'rgba(58, 116, 191,0.7)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '85%',  backgroundColor: 'white', borderRadius: sizeHelper.calHp(30), alignItems: 'center', paddingTop: sizeHelper.calHp(100) }}>
                    <Image source={require('../../assets/images/vactore.png')} style={{ width: sizeHelper.calWp(480), height: sizeHelper.calHp(430),}} />
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: sizeHelper.calHp(35), paddingTop: sizeHelper.calHp(30), textTransform: 'capitalize' }}>the fastest food services</Text>
                    <View style={{ padding: sizeHelper.calHp(20),paddingBottom:sizeHelper.calHp(100) }}>
                        <Text style={{color: '#000', fontSize: sizeHelper.calHp(23), paddingTop: sizeHelper.calHp(10), textAlign: 'center' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500S,</Text>
                    </View>
                    <TouchableOpacity  onPress={props.onDone} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#3a74bf', width: sizeHelper.calHp(100), height: sizeHelper.calHp(100), position: 'absolute', borderRadius: sizeHelper.calHp(100), borderWidth: sizeHelper.calHp(9), bottom: sizeHelper.calHp(-40), borderColor: '#fff' }}>
                        <Icon name={"arrow-right"} color={'#fff'} size={sizeHelper.calHp(40)} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>

    </Animatable.View>

  ) : (
    // <ImageBackground
    //   source={require("../../assets/images/bg.png")}
    //   imageStyle={{ width: "100%", height: "100%" }}
    //   style={styles.splashContainer}
    // >
    //   <StatusBar hidden />
      
    //   <Logo/>
      
      
    //   <Progress.Bar
    //     useNativeDriver
    //     indeterminate
    //     progress={1}
    //     width={sizeHelper.calWp(400)}
    //     height={sizeHelper.calHp(2)}
    //     unfilledColor={AppColor.yellowColor}
    //     borderWidth={0}
    //     style={{ marginTop: sizeHelper.calHp(64) }}
    //     color={AppColor.white}
    //   />
    // </ImageBackground>
    <View style={styles.splashContainer}>
      <ImageBackground style={styles.mainContainer} source={require('../../assets/images/bg.png')}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
        <View style={{ backgroundColor: 'rgba(58, 116, 191,0.7)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Logo
            width={sizeHelper.calWp(400)}
            height={sizeHelper.calHp(69)}
          />

        </View>
      </ImageBackground>
    </View>
  );
};

export default Design;
