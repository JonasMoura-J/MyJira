import React from 'react';

import {
    TaskContainer,
    TaskActions,
    TaskText,
    BoxIcon    
  } from './styles'

import Icon from 'react-native-vector-icons/FontAwesome5';

const Item = (props) =>{

    return (
        <TaskContainer key={props.label.id} finalizado={props.label.concluido}>
           
            <TaskText>{props.label.descricao}</TaskText>

            <TaskActions>
                <BoxIcon>
                    <Icon
                        name="trash-alt"
                        color="#ca0000"
                        size={30}
                        onPress={() => { props.handleRemove(props.label) }}
                    />
                </BoxIcon>
                <BoxIcon>
                    <Icon
                        name={props.label.concluido ? "check" : "clock"}
                        color={props.label.concluido ? "#a4d43a" : "#000"}
                        size={30}
                        onPress={() => { props.handle(props.label)}}
                    /> 
                </BoxIcon>
            </TaskActions>
        </TaskContainer>
    );
}
export default Item
