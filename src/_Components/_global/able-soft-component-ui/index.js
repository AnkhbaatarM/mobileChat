import React, { Component } from 'react'
import { View } from 'react-native'
import Button from './src/Components/Button';
import TextInput from './src/Components/TextInput';
import UserIcon from './src/Components/UserIcon';
import UserIconGroup from './src/Components/UserIconGroup';
import widthStatic from './src/assets/dimensions/width';
import heightStatic from './src/assets/dimensions/height';
import TwoFactorAuthentication from './src/Screen/TwoFactor';
import Login from './src/Screen/Login';

const TestComp =()=> {
    return (
      //
        <View style={{flex:1,backgroundColor:'#3b4252'}}>

        </View>
    )
}
export {
    Button,
    TextInput,
    Login,
    UserIcon,
    UserIconGroup,
    widthStatic,
    heightStatic,
    TwoFactorAuthentication
}
export default TestComp;
