# able-soft-component-ui --save
## Getting started

Install the library using either Yarn:

```
npm install npm i able-soft-component-ui --save

```javascript
import {TextInput, Login, UserIcon,TwoFactorAuthentication} from 'able-soft-component-ui';
```

## Example

```jsx
import React from 'react';
import {useState} from 'react';
import {View, Platform, UIManager} from 'react-native';
import {TextInput, Login, UserIcon,TwoFactorAuthentication} from 'able-soft-component-ui';
const App = () => {
  const [authShown, showAuth] = useState(false);
  const [authArray, setAuthArray] = useState(false);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const LoginReq = async () => {
    return new Promise((resolve) =>
      setTimeout(function () {
        resolve('show_auth');
        setAuthArray();
      }, 3000),
    );
  };

  const showAuthWindowNext = () => {
    showAuth(true);
  };

  const sendCodeToValue = (value) => {
    console.log('sendCodeToValue', value);
    return new Promise((resolve) =>
      setTimeout(function () {
        resolve('success');
        setAuthArray();
      }, 3000),
    );
  };

  const checkAuthCode = (value) => {
    return new Promise((resolve) =>
      setTimeout(function () {
        resolve('code_success');
        setAuthArray();
      }, 3000),
    );
  };

  const AuthSuccess = () => {
    alert('amjilttai_nevterlee');
  };
//Array example
  const testArray = [
    {type: 'email',value: 'able@gmail.com'},
    {type: 'phone',value: '88891803'},
    {type: 'phone',value: '99888888'},
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
      {authShown ? (
        <TwoFactorAuthentication
          array={authArray}
          path={
            'https://storage.able.mn/main.php?g=bG9ZhEltYWdl&path=dXNlckl4b2jvbDIwMzU5NzguanBn&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteUhJRCI6MjAzNTk3OCwibXlDb21JZCI6Miwia2V5IjoiYWJsZXNvZnQiLCJicm93c2VyIjoiQ2hyb21lIiwiYnJvd3NlclZlciI6Ijg3LjAuNDI4MC44OCIsIm9zIjoiTWFjIE9TIFgiLCJvc1R5cGUiOm51bGwsImxvY2F0aW9uIjoiVWxhbiBCYXRvcixNTig0Ny45MDc3LDEwNi44ODMyKSIsImNsaWVudElQIjoiMTUwLjEyOS4xNDMuMTc0IiwiY2xpZW50VHlwZSI6IndlYiIsInNjcmVlbldpZHRoIjoxMjgwLCJzY3JlZW5IZWlnaHQiOjgwMCwiaWF0IjoxNjA5OTg4Mjk4fQ.0OmrPimv7gWzdP7z4hcUyKgSodusB_ZYbufycNBluF0&cloudDir=1'
          }
          goBack={() => showAuth(false)}
          hideAuthWindow={() => showAuth(false)}
          sendCodeToValue={sendCodeToValue}
          checkAuthCode={checkAuthCode}
          AuthSuccess={AuthSuccess}
          array={testArray}
        />
      ) : (
        <Login
          activeIconColor={'green'}
          activeBorderColor={'green'}
          inActiveIconColor={'red'}
          inActiveBorderColor={'red'}
          inActiveBorderHeight={2}
          activeBorderHeight={5}
          buttonStyle={{width: '80%'}}
          inputStyle={{width: '80%'}}
          onPressLogin={() => LoginReq(true)}
          showAuthWindow={true}
          showAuthWindowNext={() => {
            showAuthWindowNext();
          }}
        />
      )}
    </View>
  );
};
export default App;

```

# Reference

## Methods

### Parameters

| Name    | Type   | Required | Description                               |
| ------- | ------ | -------- | ----------------------------------------- |
| content | string | Yes      | The content to be stored in the clipboard |