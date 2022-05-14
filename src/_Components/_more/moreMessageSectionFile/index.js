import React from 'react';
import { TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';
import { SvgXml } from 'react-native-svg';
import { getSelectedRoom } from '../../../Socket/Socket_Var';
import styles from './Styles';
const FileComponent = ({
    item,
    index,
    uploadImage = () => {},
    uploadImageFromCamera = () => {},
    uploadFile = () => {},
    showAudioRecoder = () => {},
}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                const room_id = getSelectedRoom()._id;
                console.log('imageeee',item.name);
                switch (item.name) {
                    case 'Gallery':
                        Platform.OS === 'ios'
                            ? request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
                                  switch (result) {
                                      case RESULTS.GRANTED:
                                          uploadImage(room_id);
                                          break;
                                  }
                              })
                            : request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
                                  switch (result) {
                                      case RESULTS.GRANTED:
                                          uploadImage(room_id);
                                          break;
                                  }
                              });
                        break;
                    case 'Camera':
                        Platform.OS === 'ios'
                            ? request(PERMISSIONS.IOS.CAMERA).then(result => {
                                  switch (result) {
                                      case RESULTS.GRANTED:
                                          uploadImageFromCamera(room_id);
                                          break;
                                  }
                              })
                            : requestMultiple([
                                  PERMISSIONS.ANDROID.CAMERA,
                                  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                              ]).then(result => {
                                  if (
                                      result[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED &&
                                      result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]
                                  ) {
                                      uploadImageFromCamera(room_id);
                                  }
                              });
                        break;
                    case 'File':
                        Platform.OS === 'ios'
                            ? requestMultiple([
                                  PERMISSIONS.IOS.PHOTO_LIBRARY,
                                  PERMISSIONS.IOS.MEDIA_LIBRARY,
                              ]).then(result => {
                                  if (
                                      result[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED &&
                                      result[PERMISSIONS.IOS.MEDIA_LIBRARY]
                                  ) {
                                      uploadFile(room_id);
                                  }
                              })
                            : request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
                                  switch (result) {
                                      case RESULTS.GRANTED:
                                          uploadFile(room_id);
                                          break;
                                  }
                              });
                        break;
                    case 'Audio':
                        Platform.OS === 'ios'
                            ? request(PERMISSIONS.IOS.MICROPHONE).then(result => {
                                  switch (result) {
                                      case RESULTS.GRANTED:
                                          showAudioRecoder();
                                          break;
                                  }
                              })
                            : requestMultiple([
                                  PERMISSIONS.ANDROID.RECORD_AUDIO,
                                  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                              ]).then(result => {
                                  if (
                                      result[PERMISSIONS.ANDROID.RECORD_AUDIO] ===
                                          RESULTS.GRANTED &&
                                      result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]
                                  ) {
                                      showAudioRecoder();
                                  }
                              });

                        break;
                }
            }}
            disabled={item.isUploading}
            style={[styles.fileContainer, { backgroundColor: item.backgroundColor }]}>
            {item.isUploading === true ? (
                <ActivityIndicator style={styles.centerStyle} size="small" color="white" />
            ) : (
                <SvgXml
                    width="25"
                    height="20"
                    fill={item.icon_Color}
                    style={styles.centerStyle}
                    xml={item.icon}
                />
            )}
        </TouchableOpacity>
    );
};
export default FileComponent;
