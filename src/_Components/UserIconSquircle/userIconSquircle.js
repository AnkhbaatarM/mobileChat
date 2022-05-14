
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import SvgUri from 'react-native-svg-uri';
import background from './Assets/images/background';
import {SvgXml} from 'react-native-svg';


var styles = require('./Styles');


export default class UserIconSquircle extends Component {
    constructor(props) {
        super(props);
        this.changeFullScreenState = this.changeFullScreenState.bind(this);
        this.state = {
            domain: '',
        };
    }

    changeFullScreenState(showShift, showComment, showFile, FullScreen, showHeader, openDialog) {
        this.props.changeFullScreenState(showShift, showComment, showFile, FullScreen, showHeader, openDialog);
    }

    async componentDidMount() {
        const domain = await AsyncStorage.getItem('DomainAddress');
        this.setState({domain: domain});
    }

    render() {
        const {fileUri, BGWidth, BGHeight, imageHeight, imageWidth, hideWithKeyboard} = this.props;
        const svgWidth = BGWidth.toString();
        const svgHeight = BGHeight.toString();

        const {domain} = this.state;
        return (
            <View style={{marginBottom:'-6.5%'}}>
                {hideWithKeyboard &&
                <HideWithKeyboard style={{justifyContent: 'center', alignItems: 'center', marginTop: '1%'}}>
                    <Image
                        style={[{width: imageWidth, height: imageHeight}, styles.imageIconPlaceHolder]}
                        source={require('./Assets/images/user_empty_icon.png')}
                        resizeMode={'cover'}
                    />
                    <FastImage
                        source={{uri: domain + fileUri}}
                        style={[{width: imageWidth, height: imageHeight}, styles.imageIconPlaceHolder]}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                    <SvgXml fill={'#ffffff'} width={BGWidth} height={BGHeight} xml={background}/>
                </HideWithKeyboard>}
                {!hideWithKeyboard &&
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        style={[{width: imageWidth, height: imageHeight}, styles.imageIconPlaceHolder]}
                        source={require('./Assets/images/user_empty_icon.png')}
                        resizeMode={'cover'}
                    />
                    <FastImage
                        source={{uri: domain + fileUri}}
                        style={[{width: imageWidth, height: imageHeight}, styles.imageIconPlaceHolder]}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                    <Image
                        style={{width: BGWidth, height: BGHeight}}
                        source={require('./Assets/images/background.png')}
                        resizeMode={'cover'}
                    />
                </View>}
            </View>
        );
    }
}

