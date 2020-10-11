import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';

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

import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import ProgressCircle from 'react-native-progress-circle';

// import { UsuarioContext } from '../../contexts/user';

const List = (props) => {
  const focoPagina = useIsFocused();

  const [percentual, setPercentual] = useState(0);

  const percentualRealizado = async () => {
    const resultado = await api.get(props.type);
    const lista = resultado.data
    const lista_realizadas = lista.filter(l => l.concluido)

    const calculo_percentual = (lista_realizadas.length / lista.length) * 100

    setPercentual(calculo_percentual)
  }

//   const usuario = useContext(UsuarioContext);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const loadTasks = async () => {

    try {
      const response = await api.get(props.type);
      
      
      setTasks(response.data)
      
    } catch (err) {
      console.warn(`Falha ao recuperar as ${props.type}.`)
    }
  }

  const handleAddTasks = async () => {

    if (newTask == "") {
      // if (newTask.isEmpty()) {
      // if (!(!!newTask)) {
      console.warn(`você deve preencher a ${props.type.slice(0, -1)}.`)
      return
    }
    const params = {
      descricao: newTask,
      concluido: false
    }

    try {
      await api.post(props.type, params);
      setNewTask("");
      loadTasks();
      percentualRealizado();
    } catch (err) {
      console.warn(`erro ao salvar a ${props.type.slice(0, -1)}.`)
    }

  }

  const handleTasks = async (task) => {

    const params = {
      ...task,
      concluido: !task.concluido
    }

    try {
      await api.put(`${props.type}/${task.id}`, params);
      loadTasks();
      percentualRealizado();
    } catch (err) {

    }
  }

  const handleRemoveTask = async ({ id }) => {

    try {
      await api.delete(`${props.type}/${id}`);
      loadTasks();
      percentualRealizado();
    } catch (err) {
      console.warn(`erro ao deletar ${props.type.slice(0, -1)}.`)
    }
    // console.warn(`delete ${id}`)
  }

  //Apenas será executado uma única vez!
  useEffect(() => {
    loadTasks();
    percentualRealizado();
  }, [])

  //Aerá executado toda vez que NewTask sofrer alterações
  //apenas um exemplo, sem relação com a solução atual
  useEffect(() => {
    // console.warn(newTask)
  }, [newTask])

  return (
    <Container>
      
      
    
      <FormEnviar>
        <Input
          placeholder={`Incluir ${props.type.slice(0, -1)}...`}
          onChangeText={(letras) => { setNewTask(letras) }}
          value={newTask}
        />
        <Button onPress={handleAddTasks}>
          <TextButton>Criar</TextButton>
        </Button>
      </FormEnviar>

      <ProgressContainer>
        <ProgressCircle
          percent={percentual}
          radius={70}
          borderWidth={7}
          color="#3aa4d4"
          shadowColor="#999"
          bgColor="#1c1c1c"
        >
        <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>{`${percentual.toFixed(0)}%`}</Text>
      </ProgressCircle>
    </ProgressContainer>

      <Tasks showsVerticalScrollIndicator={false}>


        {tasks.map(task => (
          <TaskContainer key={task.id} finalizado={task.concluido}>
           
              <TaskText>{task.descricao}</TaskText>
              
            <TaskActions>
            <BoxIcon>
              <Icon
                name="trash-alt"
                color="#ca0000"
                size={30}
                onPress={() => { handleRemoveTask(task) }}
              />
            </BoxIcon>
            <BoxIcon>
              <Icon
                name={task.concluido ? "check" : "clock"}
                color={task.concluido ? "#a4d43a" : "#000"}
                size={30}
                onPress={() => { handleTasks(task)}}
              /> 
            </BoxIcon>
             </TaskActions>
            
           </TaskContainer>

        )
        )}
      </Tasks>
    </Container>

        
  )

}

export default List;