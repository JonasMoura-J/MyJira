import React from 'react';
import { Text } from 'react-native';
import {
    ProgressContainer
  } from '../screens/Projetos/styles'
import ProgressCircle from 'react-native-progress-circle';

const Progress = (props) => {

    return (
        <ProgressContainer>
                <ProgressCircle
                percent={props.percent}
                radius={70}
                borderWidth={7}
                color="#3aa4d4"
                shadowColor="#999"
                bgColor="#1c1c1c"
                >
                <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>{`${props.percent.toFixed(0)}%`}</Text>
            </ProgressCircle>
        </ProgressContainer>
    )

}

export default Progress;