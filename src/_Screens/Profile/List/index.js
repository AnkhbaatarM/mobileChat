import React, { useState, useRef } from 'react';
import { Text, View, Linking, TouchableHighlight } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
    width10,
    width2,
    width6,
    width6_5,
    width3_5,
    width4,
    width1,
    width3_8
} from '../../../_Components/_global/able-soft-component-ui/src/assets/dimensions/width';
import { squircle, squircle_fill } from '../../../utils/files/SvgFiles/moreHeaderIcon';
import { log_out } from '../../../utils/files/SvgFiles/moreHeaderIcon';
const ListMenu = ({ 
    item, 
    index, 
    openSheet = () => {},
    color,
    logout=()=>{} 
    }) => {
    const styles = require('./Styles');
    const [pressed, setPressed] = useState(false);
    return (
        <>
            <TouchableHighlight
                underlayColor={'rgba(0,0,0,0.1)'}
                style={styles.labelContainer}
                onPress={() => (item.link ? Linking.openURL(item.link) :item.type==='logout'?logout(): openSheet())}>
                <>
                { item.type==='logout'?
                   <SvgXml
                   width={width6_5}
                   height={width6_5}
                   xml={log_out()}
                   style={[styles.iconStyle,{marginLeft:width3_8,marginTop:width1}]}
               />
                  : <SvgXml
                        width={width6}
                        height={width6}
                        xml={item.icon}
                        style={item.type !== 'system' ? styles.iconStyleTop : styles.iconStyle}
                    />}

                    <Text style={styles.labelText}>{item.label}</Text>
                    <View style={{flex:1}}></View>
                    {item.type === 'color' && (
                        <SvgXml
                            width={width10}
                            height={width10}
                            xml={squircle_fill(color ? color : item.color)}
                            style={{ marginTop: 10,marginRight:width2,marginBottom:3}}
                        />
                    )}
                </>
            </TouchableHighlight>
        </>
    );
};
export default ListMenu;
