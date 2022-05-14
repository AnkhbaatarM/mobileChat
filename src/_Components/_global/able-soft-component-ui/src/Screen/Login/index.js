import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Keyboard,
    LayoutAnimation,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import { login_user, login_password, app_logo } from '../../assets/icons/svg_icons';
import { SvgXml } from 'react-native-svg';
import Button from '../../Components/Button/index';
import TextInput from '../../Components/TextInput';
import Modal from 'react-native-modal';
import { width8_5, width9 } from '../../assets/dimensions/width';
import DomainModal from '../../Components/domainModal';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = require('./Styles');
const Login = ({
    app_icon = app_logo('white'),
    rootStyle = {},
    iconStyle = {
        alignSelf: 'center',
        marginBottom: 5,
    },
    activeIconColor = 'white',
    activeBorderColor = 'white',
    inActiveIconColor = 'white',
    inActiveBorderColor = 'white',
    activeBorderHeight = 1,
    inActiveBorderHeight = 3,
    inputStyle = { marginBottom: 20 },
    buttonStyle = {},
    customLoaderStyle = {},
    labelFirst = 'Able',
    labelSecond = 'Component',
    labelFirstStyle = {},
    labelSecondStyle = {},
    onPressLogin = () => {},
    showAuthWindowNext = () => {},
    updateDomain = () => {},
    iconWidth = 90,
    iconHeight = 90,
    domainName = 'Домайн тохиргоо',
}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [domainButton, showDomainButton] = useState(true);
    const [modalVisible, showModal] = useState(false);
    const [showDomain, setShowDomain] = useState(false);
    const [pressed, setPressed] = useState(false);
    const scrollView = useRef(null);
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => {
        // LayoutAnimation.configureNext(
        //     LayoutAnimation.create(
        //         200,
        //         LayoutAnimation.Types.easeInEaseOut,
        //         LayoutAnimation.Properties.scaleXY
        //     )
        // );
        // scrollView.current.scrollToEnd({ animated: true });
        showDomainButton(false);
    };

    const _keyboardDidHide = () => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                200,
                LayoutAnimation.Types.easeInEaseOut,
                LayoutAnimation.Properties.scaleXY
            )
        );
        showDomainButton(true);
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.rootContainerStyle, rootStyle]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollView}
                style={{ alignSelf: 'center' }}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    paddingVertical: 50,
                }}>
                <SvgXml
                    style={iconStyle}
                    fill={'white'}
                    width={iconWidth}
                    height={iconHeight}
                    xml={app_icon}
                />
                <View style={styles.labelContainer}>
                    <Text style={[styles.labelFirst, labelFirstStyle]}>{labelFirst}</Text>
                    <Text style={[styles.labelSecond, labelSecondStyle]}>{labelSecond}</Text>
                </View>
                <TextInput
                    svgPath={login_user}
                    value={userName}
                    placeholder={'Нэвтрэх нэр'}
                    onChangeText={text => setUserName(text)}
                    activeIconColor={'white'}
                    activeBorderColor={activeBorderColor}
                    inActiveIconColor={inActiveIconColor}
                    inActiveBorderColor={inActiveBorderColor}
                    inActiveBorderHeight={inActiveBorderHeight}
                    activeBorderHeight={activeBorderHeight}
                    containerStyle={styles.textInputContainerStyle}
                    inputWithIconContainer={styles.textInputWithIconContainer}
                    inputStyle={styles.textInputStyle}
                    iconWidth={width9}
                    iconHeight={width9}
                    iconCustomStyle={{ bottom: 4, right: -6 }}
                    placeholderColor={inActiveIconColor}
                />
                <TextInput
                    svgPath={login_password}
                    value={password}
                    placeholder={'Нууц үг'}
                    onChangeText={text => setPassword(text)}
                    activeIconColor={'white'}
                    activeBorderColor={activeBorderColor}
                    inActiveIconColor={inActiveIconColor}
                    inActiveBorderColor={inActiveBorderColor}
                    inActiveBorderHeight={inActiveBorderHeight}
                    activeBorderHeight={activeBorderHeight}
                    secureTextEntry={true}
                    containerStyle={styles.textInputContainerStyle}
                    inputWithIconContainer={styles.textInputWithIconContainer}
                    inputStyle={styles.textInputStyle}
                    placeholderColor={inActiveIconColor}
                    iconCustomStyle={{ bottom: Platform.OS === 'ios' ? 0 : 1, right: -2.5 }}
                    iconWidth={width9}
                    iconHeight={width9}
                />
                <Button
                    containerStyle={[styles.buttonStyle, buttonStyle]}
                    customLoaderStyle={[styles.loaderStyle, customLoaderStyle]}
                    labelStyle={styles.buttonLabel}
                    onPress={async () => {
                        const showAuth = await onPressLogin(userName, password);
                        if (showAuth === 'show_auth') {
                            showModal(true);
                        }
                        console.log(showAuth);
                    }}
                />
                {domainButton && (
                    <TouchableHighlight
                        underlayColor={'rgba(255,255,255,0.2)'}
                        onPress={() => setShowDomain(true)}
                        // onPressIn={() => setPressed(true)}
                        // onPressOut={() => setPressed(false)}
                        style={styles.DomainViewContainer}>
                        <>
                            <View style={styles.DomainTextContainer}>
                                <Text style={styles.DomainMainText}>{domainName}</Text>
                            </View>
                            <Text style={styles.DomainText}>
                                {'\b'}Able системийг хэрэглэдэг {'\n'} домайн хаягаа сонгоно уу!
                            </Text>
                        </>
                    </TouchableHighlight>
                )}
            </ScrollView>
            {showDomain && (
                <DomainModal onClose={() => setShowDomain(false)} updateDomain={updateDomain} />
            )}

            <Modal
                onBackdropPress={() => showModal(false)}
                onBackButtonPress={() => showModal(false)}
                isVisible={modalVisible}>
                <View style={styles.AlertModal}>
                    <Image source={require('./Assets/hacker.png')} style={styles.image} />
                    <Text style={styles.Atitle}>{'Хэрэглэгчийг \nбаталгаажуулах'}</Text>
                    <Text style={styles.Abody}>
                        {
                            'Таны нэвтрэлт өмнөх түүхээсээ\n өөр байгаа тул аюулгүй байдлыг хангах үүднээс, таныг мөн эсэхийг нууцлалын кодоор баталгаажуулах цонх!'
                        }
                    </Text>
                    <Button
                        containerStyle={{ width: '80%', backgroundColor: '#8892a0' }}
                        label={'Кодоор нэвтрэх'}
                        onPress={() => {
                            showAuthWindowNext(true);
                        }}
                    />
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};
export default Login;
