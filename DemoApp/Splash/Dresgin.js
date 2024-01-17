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
    TouchableOpacity,
    Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import sizeHelper from '../../app/helpers/sizeHelper';

export default function Dresgin() {
    return (
        <ImageBackground style={styles.mainContainer} source={require('../../app/assets/images/bg.png')}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <View style={{ backgroundColor: 'rgba(58, 116, 191,0.7)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '85%',  backgroundColor: 'white', borderRadius: sizeHelper.calHp(30), alignItems: 'center', paddingTop: sizeHelper.calHp(100) }}>
                    <Image source={require('../../app/assets/images/vactore.png')} style={{ width: sizeHelper.calWp(480), height: sizeHelper.calHp(430),}} />
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: sizeHelper.calHp(35), paddingTop: sizeHelper.calHp(30), textTransform: 'capitalize' }}>the fastest food services</Text>
                    <View style={{ padding: sizeHelper.calHp(20),paddingBottom:sizeHelper.calHp(100) }}>
                        <Text style={{color: '#000', fontSize: sizeHelper.calHp(23), paddingTop: sizeHelper.calHp(10), textAlign: 'center' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500S,</Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#3a74bf', width: sizeHelper.calHp(100), height: sizeHelper.calHp(100), position: 'absolute', borderRadius: sizeHelper.calHp(100), borderWidth: sizeHelper.calHp(9), bottom: sizeHelper.calHp(-40), borderColor: '#fff' }}>
                        <Icon name={"arrow-right"} color={'#fff'} size={sizeHelper.calHp(40)} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
    },
});