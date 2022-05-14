import React from 'react';
import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { DownloadFile, extention, setFileSvg, getExtension } from 'root/GlobalFunctions';
import { SvgXml } from 'react-native-svg';
import { file_other } from '../../../utils/files/SvgFiles/more_file_ext';
const width85 = (Dimensions.get('window').width * 85) / 100;

const styles = require('./Styles');
const FileRenderer = ({ item, accessToken = '' }) => {
    const file = item.files;
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    return (
        <TouchableOpacity
            onPress={() =>
                DownloadFile(
                    `${file.path}?accessToken=${accessToken}`,
                    file.name.includes('.') ? file.name : file.name + '.' + extention(file.name)
                )
            }
            style={styles.pictureContainer}>
            <SvgXml
                style={styles.pictureStyle}
                width={width85 / 3 - 15}
                height={width85 / 3 - 5}
                xml={
                    setFileSvg(file.name, file.mimetype) === 'empty'
                        ? file_other()
                        : setFileSvg(file.name, file.mimetype)
                }
            />
            <View style={styles.fileDetails}>
                <Text numberOfLines={2} style={styles.fileDetailsText}>
                    {file.name}
                </Text>
                <Text style={styles.fileDetailsDate}>{new Date().toLocaleDateString()}</Text>
                <Text style={styles.fileDetailsSize}>{formatBytes(file.size)}</Text>
            </View>
            <View style={styles.downloadContainer}>
                <Text style={styles.downloadButtonText}>Татах авах</Text>
            </View>
        </TouchableOpacity>
    );
};
export default FileRenderer;
