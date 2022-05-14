import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

export class DataCall {
    // Just simulating incremental loading, don't infer anything from here
    static async get(start, count) {
        let access_token = await AsyncStorage.getItem('access_token_Data');
        const uri = encodeURI(
            `https://mobile.health.gov.mn/api/mobile/loadDiscountMedicine?page=${1}&access_token_Data=${access_token}`
        );

        const responseHusky = await RNFetchBlob.config({
            trusty: true,
            timeout: 5000,
        }).fetch('GET', uri);
        const responseJsonHusky = await responseHusky.json();
        const fullData = responseJsonHusky.data;

        const filteredData = fullData.slice(start, Math.min(fullData.length, start + count));
        const data = {
            filteredData: filteredData,
            allData: fullData,
        };
        return data;
    }
}
