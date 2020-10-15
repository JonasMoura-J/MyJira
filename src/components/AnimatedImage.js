import React, { useState, useContext, useEffect } from 'react';
import { Alert, Animated, Easing, View } from 'react-native';
import agenda from '../assets/agenda.png'

const AnimatedImage = () =>{

let spinValue = new Animated.Value(0)
    // First set up animation 

    Animated.timing(
        spinValue,
    {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true // To make use of native driver for performance
    }
    ).start()

    // Second interpolate beginning and end values (in this case 0 and 1)
    
    const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
    })

    return(
        <Animated.Image
            style={{transform: [{rotateY: spin}], height: 100, width: 100}}
            source={agenda}/>
    )
}
export default React.memo(AnimatedImage);