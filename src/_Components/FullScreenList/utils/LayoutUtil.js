import { LayoutProvider } from 'recyclerlistview';
import { Dimensions } from 'react-native';
const width = (Dimensions.get('window').width * 100) / 100; //Adjustment for margin given to RLV;
const height = (Dimensions.get('window').height * 100) / 100; //Adjustment for margin given to RLV;
export class LayoutUtil {
    static getWindowWidth() {
        // To deal with precision issues on android
        return;
    }
    static getLayoutProvider() {
        return new LayoutProvider(
            () => {
                return 'VSEL';
            },
            (type, dim) => {
                switch (type) {
                    case 'VSEL':
                        dim.width = width;
                        dim.height = height;
                        break;
                    default:
                        dim.width = 0;
                        dim.heigh = 0;
                }
            }
        );
    }
}
