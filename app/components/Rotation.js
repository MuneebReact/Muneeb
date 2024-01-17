import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, Easing, Dimensions } from 'react-native';

export default class Rotation extends Component {
    constructor() {
        super();
        this.animated = new Animated.Value(0);
        var inputRange = [0, 1];
        var outputRange = ['0deg', '360deg'];
        this.rotate = this.animated.interpolate({ inputRange, outputRange });
        outputRange = ['0deg', '-360deg'];
        this.rotateOpposit = this.animated.interpolate({ inputRange, outputRange });
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        Animated.loop(
            Animated.timing(this.animated, {
                toValue: 1,
                duration: 10000,
                useNativeDriver: true,
                easing: Easing.linear,
            }),
        ).start();
    }
    render() {
        const transform = [{ rotate: this.rotate }];
        const transform1 = [{ rotate: this.rotateOpposit }];
        return (
            <View style={styles.container}>

                <Animated.View
                    style={{
                        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                        width: Dimensions.get('window').width * 0.8,
                        height: Dimensions.get('window').width * 0.8,
                        borderWidth: 5,
                        borderColor: "red",
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: transform
                    }}
                    underlayColor='#ccc'
                >

                    <Animated.View style={[styles.dot, { top: 0 }]}>
                        <Text style={styles.text}>1</Text>
                    </Animated.View>

                    <Animated.View style={[styles.dot, { bottom: 0 }]}>
                        <Text style={styles.text}>2</Text>
                    </Animated.View>
                    <Animated.View style={[styles.dot, { right: 0 }]}>
                        <Text style={styles.text}>3</Text>
                    </Animated.View>
                    <Animated.View style={[styles.dot, { left: 0 }]}>
                        <Text style={styles.text}>4</Text>
                    </Animated.View>
                    {/* <Animated.View style={[styles.dot, { top: Dimensions.get('window').width * 0.6, left: 20 }]}>
                        <Text style={styles.text}>5</Text>
                    </Animated.View>
                    <Animated.View style={[styles.dot, { bottom: Dimensions.get('window').width * 0.3, left: -20 }]}>
                        <Text style={styles.text}>6</Text>
                    </Animated.View>
                    <Animated.View style={[styles.dot, { bottom: Dimensions.get('window').width * 0.3, right: -20 }]}>
                        <Text style={styles.text}>7</Text>
                    </Animated.View> */}
                </Animated.View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    item: {
        position: 'absolute',
        width: 200,
        height: 200, // this is the diameter of circle
        borderRadius: 100,
        borderWidth: 1,
        // justifyContent: "space-between",
        flexDirection: "row",
        // paddingStart: 80
    },
    dot: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'red',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: '#fff',
    },
});