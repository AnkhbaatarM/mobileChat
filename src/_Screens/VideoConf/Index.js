import React, { useContext } from 'react';
import { View, SafeAreaView, Button, Platform, TouchableOpacity, Text } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';
import { WebView } from 'react-native-webview';
const styles = require('./Styles');

export default function App(props) {
    const [localStream, setLocalStream] = React.useState();
    const [remoteStream, setRemoteStream] = React.useState();
    const [cachedLocalPC, setCachedLocalPC] = React.useState();
    const [cachedRemotePC, setCachedRemotePC] = React.useState();
    const [isMuted, setIsMuted] = React.useState(false);

    const startLocalStream = async () => {
        // isFront will determine if the initial camera should face user or environment
        const isFront = true;
        const devices = await mediaDevices.enumerateDevices();

        const facing = isFront ? 'front' : 'environment';
        const videoSourceId = devices.find(
            device => device.kind === 'videoinput' && device.facing === facing
        );
        const facingMode = isFront ? 'user' : 'environment';
        const constraints = {
            audio: true,
            video: {
                mandatory: {
                    minWidth: 500, // Provide your own width, height and frame rate here
                    minHeight: 300,
                    minFrameRate: 30,
                },
                facingMode,
                optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
            },
        };
        const newStream = await mediaDevices.getUserMedia(constraints);
        console.warn('newStream-' + Platform.OS, newStream.toURL());
        setLocalStream(newStream);
    };

    const startCall = async () => {
        // You'll most likely need to use a STUN server at least. Look into TURN and decide if that's necessary for your project
        const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
        const localPC = new RTCPeerConnection(configuration);
        const remotePC = new RTCPeerConnection(configuration);

        // could also use "addEventListener" for these callbacks, but you'd need to handle removing them as well
        localPC.onicecandidate = e => {
            try {
                console.log('localPC icecandidate:', e.candidate);
                if (e.candidate) {
                    remotePC.addIceCandidate(e.candidate);
                }
            } catch (err) {
                console.error(`Error adding remotePC iceCandidate: ${err}`);
            }
        };
        remotePC.onicecandidate = e => {
            try {
                console.log('remotePC icecandidate:', e.candidate);
                if (e.candidate) {
                    localPC.addIceCandidate(e.candidate);
                }
            } catch (err) {
                console.error(`Error adding localPC iceCandidate: ${err}`);
            }
        };
        remotePC.onaddstream = e => {
            console.log('remotePC tracking with ', e);
            if (e.stream && remoteStream !== e.stream) {
                console.log('RemotePC received the stream=' + Platform.OS, e.stream);
                setRemoteStream(e.stream);
            }
        };

        // AddTrack not supported yet, so have to use old school addStream instead
        // newStream.getTracks().forEach(track => localPC.addTrack(track, newStream));
        localPC.addStream(localStream);
        try {
            const offer = await localPC.createOffer();
            console.log('Offer from localPC, setLocalDescription');
            await localPC.setLocalDescription(offer);
            console.log('remotePC, setRemoteDescription');
            await remotePC.setRemoteDescription(localPC.localDescription);
            console.log('RemotePC, createAnswer');
            const answer = await remotePC.createAnswer();
            console.log(`Answer from remotePC: ${answer.sdp}`);
            console.log('remotePC, setLocalDescription');
            await remotePC.setLocalDescription(answer);
            console.log('localPC, setRemoteDescription');
            await localPC.setRemoteDescription(remotePC.localDescription);
        } catch (err) {
            console.log(err);
        }
        setCachedLocalPC(localPC);
        setCachedRemotePC(remotePC);
    };

    const switchCamera = () => {
        localStream.getVideoTracks().forEach(track => track._switchCamera());
    };

    // Mutes the local's outgoing audio
    const toggleMute = () => {
        if (!remoteStream) {
            return;
        }
        localStream.getAudioTracks().forEach(track => {
            console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
            track.enabled = !track.enabled;
            setIsMuted(!track.enabled);
        });
    };

    const closeStreams = () => {
        if (cachedLocalPC) {
            cachedLocalPC.removeStream(localStream);
            cachedLocalPC.close();
        }
        if (cachedRemotePC) {
            cachedRemotePC.removeStream(remoteStream);
            cachedRemotePC.close();
        }
        setLocalStream();
        setRemoteStream();
        setCachedRemotePC();
        setCachedLocalPC();
    };
    const remoteURL = {
        _reactTag: '9368ab27-f3e7-4a12-8531-b4ecebdf287c',
        _tracks: [
            {
                _enabled: true,
                id: '1d8f0b1a-c02b-4a5c-b619-cde0c1b8d338',
                kind: 'video',
                label: 'Video',
                muted: false,
                readonly: true,
                readyState: 'live',
                remote: true,
            },
            {
                _enabled: true,
                id: '7a434bf2-4f5f-4f20-b9a6-a2d4205fc075',
                kind: 'audio',
                label: 'Audio',
                muted: false,
                readonly: true,
                readyState: 'live',
                remote: true,
            },
        ],
        active: true,
        id: '26dfc13d-c1d5-4399-bc28-a301b8c40581',
    };

    return (
        <SafeAreaView style={styles.container}>
            {/*


      <View style={styles.rtcview}>
        {localStream && <RTCView style={styles.rtc} streamURL={localStream.toURL()} />}
        {remoteStream && <RTCView style={styles.rtc} streamURL={remoteURL} />}

      </View>
      <Button title="Click to stop call" onPress={closeStreams} disabled={!remoteStream} />
      {!localStream && <Button title="Click to start stream" onPress={startLocalStream} />}
      {localStream && <Button title="Click to start call" onPress={startCall} disabled={!!remoteStream} />}
      {localStream && (
        <View style={styles.toggleButtons}>
          <Button title="Switch camera" onPress={switchCamera} />
          <Button title={`${isMuted ? 'Unmute' : 'Mute'} stream`} onPress={toggleMute} disabled={!remoteStream} />
        </View>
      )}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={{ flexDirection: 'row', height: 40 }}>
          <IconMaterialIcons

            style={{ alignSelf: 'center' }}
            name="arrow-back"
            size={30}
            color="white"
          />
          <Text style={styles.userName}>{`  ${state.roomList[state.selectedUser].name.replace(', ' + state.me.userName, '').replace(state.me.userName + ',', '').replace(`,${state.me.userName}`, '')}`}</Text>
        </TouchableOpacity>
      </View> */}

            <WebView
                // style={{ flex: 1 }}
                // mediaPlaybackRequiresUserAction={false}
                // domStorageEnabled={true}
                // allowsInlineMediaPlayback={true}
                // source={{ uri: SITE_URL }}
                // startInLoadingState={true}
                // allowUniversalAccessFromFileURLs={true}
                // injectedJavaScript={this.javascriptToInject()}
                // injectedJavaScriptBeforeContentLoaded={myScript}
                // onMessage={this.onMessage}
                // javaScriptEnabled={true}
                // javaScriptEnabledAndroid={true}
                // geolocationEnabled={false}
                // builtInZoomControls={false}
                // mediaPlayUserGesture={false}
                // ref="webViewAndroidSample"
                javaScriptEnabled={true}
                javaScriptEnabledAndroid={true}
                geolocationEnabled={false}
                builtInZoomControls={false}
                mediaPlayUserGesture={false}
                mediaPlaybackRequiresUserAction={false}
                injectedJavaScript={javascriptToInject()}
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                onNavigationStateChange={onNavigationStateChange}
                onMessage={onMessage}
                url={
                    'https://develop.able.mn:8001/join/5efc573727bbf9021a09cb9a/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteUhJRCI6NDQ5NywibXlDb21JZCI6Miwia2V5IjoiYWJsZXNvZnQiLCJicm93c2VyIjoiQ2hyb21lIiwiYnJvd3NlclZlciI6IjgzLjAuNDEwMy4xMTYiLCJvcyI6IldpbmRvd3MgMTAiLCJvc1R5cGUiOm51bGwsImxvY2F0aW9uIjoiLCgpIiwiY2xpZW50SVAiOiIyMDIuMTMxLjIzNi4xNCwgMjAyLjIxLjEyMy4xNzgiLCJjbGllbnRUeXBlIjoid2ViIiwic2NyZWVuV2lkdGgiOjE5MjAsInNjcmVlbkhlaWdodCI6MTA4MCwiaWF0IjoxNTkzMzIyNjYyfQ.I2QGlhAJ3XTK2yCl2uL22uLZSCDKvJqaEqKcqdYdYHk'
                }
                source={{
                    uri:
                        'https://develop.able.mn:8001/join/5efc573727bbf9021a09cb9a/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteUhJRCI6NDQ5NywibXlDb21JZCI6Miwia2V5IjoiYWJsZXNvZnQiLCJicm93c2VyIjoiQ2hyb21lIiwiYnJvd3NlclZlciI6IjgzLjAuNDEwMy4xMTYiLCJvcyI6IldpbmRvd3MgMTAiLCJvc1R5cGUiOm51bGwsImxvY2F0aW9uIjoiLCgpIiwiY2xpZW50SVAiOiIyMDIuMTMxLjIzNi4xNCwgMjAyLjIxLjEyMy4xNzgiLCJjbGllbnRUeXBlIjoid2ViIiwic2NyZWVuV2lkdGgiOjE5MjAsInNjcmVlbkhlaWdodCI6MTA4MCwiaWF0IjoxNTkzMzIyNjYyfQ.I2QGlhAJ3XTK2yCl2uL22uLZSCDKvJqaEqKcqdYdYHk',
                }}
                style={styles.containerWebView}
            />
        </SafeAreaView>
    );
}
// import React, { useContext, useState, useEffect } from 'react';
// import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { request, requestMultiple, PERMISSIONS } from 'react-native-permissions';
// import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { AuthContext } from 'AbleChat/Context/ContextGlobalState';
// import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const WebViewAndroid = require('react-native-webview-rtc');

// // var SITE_URL = 'https://202.21.123.165:8000/join/140/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwid29ya2VySWQiOjExLCJuYW1lIjoiYWRtaW4iLCJhdmF0YXIiOiJodHRwOi8vbG9jYWxob3N0OjgwMDMvYXBpL3N0b3JhZ2UvYWNjb3VudHMvaWNvbnMvMS5qcGciLCJ1YWdlbnQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvODEuMC40MDQ0LjEzOCBTYWZhcmkvNTM3LjM2IE9QUi82OC4wLjM2MTguMTY1IiwiaWF0IjoxNTkyNDUwNjE0LCJleHAiOjE1OTMzMTQ2MTR9.TCnYsVmsUESZwL1tVwPJJHLEadYJNP0O7J_1AiV05_Q';
// var SITE_URL = 'https://appr.tc/r/031066337';
// // const SITE_URL = 'https://webrtc.github.io/samples/';

// // var SITE_URL = 'https://us04web.zoom.us/j/77442176056?pwd=MDkzWU5IdERiR05VelFvY0w0N0NqZz09';

// var URL_DOMAIN = 'react-native-webrtc.herokuapp.com';
// const styles = require('./Styles');

// // inside react class
// const Index = (props) => {
//   const { state, dispatch } = useContext(AuthContext);
//   const [url, setSITE_URL] = useState(SITE_URL);
//   const [status, setStatus] = useState(SITE_URL);
//   const [backButtonEnabled, setBackButtonEnabled] = useState(SITE_URL);
//   const [forwardButtonEnabled, setForwardButtonEnabled] = useState(SITE_URL);
//   const [loading, setLoading] = useState(SITE_URL);
//   const [messageFromWebView, setMessageFromWebView] = useState(SITE_URL);

//   useEffect(() => {
//     request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
//       // …
//     });
//     Platform.OS === 'android' ?
//       requestMultiple([
//         PERMISSIONS.ANDROID.CAMERA,
//         PERMISSIONS.ANDROID.RECORD_AUDIO,
//         PERMISSIONS.ANDROID.WAKE_LOCK,
//         PERMISSIONS.ANDROID.MODIFY_AUDIO_SETTINGS,]).then(
//           (statuses) => {
//             console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
//           },
//         ) :
//       requestMultiple([PERMISSIONS.IOS.CAMERA,
//       PERMISSIONS.IOS.RECORD_AUDIO,
//       PERMISSIONS.IOS.WAKE_LOCK,
//       PERMISSIONS.IOS.MODIFY_AUDIO_SETTINGS]).then(
//         (statuses) => {
//           console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
//         },
//       );
//   }, []);
//   goBack = () => {
//     // you can use this callback to control web view
//     refs.webViewAndroidSample.goBack();
//   }

//   goForward = () => {
//     refs.webViewAndroidSample.goForward();
//   }
//   reload = () => {
//     refs.webViewAndroidSample.reload();
//   }

//   stopLoading = () => {
//     // stops the current load
//     refs.webViewAndroidSample.stopLoading();
//   }

//   postMessage = (data) => {
//     // posts a message to web view
//     refs.webViewAndroidSample.postMessage(data);
//   }

//   evaluateJavascript = (data) => {
//     // evaluates javascript directly on the webview instance
//     refs.webViewAndroidSample.evaluateJavascript(data);
//   }

//   injectJavaScript = (script) => {
//     // executes JavaScript immediately in web view
//     refs.webViewAndroidSample.injectJavaScript(script);
//   }

//   const onShouldStartLoadWithRequest = (event) => {

//     console.warn('App.js -> onShouldStartLoadWithRequest () ...');
//     // currently only url & navigationState are returned

//     console.warn('event.url = ', event.url);
//     console.warn('navigatinalstate = ', event);

//     if (event.url.indexOf({ URL_DOMAIN } >= 0)) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   onNavigationStateChange = (event) => {
//     console.warn('App.js -> onNavigationStateChange () ...', event);
//     setStatus(event.title);
//     setBackButtonEnabled(event.canGoBack)
//     setForwardButtonEnabled(event.canGoForward)
//     setLoading(event.loading)
//     setSITE_URL(event.url)
//   }

//   const onMessage = (event) => {
//     console.warn('App.js -> onMessage () ...', event.message);
//     setMessageFromWebView(event.message)
//   }

//   const javascriptToInject = () => {
//     return `
//       $(document).ready(function() {
//         $('a').click(function(event) {
//           if ($(this).attr('href')) {
//             var href = $(this).attr('href');
//             window.webView.postMessage('Link tapped: ' + href);
//           }
//         })
//       })
//     `
//   }

//   const myScript = `
//         document.body.style.backgroundColor = 'red';
//         setTimeout(function() { window.alert('hi') }, 2000);
//         true; // note: this is required, or you'll sometimes get silent failures
//       `;
//   const runFirst = `
//       window.isNativeApp = true;
//       true; // note: this is required, or you'll sometimes get silent failures
//     `;
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <WebViewAndroid
//           // ref="webViewAndroidSample"
//           javaScriptEnabled={true}
//           javaScriptEnabledAndroid={true}
//           geolocationEnabled={false}
//           builtInZoomControls={false}
//           mediaPlayUserGesture={false}
//           injectedJavaScript={javascriptToInject()}
//           onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
//           onNavigationStateChange={onNavigationStateChange}
//           onMessage={onMessage}
//           url={SITE_URL}
//           style={styles.containerWebView}
//         />
//       <WebView
//         // style={{ flex: 1 }}
//         // mediaPlaybackRequiresUserAction={false}
//         // domStorageEnabled={true}
//         // allowsInlineMediaPlayback={true}
//         // source={{ uri: SITE_URL }}
//         // startInLoadingState={true}
//         // allowUniversalAccessFromFileURLs={true}
//         // injectedJavaScript={this.javascriptToInject()}
//         // injectedJavaScriptBeforeContentLoaded={myScript}
//         // onMessage={this.onMessage}
//         // javaScriptEnabled={true}
//         // javaScriptEnabledAndroid={true}
//         // geolocationEnabled={false}
//         // builtInZoomControls={false}
//         // mediaPlayUserGesture={false}
//         // ref="webViewAndroidSample"
//         javaScriptEnabled={true}
//         javaScriptEnabledAndroid={true}
//         geolocationEnabled={false}
//         builtInZoomControls={false}
//         mediaPlayUserGesture={false}
//         mediaPlaybackRequiresUserAction={false}
//         injectedJavaScript={javascriptToInject()}
//         onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
//         onNavigationStateChange={onNavigationStateChange}
//         onMessage={onMessage}
//         url={SITE_URL}
//         source={{ uri: SITE_URL }}
//         style={styles.containerWebView}

//       />
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           onPress={() => {
//             props.navigation.goBack();
//           }}
//           style={{ flexDirection: 'row',height:40}}>
//           <IconMaterialIcons

//             style={{ alignSelf: 'center' }}
//             name="arrow-back"
//             size={30}
//             color="white"
//           />
//           <Text style={styles.userName}>{`  ${state.roomList[state.selectedUser].name.replace(', ' + state.me.userName, '').replace(state.me.userName + ',', '').replace(`,${state.me.userName}`, '')}`}</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>

//   );

// }

// export default Index;
