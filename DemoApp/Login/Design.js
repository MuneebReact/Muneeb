import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  I18nManager,
  TextInput,
  TouchableOpacity
} from 'react-native';


import React, { useState } from 'react'
import sizeHelper from '../../app/helpers/sizeHelper';
import Logo from '../../app/assets/svg/FXCLogo.svg';
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import * as yup from 'yup';
import Loading from '../../components/Loading';
import AppColor from '../../app/constant/AppColor';
export default function Design({
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
}) {
  const loginValidationSchema = yup.object().shape({
    userName: yup.string().required('Name is required'),
    password: yup
      .string()
      .min(6, ({ min }) => 'Password must be at least of 6 characters')
      .required('Password is required'),
  });
  const Animation = useRef(new Animated.Value(1)).current;
 const Animationlogo = useRef(new Animated.Value(1)).current;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.splashContainer}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <ImageBackground style={styles.mainContainer} source={require('../../app/assets/images/bg.png')}>

          <View style={{ backgroundColor: 'rgba(58, 116, 191,0.8)', height: '110%', }}>
            <Text style={{ color: '#fff', position: 'absolute', fontWeight: '500', fontSize: sizeHelper.calHp(30), right: 0, padding: sizeHelper.calHp(40), paddingTop: sizeHelper.calHp(60) }}>Sign In</Text>

            <View style={{ alignSelf: 'center', padding: sizeHelper.calHp(300) }}>
              <Logo
                width={sizeHelper.calWp(500)}
                height={sizeHelper.calHp(100)}

              />
            </View>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#FFF', width: '100%', borderTopLeftRadius: sizeHelper.calHp(80) }}>
          <Text style={styles.signinText}>
            Welcome Back!
          </Text>
          <Text style={styles.signinText1}>
            Sign In Your Account
          </Text>
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
                onSubmit={values => {
                  onClickSignin(values);
                }}>
                {({ handleChange, handleSubmit, values, errors, isValid }) => (
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
                          right: sizeHelper.calWp(20),
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
        </View>

      </View>
    </TouchableWithoutFeedback>

  )
}
const styles = StyleSheet.create({
  splashContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: '100%',
    height: '110%',
    flex: 1,
  },
  signinText: {
    fontSize: sizeHelper.calHp(26),
    color: "#000",
    fontWeight: "bold",
    marginTop: sizeHelper.calHp(18),
    fontFamily: 'ProximaNova-Regular',
    alignSelf: 'center',
    paddingTop: sizeHelper.calHp(40),
  },
  signinText1: {
    fontSize: sizeHelper.calHp(26),
    fontWeight: "500",
    marginTop: sizeHelper.calHp(10),
    fontFamily: 'ProximaNova-Regular',
    alignSelf: 'center',
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
    backgroundColor: '#3a74bf',
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
    color: '#3a74bf',
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