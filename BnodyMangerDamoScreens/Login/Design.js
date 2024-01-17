import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  I18nManager,
  ActivityIndicator,
  ImageBackground,
  Image,
  Animated,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as yup from 'yup';
import sizeHelper from '../../app/helpers/sizeHelper';
import AppColor from '../../app/constant/AppColor';
export default function Design() {
    const [isVisiblePassword, setVisiblePassword] = useState(false);
    const Animation = useRef(new Animated.Value(1)).current;
    const Animationlogo = useRef(new Animated.Value(1)).current;
    const [keyboardStatus, setKeyboardStatus] = useState('');

    useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardStatus(true);
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardStatus(false);
      });
  
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);
    const visiblePassword = () => {
        setVisiblePassword(!isVisiblePassword);
      };
      const StartAnimation = () => {
        Animated.timing(Animation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }).start();
        Animated.timing(Animationlogo, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }).start();
      };
      useEffect(() => {
        StartAnimation();
      }, []); // empty dependency array to run it only once      
    const loginValidationSchema = yup.object().shape({
        userName: yup.string().required('Name is required'),
        password: yup
          .string()
          .min(6, ({ min }) => 'Password must be at least of 6 characters')
          .required('Password is required'),
      });
      
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.bigContainer}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <ImageBackground style={styles.mainContainer} source={require('./../Assets/bg.jpg')}>
       
            <View style={{ alignSelf: 'center', justifyContent:'center' ,flex:keyboardStatus? 1:5}}>
            <TouchableOpacity
                        style={{
                        right:keyboardStatus?  sizeHelper.calWp(300): sizeHelper.calWp(70),
                        paddingTop:keyboardStatus? sizeHelper.calHp(40):sizeHelper.calHp(20),
                        }}>
                        <Icon
                          name={'chevron-left'}
                          size={sizeHelper.calWp(40)}
                          color={'#fff'}
                        />
                      </TouchableOpacity>
             <Animated.View style={{
        transform:[
          {
            translateY: Animationlogo.interpolate({
              inputRange : [0,1],
              outputRange: [0,-500],
            }),
          },
        //   {
        //     rotate: Animationlogo.interpolate({
        //       inputRange : [0,1],
        //       outputRange: ['0deg','360deg']
        //     }),
        //   },
          {
            scale : Animationlogo.interpolate({
              inputRange : [0,1],
              outputRange: [1,0]
            }),
          }
        ]
       }}>
       {keyboardStatus?
        ''
        :
        <Image source={require('../Assets/login-screen.png')} style={{ width :sizeHelper.calWp(500),height:sizeHelper.calHp(410)}}/>}
             
             </Animated.View>
            </View>
            <Animated.View style={[{ flex:keyboardStatus? 7:6, backgroundColor: '#FFF', width: '100%', borderTopLeftRadius: sizeHelper.calHp(80),borderTopRightRadius: sizeHelper.calHp(80) },
            {
        transform:[
          {
            translateY: Animation.interpolate({
              inputRange : [0,1],
              outputRange: [0,500]
            })
          }
        ]
       }
            ]}>
          <Text style={styles.signinText}>
            Welcome Back!
          </Text>
          <View style={{padding:sizeHelper.calHp(21)}}>
          <Text style={styles.signinText1}>
            We are happy to assist you again, Please enter your details to login.Please stay connected with us in the future to get more.
          </Text>
          </View>
          <KeyboardAvoidingView
            behavior="position"
            style={{ flex: 0.5, justifyContent: 'center' }}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFF',
                padding: 15,
                borderRadius: 5,
              }}>
              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                  userName: '',
                  password: '',
                }}
                >
                {({ handleChange, handleSubmit, values, errors, isValid }) => (
                  <View>
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          borderColor: errors.userName
                            ? '#252ead'
                            : AppColor.gray1,
                        },
                      ]}>
                      <Icon
                        name={'user'}
                        size={sizeHelper.calWp(30)}
                        color={AppColor.gray1}
                      />

                      <TextInput
                        // editable={true}
                        name={'userName'}
                        onChangeText={handleChange('userName')}
                        style={styles.inputField}
                        placeholder={'Enter username...'}
                        value={values.userName}
                        error={errors.userName}
                      />
                    </View>
                    {errors.userName && (
                      <Text style={styles.errorText}>{errors.userName}</Text>
                    )}
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          marginTop: sizeHelper.calHp(33),
                          borderColor: errors.password
                            ? "#252ead"
                            : AppColor.gray1,
                        },
                      ]}>
                     <TouchableOpacity
                        style={{
                          height: sizeHelper.calHp(64),
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: sizeHelper.calWp(45),
                          right: sizeHelper.calWp(20),
                        }}
                         onPress={visiblePassword}
                        >
                        <Icon
                          name={isVisiblePassword ? 'eye' : 'eye-off'}
                          size={sizeHelper.calWp(25)}
                          color={
                            isVisiblePassword
                              ? AppColor.black
                              : AppColor.grayColor
                          }
                        />
                      </TouchableOpacity>
                      <TextInput
                        // editable={true}
                        name={'password'}
                        onChangeText={handleChange('password')}
                        secureTextEntry={!isVisiblePassword}
                        style={styles.inputField}
                        error={errors.password}
                        placeholder={'Enter Password'}
                        value={values.password}
                      />
                      
                    </View>
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                    <TouchableOpacity
                    //   disabled={true}
                      onPress={() => {
                        handleSubmit();
                        Keyboard.dismiss();
                      }}
                      style={styles.signinButtonContainer}>
                      {/* {isLoading ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                          }}>
                          <Loading />
                        </View>
                      ) : ( */}
                        <View
                          style={{
                            flexDirection: 'row',

                            alignItems: 'center',
                          }}>
                          <Text style={styles.buttonText}>
                            Login
                          </Text>

                        </View>
                      {/* )} */}
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
         
        </ImageBackground>
      

      </View>
    </TouchableWithoutFeedback>

  )
}
const styles = StyleSheet.create({
    bigContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainContainer: {
      width: '100%',
      height: '100%',
    //   flex: 1,
    },
    signinText: {
      fontSize: sizeHelper.calHp(30),
      color: "#000",
      fontWeight: "bold",
      marginTop: sizeHelper.calHp(18),
      fontFamily: 'ProximaNova-Regular',
      alignSelf: 'center',
      paddingTop: sizeHelper.calHp(40),
    },
    signinText1: {
      fontSize: sizeHelper.calHp(23),
      fontWeight: "500",
      marginTop: sizeHelper.calHp(10),
      fontFamily: 'ProximaNova-Regular',
      alignSelf: 'center',
      textAlign: 'center',
      paddingBottom: sizeHelper.calHp(60),
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
      backgroundColor: '#252ead',
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
      color: '#252ead',
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
  });