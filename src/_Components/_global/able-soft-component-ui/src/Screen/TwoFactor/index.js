import React, { useState } from 'react';
import { LayoutAnimation } from 'react-native';
import TwoFactorAuthentication from './TwoFactorAuthentication';
import TwoFactorVerify from './TwoFactorVerify';
const TwoFactor = ({
    path = undefined,
    sendCodeToValue = () => {},
    hideAuthWindow = () => {},
    checkAuthCode = () => {},
    AuthSuccess = () => {},
    resetCode = () => {},
    array = [],
}) => {
    const [twoFactorVerify, showTwoFactorVerify] = useState(false);

    const showTwoFactor = async value => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        const isSuccess = await sendCodeToValue(value);
        if (isSuccess === 'success') {
            showTwoFactorVerify(true);
        }
    };
    const goBack = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        hideAuthWindow(false);
    };

    if (twoFactorVerify) {
        return (
            <TwoFactorVerify
                path={path}
                goBack={() => showTwoFactorVerify(false)}
                checkAuthCode={checkAuthCode}
                AuthSuccess={() => AuthSuccess()}
                resetCode={() => resetCode()}
            />
        );
    } else {
        return (
            <TwoFactorAuthentication
                goBack={goBack}
                path={path}
                array={array}
                showTwoFactor={showTwoFactor}
            />
        );
    }
};
export default TwoFactor;
