import React from 'react';
import { Text } from 'react-native';

import {
    Container,
    Task,
    TaskContainer,
    TaskActions,
    Input,
    Button,
    TextButton,
    FormEnviar,
    Tasks,
    TaskText,
    BoxIcon,
    ProgressContainer
  } from '../screens/Projetos/styles'

import Icon from 'react-native-vector-icons/FontAwesome5';

const List = (props) => {

    return (
        <>
        {props.lista.map(a =>
          
            <TaskContainer key={a.id} finalizado={a.concluido}>
             
            <TaskText>{a.descricao}</TaskText>
            
          <TaskActions>
          <BoxIcon>
            <Icon
              name="trash-alt"
              color="#ca0000"
              size={30}
              onPress={() => {handleRemoveTask(a)}}
            />
  
          </BoxIcon>
          <BoxIcon>
            <Icon
              name={a.concluido ? "check" : "clock"}
              color={a.concluido ? "#a4d43a" : "#000"}
              size={30}
              onPress={() => { handleTasks(a)}}
            />
          </BoxIcon>
           </TaskActions>
          
         </TaskContainer>
  
          )}
        </>
    )

}

export default List;