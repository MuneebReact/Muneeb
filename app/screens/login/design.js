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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as yup from 'yup';
import styles from './style';
import LoginShape from '../../assets/svg/loginShape.svg';
import Logo from '../../assets/svg/FXCLogo.svg';
import sizeHelper from '../../helpers/sizeHelper';
import AppColor from '../../constant/AppColor';

import Loading from '../../components/Loading';
import AlertModel from '../../components/AlertModel';
import PrivacyPolicy from '../../components/PrivacyPolicy';

const Design = ({
  isVisiblePassword,
  visiblePassword,
  onClickSignin,
  isLoading,
  setDisplayAlert,
  displayAlert,
  message,
  setisPromptAlert,
  isPromptAlert,
  terminalCode,
  onChangeText,
  reacallLoginApi,
  StringsList,
  isPrivacy,
  onAcceptPrivacy,
  onRejectPrivacy,
}) => {
  const loginValidationSchema = yup.object().shape({
    userName: yup.string().required('Name is required'),
    password: yup
      .string()
      .min(6, ({min}) => 'Password must be at least of 6 characters')
      .required('Password is required'),
  });
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState(true);

  const [UrlView, setUrlView] = useState(true);
  const [domainUrl, setDomainUrl] = useState('');
  const [dialogue, setDialogue] = useState(false);
  const [content, setContent] = useState([]);
 const Animation = useRef(new Animated.Value(1)).current;
 const Animationlogo = useRef(new Animated.Value(1)).current;
  const checkDomian = async url => {
    // console.log('%cParams color is red', 'color:red', url);
    // const response = await prop.dispatch(checkUserDomain(url));
    // console.log('res*/*', response);
    // if (response.IsSuccess) {
    //   setUrlView(false);
    // } else {
    //   console.log('hhhhhhhhhhh', response.ReturnMessage);
    //   setContent([
    //     'Error',
    //     response.ReturnMessage == undefined
    //       ? response.message
    //       : response.ReturnMessage,
    //   ]);
    setUrlView(false);
    // }
  };
  
  const StartAnimation =()=>{
      Animated.timing(Animation,{
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
      Animated.timing(Animationlogo,{
        toValue: 0,
        duration: 3500,
        useNativeDriver: true,
      }).start();

  }
  useEffect(()=>{
    StartAnimation();
  },[]);
  return (
    <>
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.splashContainer}>
    <StatusBar translucent={true} backgroundColor={'transparent'} />
    <ImageBackground style={styles.mainContainer} source={require('../../assets/images/bg.png')}>
    
      <View style={{ backgroundColor: 'rgba(58, 116, 191,0.8)',height:'200%', }}>
      <Text style={{color:'#fff',position:'absolute',fontWeight:'500',fontSize:sizeHelper.calHp(30), right:0,padding:sizeHelper.calHp(40),paddingTop:sizeHelper.calHp(60)}}>Sign In</Text>
       
       <View style={{alignSelf:'center',padding:sizeHelper.calHp(300)}}>
       <Animated.View style={{
        transform:[
          {
            translateY: Animationlogo.interpolate({
              inputRange : [0,1],
              outputRange: [0,-500],
            }),
          },
          {
            rotate: Animationlogo.interpolate({
              inputRange : [0,1],
              outputRange: ['0deg','360deg']
            }),
          },
          {
            scale : Animationlogo.interpolate({
              inputRange : [0,1],
              outputRange: [1,0]
            }),
          }
        ]
       }}>
       <Logo
          width={sizeHelper.calWp(500)}
          height={sizeHelper.calHp(100)}
          
        />
        </Animated.View>
        </View>
        </View>
       </ImageBackground>
       <Animated.View style={[{flex:1,backgroundColor:'#FFF',width:'100%',borderTopLeftRadius:sizeHelper.calHp(80),},{
        transform:[
          {
            translateY: Animation.interpolate({
              inputRange : [0,1],
              outputRange: [0,500]
            })
          }
        ]
       }]}>
          <Text style={styles.signinText}>
                Welcome Back!
              </Text>
              <Text style={styles.signinText1}>
                Sign In Your Account
              </Text>
          <KeyboardAvoidingView
            behavior="position"
            style={{flex: 0.5, justifyContent: 'center'}}>
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
                onSubmit={values => {
                  onClickSignin(values);
                }}>
                {({handleChange, handleSubmit, values, errors, isValid}) => (
                    <View>
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          borderColor: errors.userName
                            ? '#3a74bf'
                            : AppColor.gray1,
                        },
                      ]}>
                      <Icon
                        name={'user'}
                        size={sizeHelper.calWp(30)}
                        color={'#3a74bf'}
                      />

                      <TextInput
                        editable={!isLoading}
                        name={'userName'}
                        onChangeText={handleChange('userName')}
                        style={styles.inputField}
                        placeholder={'User Name'}
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
                            ? "#3a74bf"
                            : AppColor.gray1,
                        },
                      ]}>
                      <Icon
                        name={'lock'}
                        size={sizeHelper.calWp(30)}
                        color={'#3a74bf'}
                      />
                      <TextInput
                        editable={!isLoading}
                        name={'password'}
                        onChangeText={handleChange('password')}
                        secureTextEntry={!isVisiblePassword}
                        style={styles.inputField}
                        error={errors.password}
                        placeholder={'Password'}
                        value={values.password}
                      />
                      <TouchableOpacity
                        style={{
                          height: sizeHelper.calHp(64),
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: sizeHelper.calWp(45),
                          right:sizeHelper.calWp(20),
                        }}
                        onPress={visiblePassword}>
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
                    </View>
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                    <TouchableOpacity
                      disabled={isLoading}
                      onPress={() => {
                        handleSubmit();
                        Keyboard.dismiss();
                      }}
                      style={styles.signinButtonContainer}>
                      {isLoading ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                          }}>
                          <Loading />
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',

                            alignItems: 'center',
                          }}>
                          <Text style={styles.buttonText}>
                            Sign in
                          </Text>
                         
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
              </View>
              </KeyboardAvoidingView>
              {!isPrivacy && (
            <View style={styles.popupContainer}>
              <PrivacyPolicy
                StringsList={StringsList}
                onAcceptPrivacy={onAcceptPrivacy}
                onPressCancel={onRejectPrivacy}
              />
            </View>
          )}

          <AlertModel
            displayAlert={displayAlert}
            onAlertShow={setDisplayAlert}
            setisPromptAlert={setisPromptAlert}
            isPromptAlert={isPromptAlert}
            message={message}
            value={terminalCode}
            placeholderText={'Please Enter terminal code'}
            onChangeText={onChangeText}
            reacallFunc={reacallLoginApi}
          />
       </Animated.View>

      </View>
      </TouchableWithoutFeedback>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../../assets/images/splashBg.png')}
          style={styles.loginContainer}>
          <StatusBar hidden />

          <KeyboardAvoidingView
            behavior="position"
            style={{flex: 0.5, justifyContent: 'center'}}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: AppColor.white,
                padding: 15,
                borderRadius: 5,
              }}>
              <Image source={require('../../assets/images/white-logo.png')} style={{height:sizeHelper.calHp(50),width:sizeHelper.calWp(350)}} />

              <Text style={styles.signinText}>
                {'Sign in to your account'}
              </Text>

              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                  userName: '',
                  password: '',
                }}
                onSubmit={values => {
                  onClickSignin(values);
                }}>
                {({handleChange, handleSubmit, values, errors, isValid}) => (
                  <View>
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          borderColor: errors.userName
                            ? AppColor.orange
                            : AppColor.gray1,
                        },
                      ]}>
                      <Icon
                        name={'user'}
                        size={sizeHelper.calWp(30)}
                        color={AppColor.orange}
                      />

                      <TextInput
                        editable={!isLoading}
                        name={'userName'}
                        onChangeText={handleChange('userName')}
                        style={styles.inputField}
                        placeholder={'User Name'}
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
                            ? AppColor.orange
                            : AppColor.gray1,
                        },
                      ]}>
                      <Icon
                        name={'lock'}
                        size={sizeHelper.calWp(30)}
                        color={AppColor.orange}
                      />
                      <TextInput
                        editable={!isLoading}
                        name={'password'}
                        onChangeText={handleChange('password')}
                        secureTextEntry={!isVisiblePassword}
                        style={styles.inputField}
                        error={errors.password}
                        placeholder={'Password'}
                        value={values.password}
                      />
                      <TouchableOpacity
                        style={{
                          height: sizeHelper.calHp(64),
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: sizeHelper.calWp(45),
                        }}
                        onPress={visiblePassword}>
                        <Icon
                          name={isVisiblePassword ? 'eye' : 'eye-slash'}
                          size={sizeHelper.calWp(21)}
                          color={
                            isVisiblePassword
                              ? AppColor.black
                              : AppColor.grayColor
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                    <TouchableOpacity
                      disabled={isLoading}
                      onPress={() => {
                        handleSubmit();
                        Keyboard.dismiss();
                      }}
                      style={styles.signinButtonContainer}>
                      {isLoading ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                          }}>
                          <Loading />
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',

                            alignItems: 'center',
                          }}>
                          <Text style={styles.buttonText}>
                            Sign in
                          </Text>
                          <Icon
                            name={
                              I18nManager.isRTL
                                ? 'chevron-left'
                                : 'chevron-right'
                            }
                            size={sizeHelper.calWp(18)}
                            color={AppColor.white}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
          {!isPrivacy && (
            <View style={styles.popupContainer}>
              <PrivacyPolicy
                StringsList={StringsList}
                onAcceptPrivacy={onAcceptPrivacy}
                onPressCancel={onRejectPrivacy}
              />
            </View>
          )}

          <AlertModel
            displayAlert={displayAlert}
            onAlertShow={setDisplayAlert}
            setisPromptAlert={setisPromptAlert}
            isPromptAlert={isPromptAlert}
            message={message}
            value={terminalCode}
            placeholderText={'Please Enter terminal code'}
            onChangeText={onChangeText}
            reacallFunc={reacallLoginApi}
          />
        </ImageBackground>
      </TouchableWithoutFeedback> */}
    </>
    // <>
    //   {UrlView ? (
    //     <>
    //       <View style={styles.intro}>
    //         <StatusBar hidden />
    //         <Image
    //           style={{width: '40%', resizeMode: 'contain'}}
    //           source={require('../../assets/images/main-logo.png')}
    //         />
    //       </View>

    //       <View
    //         style={{
    //           flex: 1,
    //           backgroundColor: AppColor.blue,
    //         }}>
    //         <View
    //           style={{
    //             width: '85%',
    //             alignSelf: 'center',
    //             borderWidth: 0,
    //             borderRadius: 5,
    //             backgroundColor: AppColor.yellowColor,
    //             height: sizeHelper.calHp(50),
    //             marginTop: sizeHelper.calHp(30),
    //             borderColor: AppColor.yellow1,
    //             flexDirection: 'row',
    //             height: sizeHelper.calWp(70),
    //           }}>
    //           <View style={styles.input}>
    //             <TextInput
    //               value={domainUrl}
    //               underlineColorAndroid="transparent"
    //               placeholder={'abc'}
    //               placeholderTextColor={AppColor.gray1}
    //               onChangeText={setDomainUrl}
    //               autoFocus={true}
    //               style={{
    //                 flex: 1,
    //                 fontSize: 15,
    //                 fontFamily: 'ProximaNova-Regular',
    //                 paddingVertical: 0,

    //                 // textAlign: RNI18nManager.isRTL ? 'left' : 'right',
    //               }}
    //             />
    //             {/* <Text
    //               style={{
    //                 fontSize: 15,
    //                 color: AppColor.black,
    //                 paddingHorizontal: 10,
    //                 // textAlign: RNI18nManager.isRTL ? 'left' : 'right',
    //                 fontFamily: 'ProximaNova-Regular',
    //               }}>
    //               {'.FXC.com'}
    //             </Text> */}
    //           </View>
    //           {isLoading ? (
    //             <ActivityIndicator
    //               style={{
    //                 flex: 0.2,
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //               }}
    //               size="small"
    //               color={AppColor.white}
    //             />
    //           ) : (
    //             <TouchableOpacity
    //               style={{
    //                 flex: 0.2,
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //               }}
    //               onPress={() => checkDomian(domainUrl + '.FXC.com')}>
    //               <Text
    //                 style={{
    //                   fontSize: 17,
    //                   fontFamily: 'ProximaNova-Semibold',
    //                   color: AppColor.white,
    //                 }}>
    //                 {I18nManager.isRTL ? 'يذهب' : 'Go'}
    //               </Text>
    //             </TouchableOpacity>
    //           )}
    //         </View>
    //       </View>
    //     </>
    //   ) : (
    //     <>
    //       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //         <ImageBackground
    //           source={require('../../assets/images/splashBg.png')}
    //           style={styles.loginContainer}>
    //           <StatusBar hidden />

    //           <KeyboardAvoidingView
    //             behavior="position"
    //             style={{flex: 0.5, justifyContent: 'center'}}>
    //             <View
    //               style={{
    //                 alignSelf: 'center',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 backgroundColor: AppColor.white,
    //                 padding: 15,
    //                 borderRadius: 5,
    //               }}>
    //               <FXCLogo
    //                 width={sizeHelper.calWp(150)}
    //                 height={sizeHelper.calHp(69)}
    //               />
    //               <Text style={styles.signinText}>
    //                 {I18nManager.isRTL
    //                   ? 'تسجيل الدخول إلى حسابك'
    //                   : 'Sign in to your account'}
    //               </Text>

    //               <Formik
    //                 validationSchema={loginValidationSchema}
    //                 initialValues={{
    //                   userName: '',
    //                   password: '',
    //                 }}
    //                 onSubmit={values => {
    //                   onClickSignin(values);
    //                 }}>
    //                 {({
    //                   handleChange,
    //                   handleSubmit,
    //                   values,
    //                   errors,
    //                   isValid,
    //                 }) => (
    //                   <View>
    //                     <View
    //                       style={[
    //                         styles.inputContainer,
    //                         {
    //                           borderColor: errors.userName
    //                             ? AppColor.orange
    //                             : AppColor.gray1,
    //                         },
    //                       ]}>
    //                       <Icon
    //                         name={'user'}
    //                         size={sizeHelper.calWp(30)}
    //                         color={AppColor.orange}
    //                       />

    //                       <TextInput
    //                         editable={!isLoading}
    //                         name={'userName'}
    //                         onChangeText={handleChange('userName')}
    //                         style={styles.inputField}
    //                         placeholder={
    //                           I18nManager.isRTL ? 'اسم االمستخدم' : 'User Name'
    //                         }
    //                         value={values.userName}
    //                         error={errors.userName}
    //                       />
    //                     </View>
    //                     {errors.userName && (
    //                       <Text style={styles.errorText}>
    //                         {errors.userName}
    //                       </Text>
    //                     )}
    //                     <View
    //                       style={[
    //                         styles.inputContainer,
    //                         {
    //                           marginTop: sizeHelper.calHp(33),
    //                           borderColor: errors.password
    //                             ? AppColor.orange
    //                             : AppColor.gray1,
    //                         },
    //                       ]}>
    //                       <Icon
    //                         name={'lock'}
    //                         size={sizeHelper.calWp(30)}
    //                         color={AppColor.orange}
    //                       />
    //                       <TextInput
    //                         editable={!isLoading}
    //                         name={'password'}
    //                         onChangeText={handleChange('password')}
    //                         secureTextEntry={!isVisiblePassword}
    //                         style={styles.inputField}
    //                         error={errors.password}
    //                         placeholder={
    //                           I18nManager.isRTL ? 'كلمه السر' : 'Password'
    //                         }
    //                         value={values.password}
    //                       />
    //                       <TouchableOpacity
    //                         style={{
    //                           height: sizeHelper.calHp(64),
    //                           justifyContent: 'center',
    //                           alignItems: 'center',
    //                           width: sizeHelper.calWp(45),
    //                         }}
    //                         onPress={visiblePassword}>
    //                         <Icon
    //                           name={isVisiblePassword ? 'eye' : 'eye-slash'}
    //                           size={sizeHelper.calWp(21)}
    //                           color={
    //                             isVisiblePassword
    //                               ? AppColor.black
    //                               : AppColor.grayColor
    //                           }
    //                         />
    //                       </TouchableOpacity>
    //                     </View>
    //                     {errors.password && (
    //                       <Text style={styles.errorText}>
    //                         {errors.password}
    //                       </Text>
    //                     )}
    //                     <TouchableOpacity
    //                       disabled={isLoading}
    //                       onPress={() => {
    //                         handleSubmit();
    //                         Keyboard.dismiss();
    //                       }}
    //                       style={styles.signinButtonContainer}>
    //                       {isLoading ? (
    //                         <View
    //                           style={{
    //                             flexDirection: 'row',
    //                             alignItems: 'center',
    //                             alignSelf: 'center',
    //                           }}>
    //                           <Loading />
    //                         </View>
    //                       ) : (
    //                         <View
    //                           style={{
    //                             flexDirection: 'row',

    //                             alignItems: 'center',
    //                           }}>
    //                           <Text style={styles.buttonText}>
    //                             {I18nManager.isRTL ? 'تسجيل الدخول' : 'Sign in'}
    //                           </Text>
    //                           <Icon
    //                             name={
    //                               I18nManager.isRTL
    //                                 ? 'chevron-left'
    //                                 : 'chevron-right'
    //                             }
    //                             size={sizeHelper.calWp(18)}
    //                             color={AppColor.white}
    //                           />
    //                         </View>
    //                       )}
    //                     </TouchableOpacity>
    //                   </View>
    //                 )}
    //               </Formik>
    //             </View>
    //           </KeyboardAvoidingView>
    //           {!isPrivacy && (
    //             <View style={styles.popupContainer}>
    //               <PrivacyPolicy
    //                 StringsList={StringsList}
    //                 onAcceptPrivacy={onAcceptPrivacy}
    //                 onPressCancel={onRejectPrivacy}
    //               />
    //             </View>
    //           )}

    //           <AlertModel
    //             displayAlert={displayAlert}
    //             onAlertShow={setDisplayAlert}
    //             setisPromptAlert={setisPromptAlert}
    //             isPromptAlert={isPromptAlert}
    //             message={message}
    //             value={terminalCode}
    //             placeholderText={'Please Enter terminal code'}
    //             onChangeText={onChangeText}
    //             reacallFunc={reacallLoginApi}
    //           />
    //         </ImageBackground>
    //       </TouchableWithoutFeedback>
    //     </>
    //   )}
    // </>
  );
};
export default Design;
