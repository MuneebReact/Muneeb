import { View, Text, ImageBackground,StatusBar } from 'react-native'
import React from 'react'
import Logo from '../Assets/white-logo.svg'
import sizeHelper from '../../app/helpers/sizeHelper'
export default function Design() {
  return (
    <ImageBackground source={require('../Assets/bg.jpg')} style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Logo height={200} width={250}/>
    </ImageBackground>
  )
}