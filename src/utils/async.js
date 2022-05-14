import AsyncStorage from '@react-native-community/async-storage';
export async function get(key) {
    return AsyncStorage.getItem(key).then(value => {
        return value && JSON.parse(value);
    });
}

export function mget(keys) {
    return AsyncStorage.multiGet(keys).then(values => {
        return values.map(([key, value]) => value && JSON.parse(value));
    });
}

export async function set(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
}

export function mset(obj) {
    const keys = Object.keys(obj);
    const keyValuePairs = keys.map(key => [key, JSON.stringify(obj[key])]);

    return AsyncStorage.multiSet(keyValuePairs);
}

export function remove(key) {
    return AsyncStorage.removeItem(key);
}

export function mremove(keys) {
    return AsyncStorage.multiRemove(keys);
}

export function getAllKeys(keys) {
    return AsyncStorage.getAllKeys(keys);
}
