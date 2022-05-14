/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, Pressable, Image, BackHandler } from 'react-native';
import styles from './Styles';
import UserIcon from '../../../Components/UserIcon';
import Button from '../../../Components/Button';
import { SvgXml } from 'react-native-svg';
import { email, mobile } from './utils/svg_icons';
const TwoFactor = ({
    path = undefined,
    showTwoFactor = () => {},
    array = [
        { type: 'email', value: 'able@gmail.com' },
        { type: 'phone', value: '88891803' },
        { type: 'phone', value: '99888888' },
    ],
    goBack = () => {},
}) => {
    const [arrayValues, setArrayValues] = useState(array);
    const [selectValue, setSelectValue] = useState('');

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        arrayValues.map(item => {
            if (item.selected) {
                setSelectValue(item.value);
            }
        });
        // cleanup function
        return () => {
            backHandler.remove();
        };
    }, []);

    const backAction = () => {
        goBack();
        return true;
    };

    const PartiallyHide = value => {
        if (value.includes('@')) {
            let hide = value.split('@')[0].length - 2; //<-- number of characters to hide
            var r = new RegExp('.{' + hide + '}@', 'g');
            return value.replace(r, '***@');
        } else {
            return value.slice(0, 1) + value.slice(1).replace(/.(?=...)/g, '*');
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
            }}>
            <UserIcon path={path} width={80} height={80} />
            <Text style={styles.warningText}>
                {'Та баталгаажуулах код хүлээн авах утасны дугаар эсвэл и-мэйл хаягаа сонгоно уу!'}
            </Text>
            {arrayValues.map((item, index) => {
                return (
                    <Pressable
                        key={index.toString()}
                        style={[
                            styles.selecterButton,
                            {
                                backgroundColor: item.selected ? '#2f97df' : '#e9f3fb',
                                borderColor: item.selected ? 'transparent' : '#ccdce9',
                                borderWidth: item.selected ? 0 : 2,
                            },
                        ]}
                        onPress={() => {
                            arrayValues.map((itm, idx) => {
                                if (idx === index) {
                                    itm.selected = true;
                                } else {
                                    itm.selected = false;
                                }
                            });
                            setArrayValues([...arrayValues]);
                            setSelectValue(item.value);
                        }}>
                        {item.selected && (
                            <Image
                                style={styles.iconStyle}
                                source={require('./utils/checked.gif')}
                            />
                        )}
                        {!item.selected && (
                            <SvgXml
                                style={styles.iconStyle}
                                width="20"
                                height="20"
                                xml={item.type === 'email' ? email('#1a6193') : mobile('#1a6193')}
                            />
                        )}
                        <Text
                            style={[
                                styles.mainbuttontext,
                                { color: item.selected ? 'white' : '#1a6193' },
                            ]}>
                            {PartiallyHide(item.value)}
                        </Text>
                    </Pressable>
                );
            })}
            <Button
                containerStyle={styles.mainbutton}
                label={'Үргэлжлүүлэх'}
                labelStyle={styles.mainbuttontext}
                customLoaderStyle={{ backgroundColor: styles.mainbutton.backgroundColor }}
                onPress={async () => {
                    await showTwoFactor(selectValue);
                }}
            />
        </SafeAreaView>
    );
};

export default TwoFactor;
