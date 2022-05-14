/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  LayoutAnimation,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import styles from './Styles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import BackgroundTimer from 'react-native-background-timer';
import UserIcon from '../../../Components/UserIcon';
import Button from '../../../Components/Button';

const TwoFactorVerify = ({
  goBack = () => {},
  cellCount = 6,
  path = undefined,
  checkAuthCode = () => {},
  AuthSuccess = () => {},
  resetCode = () => {},
}) => {
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(60);
  const [hideIcon, showIcon] = useState(false);
  const [reseting, setReseting] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const ref = useBlurOnFulfill({value, cellCount: cellCount});
  let intervalId;
  let time = 60;
  useEffect(() => {
    intervalId = BackgroundTimer.setInterval(() => {
      time -= 1;
      setTimer(time);
      if (time === 0) {
        setTimer(0);
        BackgroundTimer.clearInterval(intervalId);
      }
    }, 1000);
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    // cleanup function
    return () => {
      BackgroundTimer.clearInterval(intervalId);
      backHandler.remove();
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const backAction = () => {
    return true;
  };

  const _keyboardDidShow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    showIcon(true);
  };

  const _keyboardDidHide = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    showIcon(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      {!hideIcon && (
        <>
          <UserIcon path={path} width={80} height={80} />
          <Text style={styles.warningText}>
            {'Баталгаажуулах кодоо \nоруулна уу!'}
          </Text>
        </>
      )}
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Button
        containerStyle={styles.mainbutton}
        label={'Код шалгах'}
        labelStyle={styles.mainbuttontext}
        customLoaderStyle={{backgroundColor: styles.mainbutton.backgroundColor}}
        onPress={async () => {
          const isSuccess = await checkAuthCode(value);
          if (isSuccess === 'code_success') {
            AuthSuccess();
          } else if (isSuccess === 'limit_exceed') {
            setValue(0);
            goBack();
          }
        }}
      />
      <TouchableOpacity
        disabled={timer > 0}
        style={styles.subbutton}
        onPress={async () => {
          setReseting(true);
          const isSuccess = await resetCode();
          setReseting(false);
          if (isSuccess === 'code_reseted') {
            setValue(0);
            goBack();
          }
        }}>
        {timer > 0 ? (
          <Text style={styles.subbuttontext}>{timer}</Text>
        ) : reseting ? (
          <ActivityIndicator
            style={{alignSelf: 'center'}}
            color={'gray'}
            size={'small'}
          />
        ) : (
          <Text style={styles.subbuttontext}>Дахин код авах</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TwoFactorVerify;
