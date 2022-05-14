import React, { useState } from 'react';
import { Text, TouchableHighlight, Pressable, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { squircle, squircle_fill } from '../../../utils/files/SvgFiles/moreHeaderIcon';
import UserIcon from '../../_global/roomIcon';
var styles = require('./Styles');
const UserItems = ({ item, selectUser = () => {}, index }) => {
    const [pressing, setPress] = useState(false);
    return (
        <TouchableHighlight
            underlayColor={'#f0f0f0'}
            onPress={() => selectUser(index)}
            onPressIn={() => setPress(true)}
            onPressOut={() => setPress(false)}
            style={styles.safeAreaView}>
            <>
                <View style={styles.userListContainer}>
                    <UserIcon
                        backgroundColor={pressing ? '#f0f0f0' : 'white'}
                        width={50}
                        height={50}
                        roomIcon={item.user_icon}
                    />
                    <View style={styles.userListDetail}>
                        <Text style={styles.userName}>{item.system_name}</Text>
                        <View style={styles.app_nameConatiner}>
                            <Text numberOfLines={1} style={styles.app_name}>
                                {item.app_name}
                            </Text>
                        </View>
                    </View>
                </View>
                {item.isSelected ? (
                    <View>
                        <SvgXml width={30} height={30} xml={squircle_fill('#3578de')} />
                        <FontAwesome
                            size={14}
                            name="check"
                            color={'white'}
                            style={{ position: 'absolute', alignSelf: 'center', top: 5, left: 8 }}
                        />
                    </View>
                ) : (
                    <SvgXml
                        width={30}
                        height={30}
                        style={styles.cameraIcon}
                        xml={squircle('gray')}
                    />
                    // <Feather size={20} name="square" color={'gray'} style={{}} />
                )}
            </>
        </TouchableHighlight>
    );
};
export default UserItems;
