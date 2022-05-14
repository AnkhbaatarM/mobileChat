var React = require('react-native');

var { Platform } = React;
export const Fonts = {
    Arial: 'Arial',
    ArialBold: Platform.OS === 'ios' ? 'Arial-BoldMT' : 'arialbd',
    RobotoBlack: 'Roboto-Black',
    RobotoBlackItalic: 'Roboto-BlackItalic',
    RobotoBold: 'Roboto-Bold',
    RobotoBoldItalic: 'Roboto-BoldItalic',
    RobotoLight: 'Roboto-Light',
    RobotoLightItalic: 'Roboto-LightItalic',
    RobotoRegular: 'Roboto-Regular',
    RobotoRegularItalic: 'Roboto-RegularItalic',
    RobotoThin: 'Roboto-Thin',
    RobotoThinItalic: 'Roboto-ThinItalic',
    RobotoMedium: 'Roboto-Medium',
    RobotoMediumItalic: 'Roboto-MediumItalic',
};
