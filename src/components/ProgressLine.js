import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text

} from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { color } from 'react-native-reanimated';

const ProgressLine = (props) =>{

  const barWidth = Dimensions.get('screen').width - 30;

    return (
        <View>
            <Text style ={{color:'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 8}}>{props.textPercent}</Text>
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
