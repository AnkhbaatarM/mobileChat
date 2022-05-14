import React, { PureComponent } from 'react';
import { TouchableOpacity, Image } from 'react-native';

class VideoControls extends PureComponent {
  render() {
    const {onPress, source, style, imgStyle = {width: 40, height: 40}} = this.props;
    
    return (
      <TouchableOpacity
        style={style}
        onPress={onPress}
        activeOpacity={.7}
      >
        <Image
          style={imgStyle}
          source={source}
        />
      </TouchableOpacity>
    );
  }
}

export default VideoControls;
