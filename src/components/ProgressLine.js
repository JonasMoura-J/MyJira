import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions

} from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const ProgressLine = (props) =>{

  const barWidth = Dimensions.get('screen').width - 30;

    return (
        <View>
            
          <ProgressBarAnimated
            width={barWidth}
            value={props.percent}
            backgroundColorOnComplete="#6CC644"
            useNativeDriver = {true}
          />
        </View>
    );
}
export default ProgressLine
