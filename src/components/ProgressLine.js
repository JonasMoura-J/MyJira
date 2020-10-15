import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text

} from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const ProgressLine = (props) =>{

  const barWidth = Dimensions.get('screen').width - 30;

    return (
        <View>
            <Text style ={{color:'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 8}}>{props.textPercent}</Text>
          <ProgressBarAnimated
            width={barWidth}
            value={props.percent}
            backgroundColorOnComplete= {props.percent == 100 ? "#6CC644" : "#148cF0"}
            useNativeDriver = {true}
            title ={`${props.percent.toFixed(0)}%`}
            />
          </View>
    );
}
export default ProgressLine
